import { useState } from "react";
import {
  useListMembers,
  getListMembersQueryKey,
  useCreateMember,
  useUpdateMember,
  useDeleteMember,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, Pencil, Users, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const AVATAR_COLORS = ["#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#ec4899", "#3b82f6", "#f97316"];

interface MemberFormData {
  name: string;
  role: string;
  email: string;
  avatarColor: string;
}

const DEFAULT_FORM: MemberFormData = { name: "", role: "", email: "", avatarColor: "#8b5cf6" };

function MemberFormDialog({
  open,
  onClose,
  initial,
  onSubmit,
  isPending,
  mode,
}: {
  open: boolean;
  onClose: () => void;
  initial: MemberFormData;
  onSubmit: (data: MemberFormData) => void;
  isPending: boolean;
  mode: "create" | "edit";
}) {
  const [form, setForm] = useState<MemberFormData>(initial);

  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Add Member" : "Edit Member"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div>
            <Label>Name</Label>
            <Input className="mt-1" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Full name" data-testid="input-member-name" />
          </div>
          <div>
            <Label>Role</Label>
            <Input className="mt-1" value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))} placeholder="e.g. Designer, Engineer" data-testid="input-member-role" />
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" className="mt-1" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="email@company.com" data-testid="input-member-email" />
          </div>
          <div>
            <Label>Avatar Color</Label>
            <div className="flex gap-2 mt-2 flex-wrap">
              {AVATAR_COLORS.map(c => (
                <button
                  key={c}
                  className={cn(
                    "w-7 h-7 rounded-full border-2 transition-all",
                    form.avatarColor === c ? "border-foreground scale-110" : "border-transparent hover:scale-105"
                  )}
                  style={{ backgroundColor: c }}
                  onClick={() => setForm(p => ({ ...p, avatarColor: c }))}
                  data-testid={`button-avatar-color-${c}`}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: form.avatarColor }}
            >
              {form.name ? form.name.charAt(0).toUpperCase() : "?"}
            </div>
            <div>
              <p className="text-sm font-medium">{form.name || "Preview"}</p>
              <p className="text-xs text-muted-foreground">{form.role || "Role"}</p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={() => onSubmit(form)} disabled={!form.name || !form.role || !form.email || isPending} data-testid="button-member-submit">
            {isPending ? "Saving..." : mode === "create" ? "Add Member" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function MembersPage() {
  const { data: members, isLoading } = useListMembers();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createMember = useCreateMember();
  const updateMember = useUpdateMember();
  const deleteMember = useDeleteMember();

  const [showCreate, setShowCreate] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<MemberFormData>(DEFAULT_FORM);

  function handleCreate(form: MemberFormData) {
    createMember.mutate(
      { data: { name: form.name, role: form.role, email: form.email, avatarColor: form.avatarColor } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListMembersQueryKey() });
          setShowCreate(false);
          toast({ title: "Member added" });
        },
        onError: () => toast({ title: "Failed to add member", variant: "destructive" }),
      }
    );
  }

  function handleEdit(form: MemberFormData) {
    if (!editingId) return;
    updateMember.mutate(
      { id: editingId, data: { name: form.name, role: form.role, email: form.email, avatarColor: form.avatarColor } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListMembersQueryKey() });
          setEditingId(null);
          toast({ title: "Member updated" });
        },
        onError: () => toast({ title: "Failed to update", variant: "destructive" }),
      }
    );
  }

  function handleDelete(id: number, name: string) {
    deleteMember.mutate(
      { id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListMembersQueryKey() });
          toast({ title: `${name} removed from team` });
        },
        onError: () => toast({ title: "Failed to remove", variant: "destructive" }),
      }
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Team Members</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{members?.length ?? 0} members</p>
        </div>
        <Button onClick={() => setShowCreate(true)} data-testid="button-add-member">
          <Plus size={16} className="mr-1.5" />
          Add Member
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}><CardContent className="p-5"><Skeleton className="h-24 w-full" /></CardContent></Card>
          ))}
        </div>
      ) : members && members.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map(member => (
            <Card key={member.id} className="group transition-all duration-200 hover:shadow-md" data-testid={`card-member-${member.id}`}>
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-base shrink-0"
                    style={{ backgroundColor: member.avatarColor }}
                  >
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate" data-testid={`text-member-name-${member.id}`}>{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                    <div className="flex items-center gap-1 mt-1.5">
                      <Mail size={11} className="text-muted-foreground shrink-0" />
                      <p className="text-xs text-muted-foreground truncate">{member.email}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 h-7 text-xs"
                    onClick={() => {
                      setEditingId(member.id);
                      setEditForm({ name: member.name, role: member.role, email: member.email, avatarColor: member.avatarColor });
                    }}
                    data-testid={`button-edit-member-${member.id}`}
                  >
                    <Pencil size={11} className="mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 h-7 text-xs text-destructive hover:text-destructive"
                    onClick={() => handleDelete(member.id, member.name)}
                    data-testid={`button-delete-member-${member.id}`}
                  >
                    <Trash2 size={11} className="mr-1" />
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <Users size={40} className="mx-auto text-muted-foreground mb-3" />
          <p className="font-semibold">No team members yet</p>
          <p className="text-sm text-muted-foreground mt-1">Add your first team member</p>
          <Button className="mt-4" onClick={() => setShowCreate(true)}>
            <Plus size={16} className="mr-1.5" />
            Add Member
          </Button>
        </div>
      )}

      <MemberFormDialog
        open={showCreate}
        onClose={() => setShowCreate(false)}
        initial={DEFAULT_FORM}
        onSubmit={handleCreate}
        isPending={createMember.isPending}
        mode="create"
      />

      {editingId !== null && (
        <MemberFormDialog
          open={true}
          onClose={() => setEditingId(null)}
          initial={editForm}
          onSubmit={handleEdit}
          isPending={updateMember.isPending}
          mode="edit"
        />
      )}
    </div>
  );
}
