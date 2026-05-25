import { useState } from "react";
import {
  useListTasks,
  getListTasksQueryKey,
  useCreateTask,
  useUpdateTask,
  useDeleteTask,
  useListProjects,
  useListMembers,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, CheckSquare, Trash2, Clock, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type TaskStatus = "todo" | "in_progress" | "done";
type Priority = "low" | "medium" | "high";
type FilterStatus = "all" | TaskStatus;

const STATUS_LABELS: Record<TaskStatus, string> = {
  todo: "To Do",
  in_progress: "In Progress",
  done: "Done",
};

const STATUS_STYLES: Record<TaskStatus, string> = {
  todo: "bg-muted text-muted-foreground border-border",
  in_progress: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  done: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
};

const PRIORITY_STYLES: Record<Priority, string> = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  high: "bg-red-500/10 text-red-600 dark:text-red-400",
};

interface TaskFormData {
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  projectId: string;
  assigneeId: string;
  dueDate: string;
}

const DEFAULT_FORM: TaskFormData = {
  title: "",
  description: "",
  status: "todo",
  priority: "medium",
  projectId: "",
  assigneeId: "",
  dueDate: "",
};

export default function TasksPage() {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState<TaskFormData>(DEFAULT_FORM);

  const queryParams = filterStatus === "all" ? {} : { status: filterStatus };
  const queryKey = filterStatus === "all" ? getListTasksQueryKey() : getListTasksQueryKey({ status: filterStatus });

  const { data: tasks, isLoading } = useListTasks(
    filterStatus === "all" ? undefined : { status: filterStatus },
    { query: { queryKey } }
  );
  const { data: projects } = useListProjects();
  const { data: members } = useListMembers();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  function handleCreate() {
    createTask.mutate(
      {
        data: {
          title: form.title,
          description: form.description || undefined,
          status: form.status,
          priority: form.priority,
          projectId: form.projectId ? parseInt(form.projectId) : undefined,
          assigneeId: form.assigneeId ? parseInt(form.assigneeId) : undefined,
          dueDate: form.dueDate || undefined,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListTasksQueryKey() });
          setShowCreate(false);
          setForm(DEFAULT_FORM);
          toast({ title: "Task created" });
        },
        onError: () => toast({ title: "Failed to create task", variant: "destructive" }),
      }
    );
  }

  function handleStatusChange(taskId: number, status: TaskStatus) {
    updateTask.mutate(
      { id: taskId, data: { status } },
      {
        onSuccess: () => queryClient.invalidateQueries({ queryKey: getListTasksQueryKey() }),
      }
    );
  }

  function handleDelete(taskId: number) {
    deleteTask.mutate(
      { id: taskId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListTasksQueryKey() });
          toast({ title: "Task deleted" });
        },
      }
    );
  }

  const filterButtons: { label: string; value: FilterStatus }[] = [
    { label: "All", value: "all" },
    { label: "To Do", value: "todo" },
    { label: "In Progress", value: "in_progress" },
    { label: "Done", value: "done" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{tasks?.length ?? 0} tasks</p>
        </div>
        <Button onClick={() => setShowCreate(true)} data-testid="button-new-task">
          <Plus size={16} className="mr-1.5" />
          New Task
        </Button>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <Filter size={14} className="text-muted-foreground mr-1" />
        {filterButtons.map(btn => (
          <button
            key={btn.value}
            onClick={() => setFilterStatus(btn.value)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
              filterStatus === btn.value
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
            data-testid={`button-filter-${btn.value}`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-16 w-full rounded-lg" />)}
        </div>
      ) : tasks && tasks.length > 0 ? (
        <div className="space-y-2">
          {tasks.map(task => {
            const assignee = members?.find(m => m.id === task.assigneeId);
            const project = projects?.find(p => p.id === task.projectId);
            return (
              <Card
                key={task.id}
                className="group transition-all duration-150 hover:shadow-sm"
                data-testid={`task-row-${task.id}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => handleStatusChange(task.id, task.status === "done" ? "todo" : "done")}
                      className={cn(
                        "mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all",
                        task.status === "done"
                          ? "bg-green-500 border-green-500 text-white"
                          : "border-border hover:border-primary"
                      )}
                      data-testid={`button-task-complete-${task.id}`}
                    >
                      {task.status === "done" && <CheckSquare size={11} />}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className={cn("text-sm font-medium", task.status === "done" && "line-through text-muted-foreground")}>
                          {task.title}
                        </p>
                        <span className={cn("text-xs px-1.5 py-0.5 rounded-full font-medium border", STATUS_STYLES[task.status as TaskStatus])}>
                          {STATUS_LABELS[task.status as TaskStatus]}
                        </span>
                        <span className={cn("text-xs px-1.5 py-0.5 rounded-full font-medium", PRIORITY_STYLES[task.priority as Priority])}>
                          {task.priority}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground flex-wrap">
                        {project && (
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: project.color }} />
                            {project.name}
                          </span>
                        )}
                        {assignee && <span>Assigned to {assignee.name}</span>}
                        {task.dueDate && (
                          <span className="flex items-center gap-1">
                            <Clock size={11} />
                            {new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <Select
                        value={task.status}
                        onValueChange={v => handleStatusChange(task.id, v as TaskStatus)}
                      >
                        <SelectTrigger className="h-7 w-32 text-xs" data-testid={`select-task-status-${task.id}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todo">To Do</SelectItem>
                          <SelectItem value="in_progress">In Progress</SelectItem>
                          <SelectItem value="done">Done</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                        onClick={() => handleDelete(task.id)}
                        data-testid={`button-delete-task-${task.id}`}
                      >
                        <Trash2 size={13} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="py-16 text-center">
          <CheckSquare size={40} className="mx-auto text-muted-foreground mb-3" />
          <p className="font-semibold">No tasks found</p>
          <p className="text-sm text-muted-foreground mt-1">
            {filterStatus !== "all" ? "Try a different filter" : "Create your first task"}
          </p>
          {filterStatus === "all" && (
            <Button className="mt-4" onClick={() => setShowCreate(true)}>
              <Plus size={16} className="mr-1.5" />
              New Task
            </Button>
          )}
        </div>
      )}

      <Dialog open={showCreate} onOpenChange={v => !v && setShowCreate(false)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>New Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Title</Label>
              <Input className="mt-1" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Task title" data-testid="input-new-task-title" />
            </div>
            <div>
              <Label>Description</Label>
              <Input className="mt-1" value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Optional" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Status</Label>
                <Select value={form.status} onValueChange={v => setForm(p => ({ ...p, status: v as TaskStatus }))}>
                  <SelectTrigger className="mt-1" data-testid="select-new-task-status"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Priority</Label>
                <Select value={form.priority} onValueChange={v => setForm(p => ({ ...p, priority: v as Priority }))}>
                  <SelectTrigger className="mt-1" data-testid="select-new-task-priority"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Project</Label>
                <Select value={form.projectId} onValueChange={v => setForm(p => ({ ...p, projectId: v }))}>
                  <SelectTrigger className="mt-1" data-testid="select-new-task-project"><SelectValue placeholder="None" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    {projects?.map(p => <SelectItem key={p.id} value={String(p.id)}>{p.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Assignee</Label>
                <Select value={form.assigneeId} onValueChange={v => setForm(p => ({ ...p, assigneeId: v }))}>
                  <SelectTrigger className="mt-1" data-testid="select-new-task-assignee"><SelectValue placeholder="None" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    {members?.map(m => <SelectItem key={m.id} value={String(m.id)}>{m.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Due Date</Label>
              <Input type="date" className="mt-1" value={form.dueDate} onChange={e => setForm(p => ({ ...p, dueDate: e.target.value }))} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
            <Button onClick={handleCreate} disabled={!form.title || createTask.isPending} data-testid="button-create-task">
              {createTask.isPending ? "Creating..." : "Create Task"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
