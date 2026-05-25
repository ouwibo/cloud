import { useState } from "react";
import {
  useListTasks, getListTasksQueryKey,
  useCreateTask, useUpdateTask, useDeleteTask,
  useListProjects, useListMembers,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, CheckSquare, Trash2, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type TaskStatus = "todo" | "in_progress" | "done";
type Priority   = "low" | "medium" | "high";
type FilterStatus = "all" | TaskStatus;

const MONO    = "'Space Mono', monospace";
const DISPLAY = "'Unbounded', sans-serif";

const STATUS_BG: Record<TaskStatus, string> = {
  todo: "#b8d8f0", in_progress: "#f0e0a0", done: "#b8e8c8",
};
const PRIORITY_BG: Record<Priority, string> = { low: "#c8dcc0", medium: "#f0e0a0", high: "#f0c4a8" };

interface TaskFormData {
  title: string; description: string; status: TaskStatus; priority: Priority;
  projectId: string; assigneeId: string; dueDate: string;
}
const DEFAULT_FORM: TaskFormData = { title: "", description: "", status: "todo", priority: "medium", projectId: "", assigneeId: "", dueDate: "" };

const FILTER_BUTTONS: { label: string; value: FilterStatus }[] = [
  { label: "All", value: "all" }, { label: "To Do", value: "todo" },
  { label: "In Progress", value: "in_progress" }, { label: "Done", value: "done" },
];

export default function TasksPage() {
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState<TaskFormData>(DEFAULT_FORM);

  const qKey = filter === "all" ? getListTasksQueryKey() : getListTasksQueryKey({ status: filter });
  const { data: tasks, isLoading } = useListTasks(
    filter === "all" ? undefined : { status: filter },
    { query: { queryKey: qKey } }
  );
  const { data: projects } = useListProjects();
  const { data: members }  = useListMembers();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const deleteTask  = useDeleteTask();

  function handleCreate() {
    createTask.mutate(
      { data: { title: form.title, description: form.description || undefined, status: form.status, priority: form.priority, projectId: form.projectId ? parseInt(form.projectId) : undefined, assigneeId: form.assigneeId ? parseInt(form.assigneeId) : undefined, dueDate: form.dueDate || undefined } },
      {
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: getListTasksQueryKey() }); setShowCreate(false); setForm(DEFAULT_FORM); toast({ title: "Task created" }); },
        onError: () => toast({ title: "Failed to create task", variant: "destructive" }),
      }
    );
  }

  function handleStatusChange(taskId: number, status: TaskStatus) {
    updateTask.mutate({ id: taskId, data: { status } }, { onSuccess: () => queryClient.invalidateQueries({ queryKey: getListTasksQueryKey() }) });
  }

  function handleDelete(taskId: number) {
    deleteTask.mutate({ id: taskId }, {
      onSuccess: () => { queryClient.invalidateQueries({ queryKey: getListTasksQueryKey() }); toast({ title: "Task deleted" }); },
    });
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-foreground mb-1" style={{ fontFamily: DISPLAY, fontSize: "1.5rem", fontWeight: 700, lineHeight: 1.15 }}>Tasks</h1>
          <p className="text-muted-foreground" style={{ fontFamily: MONO, fontSize: "0.7rem" }}>{tasks?.length ?? 0} tasks</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-full hover:-translate-y-px transition-all"
          style={{ border: "2px solid hsl(var(--border))", boxShadow: "3px 3px 0 hsl(var(--border))", fontFamily: MONO, fontSize: "0.7rem", fontWeight: 700 }}
          data-testid="button-new-task">
          <Plus size={14} /> New Task
        </button>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {FILTER_BUTTONS.map(btn => (
          <button key={btn.value} onClick={() => setFilter(btn.value)}
            className={cn("px-3.5 py-1.5 rounded-full border-2 transition-all", filter === btn.value ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40")}
            style={{ fontFamily: MONO, fontSize: "0.65rem", fontWeight: 700, boxShadow: filter === btn.value ? "2px 2px 0 hsl(var(--border))" : undefined }}
            data-testid={`button-filter-${btn.value}`}>
            {btn.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-2">{Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-16 w-full rounded-2xl" />)}</div>
      ) : tasks && tasks.length > 0 ? (
        <div className="space-y-2">
          {tasks.map(task => {
            const assignee = members?.find(m => m.id === task.assigneeId);
            const project  = projects?.find(p => p.id === task.projectId);
            return (
              <div key={task.id} className="neo-card p-4 group flex items-start gap-3" data-testid={`task-row-${task.id}`}>
                {/* Status dot */}
                <button
                  onClick={() => handleStatusChange(task.id, task.status === "done" ? "todo" : "done")}
                  className="mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all"
                  style={{ borderColor: task.status === "done" ? "#10b981" : "hsl(var(--border))", backgroundColor: task.status === "done" ? "#10b981" : "transparent" }}
                  data-testid={`button-task-complete-${task.id}`}>
                  {task.status === "done" && <CheckSquare size={11} color="white" />}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className={cn("text-sm font-medium", task.status === "done" && "line-through text-muted-foreground")}>{task.title}</p>
                    <span className="px-2 py-0.5 rounded-full border-2 border-foreground/20 text-foreground/70"
                      style={{ backgroundColor: STATUS_BG[task.status as TaskStatus], fontFamily: MONO, fontSize: "0.58rem", fontWeight: 700 }}>
                      {task.status.replace("_", " ")}
                    </span>
                    <span className="px-2 py-0.5 rounded-full border-2 border-foreground/15 text-foreground/60"
                      style={{ backgroundColor: PRIORITY_BG[task.priority as Priority], fontFamily: MONO, fontSize: "0.58rem", fontWeight: 700 }}>
                      {task.priority}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 flex-wrap" style={{ fontFamily: MONO, fontSize: "0.6rem" }}>
                    {project && (
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: project.color }} />{project.name}
                      </span>
                    )}
                    {assignee && <span className="text-muted-foreground">{assignee.name}</span>}
                    {task.dueDate && (
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Clock size={10} />{new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Select value={task.status} onValueChange={v => handleStatusChange(task.id, v as TaskStatus)}>
                    <SelectTrigger className="h-7 w-32 text-xs rounded-xl border-2 border-border" style={{ fontFamily: MONO, fontSize: "0.62rem" }}
                      data-testid={`select-task-status-${task.id}`}><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todo">To Do</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="done">Done</SelectItem>
                    </SelectContent>
                  </Select>
                  <button onClick={() => handleDelete(task.id)}
                    className="w-7 h-7 rounded-xl border-2 border-foreground/10 text-muted-foreground hover:text-red-500 hover:border-red-500/30 transition-all opacity-0 group-hover:opacity-100"
                    data-testid={`button-delete-task-${task.id}`}><Trash2 size={13} /></button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-16 text-center rounded-2xl border-2 border-dashed border-border">
          <CheckSquare size={40} className="mx-auto text-muted-foreground mb-3" />
          <p className="font-bold mb-1" style={{ fontFamily: DISPLAY, fontSize: "0.9rem" }}>No tasks found</p>
          <p className="text-muted-foreground mb-5" style={{ fontFamily: MONO, fontSize: "0.7rem" }}>
            {filter !== "all" ? "Try a different filter" : "Create your first task"}
          </p>
          {filter === "all" && (
            <button onClick={() => setShowCreate(true)}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full"
              style={{ border: "2px solid hsl(var(--border))", boxShadow: "3px 3px 0 hsl(var(--border))", fontFamily: MONO, fontSize: "0.7rem", fontWeight: 700 }}>
              <Plus size={14} /> New Task
            </button>
          )}
        </div>
      )}

      {/* Create Dialog */}
      <Dialog open={showCreate} onOpenChange={v => !v && setShowCreate(false)}>
        <DialogContent className="sm:max-w-md" style={{ border: "2px solid hsl(var(--border))", boxShadow: "6px 6px 0 hsl(var(--border))", borderRadius: "18px" }}>
          <DialogHeader><DialogTitle style={{ fontFamily: DISPLAY, fontSize: "1rem" }}>New Task</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label style={{ fontFamily: MONO, fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase" }}>Title</Label>
              <Input className="mt-1" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Task title"
                data-testid="input-new-task-title" style={{ border: "2px solid hsl(var(--border))", borderRadius: "12px" }} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label style={{ fontFamily: MONO, fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase" }}>Status</Label>
                <Select value={form.status} onValueChange={v => setForm(p => ({ ...p, status: v as TaskStatus }))}>
                  <SelectTrigger className="mt-1" style={{ border: "2px solid hsl(var(--border))", borderRadius: "12px" }} data-testid="select-new-task-status"><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="todo">To Do</SelectItem><SelectItem value="in_progress">In Progress</SelectItem><SelectItem value="done">Done</SelectItem></SelectContent>
                </Select>
              </div>
              <div>
                <Label style={{ fontFamily: MONO, fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase" }}>Priority</Label>
                <Select value={form.priority} onValueChange={v => setForm(p => ({ ...p, priority: v as Priority }))}>
                  <SelectTrigger className="mt-1" style={{ border: "2px solid hsl(var(--border))", borderRadius: "12px" }} data-testid="select-new-task-priority"><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="low">Low</SelectItem><SelectItem value="medium">Medium</SelectItem><SelectItem value="high">High</SelectItem></SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label style={{ fontFamily: MONO, fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase" }}>Project</Label>
                <Select value={form.projectId} onValueChange={v => setForm(p => ({ ...p, projectId: v }))}>
                  <SelectTrigger className="mt-1" style={{ border: "2px solid hsl(var(--border))", borderRadius: "12px" }} data-testid="select-new-task-project"><SelectValue placeholder="None" /></SelectTrigger>
                  <SelectContent><SelectItem value="">None</SelectItem>{projects?.map(p => <SelectItem key={p.id} value={String(p.id)}>{p.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label style={{ fontFamily: MONO, fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase" }}>Assignee</Label>
                <Select value={form.assigneeId} onValueChange={v => setForm(p => ({ ...p, assigneeId: v }))}>
                  <SelectTrigger className="mt-1" style={{ border: "2px solid hsl(var(--border))", borderRadius: "12px" }} data-testid="select-new-task-assignee"><SelectValue placeholder="None" /></SelectTrigger>
                  <SelectContent><SelectItem value="">None</SelectItem>{members?.map(m => <SelectItem key={m.id} value={String(m.id)}>{m.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label style={{ fontFamily: MONO, fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase" }}>Due Date</Label>
              <Input type="date" className="mt-1" value={form.dueDate} onChange={e => setForm(p => ({ ...p, dueDate: e.target.value }))}
                style={{ border: "2px solid hsl(var(--border))", borderRadius: "12px" }} />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <button onClick={() => setShowCreate(false)}
              className="px-4 py-2 rounded-full border-2 border-border text-foreground hover:bg-muted transition-all"
              style={{ fontFamily: MONO, fontSize: "0.7rem", fontWeight: 700 }}>Cancel</button>
            <button onClick={handleCreate} disabled={!form.title || createTask.isPending}
              className="px-4 py-2 rounded-full bg-primary text-primary-foreground border-2 border-border hover:-translate-y-px transition-all disabled:opacity-50"
              style={{ fontFamily: MONO, fontSize: "0.7rem", fontWeight: 700, boxShadow: "3px 3px 0 hsl(var(--border))" }}
              data-testid="button-create-task">
              {createTask.isPending ? "Creating…" : "Create Task"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
