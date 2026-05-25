import { useState } from "react";
import {
  useListMembers, getListMembersQueryKey,
  useCreateMember, useUpdateMember, useDeleteMember,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, Pencil, Users, Mail } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const MONO    = "'Space Mono', monospace";
const DISPLAY = "'Unbounded', sans-serif";

const AVATAR_COLORS = ["#d95c38","#3b82f6","#10b981","#8b5cf6","#f59e0b","#ec4899","#06b6d4","#f97316"];
const CARD_PASTELS  = ["#b8e8c8","#f0c4a8","#d4c0f0","#b8d8f0","#f0e0a0","#c8dcc0","#f0c0d8","#b8e8c8"];

interface MemberFormData { name: string; role: string; email: string; avatarColor: string; }
const DEFAULT_FORM: MemberFormData = { name: "", role: "", email: "", avatarColor: "#d95c38" };

function MemberFormDialog({ open, onClose, initial, onSubmit, isPending, mode }: {
  open: boolean; onClose: () => void; initial: MemberFormData;
  onSubmit: (data: MemberFormData) => void; isPending: boolean; mode: "create" | "edit";
}) {
  const [form, setForm] = useState<MemberFormData>(initial);
  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="sm:max-w-md" style={{ border: "2px solid hsl(var(--border))", boxShadow: "6px 6px 0 hsl(var(--border))", borderRadius: "18px" }}>
        <DialogHeader><DialogTitle style={{ fontFamily: DISPLAY, fontSize: "1rem" }}>{mode === "create" ? "Add Member" : "Edit Member"}</DialogTitle></DialogHeader>
        <div className="space-y-4 py-2">
          <div>
            <Label style={{ fontFamily: MONO, fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase" }}>Name</Label>
            <Input className="mt-1" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Full name"
              data-testid="input-member-name" style={{ border: "2px solid hsl(var(--border))", borderRadius: "12px" }} />
          </div>
          <div>
            <Label style={{ fontFamily: MONO, fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase" }}>Role</Label>
            <Input className="mt-1" value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))} placeholder="e.g. Designer, Engineer"
              data-testid="input-member-role" style={{ border: "2px solid hsl(var(--border))", borderRadius: "12px" }} />
          </div>
          <div>
            <Label style={{ fontFamily: MONO, fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase" }}>Email</Label>
            <Input type="email" className="mt-1" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="email@company.com"
              data-testid="input-member-email" style={{ border: "2px solid hsl(var(--border))", borderRadius: "12px" }} />
          </div>
          <div>
            <Label style={{ fontFamily: MONO, fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase" }}>Avatar Color</Label>
            <div className="flex gap-2 mt-2 flex-wrap">
              {AVATAR_COLORS.map(c => (
                <button key={c} onClick={() => setForm(p => ({ ...p, avatarColor: c }))}
                  className={cn("w-7 h-7 rounded-full border-2 transition-all", form.avatarColor === c ? "border-foreground scale-110" : "border-foreground/20 hover:scale-105")}
                  style={{ backgroundColor: c, boxShadow: form.avatarColor === c ? "2px 2px 0 hsl(var(--foreground))" : undefined }} />
              ))}
            </div>
          </div>
          {/* Preview */}
          <div className="flex items-center gap-3 p-3 rounded-xl border-2 border-foreground/15" style={{ backgroundColor: form.avatarColor + "22" }}>
            <div className="w-10 h-10 rounded-full border-2 border-foreground/20 flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: form.avatarColor, fontFamily: DISPLAY, fontSize: "0.9rem" }}>
              {form.name ? form.name.charAt(0).toUpperCase() : "?"}
            </div>
            <div>
              <p style={{ fontFamily: DISPLAY, fontSize: "0.8rem", fontWeight: 700 }}>{form.name || "Preview"}</p>
              <p className="text-muted-foreground" style={{ fontFamily: MONO, fontSize: "0.6rem" }}>{form.role || "Role"}</p>
            </div>
          </div>
        </div>
        <DialogFooter className="gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-full border-2 border-border text-foreground hover:bg-muted transition-all"
            style={{ fontFamily: MONO, fontSize: "0.7rem", fontWeight: 700 }}>Cancel</button>
          <button onClick={() => onSubmit(form)} disabled={!form.name || !form.role || !form.email || isPending}
            className="px-4 py-2 rounded-full bg-primary text-primary-foreground border-2 border-border hover:-translate-y-px transition-all disabled:opacity-50"
            style={{ fontFamily: MONO, fontSize: "0.7rem", fontWeight: 700, boxShadow: "3px 3px 0 hsl(var(--border))" }}
            data-testid="button-member-submit">
            {isPending ? "Saving…" : mode === "create" ? "Add Member" : "Save Changes"}
          </button>
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
  const [editingId, setEditingId]   = useState<number | null>(null);
  const [editForm, setEditForm]     = useState<MemberFormData>(DEFAULT_FORM);

  function handleCreate(form: MemberFormData) {
    createMember.mutate({ data: { name: form.name, role: form.role, email: form.email, avatarColor: form.avatarColor } }, {
      onSuccess: () => { queryClient.invalidateQueries({ queryKey: getListMembersQueryKey() }); setShowCreate(false); toast({ title: "Member added" }); },
      onError: () => toast({ title: "Failed to add", variant: "destructive" }),
    });
  }

  function handleEdit(form: MemberFormData) {
    if (!editingId) return;
    updateMember.mutate({ id: editingId, data: { name: form.name, role: form.role, email: form.email, avatarColor: form.avatarColor } }, {
      onSuccess: () => { queryClient.invalidateQueries({ queryKey: getListMembersQueryKey() }); setEditingId(null); toast({ title: "Member updated" }); },
      onError: () => toast({ title: "Failed to update", variant: "destructive" }),
    });
  }

  function handleDelete(id: number, name: string) {
    deleteMember.mutate({ id }, {
      onSuccess: () => { queryClient.invalidateQueries({ queryKey: getListMembersQueryKey() }); toast({ title: `${name} removed` }); },
      onError: () => toast({ title: "Failed to remove", variant: "destructive" }),
    });
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-foreground mb-1" style={{ fontFamily: DISPLAY, fontSize: "1.5rem", fontWeight: 700, lineHeight: 1.15 }}>Team Members</h1>
          <p className="text-muted-foreground" style={{ fontFamily: MONO, fontSize: "0.7rem" }}>{members?.length ?? 0} members</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-full hover:-translate-y-px transition-all"
          style={{ border: "2px solid hsl(var(--border))", boxShadow: "3px 3px 0 hsl(var(--border))", fontFamily: MONO, fontSize: "0.7rem", fontWeight: 700 }}
          data-testid="button-add-member"><Plus size={14} /> Add Member</button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-36 rounded-2xl" />)}
        </div>
      ) : members && members.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map((member, idx) => (
            <div key={member.id} className="neo-card p-5 group" data-testid={`card-member-${member.id}`}
              style={{ backgroundColor: CARD_PASTELS[idx % CARD_PASTELS.length] }}>
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl border-2 border-foreground/20 flex items-center justify-center text-white font-bold shrink-0"
                  style={{ backgroundColor: member.avatarColor, fontFamily: DISPLAY, fontSize: "1rem", boxShadow: "2px 2px 0 rgba(0,0,0,0.2)" }}>
                  {member.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold truncate" style={{ fontFamily: DISPLAY, fontSize: "0.85rem" }} data-testid={`text-member-name-${member.id}`}>{member.name}</p>
                  <p className="text-foreground/60" style={{ fontFamily: MONO, fontSize: "0.62rem" }}>{member.role}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Mail size={10} className="text-foreground/40 shrink-0" />
                    <p className="truncate text-foreground/50" style={{ fontFamily: MONO, fontSize: "0.58rem" }}>{member.email}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-xl border-2 border-foreground/25 text-foreground/70 hover:text-foreground hover:border-foreground/50 transition-all bg-white/40"
                  style={{ fontFamily: MONO, fontSize: "0.62rem", fontWeight: 700 }}
                  onClick={() => { setEditingId(member.id); setEditForm({ name: member.name, role: member.role, email: member.email, avatarColor: member.avatarColor }); }}
                  data-testid={`button-edit-member-${member.id}`}><Pencil size={11} /> Edit</button>
                <button
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-xl border-2 border-foreground/25 text-foreground/70 hover:text-red-600 hover:border-red-500/40 transition-all bg-white/40"
                  style={{ fontFamily: MONO, fontSize: "0.62rem", fontWeight: 700 }}
                  onClick={() => handleDelete(member.id, member.name)}
                  data-testid={`button-delete-member-${member.id}`}><Trash2 size={11} /> Remove</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center rounded-2xl border-2 border-dashed border-border">
          <Users size={40} className="mx-auto text-muted-foreground mb-3" />
          <p className="font-bold mb-1" style={{ fontFamily: DISPLAY, fontSize: "0.9rem" }}>No team members</p>
          <p className="text-muted-foreground mb-5" style={{ fontFamily: MONO, fontSize: "0.7rem" }}>Add your first member</p>
          <button onClick={() => setShowCreate(true)}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full"
            style={{ border: "2px solid hsl(var(--border))", boxShadow: "3px 3px 0 hsl(var(--border))", fontFamily: MONO, fontSize: "0.7rem", fontWeight: 700 }}>
            <Plus size={14} /> Add Member
          </button>
        </div>
      )}

      <MemberFormDialog open={showCreate} onClose={() => setShowCreate(false)} initial={DEFAULT_FORM} onSubmit={handleCreate} isPending={createMember.isPending} mode="create" />
      {editingId !== null && <MemberFormDialog open={true} onClose={() => setEditingId(null)} initial={editForm} onSubmit={handleEdit} isPending={updateMember.isPending} mode="edit" />}
    </div>
  );
}
