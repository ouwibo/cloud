import { useParams, Link } from "wouter";
import {
  useGetProject, getGetProjectQueryKey,
  useListTasks, getListTasksQueryKey,
  useCreateTask, useUpdateTask, useDeleteTask,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Plus, CheckSquare, Clock, AlertCircle, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useState } from "react";

type TaskStatus = "todo" | "in_progress" | "done";
type Priority   = "low" | "medium" | "high";

const MONO    = "'Space Mono', monospace";
const DISPLAY = "'Unbounded', sans-serif";

const COL_BG: Record<TaskStatus, string> = {
  todo:        "#b8d8f0",
  in_progress: "#f0e0a0",
  done:        "#b8e8c8",
};
const PRIORITY_BG: Record<Priority, string> = { low: "#c8dcc0", medium: "#f0e0a0", high: "#f0c4a8" };

interface TaskFormData { title: string; status: TaskStatus; priority: Priority; dueDate: string; }
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
  const deleteTask  = useDeleteTask();

  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState<TaskFormData>(DEFAULT_TASK);

  function handleCreate() {
    createTask.mutate(
      { data: { title: form.title, status: form.status, priority: form.priority, projectId: id, dueDate: form.dueDate || undefined } },
      {
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: getListTasksQueryKey({ projectId: id }) }); setShowCreate(false); setForm(DEFAULT_TASK); toast({ title: "Task created" }); },
        onError: () => toast({ title: "Failed to create task", variant: "destructive" }),
      }
    );
  }

  function handleStatusChange(taskId: number, status: TaskStatus) {
    updateTask.mutate({ id: taskId, data: { status } }, {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: getListTasksQueryKey({ projectId: id }) }),
    });
  }

  function handleDelete(taskId: number) {
    deleteTask.mutate({ id: taskId }, {
      onSuccess: () => { queryClient.invalidateQueries({ queryKey: getListTasksQueryKey({ projectId: id }) }); toast({ title: "Task deleted" }); },
    });
  }

  const buckets: Record<TaskStatus, NonNullable<typeof tasks>> = {
    todo: tasks?.filter(t => t.status === "todo") ?? [],
    in_progress: tasks?.filter(t => t.status === "in_progress") ?? [],
    done: tasks?.filter(t => t.status === "done") ?? [],
  };

  const COLS: { key: TaskStatus; label: string; icon: typeof Clock }[] = [
    { key: "todo",        label: "To Do",       icon: Clock },
    { key: "in_progress", label: "In Progress",  icon: AlertCircle },
    { key: "done",        label: "Done",         icon: CheckSquare },
  ];

  return (
    <div>
      {/* Back + header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/projects"
          className="w-9 h-9 rounded-xl border-2 border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/60 transition-all"
          style={{ boxShadow: "2px 2px 0 hsl(var(--border))" }}>
          <ArrowLeft size={15} />
        </Link>
        {projectLoading ? <Skeleton className="h-8 w-48 rounded-xl" /> : project ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl border-2 border-foreground/20 flex items-center justify-center" style={{ backgroundColor: project.color + "33", boxShadow: "2px 2px 0 hsl(var(--border))" }}>
              <CheckSquare size={16} style={{ color: project.color }} />
            </div>
            <div>
              <h1 style={{ fontFamily: DISPLAY, fontSize: "1.2rem", fontWeight: 700 }}>{project.name}</h1>
              {project.description && <p className="text-muted-foreground text-xs" style={{ fontFamily: MONO }}>{project.description}</p>}
            </div>
            <span className="px-2.5 py-1 rounded-full border-2 border-foreground/25" style={{ background: "#b8e8c8", fontFamily: MONO, fontSize: "0.6rem", fontWeight: 700 }}>
              {project.status.replace("_", " ")}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-muted-foreground"><AlertCircle size={16} /><span>Project not found</span></div>
        )}
      </div>

      {project && (
        <div className="flex items-center justify-between mb-6 p-4 rounded-2xl border-2 border-border" style={{ boxShadow: "3px 3px 0 hsl(var(--border))" }}>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p style={{ fontFamily: DISPLAY, fontSize: "1.4rem", fontWeight: 700 }}>{project.progress}%</p>
              <p className="text-muted-foreground" style={{ fontFamily: MONO, fontSize: "0.6rem" }}>Progress</p>
            </div>
            <div className="h-10 w-px bg-border" />
            <div className="text-center">
              <p style={{ fontFamily: DISPLAY, fontSize: "1.4rem", fontWeight: 700 }}>{tasks?.length ?? 0}</p>
              <p className="text-muted-foreground" style={{ fontFamily: MONO, fontSize: "0.6rem" }}>Tasks</p>
            </div>
            {project.dueDate && <>
              <div className="h-10 w-px bg-border" />
              <div className="text-center">
                <p style={{ fontFamily: DISPLAY, fontSize: "0.8rem", fontWeight: 700 }}>{new Date(project.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
                <p className="text-muted-foreground" style={{ fontFamily: MONO, fontSize: "0.6rem" }}>Due</p>
              </div>
            </>}
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full hover:-translate-y-px transition-all"
            style={{ border: "2px solid hsl(var(--border))", boxShadow: "3px 3px 0 hsl(var(--border))", fontFamily: MONO, fontSize: "0.7rem", fontWeight: 700 }}
            data-testid="button-add-task">
            <Plus size={13} /> Add Task
          </button>
        </div>
      )}

      {/* Kanban */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {COLS.map(col => (
          <div key={col.key}>
            <div className="flex items-center gap-2 mb-3 px-1">
              <div className="w-5 h-5 rounded-full border-2 border-foreground/20 flex items-center justify-center" style={{ backgroundColor: COL_BG[col.key] }}>
                <col.icon size={11} />
              </div>
              <span style={{ fontFamily: MONO, fontSize: "0.72rem", fontWeight: 700 }}>{col.label}</span>
              <span className="ml-auto px-2 py-0.5 rounded-full border-2 border-foreground/15 text-foreground/60" style={{ fontFamily: MONO, fontSize: "0.58rem", fontWeight: 700 }}>
                {buckets[col.key].length}
              </span>
            </div>
            {tasksLoading ? (
              Array.from({ length: 2 }).map((_, i) => <Skeleton key={i} className="h-20 w-full rounded-2xl mb-2" />)
            ) : buckets[col.key].length > 0 ? (
              <div className="space-y-2">
                {buckets[col.key].map(task => (
                  <div key={task.id} className="neo-card p-4 group" data-testid={`task-card-${task.id}`}>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="text-sm font-medium leading-snug flex-1">{task.title}</p>
                      <button onClick={() => handleDelete(task.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-red-500"
                        data-testid={`button-delete-task-${task.id}`}><Trash2 size={12} /></button>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-full border-2 border-foreground/20 text-foreground/70"
                        style={{ backgroundColor: PRIORITY_BG[task.priority as Priority], fontFamily: MONO, fontSize: "0.58rem", fontWeight: 700 }}>
                        {task.priority}
                      </span>
                      {task.dueDate && (
                        <span className="flex items-center gap-1 text-muted-foreground" style={{ fontFamily: MONO, fontSize: "0.58rem" }}>
                          <Clock size={10} />{new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-1 mt-2.5">
                      {(["todo", "in_progress", "done"] as TaskStatus[]).map(s => (
                        <button key={s} onClick={() => handleStatusChange(task.id, s)}
                          className={cn("flex-1 py-1 rounded-xl border-2 transition-all text-center", task.status === s ? "border-foreground/30 font-bold" : "border-transparent text-muted-foreground hover:border-foreground/15")}
                          style={{ backgroundColor: task.status === s ? COL_BG[s] : undefined, fontFamily: MONO, fontSize: "0.55rem", fontWeight: task.status === s ? 700 : 400 }}
                          data-testid={`button-task-status-${task.id}-${s}`}>
                          {s === "in_progress" ? "WIP" : s === "todo" ? "Todo" : "Done"}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center rounded-2xl border-2 border-dashed border-foreground/15">
                <p className="text-muted-foreground" style={{ fontFamily: MONO, fontSize: "0.65rem" }}>No tasks</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Create task dialog */}
      <Dialog open={showCreate} onOpenChange={v => !v && setShowCreate(false)}>
        <DialogContent style={{ border: "2px solid hsl(var(--border))", boxShadow: "6px 6px 0 hsl(var(--border))", borderRadius: "18px" }}>
          <DialogHeader><DialogTitle style={{ fontFamily: DISPLAY, fontSize: "1rem" }}>Add Task</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label style={{ fontFamily: MONO, fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase" }}>Title</Label>
              <Input className="mt-1" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Task title"
                data-testid="input-task-title" style={{ border: "2px solid hsl(var(--border))", borderRadius: "12px" }} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label style={{ fontFamily: MONO, fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase" }}>Status</Label>
                <Select value={form.status} onValueChange={v => setForm(p => ({ ...p, status: v as TaskStatus }))}>
                  <SelectTrigger className="mt-1" style={{ border: "2px solid hsl(var(--border))", borderRadius: "12px" }} data-testid="select-task-status"><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="todo">To Do</SelectItem><SelectItem value="in_progress">In Progress</SelectItem><SelectItem value="done">Done</SelectItem></SelectContent>
                </Select>
              </div>
              <div>
                <Label style={{ fontFamily: MONO, fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase" }}>Priority</Label>
                <Select value={form.priority} onValueChange={v => setForm(p => ({ ...p, priority: v as Priority }))}>
                  <SelectTrigger className="mt-1" style={{ border: "2px solid hsl(var(--border))", borderRadius: "12px" }} data-testid="select-task-priority"><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="low">Low</SelectItem><SelectItem value="medium">Medium</SelectItem><SelectItem value="high">High</SelectItem></SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label style={{ fontFamily: MONO, fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase" }}>Due Date</Label>
              <Input type="date" className="mt-1" value={form.dueDate} onChange={e => setForm(p => ({ ...p, dueDate: e.target.value }))}
                data-testid="input-task-due-date" style={{ border: "2px solid hsl(var(--border))", borderRadius: "12px" }} />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <button onClick={() => setShowCreate(false)}
              className="px-4 py-2 rounded-full border-2 border-border text-foreground hover:bg-muted transition-all"
              style={{ fontFamily: MONO, fontSize: "0.7rem", fontWeight: 700 }}>Cancel</button>
            <button onClick={handleCreate} disabled={!form.title || createTask.isPending}
              className="px-4 py-2 rounded-full bg-primary text-primary-foreground border-2 border-border hover:-translate-y-px transition-all disabled:opacity-50"
              style={{ fontFamily: MONO, fontSize: "0.7rem", fontWeight: 700, boxShadow: "3px 3px 0 hsl(var(--border))" }}
              data-testid="button-create-task-submit">
              {createTask.isPending ? "Creating…" : "Create Task"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
