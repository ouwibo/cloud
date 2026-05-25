import { useState } from "react";
import { Link } from "wouter";
import {
  useListProjects,
  getListProjectsQueryKey,
  useCreateProject,
  useUpdateProject,
  useDeleteProject,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, Pencil, FolderKanban, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type ProjectStatus = "planning" | "active" | "on_hold" | "completed";

const STATUS_LABELS: Record<ProjectStatus, string> = {
  planning: "Planning",
  active: "Active",
  on_hold: "On Hold",
  completed: "Completed",
};

const STATUS_COLORS: Record<ProjectStatus, string> = {
  planning: "#f0e0a0",
  active:   "#b8e8c8",
  on_hold:  "#f0c4a8",
  completed:"#d4c0f0",
};

const PROJECT_COLORS = [
  "#d95c38","#3b82f6","#10b981","#8b5cf6","#f59e0b",
  "#ec4899","#06b6d4","#f97316","#14b8a6","#a855f7",
];

interface ProjectFormData {
  name: string; description: string; status: ProjectStatus; color: string; dueDate: string;
}
const DEFAULT_FORM: ProjectFormData = { name: "", description: "", status: "planning", color: "#d95c38", dueDate: "" };

const MONO = "'Space Mono', monospace";
const DISPLAY = "'Unbounded', sans-serif";

function NeoBtn({ children, onClick, variant = "primary", disabled, testId }: { children: React.ReactNode; onClick?: () => void; variant?: "primary" | "outline" | "ghost"; disabled?: boolean; testId?: string }) {
  const base = "inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all active:translate-y-px cursor-pointer";
  const styles = {
    primary: "bg-primary text-primary-foreground border-2 border-border hover:-translate-y-px",
    outline: "bg-transparent text-foreground border-2 border-border hover:bg-muted hover:-translate-y-px",
    ghost: "bg-transparent text-muted-foreground border-2 border-transparent hover:border-border hover:text-foreground",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      data-testid={testId}
      className={cn(base, styles[variant], disabled && "opacity-50 pointer-events-none")}
      style={{ fontFamily: MONO, fontSize: "0.7rem", boxShadow: variant === "primary" ? "3px 3px 0 hsl(var(--border))" : undefined }}
    >
      {children}
    </button>
  );
}

function ProjectDialog({ open, onClose, form, setForm, onSubmit, isPending, mode }: {
  open: boolean; onClose: () => void; form: ProjectFormData; setForm: (v: ProjectFormData) => void;
  onSubmit: () => void; isPending: boolean; mode: "create" | "edit";
}) {
  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="sm:max-w-md" style={{ border: "2px solid hsl(var(--border))", boxShadow: "6px 6px 0 hsl(var(--border))", borderRadius: "18px" }}>
        <DialogHeader>
          <DialogTitle style={{ fontFamily: DISPLAY, fontSize: "1rem" }}>
            {mode === "create" ? "New Project" : "Edit Project"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div>
            <Label style={{ fontFamily: MONO, fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase" }}>Name</Label>
            <Input className="mt-1" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Project name" data-testid="input-project-name"
              style={{ border: "2px solid hsl(var(--border))", borderRadius: "12px" }} />
          </div>
          <div>
            <Label style={{ fontFamily: MONO, fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase" }}>Description</Label>
            <Input className="mt-1" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Optional"
              style={{ border: "2px solid hsl(var(--border))", borderRadius: "12px" }} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label style={{ fontFamily: MONO, fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase" }}>Status</Label>
              <Select value={form.status} onValueChange={v => setForm({ ...form, status: v as ProjectStatus })}>
                <SelectTrigger className="mt-1" style={{ border: "2px solid hsl(var(--border))", borderRadius: "12px" }} data-testid="select-project-status"><SelectValue /></SelectTrigger>
                <SelectContent>{Object.entries(STATUS_LABELS).map(([v, l]) => <SelectItem key={v} value={v}>{l}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <Label style={{ fontFamily: MONO, fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase" }}>Due Date</Label>
              <Input type="date" className="mt-1" value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })}
                style={{ border: "2px solid hsl(var(--border))", borderRadius: "12px" }} />
            </div>
          </div>
          <div>
            <Label style={{ fontFamily: MONO, fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase" }}>Accent Color</Label>
            <div className="flex gap-2 mt-2 flex-wrap">
              {PROJECT_COLORS.map(c => (
                <button key={c} onClick={() => setForm({ ...form, color: c })}
                  className={cn("w-7 h-7 rounded-full border-2 transition-all", form.color === c ? "border-foreground scale-110" : "border-foreground/20 hover:scale-105")}
                  style={{ backgroundColor: c, boxShadow: form.color === c ? "2px 2px 0 hsl(var(--foreground))" : undefined }} />
              ))}
            </div>
          </div>
        </div>
        <DialogFooter className="gap-2">
          <NeoBtn variant="outline" onClick={onClose}>Cancel</NeoBtn>
          <NeoBtn onClick={onSubmit} disabled={!form.name || isPending} testId="button-project-submit">
            {isPending ? "Saving…" : mode === "create" ? "Create" : "Save"}
          </NeoBtn>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function ProjectsPage() {
  const { data: projects, isLoading } = useListProjects();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();

  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState<ProjectFormData>(DEFAULT_FORM);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<ProjectFormData>(DEFAULT_FORM);

  function handleCreate() {
    createProject.mutate(
      { data: { name: createForm.name, description: createForm.description || undefined, status: createForm.status, color: createForm.color, dueDate: createForm.dueDate || undefined } },
      {
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: getListProjectsQueryKey() }); setShowCreate(false); setCreateForm(DEFAULT_FORM); toast({ title: "Project created!" }); },
        onError: () => toast({ title: "Failed to create", variant: "destructive" }),
      }
    );
  }

  function handleEdit() {
    if (!editingId) return;
    updateProject.mutate(
      { id: editingId, data: { name: editForm.name, description: editForm.description || undefined, status: editForm.status, color: editForm.color, dueDate: editForm.dueDate || undefined } },
      {
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: getListProjectsQueryKey() }); setEditingId(null); toast({ title: "Project updated!" }); },
        onError: () => toast({ title: "Failed to update", variant: "destructive" }),
      }
    );
  }

  function handleDelete(id: number, name: string) {
    deleteProject.mutate({ id }, {
      onSuccess: () => { queryClient.invalidateQueries({ queryKey: getListProjectsQueryKey() }); toast({ title: `"${name}" deleted` }); },
      onError: () => toast({ title: "Failed to delete", variant: "destructive" }),
    });
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-foreground mb-1" style={{ fontFamily: DISPLAY, fontSize: "1.5rem", fontWeight: 700, lineHeight: 1.15 }}>Projects</h1>
          <p className="text-muted-foreground" style={{ fontFamily: MONO, fontSize: "0.7rem" }}>{projects?.length ?? 0} projects total</p>
        </div>
        <NeoBtn onClick={() => setShowCreate(true)} testId="button-new-project"><Plus size={14} /> New Project</NeoBtn>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-52 rounded-2xl" />)}
        </div>
      ) : projects && projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map(project => {
            const statusColor = STATUS_COLORS[project.status as ProjectStatus] ?? "#e2e8f0";
            return (
              <div key={project.id} className="neo-card p-5 flex flex-col group" data-testid={`card-project-${project.id}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl border-2 border-foreground/20 flex items-center justify-center" style={{ backgroundColor: project.color + "33" }}>
                    <FolderKanban size={18} style={{ color: project.color }} />
                  </div>
                  <span className="px-2.5 py-1 rounded-full border-2 border-foreground/25 text-foreground/70"
                    style={{ backgroundColor: statusColor, fontFamily: MONO, fontSize: "0.58rem", fontWeight: 700 }}>
                    {STATUS_LABELS[project.status as ProjectStatus]}
                  </span>
                </div>

                <p className="text-foreground mb-1" style={{ fontFamily: DISPLAY, fontSize: "0.88rem", fontWeight: 700 }}>{project.name}</p>
                {project.description && <p className="text-muted-foreground text-xs mb-4 flex-1 line-clamp-2">{project.description}</p>}

                <div className="mt-auto">
                  <div className="flex justify-between mb-1.5">
                    <span className="text-foreground/50" style={{ fontFamily: MONO, fontSize: "0.58rem" }}>Progress</span>
                    <span className="text-foreground font-bold" style={{ fontFamily: MONO, fontSize: "0.65rem" }}>{project.progress}%</span>
                  </div>
                  <div className="h-2.5 bg-foreground/10 rounded-full border-2 border-foreground/15 overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${project.progress}%`, backgroundColor: project.color }} />
                  </div>
                  {project.dueDate && (
                    <p className="mt-2 text-foreground/40" style={{ fontFamily: MONO, fontSize: "0.58rem" }}>
                      Due {new Date(project.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 mt-4 pt-3 border-t-2 border-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link href={`/projects/${project.id}`}
                    className="flex items-center gap-1.5 flex-1 justify-center py-1.5 rounded-xl border-2 border-foreground/15 text-foreground/70 hover:text-foreground hover:border-foreground/40 transition-all"
                    style={{ fontFamily: MONO, fontSize: "0.62rem", fontWeight: 700 }}
                    data-testid={`link-project-detail-${project.id}`}>
                    View <ArrowRight size={11} />
                  </Link>
                  <button onClick={() => { setEditingId(project.id); setEditForm({ name: project.name, description: project.description ?? "", status: project.status as ProjectStatus, color: project.color, dueDate: project.dueDate ?? "" }); }}
                    className="p-1.5 rounded-xl border-2 border-foreground/15 text-foreground/60 hover:text-foreground hover:border-foreground/40 transition-all"
                    data-testid={`button-edit-project-${project.id}`}><Pencil size={12} /></button>
                  <button onClick={() => handleDelete(project.id, project.name)}
                    className="p-1.5 rounded-xl border-2 border-foreground/15 text-foreground/60 hover:text-red-500 hover:border-red-500/40 transition-all"
                    data-testid={`button-delete-project-${project.id}`}><Trash2 size={12} /></button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-20 text-center rounded-2xl border-2 border-dashed border-border">
          <FolderKanban size={40} className="mx-auto text-muted-foreground mb-3" />
          <p className="font-bold mb-1" style={{ fontFamily: DISPLAY, fontSize: "0.9rem" }}>No projects yet</p>
          <p className="text-muted-foreground mb-5" style={{ fontFamily: MONO, fontSize: "0.7rem" }}>Create your first project</p>
          <NeoBtn onClick={() => setShowCreate(true)}><Plus size={14} /> New Project</NeoBtn>
        </div>
      )}

      <ProjectDialog open={showCreate} onClose={() => setShowCreate(false)} form={createForm} setForm={setCreateForm} onSubmit={handleCreate} isPending={createProject.isPending} mode="create" />
      {editingId !== null && <ProjectDialog open={true} onClose={() => setEditingId(null)} form={editForm} setForm={setEditForm} onSubmit={handleEdit} isPending={updateProject.isPending} mode="edit" />}
    </div>
  );
}
