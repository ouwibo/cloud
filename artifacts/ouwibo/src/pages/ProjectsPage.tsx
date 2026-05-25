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
import { Plus, MoreHorizontal, Pencil, Trash2, ExternalLink, FolderKanban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type Status = "active" | "completed" | "on_hold" | "archived";

const STATUS_LABELS: Record<Status, string> = {
  active: "Active",
  completed: "Completed",
  on_hold: "On Hold",
  archived: "Archived",
};

const STATUS_STYLES: Record<Status, string> = {
  active: "bg-green-500/10 text-green-600 dark:text-green-400",
  completed: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  on_hold: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  archived: "bg-muted text-muted-foreground",
};

const PROJECT_COLORS = ["#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#ec4899", "#3b82f6", "#f97316"];

interface ProjectFormData {
  name: string;
  description: string;
  status: Status;
  progress: number;
  color: string;
  dueDate: string;
}

function ProjectFormDialog({
  open,
  onClose,
  initial,
  onSubmit,
  isPending,
  mode,
}: {
  open: boolean;
  onClose: () => void;
  initial: ProjectFormData;
  onSubmit: (data: ProjectFormData) => void;
  isPending: boolean;
  mode: "create" | "edit";
}) {
  const [form, setForm] = useState<ProjectFormData>(initial);

  function set(key: keyof ProjectFormData, val: string | number) {
    setForm(prev => ({ ...prev, [key]: val }));
  }

  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "New Project" : "Edit Project"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div>
            <Label>Name</Label>
            <Input
              className="mt-1"
              value={form.name}
              onChange={e => set("name", e.target.value)}
              placeholder="Project name"
              data-testid="input-project-name"
            />
          </div>
          <div>
            <Label>Description</Label>
            <Input
              className="mt-1"
              value={form.description}
              onChange={e => set("description", e.target.value)}
              placeholder="Optional description"
              data-testid="input-project-description"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Status</Label>
              <Select value={form.status} onValueChange={v => set("status", v)}>
                <SelectTrigger className="mt-1" data-testid="select-project-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="on_hold">On Hold</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Progress ({form.progress}%)</Label>
              <Input
                type="number"
                className="mt-1"
                min={0}
                max={100}
                value={form.progress}
                onChange={e => set("progress", parseInt(e.target.value) || 0)}
                data-testid="input-project-progress"
              />
            </div>
          </div>
          <div>
            <Label>Due Date</Label>
            <Input
              type="date"
              className="mt-1"
              value={form.dueDate}
              onChange={e => set("dueDate", e.target.value)}
              data-testid="input-project-due-date"
            />
          </div>
          <div>
            <Label>Color</Label>
            <div className="flex gap-2 mt-2 flex-wrap">
              {PROJECT_COLORS.map(c => (
                <button
                  key={c}
                  className={cn(
                    "w-7 h-7 rounded-full border-2 transition-all",
                    form.color === c ? "border-foreground scale-110" : "border-transparent hover:scale-105"
                  )}
                  style={{ backgroundColor: c }}
                  onClick={() => set("color", c)}
                  data-testid={`button-color-${c}`}
                />
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={() => onSubmit(form)} disabled={!form.name || isPending} data-testid="button-project-submit">
            {isPending ? "Saving..." : mode === "create" ? "Create" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const DEFAULT_FORM: ProjectFormData = {
  name: "",
  description: "",
  status: "active",
  progress: 0,
  color: "#8b5cf6",
  dueDate: "",
};

export default function ProjectsPage() {
  const { data: projects, isLoading } = useListProjects();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();

  const [showCreate, setShowCreate] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<ProjectFormData>(DEFAULT_FORM);

  function handleCreate(form: ProjectFormData) {
    createProject.mutate(
      { data: { name: form.name, description: form.description, status: form.status, progress: form.progress, color: form.color, dueDate: form.dueDate || undefined } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListProjectsQueryKey() });
          setShowCreate(false);
          toast({ title: "Project created" });
        },
        onError: () => toast({ title: "Failed to create project", variant: "destructive" }),
      }
    );
  }

  function handleEdit(form: ProjectFormData) {
    if (!editingId) return;
    updateProject.mutate(
      { id: editingId, data: { name: form.name, description: form.description, status: form.status, progress: form.progress, color: form.color, dueDate: form.dueDate || undefined } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListProjectsQueryKey() });
          setEditingId(null);
          toast({ title: "Project updated" });
        },
        onError: () => toast({ title: "Failed to update", variant: "destructive" }),
      }
    );
  }

  function handleDelete(id: number, name: string) {
    deleteProject.mutate(
      { id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListProjectsQueryKey() });
          toast({ title: `"${name}" deleted` });
        },
        onError: () => toast({ title: "Failed to delete", variant: "destructive" }),
      }
    );
  }

  const editingProject = editingId ? projects?.find(p => p.id === editingId) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{projects?.length ?? 0} projects total</p>
        </div>
        <Button onClick={() => setShowCreate(true)} data-testid="button-new-project">
          <Plus size={16} className="mr-1.5" />
          New Project
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}><CardContent className="p-5"><Skeleton className="h-32 w-full" /></CardContent></Card>
          ))}
        </div>
      ) : projects && projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map(project => (
            <Card
              key={project.id}
              className="group transition-all duration-200 hover:shadow-md"
              data-testid={`card-project-${project.id}`}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: project.color + "22" }}>
                      <FolderKanban size={18} style={{ color: project.color }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm leading-tight">{project.name}</h3>
                      <span className={cn("text-xs font-medium px-1.5 py-0.5 rounded-full", STATUS_STYLES[project.status as Status])}>
                        {STATUS_LABELS[project.status as Status]}
                      </span>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity" data-testid={`button-project-menu-${project.id}`}>
                        <MoreHorizontal size={15} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/projects/${project.id}`}>
                          <ExternalLink size={14} className="mr-2" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setEditingId(project.id);
                          setEditForm({
                            name: project.name,
                            description: project.description ?? "",
                            status: project.status as Status,
                            progress: project.progress,
                            color: project.color,
                            dueDate: project.dueDate ?? "",
                          });
                        }}
                        data-testid={`button-edit-project-${project.id}`}
                      >
                        <Pencil size={14} className="mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => handleDelete(project.id, project.name)}
                        data-testid={`button-delete-project-${project.id}`}
                      >
                        <Trash2 size={14} className="mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {project.description && (
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{project.description}</p>
                )}

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Progress</span>
                    <span className="font-semibold text-foreground">{project.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${project.progress}%`, backgroundColor: project.color }}
                    />
                  </div>
                </div>

                {project.dueDate && (
                  <p className="text-xs text-muted-foreground mt-3">
                    Due: {new Date(project.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <FolderKanban size={40} className="mx-auto text-muted-foreground mb-3" />
          <p className="font-semibold">No projects yet</p>
          <p className="text-sm text-muted-foreground mt-1">Create your first project to get started</p>
          <Button className="mt-4" onClick={() => setShowCreate(true)}>
            <Plus size={16} className="mr-1.5" />
            New Project
          </Button>
        </div>
      )}

      <ProjectFormDialog
        open={showCreate}
        onClose={() => setShowCreate(false)}
        initial={DEFAULT_FORM}
        onSubmit={handleCreate}
        isPending={createProject.isPending}
        mode="create"
      />

      {editingProject && (
        <ProjectFormDialog
          open={editingId !== null}
          onClose={() => setEditingId(null)}
          initial={editForm}
          onSubmit={handleEdit}
          isPending={updateProject.isPending}
          mode="edit"
        />
      )}
    </div>
  );
}
