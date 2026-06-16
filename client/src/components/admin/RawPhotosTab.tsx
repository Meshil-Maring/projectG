import { useCallback, useEffect, useRef, useState } from "react";
import {
  Upload,
  Trash2,
  Loader2,
  CheckCircle2,
  AlertCircle,
  FolderOpen,
  Image as ImageIcon,
  X,
} from "lucide-react";
import {
  fetchRawPhotos,
  uploadRawPhotos,
  deleteRawPhoto,
  updateRawPhotoCaption,
  type RawPhoto,
} from "../../lib/api";

const SECTIONS: { value: string; label: string }[] = [
  { value: "whg",   label: "Work for Humanity Group (WHG)" },
  { value: "hrds",  label: "Human Resources Developmental Society (HRDS)" },
  { value: "cwg",   label: "Competitive World Group (CWG)" },
  { value: "fseds", label: "Foundation for Socio-Economic Development Society (FSEDS)" },
  { value: "lac",   label: "Legal Aid Club (LAC)" },
  { value: "events",  label: "Events" },
  { value: "gallery", label: "General Gallery" },
  { value: "team",    label: "Team" },
];

type UploadStatus = { type: "idle" | "loading" | "success" | "error"; message?: string };

export function RawPhotosTab() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].value);
  const [photos, setPhotos] = useState<RawPhoto[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>({ type: "idle" });
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [editingCaption, setEditingCaption] = useState<{ id: number; value: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadPhotos = useCallback(async () => {
    setLoadingPhotos(true);
    try {
      const data = await fetchRawPhotos(activeSection);
      setPhotos(data);
    } catch {
      setPhotos([]);
    } finally {
      setLoadingPhotos(false);
    }
  }, [activeSection]);

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  async function handleFilesSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    if (fileInputRef.current) fileInputRef.current.value = "";

    setUploadStatus({ type: "loading" });
    try {
      const newPhotos = await uploadRawPhotos(files, activeSection);
      setPhotos((prev) => [...newPhotos, ...prev]);
      setUploadStatus({
        type: "success",
        message: `${newPhotos.length} photo${newPhotos.length !== 1 ? "s" : ""} uploaded successfully.`,
      });
    } catch (err) {
      setUploadStatus({
        type: "error",
        message: err instanceof Error ? err.message : "Upload failed.",
      });
    }
  }

  async function handleDelete(id: number) {
    setDeletingId(id);
    try {
      await deleteRawPhoto(id);
      setPhotos((prev) => prev.filter((p) => p.id !== id));
    } catch {
      // keep photo in list if delete failed
    } finally {
      setDeletingId(null);
    }
  }

  async function handleSaveCaption(id: number, caption: string) {
    try {
      const updated = await updateRawPhotoCaption(id, caption);
      setPhotos((prev) => prev.map((p) => (p.id === id ? updated : p)));
      setEditingCaption(null);
    } catch {
      // ignore
    }
  }

  const sectionLabel = SECTIONS.find((s) => s.value === activeSection)?.label ?? activeSection;

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#0f1e4a", marginBottom: "0.25rem" }}>
          Raw Photos
        </h2>
        <p style={{ fontSize: "0.8rem", color: "#64748b" }}>
          Upload photos for each section — stored in Google Drive, links saved to the database.
        </p>
      </div>

      {/* Section selector */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #e2e8f0",
          borderRadius: "0.75rem",
          padding: "1.25rem",
          marginBottom: "1.5rem",
        }}
      >
        <label
          style={{
            display: "block",
            fontSize: "0.72rem",
            fontWeight: 600,
            color: "#374151",
            marginBottom: "0.4rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          Section
        </label>
        <select
          value={activeSection}
          onChange={(e) => {
            setActiveSection(e.target.value);
            setUploadStatus({ type: "idle" });
          }}
          style={{
            width: "100%",
            maxWidth: "480px",
            padding: "0.55rem 0.75rem",
            fontSize: "0.85rem",
            border: "1.5px solid #e2e8f0",
            borderRadius: "0.4rem",
            color: "#1e293b",
            backgroundColor: "#f8fafc",
            outline: "none",
            cursor: "pointer",
          }}
        >
          {SECTIONS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* Upload area */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #e2e8f0",
          borderRadius: "0.75rem",
          padding: "1.25rem",
          marginBottom: "1.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          <button
            type="button"
            disabled={uploadStatus.type === "loading"}
            onClick={() => fileInputRef.current?.click()}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.6rem 1.2rem",
              backgroundColor: uploadStatus.type === "loading" ? "#94a3b8" : "#1a3270",
              color: "#fff",
              fontSize: "0.82rem",
              fontWeight: 600,
              border: "none",
              borderRadius: "0.5rem",
              cursor: uploadStatus.type === "loading" ? "default" : "pointer",
            }}
          >
            {uploadStatus.type === "loading" ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Upload size={14} />
            )}
            {uploadStatus.type === "loading" ? "Uploading…" : "Upload Photos"}
          </button>

          <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
            JPG, PNG, WebP · max 10 MB each · multiple files allowed
          </span>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            style={{ display: "none" }}
            onChange={handleFilesSelected}
          />
        </div>

        {uploadStatus.type !== "idle" && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              marginTop: "0.75rem",
              fontSize: "0.78rem",
              color:
                uploadStatus.type === "error"
                  ? "#dc2626"
                  : uploadStatus.type === "success"
                  ? "#0d9488"
                  : "#64748b",
            }}
          >
            {uploadStatus.type === "loading" && <Loader2 size={13} className="animate-spin" />}
            {uploadStatus.type === "error" && <AlertCircle size={13} />}
            {uploadStatus.type === "success" && <CheckCircle2 size={13} />}
            <span>{uploadStatus.type === "loading" ? "Uploading to Google Drive…" : uploadStatus.message}</span>
          </div>
        )}
      </div>

      {/* Photo grid */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #e2e8f0",
          borderRadius: "0.75rem",
          padding: "1.25rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
          <FolderOpen size={16} color="#1a3270" />
          <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#0f1e4a" }}>
            {sectionLabel}
          </span>
          <span
            style={{
              marginLeft: "auto",
              fontSize: "0.72rem",
              color: "#94a3b8",
              background: "#f1f5f9",
              padding: "0.2rem 0.6rem",
              borderRadius: "999px",
            }}
          >
            {photos.length} photo{photos.length !== 1 ? "s" : ""}
          </span>
        </div>

        {loadingPhotos ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "3rem 0", color: "#94a3b8" }}>
            <Loader2 size={24} className="animate-spin" />
          </div>
        ) : photos.length === 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "3rem 0",
              color: "#94a3b8",
              gap: "0.5rem",
            }}
          >
            <ImageIcon size={32} />
            <span style={{ fontSize: "0.82rem" }}>No photos in this section yet.</span>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: "1rem",
            }}
          >
            {photos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                deleting={deletingId === photo.id}
                editingCaption={editingCaption?.id === photo.id ? editingCaption.value : null}
                onDelete={() => handleDelete(photo.id)}
                onEditCaption={(v) => setEditingCaption({ id: photo.id, value: v })}
                onCancelCaption={() => setEditingCaption(null)}
                onSaveCaption={(v) => handleSaveCaption(photo.id, v)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PhotoCard({
  photo,
  deleting,
  editingCaption,
  onDelete,
  onEditCaption,
  onCancelCaption,
  onSaveCaption,
}: {
  photo: RawPhoto;
  deleting: boolean;
  editingCaption: string | null;
  onDelete: () => void;
  onEditCaption: (v: string) => void;
  onCancelCaption: () => void;
  onSaveCaption: (v: string) => void;
}) {
  return (
    <div
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: "0.5rem",
        overflow: "hidden",
        background: "#f8fafc",
        opacity: deleting ? 0.4 : 1,
        transition: "opacity 0.2s",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", paddingBottom: "75%", background: "#e2e8f0" }}>
        <img
          src={photo.url}
          alt={photo.caption || photo.filename}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        {/* Delete button */}
        <button
          type="button"
          disabled={deleting}
          onClick={onDelete}
          style={{
            position: "absolute",
            top: "0.4rem",
            right: "0.4rem",
            background: "rgba(220,38,38,0.85)",
            border: "none",
            borderRadius: "0.3rem",
            padding: "0.3rem",
            cursor: deleting ? "default" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          title="Delete photo"
        >
          {deleting ? (
            <Loader2 size={12} color="#fff" className="animate-spin" />
          ) : (
            <Trash2 size={12} color="#fff" />
          )}
        </button>
      </div>

      {/* Caption / filename */}
      <div style={{ padding: "0.5rem" }}>
        {editingCaption !== null ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            <input
              autoFocus
              value={editingCaption}
              onChange={(e) => onEditCaption(e.target.value)}
              placeholder="Add caption…"
              style={{
                fontSize: "0.72rem",
                padding: "0.3rem 0.4rem",
                border: "1.5px solid #1a3270",
                borderRadius: "0.3rem",
                outline: "none",
                width: "100%",
                boxSizing: "border-box",
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") onSaveCaption(editingCaption);
                if (e.key === "Escape") onCancelCaption();
              }}
            />
            <div style={{ display: "flex", gap: "0.3rem" }}>
              <button
                type="button"
                onClick={() => onSaveCaption(editingCaption)}
                style={captionBtnStyle("#1a3270")}
              >
                Save
              </button>
              <button
                type="button"
                onClick={onCancelCaption}
                style={captionBtnStyle("#94a3b8")}
              >
                <X size={10} />
              </button>
            </div>
          </div>
        ) : (
          <p
            title="Click to edit caption"
            onClick={() => onEditCaption(photo.caption)}
            style={{
              fontSize: "0.7rem",
              color: photo.caption ? "#374151" : "#94a3b8",
              cursor: "pointer",
              margin: 0,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {photo.caption || photo.filename}
          </p>
        )}
      </div>
    </div>
  );
}

function captionBtnStyle(bg: string): React.CSSProperties {
  return {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.2rem 0.5rem",
    fontSize: "0.68rem",
    fontWeight: 600,
    color: "#fff",
    backgroundColor: bg,
    border: "none",
    borderRadius: "0.25rem",
    cursor: "pointer",
  };
}
