import { useCallback, useEffect, useRef, useState } from "react";
import {
  Upload, Trash2, Loader2, CheckCircle2, AlertCircle, Edit3, X, Check,
  Image as ImageIcon, Images, Plus, FolderOpen, ChevronDown, ChevronUp,
} from "lucide-react";
import {
  fetchWhgGroups, createWhgGroup, renameWhgGroup, deleteWhgGroup,
  uploadToWhgGroup, deleteWhgGalleryImage, updateWhgGalleryImage,
  type WhgGroup, type WhgGalleryImage,
} from "../../lib/api";

type UploadStatus = { type: "idle" | "loading" | "success" | "error"; message?: string };
type EditImageState = { id: string; name: string; description: string } | null;

// ── Helpers ───────────────────────────────────────────────────────────────────

const PRIMARY = "#1a3270";
const DANGER  = "#dc2626";

function overlayBtnStyle(bg: string): React.CSSProperties {
  return { background: `${bg}cc`, border: "none", borderRadius: "0.3rem", padding: "0.3rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" };
}
const inlineInputStyle: React.CSSProperties = { fontSize: "0.72rem", padding: "0.3rem 0.4rem", border: `1.5px solid ${PRIMARY}`, borderRadius: "0.3rem", outline: "none", width: "100%", boxSizing: "border-box", backgroundColor: "#fff" };
function actionBtnStyle(bg: string): React.CSSProperties {
  return { display: "inline-flex", alignItems: "center", gap: "0.25rem", padding: "0.2rem 0.5rem", fontSize: "0.68rem", fontWeight: 600, color: "#fff", backgroundColor: bg, border: "none", borderRadius: "0.25rem", cursor: "pointer" };
}

// ── Image card inside a group ─────────────────────────────────────────────────

