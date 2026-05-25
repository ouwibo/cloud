import { useParams, Link } from "wouter";
import {
  useGetProject,
  getGetProjectQueryKey,
  useListTasks,
  getListTasksQueryKey,
  useCreateTask,
  useUpdateTask,
  useDeleteTask,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Plus, CheckSquare, Clock, AlertCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useState } from "react";

type TaskStatus = "todo" | "in_progress" | "done";
type Priority = "low" | "medium" | "high";

const STATUS_STYLES: Record<TaskStatus, string> = {
  todo: "bg-muted text-muted-foreground",
  in_progress: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  done: "bg-green-500/10 text-green-600 dark:text-green-400",
};

const PRIORITY_STYLES: Record<Priority, string> = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  high: "bg-red-500/10 text-red-600 dark:text-red-400",
};

interface TaskFormData {
  title: string;
  status: TaskStatus;
  priority: Priority;
  dueDate: string;
}

const DEFAULT_TASK: TaskFormData = { title: "", status: "todo", priority: "medium", dueDate: "" };

export default function ProjectDetailPage() {
  const params = useParams<{ id: string }>();
  const id = parseInt(params.id, 10);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: project, isLoading: projectLoading } = useGetProject(id, {
    query: { enabled: !!id, queryKey: getGetProjectQueryKey(id) },
  });
  const { data: tasks, isLoading: tasksLoading } = useListTasks(
    { projectId: id },
    { query: { enabled: !!id, queryKey: getListTasksQueryKey({ projectId: id }) } }
  );

  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState<TaskFormData>(DEFAULT_TASK);

  function handleCreateTask() {
    createTask.mutate(
      { data: { title: form.title, status: form.status, priority: form.priority, projectId: id, dueDate: form.dueDate || undefined } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListTasksQueryKey({ projectId: id }) });
          setShowCreate(false);
          setForm(DEFAULT_TASK);
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
        onSuccess: () => queryClient.invalidateQueries({ queryKey: getListTasksQueryKey({ projectId: id }) }),
      }
    );
  }

  function handleDelete(taskId: number) {
    deleteTask.mutate(
      { id: taskId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListTasksQueryKey({ projectId: id }) });
          toast({ title: "Task deleted" });
        },
      }
    );
  }

  const todoTasks = tasks?.filter(t => t.status === "todo") ?? [];
  const inProgressTasks = tasks?.filter(t => t.status === "in_progress") ?? [];
  const doneTasks = tasks?.filter(t => t.status === "done") ?? [];

  function TaskCard({ task }: { task: NonNullable<typeof tasks>[0] }) {
    return (
      <div
        className="group bg-card border border-card-border rounded-lg p-3.5 hover:shadow-sm transition-all duration-150"
        data-testid={`task-card-${task.id}`}
      >
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium leading-snug flex-1">{task.title}</p>
          <button
            onClick={() => handleDelete(task.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
            data-testid={`button-delete-task-${task.id}`}
          >
            <Trash2 size={13} />
          </button>
        </div>
        <div className="flex items-center gap-1.5 mt-2">
          <span className={cn("text-xs px-1.5 py-0.5 rounded-full font-medium", PRIORITY_STYLES[task.priority as Priority])}>
            {task.priority}
          </span>
          {task.dueDate && (
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock size={10} />
              {new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </span>
          )}
        </div>
        <div className="flex gap-1.5 mt-2.5">
          {(["todo", "in_progress", "done"] as TaskStatus[]).map(s => (
            <button
              key={s}
              onClick={() => handleStatusChange(task.id, s)}
              className={cn(
                "text-xs px-2 py-0.5 rounded-full transition-all",
                task.status === s ? STATUS_STYLES[s] + " font-semibold" : "text-muted-foreground hover:bg-muted"
              )}
              data-testid={`button-task-status-${task.id}-${s}`}
            >
              {s === "in_progress" ? "In Progress" : s === "todo" ? "To Do" : "Done"}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
          <Link href="/projects">
            <ArrowLeft size={16} />
          </Link>
        </Button>
        {projectLoading ? (
          <Skeleton className="h-8 w-48" />
        ) : project ? (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg" style={{ backgroundColor: project.color + "33" }}>
              <div className="w-full h-full rounded-lg flex items-center justify-center" style={{ color: project.color }}>
                <CheckSquare size={18} />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold">{project.name}</h1>
              {project.description && <p className="text-sm text-muted-foreground">{project.description}</p>}
            </div>
            <Badge className={cn("ml-2", STATUS_STYLES[project.status as TaskStatus])}>
              {project.status.replace("_", " ")}
            </Badge>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-muted-foreground">
            <AlertCircle size={16} />
            <span>Project not found</span>
          </div>
        )}
      </div>

      {project && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{tasks?.length ?? 0} tasks</span>
            <span>Progress: <strong className="text-foreground">{project.progress}%</strong></span>
            {project.dueDate && (
              <span>Due: <strong className="text-foreground">{new Date(project.dueDate).toLocaleDateString()}</strong></span>
            )}
          </div>
          <Button size="sm" onClick={() => setShowCreate(true)} data-testid="button-add-task">
            <Plus size={14} className="mr-1.5" />
            Add Task
          </Button>
        </div>
      )}

      {/* Kanban columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "To Do", tasks: todoTasks, status: "todo" as TaskStatus, icon: Clock, color: "text-muted-foreground" },
          { label: "In Progress", tasks: inProgressTasks, status: "in_progress" as TaskStatus, icon: AlertCircle, color: "text-blue-500" },
          { label: "Done", tasks: doneTasks, status: "done" as TaskStatus, icon: CheckSquare, color: "text-green-500" },
        ].map(col => (
          <div key={col.status} className="space-y-3">
            <div className="flex items-center gap-2 px-1">
              <col.icon size={15} className={col.color} />
              <span className="text-sm font-semibold">{col.label}</span>
              <span className="text-xs text-muted-foreground ml-auto bg-muted rounded-full px-2 py-0.5">{col.tasks.length}</span>
            </div>
            {tasksLoading ? (
              Array.from({ length: 2 }).map((_, i) => <Skeleton key={i} className="h-20 w-full rounded-lg" />)
            ) : col.tasks.length > 0 ? (
              col.tasks.map(task => <TaskCard key={task.id} task={task} />)
            ) : (
              <div className="border-2 border-dashed border-border rounded-lg p-4 text-center text-xs text-muted-foreground">
                No tasks
              </div>
            )}
          </div>
        ))}
      </div>

      <Dialog open={showCreate} onOpenChange={v => !v && setShowCreate(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Title</Label>
              <Input className="mt-1" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Task title" data-testid="input-task-title" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Status</Label>
                <Select value={form.status} onValueChange={v => setForm(p => ({ ...p, status: v as TaskStatus }))}>
                  <SelectTrigger className="mt-1" data-testid="select-task-status"><SelectValue /></SelectTrigger>
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
                  <SelectTrigger className="mt-1" data-testid="select-task-priority"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Due Date</Label>
              <Input type="date" className="mt-1" value={form.dueDate} onChange={e => setForm(p => ({ ...p, dueDate: e.target.value }))} data-testid="input-task-due-date" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
            <Button onClick={handleCreateTask} disabled={!form.title || createTask.isPending} data-testid="button-create-task-submit">
              {createTask.isPending ? "Creating..." : "Create Task"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