function GroupImageCard({
  img, deleting, editing, saving,
  onDelete, onStartEdit, onCancelEdit, onChangeName, onChangeDesc, onSave,
}: {
  img: WhgGalleryImage;
  deleting: boolean; editing: EditImageState; saving: boolean;
  onDelete: () => void; onStartEdit: () => void; onCancelEdit: () => void;
  onChangeName: (v: string) => void; onChangeDesc: (v: string) => void; onSave: () => void;
}) {
  return (
    <div style={{ border: "1px solid #e2e8f0", borderRadius: "0.5rem", overflow: "hidden", background: "#f8fafc", opacity: deleting ? 0.4 : 1, transition: "opacity 0.2s" }}>
      <div style={{ position: "relative" as const, paddingBottom: "68%", background: "#e2e8f0" }}>
        <img src={img.url} alt={img.name} style={{ position: "absolute" as const, inset: 0, width: "100%", height: "100%", objectFit: "cover" as const }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
        <div style={{ position: "absolute" as const, top: "0.4rem", right: "0.4rem", display: "flex", gap: "0.3rem" }}>
          <button type="button" onClick={onStartEdit} disabled={!!editing || deleting} style={overlayBtnStyle(PRIMARY)}><Edit3 size={12} color="#fff" /></button>
          <button type="button" onClick={onDelete} disabled={deleting} style={overlayBtnStyle(DANGER)}>
            {deleting ? <Loader2 size={12} color="#fff" className="animate-spin" /> : <Trash2 size={12} color="#fff" />}
          </button>
        </div>
      </div>
      <div style={{ padding: "0.6rem 0.6rem 0.75rem" }}>
        {editing ? (
          <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.35rem" }}>
            <input autoFocus value={editing.name} onChange={(e) => onChangeName(e.target.value)} placeholder="Image name" onKeyDown={(e) => { if (e.key === "Enter") onSave(); if (e.key === "Escape") onCancelEdit(); }} style={inlineInputStyle} />
            <input value={editing.description} onChange={(e) => onChangeDesc(e.target.value)} placeholder="Description (optional)" onKeyDown={(e) => { if (e.key === "Escape") onCancelEdit(); }} style={inlineInputStyle} />
            <div style={{ display: "flex", gap: "0.3rem", marginTop: "0.15rem" }}>
              <button type="button" onClick={onSave} disabled={saving} style={actionBtnStyle(PRIMARY)}>{saving ? <Loader2 size={10} className="animate-spin" /> : <Check size={10} />}Save</button>
              <button type="button" onClick={onCancelEdit} style={actionBtnStyle("#94a3b8")}><X size={10} />Cancel</button>
            </div>
          </div>
        ) : (
          <>
            <p onClick={onStartEdit} title="Click to edit" style={{ fontSize: "0.72rem", fontWeight: 600, color: "#374151", margin: 0, cursor: "pointer", whiteSpace: "nowrap" as const, overflow: "hidden", textOverflow: "ellipsis" }}>{img.name || "Untitled"}</p>
            {img.description && <p style={{ fontSize: "0.68rem", color: "#94a3b8", margin: "0.2rem 0 0", whiteSpace: "nowrap" as const, overflow: "hidden", textOverflow: "ellipsis" }}>{img.description}</p>}
          </>
        )}
      </div>
    </div>
  );
}

// ── Group panel ───────────────────────────────────────────────────────────────

function GroupPanel({
  group,
  onRename,
  onDelete,
  onImageDeleted,
  onImageUpdated,
  onImageUploaded,
}: {
  group: WhgGroup;
  onRename: (id: number, name: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  onImageDeleted: (groupId: number, fileId: string) => void;
  onImageUpdated: (groupId: number, fileId: string, name: string, description: string) => void;
  onImageUploaded: (groupId: number, img: WhgGalleryImage) => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const [renaming, setRenaming] = useState(false);
  const [renameName, setRenameName] = useState(group.name);
  const [renameSaving, setRenameSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deletingImgId, setDeletingImgId] = useState<string | null>(null);
  const [editingImg, setEditingImg] = useState<EditImageState>(null);
  const [savingImgId, setSavingImgId] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>({ type: "idle" });
  const fileRef = useRef<HTMLInputElement>(null);

  async function saveRename() {
    if (!renameName.trim()) return;
    setRenameSaving(true);
    try { await onRename(group.id, renameName.trim()); setRenaming(false); }
    catch { /* stay open */ }
    finally { setRenameSaving(false); }
  }

  async function handleDelete() {
    if (!confirm(`Delete group "${group.name}" and all its images? This cannot be undone.`)) return;
    setDeleting(true);
    try { await onDelete(group.id); }
    finally { setDeleting(false); }
  }

  async function handleFilesSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    if (fileRef.current) fileRef.current.value = "";
    setUploadStatus({ type: "loading" });
    let count = 0;
    const errors: string[] = [];
    for (const file of files) {
      try {
        const img = await uploadToWhgGroup(group.id, file);
        onImageUploaded(group.id, img);
        count++;
      } catch (err) { errors.push(err instanceof Error ? err.message : "Upload failed"); }
    }
    setUploadStatus(
      errors.length === 0
        ? { type: "success", message: `${count} image${count !== 1 ? "s" : ""} uploaded.` }
        : { type: "error", message: errors[0] },
    );
  }

  async function handleImgDelete(fileId: string) {
    setDeletingImgId(fileId);
    try { await deleteWhgGalleryImage(fileId); onImageDeleted(group.id, fileId); }
    catch { /* keep */ }
    finally { setDeletingImgId(null); }
  }

  async function saveImgEdit() {
    if (!editingImg) return;
    setSavingImgId(editingImg.id);
    try {
      await updateWhgGalleryImage(editingImg.id, editingImg.name, editingImg.description);
      onImageUpdated(group.id, editingImg.id, editingImg.name, editingImg.description);
      setEditingImg(null);
    } catch { /* stay */ }
    finally { setSavingImgId(null); }
  }

  return (
    <div style={{ border: "1px solid #e2e8f0", borderRadius: "0.75rem", overflow: "hidden", background: "#fff", opacity: deleting ? 0.5 : 1, transition: "opacity 0.2s" }}>
      {/* Group header */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.9rem 1rem", background: "#f8fafc", borderBottom: expanded ? "1px solid #e2e8f0" : "none" }}>
        <FolderOpen size={16} color={PRIMARY} style={{ flexShrink: 0 }} />

        {renaming ? (
          <div style={{ flex: 1, display: "flex", gap: "0.4rem", alignItems: "center" }}>
            <input
              autoFocus
              value={renameName}
              onChange={(e) => setRenameName(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") saveRename(); if (e.key === "Escape") { setRenaming(false); setRenameName(group.name); } }}
              style={{ ...inlineInputStyle, fontSize: "0.85rem", fontWeight: 600 }}
            />
            <button type="button" onClick={saveRename} disabled={renameSaving} style={actionBtnStyle(PRIMARY)}>
              {renameSaving ? <Loader2 size={11} className="animate-spin" /> : <Check size={11} />}
            </button>
            <button type="button" onClick={() => { setRenaming(false); setRenameName(group.name); }} style={actionBtnStyle("#94a3b8")}><X size={11} /></button>
          </div>
        ) : (
          <span style={{ flex: 1, fontSize: "0.92rem", fontWeight: 700, color: "#0f1e4a" }}>{group.name}</span>
        )}

        <span style={{ fontSize: "0.68rem", color: "#94a3b8", background: "#f1f5f9", padding: "0.15rem 0.5rem", borderRadius: "999px", flexShrink: 0 }}>
          {group.images.length} image{group.images.length !== 1 ? "s" : ""}
        </span>

        {!renaming && (
          <>
            <button type="button" onClick={() => { setRenaming(true); setRenameName(group.name); }} title="Rename group" style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b", display: "flex", padding: "2px" }}>
              <Edit3 size={14} />
            </button>
            <button type="button" onClick={handleDelete} disabled={deleting} title="Delete group" style={{ background: "none", border: "none", cursor: "pointer", color: DANGER, display: "flex", padding: "2px" }}>
              {deleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
            </button>
          </>
        )}

        <button type="button" onClick={() => setExpanded((v) => !v)} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", display: "flex", padding: "2px" }}>
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {/* Group body */}
      {expanded && (
        <div style={{ padding: "1rem" }}>
          {/* Upload strip */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap" as const }}>
            <button
              type="button"
              disabled={uploadStatus.type === "loading"}
              onClick={() => fileRef.current?.click()}
              style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.45rem 0.9rem", backgroundColor: uploadStatus.type === "loading" ? "#94a3b8" : PRIMARY, color: "#fff", fontSize: "0.78rem", fontWeight: 600, border: "none", borderRadius: "0.4rem", cursor: uploadStatus.type === "loading" ? "default" : "pointer" }}
            >
              {uploadStatus.type === "loading" ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
              {uploadStatus.type === "loading" ? "Uploading…" : "Add Images"}
            </button>
            <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>JPG, PNG, WebP · max 10 MB</span>
            <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" multiple style={{ display: "none" }} onChange={handleFilesSelected} />
            {uploadStatus.type !== "idle" && (
              <span style={{ fontSize: "0.72rem", display: "flex", alignItems: "center", gap: "0.3rem", color: uploadStatus.type === "error" ? DANGER : uploadStatus.type === "success" ? "#0d9488" : "#64748b" }}>
                {uploadStatus.type === "error" && <AlertCircle size={12} />}
                {uploadStatus.type === "success" && <CheckCircle2 size={12} />}
                {uploadStatus.type === "loading" && <Loader2 size={12} className="animate-spin" />}
                {uploadStatus.type !== "loading" ? uploadStatus.message : "Uploading to Google Drive…"}
              </span>
            )}
          </div>

          {/* Image grid */}
          {group.images.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", padding: "2rem 0", color: "#94a3b8", gap: "0.4rem" }}>
              <ImageIcon size={28} />
              <span style={{ fontSize: "0.78rem" }}>No images yet. Upload some above.</span>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "0.75rem" }}>
              {group.images.map((img) => (
                <GroupImageCard
                  key={img.id}
                  img={img}
                  deleting={deletingImgId === img.id}
                  editing={editingImg?.id === img.id ? editingImg : null}
                  saving={savingImgId === img.id}
                  onDelete={() => handleImgDelete(img.id)}
                  onStartEdit={() => setEditingImg({ id: img.id, name: img.name, description: img.description })}
                  onCancelEdit={() => setEditingImg(null)}
                  onChangeName={(v) => setEditingImg((e) => e ? { ...e, name: v } : e)}
                  onChangeDesc={(v) => setEditingImg((e) => e ? { ...e, description: v } : e)}
                  onSave={saveImgEdit}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main tab ──────────────────────────────────────────────────────────────────

export function WhgGalleryTab() {
  const [groups, setGroups] = useState<WhgGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [createSaving, setCreateSaving] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const newGroupInputRef = useRef<HTMLInputElement>(null);

  const loadGroups = useCallback(async () => {
    setLoading(true);
    try { setGroups(await fetchWhgGroups()); }
    catch { setGroups([]); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { loadGroups(); }, [loadGroups]);

  async function handleCreateGroup() {
    if (!newGroupName.trim()) return;
    setCreateSaving(true);
    setCreateError(null);
    try {
      const g = await createWhgGroup(newGroupName.trim());
      setGroups((prev) => [...prev, g]);
      setNewGroupName("");
      setCreating(false);
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : "Failed to create group. Please try again.");
    }
    finally { setCreateSaving(false); }
  }

  async function handleRename(id: number, name: string) {
    const updated = await renameWhgGroup(id, name);
    setGroups((prev) => prev.map((g) => g.id === id ? { ...g, name: updated.name } : g));
  }

  async function handleDelete(id: number) {
    await deleteWhgGroup(id);
    setGroups((prev) => prev.filter((g) => g.id !== id));
  }

  function handleImageDeleted(groupId: number, fileId: string) {
    setGroups((prev) => prev.map((g) => g.id !== groupId ? g : { ...g, images: g.images.filter((img) => img.id !== fileId) }));
  }

  function handleImageUpdated(groupId: number, fileId: string, name: string, description: string) {
    setGroups((prev) => prev.map((g) => g.id !== groupId ? g : { ...g, images: g.images.map((img) => img.id === fileId ? { ...img, name, description } : img) }));
  }

  function handleImageUploaded(groupId: number, img: WhgGalleryImage) {
    setGroups((prev) => prev.map((g) => g.id !== groupId ? g : { ...g, images: [img, ...g.images] }));
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#0f1e4a", marginBottom: "0.25rem" }}>WHG Blood Donation Gallery</h2>
        <p style={{ fontSize: "0.8rem", color: "#64748b" }}>Organise images into groups (e.g. "Blood Donation Camp 2024"). Each group becomes a titled section in the public gallery.</p>
      </div>

      {/* Create group */}
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "0.75rem", padding: "1rem 1.25rem", marginBottom: "1.5rem" }}>
        {creating ? (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <input
                ref={newGroupInputRef}
                autoFocus
                value={newGroupName}
                onChange={(e) => { setNewGroupName(e.target.value); setCreateError(null); }}
                placeholder='e.g. "Blood Donation Camp 2024"'
                onKeyDown={(e) => { if (e.key === "Enter") handleCreateGroup(); if (e.key === "Escape") { setCreating(false); setNewGroupName(""); setCreateError(null); } }}
                style={{ flex: 1, padding: "0.55rem 0.75rem", fontSize: "0.85rem", border: `1.5px solid ${createError ? DANGER : PRIMARY}`, borderRadius: "0.4rem", outline: "none" }}
              />
              <button type="button" onClick={handleCreateGroup} disabled={createSaving || !newGroupName.trim()} style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.55rem 1rem", backgroundColor: PRIMARY, color: "#fff", fontSize: "0.82rem", fontWeight: 600, border: "none", borderRadius: "0.4rem", cursor: createSaving || !newGroupName.trim() ? "default" : "pointer", opacity: !newGroupName.trim() ? 0.5 : 1 }}>
                {createSaving ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} />}
                Create
              </button>
              <button type="button" onClick={() => { setCreating(false); setNewGroupName(""); setCreateError(null); }} style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", padding: "0.55rem 0.75rem", background: "transparent", color: "#64748b", border: "1.5px solid #e2e8f0", borderRadius: "0.4rem", fontSize: "0.82rem", cursor: "pointer" }}>
                <X size={13} />
              </button>
            </div>
            {createError && (
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "0.5rem", fontSize: "0.75rem", color: DANGER }}>
                <AlertCircle size={12} />
                {createError}
              </div>
            )}
          </div>
        ) : (
          <button type="button" onClick={() => setCreating(true)} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.55rem 1.1rem", backgroundColor: PRIMARY, color: "#fff", fontSize: "0.82rem", fontWeight: 600, border: "none", borderRadius: "0.5rem", cursor: "pointer" }}>
            <Plus size={15} /> New Group
          </button>
        )}
      </div>

      {/* Groups list */}
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "3rem 0", color: "#94a3b8" }}><Loader2 size={24} className="animate-spin" /></div>
      ) : groups.length === 0 ? (
        <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", padding: "3rem 0", color: "#94a3b8", gap: "0.5rem" }}>
          <Images size={32} />
          <span style={{ fontSize: "0.85rem" }}>No groups yet. Create one to get started.</span>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column" as const, gap: "1rem" }}>
          {groups.map((g) => (
            <GroupPanel
              key={g.id}
              group={g}
              onRename={handleRename}
              onDelete={handleDelete}
              onImageDeleted={handleImageDeleted}
              onImageUpdated={handleImageUpdated}
              onImageUploaded={handleImageUploaded}
            />
          ))}
        </div>
      )}
    </div>
  );
}
