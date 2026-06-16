import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Image,
  Video,
  LayoutGrid,
  BarChart2,
  MessageSquare,
  LogOut,
  Plus,
  Trash2,
  Edit3,
  Check,
  X,
  ChevronUp,
  ChevronDown,
  RotateCcw,
  Shield,
  Users,
  GraduationCap,
  Leaf,
  HandHeart,
  Heart,
  Star,
  Globe,
  BookOpen,
  Settings,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  FileText,
  Home,
  Bell,
  Calendar,
  Camera,
  Images,
} from "lucide-react";
import {
  useHomePageData,
  type IconKey,
  type VideoEntry,
  type PhotoEntry,
  type ImpactStat,
  type StoryEntry,
} from "../../context/HomePageContext";
import {
  useGroupActivities,
  type GroupKey,
  type ActivityEntry,
} from "../../context/GroupActivitiesContext";
import {
  useTeamData,
  type BoardMember,
  type TeamMember,
} from "../../context/TeamContext";
import {
  useNoticeData,
  formatNoticeDate,
  type NoticeEntry,
  type NoticeCategory,
} from "../../context/NoticeContext";
import { type Section } from "../../context/PageContext";
import { api } from "../../lib/api";
import { ImageUploadField } from "./shared/ImageUploadField";
import { RawPhotosTab } from "./RawPhotosTab";
import { WhgGalleryTab } from "./WhgGalleryTab";
import Logo from "../../assets/image/logo.jpeg";

// ── Icon map ──────────────────────────────────────────────────────────────────

const ICON_MAP: Record<IconKey, React.ElementType> = {
  Users,
  GraduationCap,
  Leaf,
  HandHeart,
  Heart,
  Star,
  Globe,
  BookOpen,
};

const ICON_OPTIONS: IconKey[] = [
  "Users",
  "GraduationCap",
  "Leaf",
  "HandHeart",
  "Heart",
  "Star",
  "Globe",
  "BookOpen",
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function nextId(items: { id: number }[]) {
  return items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
}

// ── Shared UI ─────────────────────────────────────────────────────────────────

function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-6">
      <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#0f1e4a", marginBottom: "0.25rem" }}>
        {title}
      </h2>
      <p style={{ fontSize: "0.8rem", color: "#64748b" }}>{subtitle}</p>
    </div>
  );
}

function SaveBtn({
  onClick,
  label = "Save Changes",
}: {
  onClick: () => void;
  label?: string;
}) {
  const [saved, setSaved] = useState(false);
  function handle() {
    onClick();
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  }
  return (
    <button
      onClick={handle}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.4rem",
        padding: "0.55rem 1.2rem",
        backgroundColor: saved ? "#0d9488" : "#1a3270",
        color: "#fff",
        fontSize: "0.82rem",
        fontWeight: 600,
        border: "none",
        borderRadius: "0.5rem",
        cursor: "pointer",
        transition: "background-color 0.2s",
      }}
    >
      {saved ? <Check size={14} /> : null}
      {saved ? "Saved!" : label}
    </button>
  );
}

function FieldGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: "0.75rem" }}>
      <label
        style={{
          display: "block",
          fontSize: "0.72rem",
          fontWeight: 600,
          color: "#374151",
          marginBottom: "0.3rem",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: "100%",
        padding: "0.55rem 0.75rem",
        fontSize: "0.83rem",
        border: "1.5px solid #e2e8f0",
        borderRadius: "0.4rem",
        color: "#1e293b",
        backgroundColor: "#f8fafc",
        outline: "none",
        boxSizing: "border-box",
      }}
      onFocus={(e) => (e.target.style.borderColor = "#1a3270")}
      onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
    />
  );
}

function Textarea({
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      style={{
        width: "100%",
        padding: "0.55rem 0.75rem",
        fontSize: "0.83rem",
        border: "1.5px solid #e2e8f0",
        borderRadius: "0.4rem",
        color: "#1e293b",
        backgroundColor: "#f8fafc",
        outline: "none",
        resize: "vertical",
        boxSizing: "border-box",
        fontFamily: "inherit",
      }}
      onFocus={(e) => (e.target.style.borderColor = "#1a3270")}
      onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
    />
  );
}

// ── Tab: Hero Image ───────────────────────────────────────────────────────────

function HeroTab() {
  const { data, updateHeroImage, updateHeroTitle, updateHeroDescription } = useHomePageData();
  const [url, setUrl] = useState(data.heroImageUrl);
  const [title, setTitle] = useState(data.heroTitle);
  const [description, setDescription] = useState(data.heroDescription);

  return (
    <div>
      <SectionHeader
        title="Hero Image"
        subtitle="Update the full-width background image on the home page hero section."
      />

      <div
        style={{
          background: "#fff",
          border: "1px solid #e2e8f0",
          borderRadius: "0.75rem",
          padding: "1.5rem",
          maxWidth: "640px",
        }}
      >
        <ImageUploadField specKey="hero" label="Hero Image" value={url} onChange={setUrl} previewHeight={200} />
        <p style={{ fontSize: "0.72rem", color: "#94a3b8", marginBottom: "1rem" }}>
          Leave blank to use the default hero image.
        </p>

        <FieldGroup label="Title">
          <Input
            value={title}
            onChange={setTitle}
            placeholder="Together We Can Change Lives"
          />
        </FieldGroup>
        <p style={{ fontSize: "0.72rem", color: "#94a3b8", marginBottom: "1rem" }}>
          Leave blank to use the default animated title.
        </p>

        <FieldGroup label="Description">
          <Textarea
            value={description}
            onChange={setDescription}
            placeholder="We're committed to building a better future for children, families and communities through education, care and support."
            rows={3}
          />
        </FieldGroup>
        <p style={{ fontSize: "0.72rem", color: "#94a3b8", marginBottom: "1rem" }}>
          Leave blank to use the default description.
        </p>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <SaveBtn
            onClick={() => {
              updateHeroImage(url);
              updateHeroTitle(title);
              updateHeroDescription(description);
            }}
          />
          <button
            onClick={() => {
              setUrl("");
              setTitle("");
              setDescription("");
              updateHeroImage("");
              updateHeroTitle("");
              updateHeroDescription("");
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.55rem 1rem",
              backgroundColor: "transparent",
              color: "#64748b",
              fontSize: "0.82rem",
              fontWeight: 600,
              border: "1.5px solid #e2e8f0",
              borderRadius: "0.5rem",
              cursor: "pointer",
            }}
          >
            <RotateCcw size={13} /> Reset Default
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Tab: Watch Our Story (Videos) ─────────────────────────────────────────────

type VideoFormData = Omit<VideoEntry, "id">;

const BLANK_VIDEO: VideoFormData = {
  title: "",
  description: "",
  thumbnail: "",
  youtubeId: "",
  videoUrl: "",
  duration: "",
};

function VideoTab() {
  const { data, updateVideos } = useHomePageData();
  const [videos, setVideos] = useState<VideoEntry[]>(data.videos);
  useEffect(() => setVideos(data.videos), [data.videos]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<VideoFormData>(BLANK_VIDEO);
  const [addingNew, setAddingNew] = useState(false);
  const [newForm, setNewForm] = useState<VideoFormData>(BLANK_VIDEO);
  const [videoType, setVideoType] = useState<"youtube" | "url">("youtube");
  const [newVideoType, setNewVideoType] = useState<"youtube" | "url">("youtube");

  function startEdit(v: VideoEntry) {
    setEditingId(v.id);
    setForm({
      title: v.title,
      description: v.description,
      thumbnail: v.thumbnail,
      youtubeId: v.youtubeId ?? "",
      videoUrl: v.videoUrl ?? "",
      duration: v.duration,
    });
    setVideoType(v.youtubeId ? "youtube" : "url");
    setAddingNew(false);
  }

  function cancelEdit() {
    setEditingId(null);
  }

  function saveEdit() {
    const updated = videos.map((v) => {
      if (v.id !== editingId) return v;
      const { youtubeId, videoUrl, ...rest } = form;
      return {
        ...rest,
        id: v.id,
        ...(videoType === "youtube" ? { youtubeId } : { videoUrl }),
      };
    });
    setVideos(updated);
    updateVideos(updated);
    setEditingId(null);
  }

  function deleteVideo(id: number) {
    const updated = videos.filter((v) => v.id !== id);
    setVideos(updated);
    updateVideos(updated);
    if (editingId === id) setEditingId(null);
  }

  function moveUp(idx: number) {
    if (idx === 0) return;
    const arr = [...videos];
    [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
    setVideos(arr);
    updateVideos(arr);
  }

  function moveDown(idx: number) {
    if (idx === videos.length - 1) return;
    const arr = [...videos];
    [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
    setVideos(arr);
    updateVideos(arr);
  }

  function addVideo() {
    const { youtubeId, videoUrl, ...rest } = newForm;
    const entry: VideoEntry = {
      ...rest,
      id: nextId(videos),
      ...(newVideoType === "youtube" ? { youtubeId } : { videoUrl }),
    };
    const updated = [...videos, entry];
    setVideos(updated);
    updateVideos(updated);
    setAddingNew(false);
    setNewForm(BLANK_VIDEO);
  }

  return (
    <div>
      <SectionHeader
        title="Watch Our Story — Videos"
        subtitle="Manage video entries shown in the Watch Our Story section. Edit title, description, thumbnail, and video source."
      />

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {videos.map((v, idx) => (
          <div
            key={v.id}
            style={{
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: "0.75rem",
              overflow: "hidden",
            }}
          >
            {/* Card header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.85rem 1rem",
                borderBottom: editingId === v.id ? "1px solid #e2e8f0" : "none",
              }}
            >
              {/* Thumbnail */}
              <div
                style={{
                  width: "70px",
                  height: "50px",
                  borderRadius: "0.4rem",
                  overflow: "hidden",
                  flexShrink: 0,
                  background: "#f1f5f9",
                }}
              >
                <img
                  src={v.thumbnail}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) =>
                    ((e.target as HTMLImageElement).style.display = "none")
                  }
                />
              </div>

              {/* Title + badge */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: "#0f1e4a",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {v.title || "(Untitled)"}
                </p>
                <span
                  style={{
                    fontSize: "0.68rem",
                    backgroundColor: v.youtubeId ? "#fef2f2" : "#eff6ff",
                    color: v.youtubeId ? "#b91c1c" : "#1d4ed8",
                    padding: "0.1rem 0.5rem",
                    borderRadius: "999px",
                    fontWeight: 600,
                  }}
                >
                  {v.youtubeId ? "YouTube" : "URL"}
                </span>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                <button
                  onClick={() => moveUp(idx)}
                  disabled={idx === 0}
                  title="Move up"
                  style={iconBtnStyle(idx === 0)}
                >
                  <ChevronUp size={14} />
                </button>
                <button
                  onClick={() => moveDown(idx)}
                  disabled={idx === videos.length - 1}
                  title="Move down"
                  style={iconBtnStyle(idx === videos.length - 1)}
                >
                  <ChevronDown size={14} />
                </button>
                <button
                  onClick={() =>
                    editingId === v.id ? cancelEdit() : startEdit(v)
                  }
                  title="Edit"
                  style={iconBtnStyle(false)}
                >
                  {editingId === v.id ? <X size={14} /> : <Edit3 size={14} />}
                </button>
                <button
                  onClick={() => deleteVideo(v.id)}
                  title="Delete"
                  style={{
                    ...iconBtnStyle(false),
                    color: "#dc2626",
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            {/* Inline edit form */}
            {editingId === v.id && (
              <div style={{ padding: "1rem", background: "#f8fafc" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
                  <FieldGroup label="Title">
                    <Input value={form.title} onChange={(val) => setForm((f) => ({ ...f, title: val }))} placeholder="Video title" />
                  </FieldGroup>
                  <FieldGroup label="Duration">
                    <Input value={form.duration} onChange={(val) => setForm((f) => ({ ...f, duration: val }))} placeholder="e.g. 3:45" />
                  </FieldGroup>
                </div>
                <FieldGroup label="Description">
                  <Textarea value={form.description} onChange={(val) => setForm((f) => ({ ...f, description: val }))} placeholder="Short video description" rows={2} />
                </FieldGroup>
                <FieldGroup label="Thumbnail URL">
                  <Input value={form.thumbnail} onChange={(val) => setForm((f) => ({ ...f, thumbnail: val }))} placeholder="https://..." />
                </FieldGroup>
                <FieldGroup label="Video Source">
                  <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    {(["youtube", "url"] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setVideoType(t)}
                        style={{
                          padding: "0.3rem 0.8rem",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          borderRadius: "999px",
                          border: "1.5px solid",
                          cursor: "pointer",
                          borderColor: videoType === t ? "#1a3270" : "#e2e8f0",
                          backgroundColor: videoType === t ? "#1a3270" : "transparent",
                          color: videoType === t ? "#fff" : "#64748b",
                        }}
                      >
                        {t === "youtube" ? "YouTube ID" : "Video URL"}
                      </button>
                    ))}
                  </div>
                  {videoType === "youtube" ? (
                    <Input value={form.youtubeId ?? ""} onChange={(val) => setForm((f) => ({ ...f, youtubeId: val }))} placeholder="YouTube video ID (e.g. dQw4w9WgXcQ)" />
                  ) : (
                    <Input value={form.videoUrl ?? ""} onChange={(val) => setForm((f) => ({ ...f, videoUrl: val }))} placeholder="https://example.com/video.mp4" />
                  )}
                </FieldGroup>
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                  <button onClick={saveEdit} style={primaryBtnStyle}>
                    <Check size={13} /> Save
                  </button>
                  <button onClick={cancelEdit} style={secondaryBtnStyle}>
                    <X size={13} /> Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Add new video */}
        {addingNew ? (
          <div
            style={{
              background: "#fff",
              border: "2px dashed #1a3270",
              borderRadius: "0.75rem",
              padding: "1.25rem",
            }}
          >
            <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0f1e4a", marginBottom: "1rem" }}>
              New Video
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <FieldGroup label="Title">
                <Input value={newForm.title} onChange={(val) => setNewForm((f) => ({ ...f, title: val }))} placeholder="Video title" />
              </FieldGroup>
              <FieldGroup label="Duration">
                <Input value={newForm.duration} onChange={(val) => setNewForm((f) => ({ ...f, duration: val }))} placeholder="e.g. 3:45" />
              </FieldGroup>
            </div>
            <FieldGroup label="Description">
              <Textarea value={newForm.description} onChange={(val) => setNewForm((f) => ({ ...f, description: val }))} placeholder="Short video description" rows={2} />
            </FieldGroup>
            <FieldGroup label="Thumbnail URL">
              <Input value={newForm.thumbnail} onChange={(val) => setNewForm((f) => ({ ...f, thumbnail: val }))} placeholder="https://..." />
            </FieldGroup>
            <FieldGroup label="Video Source">
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
                {(["youtube", "url"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setNewVideoType(t)}
                    style={{
                      padding: "0.3rem 0.8rem",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      borderRadius: "999px",
                      border: "1.5px solid",
                      cursor: "pointer",
                      borderColor: newVideoType === t ? "#1a3270" : "#e2e8f0",
                      backgroundColor: newVideoType === t ? "#1a3270" : "transparent",
                      color: newVideoType === t ? "#fff" : "#64748b",
                    }}
                  >
                    {t === "youtube" ? "YouTube ID" : "Video URL"}
                  </button>
                ))}
              </div>
              {newVideoType === "youtube" ? (
                <Input value={newForm.youtubeId ?? ""} onChange={(val) => setNewForm((f) => ({ ...f, youtubeId: val }))} placeholder="YouTube video ID (e.g. dQw4w9WgXcQ)" />
              ) : (
                <Input value={newForm.videoUrl ?? ""} onChange={(val) => setNewForm((f) => ({ ...f, videoUrl: val }))} placeholder="https://example.com/video.mp4" />
              )}
            </FieldGroup>
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
              <button onClick={addVideo} style={primaryBtnStyle}>
                <Plus size={13} /> Add Video
              </button>
              <button onClick={() => { setAddingNew(false); setNewForm(BLANK_VIDEO); }} style={secondaryBtnStyle}>
                <X size={13} /> Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => { setAddingNew(true); setEditingId(null); }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              padding: "0.75rem",
              border: "2px dashed #cbd5e1",
              borderRadius: "0.75rem",
              background: "transparent",
              color: "#64748b",
              fontSize: "0.83rem",
              fontWeight: 600,
              cursor: "pointer",
              width: "100%",
            }}
          >
            <Plus size={16} /> Add Video
          </button>
        )}
      </div>
    </div>
  );
}

// ── Tab: Moments of Change (Gallery) ──────────────────────────────────────────

type PhotoFormData = Omit<PhotoEntry, "id">;
const BLANK_PHOTO: PhotoFormData = { src: "", alt: "", description: "" };

function GalleryTab() {
  const { data, updatePhotos } = useHomePageData();
  const [photos, setPhotos] = useState<PhotoEntry[]>(data.photos);
  useEffect(() => setPhotos(data.photos), [data.photos]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<PhotoFormData>(BLANK_PHOTO);
  const [addingNew, setAddingNew] = useState(false);
  const [newForm, setNewForm] = useState<PhotoFormData>(BLANK_PHOTO);

  function startEdit(p: PhotoEntry) {
    setEditingId(p.id);
    setForm({ src: p.src, alt: p.alt, description: p.description });
    setAddingNew(false);
  }

  function saveEdit() {
    const updated = photos.map((p) =>
      p.id === editingId ? { ...p, ...form } : p
    );
    setPhotos(updated);
    updatePhotos(updated);
    setEditingId(null);
  }

  function deletePhoto(id: number) {
    const updated = photos.filter((p) => p.id !== id);
    setPhotos(updated);
    updatePhotos(updated);
    if (editingId === id) setEditingId(null);
  }

  function moveUp(idx: number) {
    if (idx === 0) return;
    const arr = [...photos];
    [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
    setPhotos(arr);
    updatePhotos(arr);
  }

  function moveDown(idx: number) {
    if (idx === photos.length - 1) return;
    const arr = [...photos];
    [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
    setPhotos(arr);
    updatePhotos(arr);
  }

  function addPhoto() {
    const entry: PhotoEntry = { ...newForm, id: nextId(photos) };
    const updated = [...photos, entry];
    setPhotos(updated);
    updatePhotos(updated);
    setAddingNew(false);
    setNewForm(BLANK_PHOTO);
  }

  return (
    <div>
      <SectionHeader
        title="Moments of Change — Gallery"
        subtitle="Manage photos in the gallery section. The first photo appears large; the next 4 appear in a grid."
      />

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {photos.map((p, idx) => (
          <div
            key={p.id}
            style={{
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: "0.75rem",
              overflow: "hidden",
            }}
          >
            {/* Card header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem 1rem",
                borderBottom: editingId === p.id ? "1px solid #e2e8f0" : "none",
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "48px",
                  borderRadius: "0.4rem",
                  overflow: "hidden",
                  flexShrink: 0,
                  background: "#f1f5f9",
                }}
              >
                <img
                  src={p.src}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) =>
                    ((e.target as HTMLImageElement).style.display = "none")
                  }
                />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    fontSize: "0.83rem",
                    fontWeight: 600,
                    color: "#0f1e4a",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {p.alt || "(No title)"}
                </p>
                {idx === 0 && (
                  <span
                    style={{
                      fontSize: "0.65rem",
                      backgroundColor: "#eff6ff",
                      color: "#1d4ed8",
                      padding: "0.1rem 0.45rem",
                      borderRadius: "999px",
                      fontWeight: 600,
                    }}
                  >
                    Featured (Large)
                  </span>
                )}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                <button onClick={() => moveUp(idx)} disabled={idx === 0} style={iconBtnStyle(idx === 0)}>
                  <ChevronUp size={14} />
                </button>
                <button onClick={() => moveDown(idx)} disabled={idx === photos.length - 1} style={iconBtnStyle(idx === photos.length - 1)}>
                  <ChevronDown size={14} />
                </button>
                <button onClick={() => editingId === p.id ? setEditingId(null) : startEdit(p)} style={iconBtnStyle(false)}>
                  {editingId === p.id ? <X size={14} /> : <Edit3 size={14} />}
                </button>
                <button onClick={() => deletePhoto(p.id)} style={{ ...iconBtnStyle(false), color: "#dc2626" }}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            {/* Edit form */}
            {editingId === p.id && (
              <div style={{ padding: "1rem", background: "#f8fafc" }}>
                <ImageUploadField specKey="gallery" label="Photo" value={form.src} onChange={(val) => setForm((f) => ({ ...f, src: val }))} />
                <FieldGroup label="Title / Alt Text">
                  <Input value={form.alt} onChange={(val) => setForm((f) => ({ ...f, alt: val }))} placeholder="e.g. Children Planting Trees" />
                </FieldGroup>
                <FieldGroup label="Description">
                  <Textarea value={form.description} onChange={(val) => setForm((f) => ({ ...f, description: val }))} placeholder="Caption shown in lightbox view..." rows={2} />
                </FieldGroup>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button onClick={saveEdit} style={primaryBtnStyle}><Check size={13} /> Save</button>
                  <button onClick={() => setEditingId(null)} style={secondaryBtnStyle}><X size={13} /> Cancel</button>
                </div>
              </div>
            )}
          </div>
        ))}

        {addingNew ? (
          <div style={{ background: "#fff", border: "2px dashed #1a3270", borderRadius: "0.75rem", padding: "1.25rem" }}>
            <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0f1e4a", marginBottom: "1rem" }}>New Photo</p>
            <ImageUploadField specKey="gallery" label="Photo" value={newForm.src} onChange={(val) => setNewForm((f) => ({ ...f, src: val }))} />
            <FieldGroup label="Title / Alt Text">
              <Input value={newForm.alt} onChange={(val) => setNewForm((f) => ({ ...f, alt: val }))} placeholder="e.g. Children Planting Trees" />
            </FieldGroup>
            <FieldGroup label="Description">
              <Textarea value={newForm.description} onChange={(val) => setNewForm((f) => ({ ...f, description: val }))} placeholder="Caption shown in lightbox view..." rows={2} />
            </FieldGroup>
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
              <button onClick={addPhoto} style={primaryBtnStyle}><Plus size={13} /> Add Photo</button>
              <button onClick={() => { setAddingNew(false); setNewForm(BLANK_PHOTO); }} style={secondaryBtnStyle}><X size={13} /> Cancel</button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => { setAddingNew(true); setEditingId(null); }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", padding: "0.75rem", border: "2px dashed #cbd5e1", borderRadius: "0.75rem", background: "transparent", color: "#64748b", fontSize: "0.83rem", fontWeight: 600, cursor: "pointer", width: "100%" }}
          >
            <Plus size={16} /> Add Photo
          </button>
        )}
      </div>
    </div>
  );
}

// ── Tab: Our Impact (Stats) ───────────────────────────────────────────────────

function ImpactTab() {
  const { data, updateStats } = useHomePageData();
  const [stats, setStats] = useState<ImpactStat[]>(data.stats);
  useEffect(() => setStats(data.stats), [data.stats]);

  function updateStat(id: number, field: keyof ImpactStat, value: string) {
    const updated = stats.map((s) =>
      s.id === id ? { ...s, [field]: value } : s
    );
    setStats(updated);
  }

  function deleteStat(id: number) {
    const updated = stats.filter((s) => s.id !== id);
    setStats(updated);
    updateStats(updated);
  }

  function addStat() {
    const newStat: ImpactStat = {
      id: nextId(stats),
      iconKey: "Star",
      value: "0+",
      label: "New Stat",
    };
    setStats([...stats, newStat]);
  }

  return (
    <div>
      <SectionHeader
        title="Our Impact — Statistics"
        subtitle="Update the numbers and labels shown in the Our Impact section. Changes are saved when you click Save All."
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem", marginBottom: "1rem" }}>
        {stats.map((s) => {
          const Icon = ICON_MAP[s.iconKey];
          return (
            <div
              key={s.id}
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "0.75rem",
                padding: "1rem",
              }}
            >
              {/* Icon preview */}
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#f0fdf9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "0.75rem",
                }}
              >
                {Icon && <Icon size={20} color="#0d9488" />}
              </div>

              <FieldGroup label="Value">
                <Input
                  value={s.value}
                  onChange={(val) => updateStat(s.id, "value", val)}
                  placeholder="e.g. 25K+"
                />
              </FieldGroup>
              <FieldGroup label="Label">
                <Input
                  value={s.label.replace(/\n/g, " / ")}
                  onChange={(val) =>
                    updateStat(s.id, "label", val.replace(" / ", "\n"))
                  }
                  placeholder="e.g. Lives Impacted"
                />
              </FieldGroup>
              <FieldGroup label="Icon">
                <select
                  value={s.iconKey}
                  onChange={(e) =>
                    updateStat(s.id, "iconKey", e.target.value)
                  }
                  style={{
                    width: "100%",
                    padding: "0.55rem 0.75rem",
                    fontSize: "0.83rem",
                    border: "1.5px solid #e2e8f0",
                    borderRadius: "0.4rem",
                    color: "#1e293b",
                    backgroundColor: "#f8fafc",
                    outline: "none",
                    cursor: "pointer",
                  }}
                >
                  {ICON_OPTIONS.map((key) => (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  ))}
                </select>
              </FieldGroup>

              <button
                onClick={() => deleteStat(s.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  fontSize: "0.72rem",
                  color: "#dc2626",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0",
                  marginTop: "0.25rem",
                }}
              >
                <Trash2 size={12} /> Remove stat
              </button>
            </div>
          );
        })}

        {/* Add new stat card */}
        <button
          onClick={addStat}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            padding: "1rem",
            border: "2px dashed #cbd5e1",
            borderRadius: "0.75rem",
            background: "transparent",
            color: "#64748b",
            fontSize: "0.83rem",
            fontWeight: 600,
            cursor: "pointer",
            minHeight: "180px",
          }}
        >
          <Plus size={20} />
          Add Stat
        </button>
      </div>

      <SaveBtn onClick={() => updateStats(stats)} label="Save All Stats" />
    </div>
  );
}

// ── Tab: Stories of Change ────────────────────────────────────────────────────

type StoryFormData = Omit<StoryEntry, "id">;
const BLANK_STORY: StoryFormData = { image: "", quote: "", name: "", role: "" };

function StoriesTab() {
  const { data, updateStories } = useHomePageData();
  const [stories, setStories] = useState<StoryEntry[]>(data.stories);
  useEffect(() => setStories(data.stories), [data.stories]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<StoryFormData>(BLANK_STORY);
  const [addingNew, setAddingNew] = useState(false);
  const [newForm, setNewForm] = useState<StoryFormData>(BLANK_STORY);

  function startEdit(s: StoryEntry) {
    setEditingId(s.id);
    setForm({ image: s.image, quote: s.quote, name: s.name, role: s.role });
    setAddingNew(false);
  }

  function saveEdit() {
    const updated = stories.map((s) =>
      s.id === editingId ? { ...s, ...form } : s
    );
    setStories(updated);
    updateStories(updated);
    setEditingId(null);
  }

  function deleteStory(id: number) {
    const updated = stories.filter((s) => s.id !== id);
    setStories(updated);
    updateStories(updated);
    if (editingId === id) setEditingId(null);
  }

  function moveUp(idx: number) {
    if (idx === 0) return;
    const arr = [...stories];
    [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
    setStories(arr);
    updateStories(arr);
  }

  function moveDown(idx: number) {
    if (idx === stories.length - 1) return;
    const arr = [...stories];
    [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
    setStories(arr);
    updateStories(arr);
  }

  function addStory() {
    const entry: StoryEntry = { ...newForm, id: nextId(stories) };
    const updated = [...stories, entry];
    setStories(updated);
    updateStories(updated);
    setAddingNew(false);
    setNewForm(BLANK_STORY);
  }

  return (
    <div>
      <SectionHeader
        title="Stories of Change"
        subtitle="Manage testimonials shown in the Stories of Change section. Edit name, profession, quote, and profile photo."
      />

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {stories.map((s, idx) => (
          <div
            key={s.id}
            style={{
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: "0.75rem",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem 1rem",
                borderBottom: editingId === s.id ? "1px solid #e2e8f0" : "none",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  flexShrink: 0,
                  background: "#f1f5f9",
                }}
              >
                <img
                  src={s.image}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) =>
                    ((e.target as HTMLImageElement).style.display = "none")
                  }
                />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: "0.83rem", fontWeight: 700, color: "#0f1e4a" }}>
                  {s.name || "(No name)"}
                </p>
                <p style={{ fontSize: "0.73rem", color: "#64748b" }}>
                  {s.role || "(No role)"}
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                <button onClick={() => moveUp(idx)} disabled={idx === 0} style={iconBtnStyle(idx === 0)}>
                  <ChevronUp size={14} />
                </button>
                <button onClick={() => moveDown(idx)} disabled={idx === stories.length - 1} style={iconBtnStyle(idx === stories.length - 1)}>
                  <ChevronDown size={14} />
                </button>
                <button onClick={() => editingId === s.id ? setEditingId(null) : startEdit(s)} style={iconBtnStyle(false)}>
                  {editingId === s.id ? <X size={14} /> : <Edit3 size={14} />}
                </button>
                <button onClick={() => deleteStory(s.id)} style={{ ...iconBtnStyle(false), color: "#dc2626" }}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            {editingId === s.id && (
              <div style={{ padding: "1rem", background: "#f8fafc" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  <FieldGroup label="Name">
                    <Input value={form.name} onChange={(val) => setForm((f) => ({ ...f, name: val }))} placeholder="Full name" />
                  </FieldGroup>
                  <FieldGroup label="Profession / Role">
                    <Input value={form.role} onChange={(val) => setForm((f) => ({ ...f, role: val }))} placeholder="e.g. Volunteer" />
                  </FieldGroup>
                </div>
                <FieldGroup label="Profile Photo URL">
                  <Input value={form.image} onChange={(val) => setForm((f) => ({ ...f, image: val }))} placeholder="https://..." />
                </FieldGroup>
                <FieldGroup label="Message / Quote">
                  <Textarea value={form.quote} onChange={(val) => setForm((f) => ({ ...f, quote: val }))} placeholder="Their testimonial message..." rows={3} />
                </FieldGroup>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button onClick={saveEdit} style={primaryBtnStyle}><Check size={13} /> Save</button>
                  <button onClick={() => setEditingId(null)} style={secondaryBtnStyle}><X size={13} /> Cancel</button>
                </div>
              </div>
            )}
          </div>
        ))}

        {addingNew ? (
          <div style={{ background: "#fff", border: "2px dashed #1a3270", borderRadius: "0.75rem", padding: "1.25rem" }}>
            <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0f1e4a", marginBottom: "1rem" }}>New Story</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <FieldGroup label="Name">
                <Input value={newForm.name} onChange={(val) => setNewForm((f) => ({ ...f, name: val }))} placeholder="Full name" />
              </FieldGroup>
              <FieldGroup label="Profession / Role">
                <Input value={newForm.role} onChange={(val) => setNewForm((f) => ({ ...f, role: val }))} placeholder="e.g. Volunteer" />
              </FieldGroup>
            </div>
            <FieldGroup label="Profile Photo URL">
              <Input value={newForm.image} onChange={(val) => setNewForm((f) => ({ ...f, image: val }))} placeholder="https://..." />
            </FieldGroup>
            <FieldGroup label="Message / Quote">
              <Textarea value={newForm.quote} onChange={(val) => setNewForm((f) => ({ ...f, quote: val }))} placeholder="Their testimonial message..." rows={3} />
            </FieldGroup>
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
              <button onClick={addStory} style={primaryBtnStyle}><Plus size={13} /> Add Story</button>
              <button onClick={() => { setAddingNew(false); setNewForm(BLANK_STORY); }} style={secondaryBtnStyle}><X size={13} /> Cancel</button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => { setAddingNew(true); setEditingId(null); }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", padding: "0.75rem", border: "2px dashed #cbd5e1", borderRadius: "0.75rem", background: "transparent", color: "#64748b", fontSize: "0.83rem", fontWeight: 600, cursor: "pointer", width: "100%" }}
          >
            <Plus size={16} /> Add Story
          </button>
        )}
      </div>
    </div>
  );
}

// ── Tab: Group Activities ─────────────────────────────────────────────────────

const GROUP_META: { key: GroupKey; label: string; color: string; bg: string; border: string }[] = [
  { key: "whg",                  label: "WHG",            color: "#c2410c", bg: "#fff8f4", border: "#fde8da" },
  { key: "hrds",                 label: "HRDS",           color: "#15803d", bg: "#f0fdf4", border: "#d1fae5" },
  { key: "cwg",                  label: "CWG",            color: "#0f766e", bg: "#f0fdfa", border: "#d1faf5" },
  { key: "fseds",                label: "FSEDS",          color: "#6d28d9", bg: "#faf5ff", border: "#e4d9ff" },
  { key: "lac",                  label: "LAC",            color: "#1a3270", bg: "#f0f4ff", border: "#e8edf8" },
  { key: "whg-blood-donation",   label: "Blood Donation", color: "#b91c1c", bg: "#fef2f2", border: "#fecaca" },
];

type ActivityFormData = Omit<ActivityEntry, "id">;
const BLANK_ACTIVITY: ActivityFormData = { title: "", desc: "", imageUrl: "" };

function GroupActivitiesTab() {
  const { data, updateGroupActivities } = useGroupActivities();
  const [activeGroup, setActiveGroup] = useState<GroupKey>("whg");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<ActivityFormData>(BLANK_ACTIVITY);
  const [addingNew, setAddingNew] = useState(false);
  const [newForm, setNewForm] = useState<ActivityFormData>(BLANK_ACTIVITY);

  const group = GROUP_META.find((g) => g.key === activeGroup)!;
  const activities = data[activeGroup];

  function setActivities(updated: ActivityEntry[]) {
    updateGroupActivities(activeGroup, updated);
  }

  function startEdit(a: ActivityEntry) {
    setEditingId(a.id);
    setForm({ title: a.title, desc: a.desc, imageUrl: a.imageUrl });
    setAddingNew(false);
  }

  function saveEdit() {
    const updated = activities.map((a) =>
      a.id === editingId ? { ...a, ...form } : a
    );
    setActivities(updated);
    setEditingId(null);
  }

  function deleteActivity(id: number) {
    setActivities(activities.filter((a) => a.id !== id));
    if (editingId === id) setEditingId(null);
  }

  function moveUp(idx: number) {
    if (idx === 0) return;
    const arr = [...activities];
    [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
    setActivities(arr);
  }

  function moveDown(idx: number) {
    if (idx === activities.length - 1) return;
    const arr = [...activities];
    [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
    setActivities(arr);
  }

  function addActivity() {
    const entry: ActivityEntry = {
      ...newForm,
      id: activities.length > 0 ? Math.max(...activities.map((a) => a.id)) + 1 : 1,
    };
    setActivities([...activities, entry]);
    setAddingNew(false);
    setNewForm(BLANK_ACTIVITY);
  }

  // Reset editing state when group changes
  function selectGroup(key: GroupKey) {
    setActiveGroup(key);
    setEditingId(null);
    setAddingNew(false);
    setNewForm(BLANK_ACTIVITY);
  }

  return (
    <div>
      <SectionHeader
        title="Group Activities"
        subtitle="Manage activity cards shown in each group's page. Add photos, titles, and descriptions for WHG, HRDS, CWG, FSEDS, and LAC."
      />

      {/* Group selector */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.75rem", flexWrap: "wrap" }}>
        {GROUP_META.map(({ key, label, color }) => (
          <button
            key={key}
            onClick={() => selectGroup(key)}
            style={{
              padding: "0.45rem 1.1rem",
              fontSize: "0.78rem",
              fontWeight: 700,
              borderRadius: "999px",
              border: "2px solid",
              cursor: "pointer",
              borderColor: activeGroup === key ? color : "#e2e8f0",
              backgroundColor: activeGroup === key ? color : "transparent",
              color: activeGroup === key ? "#fff" : "#64748b",
              transition: "all 0.15s",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Activities list */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {activities.map((a, idx) => (
          <div
            key={a.id}
            style={{
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: "0.75rem",
              overflow: "hidden",
            }}
          >
            {/* Card header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem 1rem",
                borderBottom: editingId === a.id ? "1px solid #e2e8f0" : "none",
              }}
            >
              {/* Thumbnail */}
              <div style={{ width: "64px", height: "48px", borderRadius: "0.4rem", overflow: "hidden", flexShrink: 0, background: group.bg, border: `1px solid ${group.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {a.imageUrl ? (
                  <img src={a.imageUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                ) : (
                  <Image size={20} color={group.color} style={{ opacity: 0.35 }} />
                )}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: "0.83rem", fontWeight: 600, color: "#0f1e4a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {a.title || "(Untitled)"}
                </p>
                <p style={{ fontSize: "0.72rem", color: "#94a3b8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {a.desc || "(No description)"}
                </p>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                <button onClick={() => moveUp(idx)} disabled={idx === 0} style={iconBtnStyle(idx === 0)}><ChevronUp size={14} /></button>
                <button onClick={() => moveDown(idx)} disabled={idx === activities.length - 1} style={iconBtnStyle(idx === activities.length - 1)}><ChevronDown size={14} /></button>
                <button onClick={() => editingId === a.id ? setEditingId(null) : startEdit(a)} style={iconBtnStyle(false)}>
                  {editingId === a.id ? <X size={14} /> : <Edit3 size={14} />}
                </button>
                <button onClick={() => deleteActivity(a.id)} style={{ ...iconBtnStyle(false), color: "#dc2626" }}><Trash2 size={14} /></button>
              </div>
            </div>

            {/* Inline edit form */}
            {editingId === a.id && (
              <div style={{ padding: "1rem", background: "#f8fafc" }}>
                <FieldGroup label="Title">
                  <Input value={form.title} onChange={(val) => setForm((f) => ({ ...f, title: val }))} placeholder="Activity title" />
                </FieldGroup>
                <FieldGroup label="Description">
                  <Textarea value={form.desc} onChange={(val) => setForm((f) => ({ ...f, desc: val }))} placeholder="Short description of the activity..." rows={2} />
                </FieldGroup>
                <FieldGroup label="Photo URL">
                  <Input value={form.imageUrl} onChange={(val) => setForm((f) => ({ ...f, imageUrl: val }))} placeholder="https://example.com/photo.jpg (leave blank for placeholder)" />
                </FieldGroup>
                {form.imageUrl && (
                  <div style={{ width: "120px", height: "80px", borderRadius: "0.4rem", overflow: "hidden", marginBottom: "0.75rem", background: "#f1f5f9" }}>
                    <img src={form.imageUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  </div>
                )}
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button onClick={saveEdit} style={primaryBtnStyle}><Check size={13} /> Save</button>
                  <button onClick={() => setEditingId(null)} style={secondaryBtnStyle}><X size={13} /> Cancel</button>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Add new activity */}
        {addingNew ? (
          <div style={{ background: "#fff", border: `2px dashed ${group.color}`, borderRadius: "0.75rem", padding: "1.25rem" }}>
            <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0f1e4a", marginBottom: "1rem" }}>New Activity</p>
            <FieldGroup label="Title">
              <Input value={newForm.title} onChange={(val) => setNewForm((f) => ({ ...f, title: val }))} placeholder="Activity title" />
            </FieldGroup>
            <FieldGroup label="Description">
              <Textarea value={newForm.desc} onChange={(val) => setNewForm((f) => ({ ...f, desc: val }))} placeholder="Short description of the activity..." rows={2} />
            </FieldGroup>
            <FieldGroup label="Photo URL">
              <Input value={newForm.imageUrl} onChange={(val) => setNewForm((f) => ({ ...f, imageUrl: val }))} placeholder="https://example.com/photo.jpg (leave blank for placeholder)" />
            </FieldGroup>
            {newForm.imageUrl && (
              <div style={{ width: "120px", height: "80px", borderRadius: "0.4rem", overflow: "hidden", marginBottom: "0.75rem", background: "#f1f5f9" }}>
                <img src={newForm.imageUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              </div>
            )}
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
              <button onClick={addActivity} style={primaryBtnStyle}><Plus size={13} /> Add Activity</button>
              <button onClick={() => { setAddingNew(false); setNewForm(BLANK_ACTIVITY); }} style={secondaryBtnStyle}><X size={13} /> Cancel</button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => { setAddingNew(true); setEditingId(null); }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", padding: "0.75rem", border: "2px dashed #cbd5e1", borderRadius: "0.75rem", background: "transparent", color: "#64748b", fontSize: "0.83rem", fontWeight: 600, cursor: "pointer", width: "100%" }}
          >
            <Plus size={16} /> Add Activity
          </button>
        )}
      </div>
    </div>
  );
}

// ── Shared button styles ──────────────────────────────────────────────────────

function iconBtnStyle(disabled: boolean): React.CSSProperties {
  return {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "28px",
    height: "28px",
    borderRadius: "0.375rem",
    border: "1px solid #e2e8f0",
    background: "transparent",
    color: disabled ? "#cbd5e1" : "#475569",
    cursor: disabled ? "not-allowed" : "pointer",
    padding: 0,
  };
}

const primaryBtnStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.35rem",
  padding: "0.5rem 1rem",
  backgroundColor: "#1a3270",
  color: "#fff",
  fontSize: "0.8rem",
  fontWeight: 600,
  border: "none",
  borderRadius: "0.4rem",
  cursor: "pointer",
};

const secondaryBtnStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.35rem",
  padding: "0.5rem 1rem",
  backgroundColor: "transparent",
  color: "#64748b",
  fontSize: "0.8rem",
  fontWeight: 600,
  border: "1.5px solid #e2e8f0",
  borderRadius: "0.4rem",
  cursor: "pointer",
};

// ── Tab: Team ─────────────────────────────────────────────────────────────────

type BoardForm  = Omit<BoardMember,  "id">;
type MemberForm = Omit<TeamMember, "id">;
const BLANK_BOARD:  BoardForm  = { name: "", role: "", badge: "", color: "#1a3270" };
const BLANK_MEMBER: MemberForm = { name: "", role: "", color: "#4a90d9" };

const COLOR_PRESETS = [
  "#1a3270","#2563eb","#4a90d9","#0891b2","#059669",
  "#2ecc71","#e74c3c","#f39c12","#9b59b6","#7c3aed","#d97706",
];

function ColorPicker({ value, onChange }: { value: string; onChange: (c: string) => void }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexWrap: "wrap" }}>
      {COLOR_PRESETS.map((c) => (
        <button
          key={c}
          title={c}
          onClick={() => onChange(c)}
          style={{
            width: "22px", height: "22px", borderRadius: "50%",
            background: c, border: value === c ? "3px solid #0f1e4a" : "2px solid transparent",
            cursor: "pointer", flexShrink: 0,
          }}
        />
      ))}
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        title="Custom colour"
        style={{ width: "28px", height: "28px", border: "none", background: "none", cursor: "pointer", padding: 0 }}
      />
    </div>
  );
}

function TeamTab() {
  const { data, updateBoard, updateMembers } = useTeamData();
  const [board,   setBoard]   = useState<BoardMember[]>(data.board);
  const [members, setMembers] = useState<TeamMember[]>(data.members);
  useEffect(() => setBoard(data.board), [data.board]);
  useEffect(() => setMembers(data.members), [data.members]);

  // board state
  const [boardEditId,  setBoardEditId]  = useState<number | null>(null);
  const [boardForm,    setBoardForm]    = useState<BoardForm>(BLANK_BOARD);
  const [addingBoard,  setAddingBoard]  = useState(false);
  const [newBoardForm, setNewBoardForm] = useState<BoardForm>(BLANK_BOARD);

  // member state
  const [memberEditId,  setMemberEditId]  = useState<number | null>(null);
  const [memberForm,    setMemberForm]    = useState<MemberForm>(BLANK_MEMBER);
  const [addingMember,  setAddingMember]  = useState(false);
  const [newMemberForm, setNewMemberForm] = useState<MemberForm>(BLANK_MEMBER);

  // ── Board helpers ──────────────────────────────────────────────────────────
  function startEditBoard(b: BoardMember) {
    setBoardEditId(b.id);
    setBoardForm({ name: b.name, role: b.role, badge: b.badge, color: b.color });
    setAddingBoard(false);
  }
  function saveEditBoard() {
    const updated = board.map((b) => b.id === boardEditId ? { ...b, ...boardForm } : b);
    setBoard(updated); updateBoard(updated); setBoardEditId(null);
  }
  function deleteBoard(id: number) {
    const updated = board.filter((b) => b.id !== id);
    setBoard(updated); updateBoard(updated);
    if (boardEditId === id) setBoardEditId(null);
  }
  function addBoard() {
    const entry: BoardMember = { ...newBoardForm, id: nextId(board) };
    const updated = [...board, entry];
    setBoard(updated); updateBoard(updated);
    setAddingBoard(false); setNewBoardForm(BLANK_BOARD);
  }

  // ── Member helpers ─────────────────────────────────────────────────────────
  function startEditMember(m: TeamMember) {
    setMemberEditId(m.id);
    setMemberForm({ name: m.name, role: m.role, color: m.color });
    setAddingMember(false);
  }
  function saveEditMember() {
    const updated = members.map((m) => m.id === memberEditId ? { ...m, ...memberForm } : m);
    setMembers(updated); updateMembers(updated); setMemberEditId(null);
  }
  function deleteMember(id: number) {
    const updated = members.filter((m) => m.id !== id);
    setMembers(updated); updateMembers(updated);
    if (memberEditId === id) setMemberEditId(null);
  }
  function moveMemberUp(idx: number) {
    if (idx === 0) return;
    const arr = [...members]; [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
    setMembers(arr); updateMembers(arr);
  }
  function moveMemberDown(idx: number) {
    if (idx === members.length - 1) return;
    const arr = [...members]; [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
    setMembers(arr); updateMembers(arr);
  }
  function addMember() {
    const entry: TeamMember = { ...newMemberForm, id: nextId(members) };
    const updated = [...members, entry];
    setMembers(updated); updateMembers(updated);
    setAddingMember(false); setNewMemberForm(BLANK_MEMBER);
  }

  const subHead: React.CSSProperties = {
    fontSize: "0.82rem", fontWeight: 700, color: "#0f1e4a",
    margin: "1.5rem 0 0.75rem", paddingBottom: "0.4rem",
    borderBottom: "1px solid #e2e8f0",
  };
  const avatarDot = (color: string) => ({
    width: "32px", height: "32px", borderRadius: "8px",
    background: color, flexShrink: 0,
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "#fff", fontSize: "0.7rem", fontWeight: 700,
  });

  return (
    <div>
      <SectionHeader
        title="Meet Our Team"
        subtitle="Manage Board Committee Cum Chairman members and the general team shown on the About Us page."
      />

      {/* ── Board Committee ── */}
      <p style={subHead}>Board Committee Cum Chairman</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {board.map((b) => {
          const initials = b.name.split(" ").map((w) => w[0]).join("").slice(0, 2);
          return (
            <div key={b.id} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "0.75rem", overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.7rem 1rem", borderBottom: boardEditId === b.id ? "1px solid #e2e8f0" : "none" }}>
                <div style={avatarDot(b.color)}>{initials}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: "0.83rem", fontWeight: 700, color: "#0f1e4a" }}>{b.name || "(No name)"}</p>
                  <p style={{ fontSize: "0.72rem", color: "#64748b" }}>{b.role} · <span style={{ fontWeight: 600, color: "#1a3270" }}>{b.badge}</span></p>
                </div>
                <div style={{ display: "flex", gap: "0.3rem" }}>
                  <button onClick={() => boardEditId === b.id ? setBoardEditId(null) : startEditBoard(b)} style={iconBtnStyle(false)}>
                    {boardEditId === b.id ? <X size={14} /> : <Edit3 size={14} />}
                  </button>
                  <button onClick={() => deleteBoard(b.id)} style={{ ...iconBtnStyle(false), color: "#dc2626" }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              {boardEditId === b.id && (
                <div style={{ padding: "1rem", background: "#f8fafc" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                    <FieldGroup label="Name">
                      <Input value={boardForm.name} onChange={(v) => setBoardForm((f) => ({ ...f, name: v }))} placeholder="Full name" />
                    </FieldGroup>
                    <FieldGroup label="Role / Title">
                      <Input value={boardForm.role} onChange={(v) => setBoardForm((f) => ({ ...f, role: v }))} placeholder="e.g. Chairman" />
                    </FieldGroup>
                  </div>
                  <FieldGroup label="Badge Label">
                    <Input value={boardForm.badge} onChange={(v) => setBoardForm((f) => ({ ...f, badge: v }))} placeholder="e.g. Chairman" />
                  </FieldGroup>
                  <FieldGroup label="Avatar Colour">
                    <ColorPicker value={boardForm.color} onChange={(c) => setBoardForm((f) => ({ ...f, color: c }))} />
                  </FieldGroup>
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                    <button onClick={saveEditBoard} style={primaryBtnStyle}><Check size={13} /> Save</button>
                    <button onClick={() => setBoardEditId(null)} style={secondaryBtnStyle}><X size={13} /> Cancel</button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {addingBoard ? (
          <div style={{ background: "#fff", border: "2px dashed #1a3270", borderRadius: "0.75rem", padding: "1.25rem" }}>
            <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0f1e4a", marginBottom: "1rem" }}>New Board Member</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <FieldGroup label="Name">
                <Input value={newBoardForm.name} onChange={(v) => setNewBoardForm((f) => ({ ...f, name: v }))} placeholder="Full name" />
              </FieldGroup>
              <FieldGroup label="Role / Title">
                <Input value={newBoardForm.role} onChange={(v) => setNewBoardForm((f) => ({ ...f, role: v }))} placeholder="e.g. Chairman" />
              </FieldGroup>
            </div>
            <FieldGroup label="Badge Label">
              <Input value={newBoardForm.badge} onChange={(v) => setNewBoardForm((f) => ({ ...f, badge: v }))} placeholder="e.g. Chairman" />
            </FieldGroup>
            <FieldGroup label="Avatar Colour">
              <ColorPicker value={newBoardForm.color} onChange={(c) => setNewBoardForm((f) => ({ ...f, color: c }))} />
            </FieldGroup>
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
              <button onClick={addBoard} style={primaryBtnStyle}><Plus size={13} /> Add Member</button>
              <button onClick={() => { setAddingBoard(false); setNewBoardForm(BLANK_BOARD); }} style={secondaryBtnStyle}><X size={13} /> Cancel</button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => { setAddingBoard(true); setBoardEditId(null); }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", padding: "0.7rem", border: "2px dashed #cbd5e1", borderRadius: "0.75rem", background: "transparent", color: "#64748b", fontSize: "0.83rem", fontWeight: 600, cursor: "pointer", width: "100%" }}
          >
            <Plus size={16} /> Add Board Member
          </button>
        )}
      </div>

      {/* ── Team Members ── */}
      <p style={subHead}>Team Members</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {members.map((m, idx) => {
          const initials = m.name.split(" ").map((w) => w[0]).join("").slice(0, 2);
          return (
            <div key={m.id} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "0.75rem", overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.7rem 1rem", borderBottom: memberEditId === m.id ? "1px solid #e2e8f0" : "none" }}>
                <div style={avatarDot(m.color)}>{initials}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: "0.83rem", fontWeight: 700, color: "#0f1e4a" }}>{m.name || "(No name)"}</p>
                  <p style={{ fontSize: "0.72rem", color: "#64748b" }}>{m.role}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  <button onClick={() => moveMemberUp(idx)} disabled={idx === 0} style={iconBtnStyle(idx === 0)}><ChevronUp size={14} /></button>
                  <button onClick={() => moveMemberDown(idx)} disabled={idx === members.length - 1} style={iconBtnStyle(idx === members.length - 1)}><ChevronDown size={14} /></button>
                  <button onClick={() => memberEditId === m.id ? setMemberEditId(null) : startEditMember(m)} style={iconBtnStyle(false)}>
                    {memberEditId === m.id ? <X size={14} /> : <Edit3 size={14} />}
                  </button>
                  <button onClick={() => deleteMember(m.id)} style={{ ...iconBtnStyle(false), color: "#dc2626" }}><Trash2 size={14} /></button>
                </div>
              </div>
              {memberEditId === m.id && (
                <div style={{ padding: "1rem", background: "#f8fafc" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                    <FieldGroup label="Name">
                      <Input value={memberForm.name} onChange={(v) => setMemberForm((f) => ({ ...f, name: v }))} placeholder="Full name" />
                    </FieldGroup>
                    <FieldGroup label="Role / Title">
                      <Input value={memberForm.role} onChange={(v) => setMemberForm((f) => ({ ...f, role: v }))} placeholder="e.g. Programs Manager" />
                    </FieldGroup>
                  </div>
                  <FieldGroup label="Avatar Colour">
                    <ColorPicker value={memberForm.color} onChange={(c) => setMemberForm((f) => ({ ...f, color: c }))} />
                  </FieldGroup>
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                    <button onClick={saveEditMember} style={primaryBtnStyle}><Check size={13} /> Save</button>
                    <button onClick={() => setMemberEditId(null)} style={secondaryBtnStyle}><X size={13} /> Cancel</button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {addingMember ? (
          <div style={{ background: "#fff", border: "2px dashed #1a3270", borderRadius: "0.75rem", padding: "1.25rem" }}>
            <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0f1e4a", marginBottom: "1rem" }}>New Team Member</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <FieldGroup label="Name">
                <Input value={newMemberForm.name} onChange={(v) => setNewMemberForm((f) => ({ ...f, name: v }))} placeholder="Full name" />
              </FieldGroup>
              <FieldGroup label="Role / Title">
                <Input value={newMemberForm.role} onChange={(v) => setNewMemberForm((f) => ({ ...f, role: v }))} placeholder="e.g. Programs Manager" />
              </FieldGroup>
            </div>
            <FieldGroup label="Avatar Colour">
              <ColorPicker value={newMemberForm.color} onChange={(c) => setNewMemberForm((f) => ({ ...f, color: c }))} />
            </FieldGroup>
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
              <button onClick={addMember} style={primaryBtnStyle}><Plus size={13} /> Add Member</button>
              <button onClick={() => { setAddingMember(false); setNewMemberForm(BLANK_MEMBER); }} style={secondaryBtnStyle}><X size={13} /> Cancel</button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => { setAddingMember(true); setMemberEditId(null); }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", padding: "0.7rem", border: "2px dashed #cbd5e1", borderRadius: "0.75rem", background: "transparent", color: "#64748b", fontSize: "0.83rem", fontWeight: 600, cursor: "pointer", width: "100%" }}
          >
            <Plus size={16} /> Add Team Member
          </button>
        )}
      </div>
    </div>
  );
}

// ── Tab: Notifications (Notices & Announcements) ──────────────────────────────

const NOTICE_CATEGORIES: NoticeCategory[] = ["Announcement", "Event", "Update", "Reminder"];

const NOTICE_CATEGORY_COLORS: Record<NoticeCategory, { bg: string; text: string }> = {
  Announcement: { bg: "#dbeafe", text: "#1d4ed8" },
  Event: { bg: "#dcfce7", text: "#15803d" },
  Update: { bg: "#fef9c3", text: "#a16207" },
  Reminder: { bg: "#fce7f3", text: "#be185d" },
};

type NoticeFormData = Omit<NoticeEntry, "id">;
const BLANK_NOTICE: NoticeFormData = {
  title: "",
  category: "Announcement",
  date: "",
  summary: "",
  body: "",
};

function NoticeCategorySelect({
  value,
  onChange,
}: {
  value: NoticeCategory;
  onChange: (v: NoticeCategory) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as NoticeCategory)}
      style={{
        width: "100%",
        padding: "0.55rem 0.75rem",
        fontSize: "0.83rem",
        border: "1.5px solid #e2e8f0",
        borderRadius: "0.4rem",
        color: "#1e293b",
        backgroundColor: "#f8fafc",
        outline: "none",
        cursor: "pointer",
      }}
    >
      {NOTICE_CATEGORIES.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  );
}

function NotificationsTab() {
  const { notices, loading, updateNotices } = useNoticeData();
  const [items, setItems] = useState<NoticeEntry[]>(notices);
  useEffect(() => setItems(notices), [notices]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<NoticeFormData>(BLANK_NOTICE);
  const [addingNew, setAddingNew] = useState(false);
  const [newForm, setNewForm] = useState<NoticeFormData>(BLANK_NOTICE);

  function startEdit(n: NoticeEntry) {
    setEditingId(n.id);
    setForm({ title: n.title, category: n.category, date: n.date, summary: n.summary, body: n.body });
    setAddingNew(false);
  }

  function saveEdit() {
    const updated = items.map((n) => (n.id === editingId ? { ...n, ...form } : n));
    setItems(updated);
    updateNotices(updated);
    setEditingId(null);
  }

  function deleteNotice(id: number) {
    const updated = items.filter((n) => n.id !== id);
    setItems(updated);
    updateNotices(updated);
    if (editingId === id) setEditingId(null);
  }

  function moveUp(idx: number) {
    if (idx === 0) return;
    const arr = [...items];
    [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
    setItems(arr);
    updateNotices(arr);
  }

  function moveDown(idx: number) {
    if (idx === items.length - 1) return;
    const arr = [...items];
    [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
    setItems(arr);
    updateNotices(arr);
  }

  function addNotice() {
    const entry: NoticeEntry = { ...newForm, id: nextId(items) };
    const updated = [...items, entry];
    setItems(updated);
    updateNotices(updated);
    setAddingNew(false);
    setNewForm(BLANK_NOTICE);
  }

  return (
    <div>
      <SectionHeader
        title="Notifications — Notices & Announcements"
        subtitle="Manage the notices and announcements shown on the Notices page. Add, edit, reorder, or remove entries."
      />

      {loading && <p style={{ fontSize: "0.85rem", color: "#94a3b8" }}>Loading...</p>}

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {items.map((n, idx) => {
          const cat = NOTICE_CATEGORY_COLORS[n.category];
          return (
            <div
              key={n.id}
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "0.75rem",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.75rem 1rem",
                  borderBottom: editingId === n.id ? "1px solid #e2e8f0" : "none",
                }}
              >
                <span
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    backgroundColor: cat.bg,
                    color: cat.text,
                    padding: "0.2rem 0.6rem",
                    borderRadius: "999px",
                    flexShrink: 0,
                  }}
                >
                  {n.category}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontSize: "0.83rem",
                      fontWeight: 600,
                      color: "#0f1e4a",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {n.title || "(Untitled)"}
                  </p>
                  <p style={{ fontSize: "0.72rem", color: "#94a3b8" }}>
                    <Calendar size={11} style={{ display: "inline", marginRight: "0.25rem", verticalAlign: "middle" }} />
                    {n.date ? formatNoticeDate(n.date) : "(No date)"}
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  <button onClick={() => moveUp(idx)} disabled={idx === 0} style={iconBtnStyle(idx === 0)}>
                    <ChevronUp size={14} />
                  </button>
                  <button onClick={() => moveDown(idx)} disabled={idx === items.length - 1} style={iconBtnStyle(idx === items.length - 1)}>
                    <ChevronDown size={14} />
                  </button>
                  <button onClick={() => (editingId === n.id ? setEditingId(null) : startEdit(n))} style={iconBtnStyle(false)}>
                    {editingId === n.id ? <X size={14} /> : <Edit3 size={14} />}
                  </button>
                  <button onClick={() => deleteNotice(n.id)} style={{ ...iconBtnStyle(false), color: "#dc2626" }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {editingId === n.id && (
                <div style={{ padding: "1rem", background: "#f8fafc" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                    <FieldGroup label="Title">
                      <Input value={form.title} onChange={(v) => setForm((f) => ({ ...f, title: v }))} placeholder="Notice title" />
                    </FieldGroup>
                    <FieldGroup label="Date">
                      <Input type="date" value={form.date} onChange={(v) => setForm((f) => ({ ...f, date: v }))} />
                    </FieldGroup>
                  </div>
                  <FieldGroup label="Category">
                    <NoticeCategorySelect value={form.category} onChange={(v) => setForm((f) => ({ ...f, category: v }))} />
                  </FieldGroup>
                  <FieldGroup label="Summary">
                    <Textarea value={form.summary} onChange={(v) => setForm((f) => ({ ...f, summary: v }))} placeholder="Short summary shown in the list..." rows={2} />
                  </FieldGroup>
                  <FieldGroup label="Full Details">
                    <Textarea value={form.body} onChange={(v) => setForm((f) => ({ ...f, body: v }))} placeholder="Full notice details shown when expanded..." rows={4} />
                  </FieldGroup>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button onClick={saveEdit} style={primaryBtnStyle}><Check size={13} /> Save</button>
                    <button onClick={() => setEditingId(null)} style={secondaryBtnStyle}><X size={13} /> Cancel</button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {addingNew ? (
          <div style={{ background: "#fff", border: "2px dashed #1a3270", borderRadius: "0.75rem", padding: "1.25rem" }}>
            <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0f1e4a", marginBottom: "1rem" }}>New Notice</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <FieldGroup label="Title">
                <Input value={newForm.title} onChange={(v) => setNewForm((f) => ({ ...f, title: v }))} placeholder="Notice title" />
              </FieldGroup>
              <FieldGroup label="Date">
                <Input type="date" value={newForm.date} onChange={(v) => setNewForm((f) => ({ ...f, date: v }))} />
              </FieldGroup>
            </div>
            <FieldGroup label="Category">
              <NoticeCategorySelect value={newForm.category} onChange={(v) => setNewForm((f) => ({ ...f, category: v }))} />
            </FieldGroup>
            <FieldGroup label="Summary">
              <Textarea value={newForm.summary} onChange={(v) => setNewForm((f) => ({ ...f, summary: v }))} placeholder="Short summary shown in the list..." rows={2} />
            </FieldGroup>
            <FieldGroup label="Full Details">
              <Textarea value={newForm.body} onChange={(v) => setNewForm((f) => ({ ...f, body: v }))} placeholder="Full notice details shown when expanded..." rows={4} />
            </FieldGroup>
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
              <button onClick={addNotice} style={primaryBtnStyle}><Plus size={13} /> Add Notice</button>
              <button onClick={() => { setAddingNew(false); setNewForm(BLANK_NOTICE); }} style={secondaryBtnStyle}><X size={13} /> Cancel</button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => { setAddingNew(true); setEditingId(null); }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", padding: "0.75rem", border: "2px dashed #cbd5e1", borderRadius: "0.75rem", background: "transparent", color: "#64748b", fontSize: "0.83rem", fontWeight: 600, cursor: "pointer", width: "100%" }}
          >
            <Plus size={16} /> Add Notice
          </button>
        )}
      </div>
    </div>
  );
}

// ── Tab definitions ───────────────────────────────────────────────────────────

type TabId = "hero" | "videos" | "gallery" | "impact" | "stories" | "activities" | "team";

const HOME_PAGE_TABS: { id: TabId; label: string; Icon: React.ElementType }[] = [
  { id: "hero",       label: "Hero Image",        Icon: Image },
  { id: "videos",     label: "Watch Our Story",    Icon: Video },
  { id: "gallery",    label: "Moments of Change",  Icon: LayoutGrid },
  { id: "impact",     label: "Our Impact",         Icon: BarChart2 },
  { id: "stories",    label: "Stories of Change",  Icon: MessageSquare },
  { id: "activities", label: "Group Activities",   Icon: Users },
  { id: "team",       label: "Meet Our Team",      Icon: Users },
];

type ActiveView =
  | { kind: "home"; id: TabId }
  | { kind: "page"; slug: string }
  | { kind: "notifications" }
  | { kind: "rawPhotos" }
  | { kind: "whgGallery" }
  | { kind: "settings" };

// ── Tab: Account Settings ─────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.6rem 0.85rem",
  fontSize: "0.85rem",
  border: "1.5px solid #e2e8f0",
  borderRadius: "0.5rem",
  outline: "none",
  color: "#1e293b",
  backgroundColor: "#f8fafc",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.78rem",
  fontWeight: 600,
  color: "#374151",
  marginBottom: "0.4rem",
};

// ── Tab: Pages ────────────────────────────────────────────────────────────────

const PAGES: { slug: string; title: string }[] = [
  { slug: "whg", title: "Work for Humanity Group" },
  { slug: "hrds", title: "Human Resources Developmental Society" },
  { slug: "cwg", title: "Competitive World Group" },
  { slug: "fseds", title: "Foundation for Socio-Economic Development Society" },
  { slug: "lac", title: "Legal Aid Club" },
  { slug: "about-us", title: "About Us" },
  { slug: "impact", title: "Impact" },
  { slug: "get-involved", title: "Get Involved" },
  { slug: "contact", title: "Contact" },
  { slug: "causes", title: "Causes" },
  { slug: "donate", title: "Donate" },
  { slug: "stories", title: "Stories" },
];

const PAGE_SECTION_LABELS: Record<string, string> = {
  "whg-hero": "Hero Section",
  "whg-mission": "Mission Section",
  "whg-cta": "Get Involved (CTA)",
  "whg-activities": "Activities Section",
  "whg-communities": "Communities Section",
  "hrds-hero": "Hero Section",
  "hrds-mission": "Mission Section",
  "hrds-cta": "Get Involved (CTA)",
  "hrds-activities": "Activities Section",
  "hrds-communities": "Communities Section",
  "cwg-hero": "Hero Section",
  "cwg-mission": "Mission Section",
  "cwg-cta": "Get Involved (CTA)",
  "cwg-activities": "Activities Section",
  "cwg-communities": "Communities Section",
  "fseds-hero": "Hero Section",
  "fseds-mission": "Mission Section",
  "fseds-cta": "Get Involved (CTA)",
  "fseds-activities": "Activities Section",
  "fseds-communities": "Communities Section",
  "lac-hero": "Hero Section",
  "lac-mission": "What We Do Section",
  "lac-cta": "Get Involved (CTA)",
  "lac-activities": "Activities Section",
  "lac-communities": "Communities Section",
  "lac-camps": "Legal Awareness Camps Section",
  "lac-impact": "Impact Section",
  "lac-contact": "Contact Section",
  "about-hero": "Hero Section",
  "about-story": "Our Story Section",
  "about-objectives": "Objectives Section",
  "about-societies": "Societies Section",
  "about-values": "Values Section",
  "about-team": "Team Section",
  "impact-hero": "Hero Section",
  "impact-numbers": "Numbers Section",
  "impact-areas": "Focus Areas Section",
  "impact-timeline": "Timeline Section",
  "impact-testimonials": "Testimonials Section",
  "impact-cta": "Get Involved (CTA)",
  "gi-hero": "Hero Section",
  "gi-ways": "Ways to Help Section",
  "gi-volunteer": "Volunteer Section",
  "gi-donate": "Donate Section",
  "gi-spread": "Spread the Word Section",
  "contact-hero": "Hero Section",
  "contact-form": "Contact Form Section",
  "causes-hero": "Hero Section",
  "donate-hero": "Hero Section",
  "donate-impact": "Impact Section",
  "donate-form": "Donation Form Section",
  "donate-faq": "FAQ Section",
  "stories-hero": "Hero Section",
};

function fieldLabel(key: string) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
}

function PagesTab({ activeSlug }: { activeSlug: string }) {
  const [sections, setSections] = useState<Section[] | null>(null);
  const [edits, setEdits] = useState<Record<number, Record<string, string>>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    setSections(null);
    api
      .get<{ sections: Section[] }>(`/pages/${activeSlug}`)
      .then((page) => {
        setSections(page.sections);
        setEdits(Object.fromEntries(page.sections.map((s) => [s.id, { ...s.data }])));
      })
      .catch(() => setError("Could not load this page. It may not be seeded yet."))
      .finally(() => setLoading(false));
  }, [activeSlug]);

  function setField(sectionId: number, key: string, value: string) {
    setEdits((prev) => ({ ...prev, [sectionId]: { ...prev[sectionId], [key]: value } }));
  }

  function save(sectionId: number) {
    void api.patch(`/sections/${sectionId}`, { data: edits[sectionId] });
  }

  const activeTitle = PAGES.find((p) => p.slug === activeSlug)?.title ?? activeSlug;

  return (
    <div>
      <SectionHeader
        title={`${activeTitle} Page`}
        subtitle={`Edit the text content for each section of the ${activeTitle} page.`}
      />

      {error && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            backgroundColor: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#b91c1c",
            borderRadius: "0.5rem",
            padding: "0.75rem 1rem",
            fontSize: "0.8rem",
            marginBottom: "1.25rem",
            maxWidth: "640px",
          }}
        >
          <AlertCircle size={15} style={{ flexShrink: 0 }} />
          {error}
        </div>
      )}

      {loading && <p style={{ fontSize: "0.85rem", color: "#94a3b8" }}>Loading...</p>}

      {sections?.map((section) => (
        <div
          key={section.id}
          style={{
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: "0.75rem",
            padding: "1.5rem",
            maxWidth: "640px",
            marginBottom: "1.5rem",
          }}
        >
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f1e4a", marginBottom: "1rem" }}>
            {PAGE_SECTION_LABELS[section.type] ?? section.type}
          </h3>

          {Object.keys(section.data).map((key) =>
            key.toLowerCase().includes("description") ? (
              <FieldGroup key={key} label={fieldLabel(key)}>
                <Textarea
                  value={edits[section.id]?.[key] ?? ""}
                  onChange={(v) => setField(section.id, key, v)}
                />
              </FieldGroup>
            ) : (
              <FieldGroup key={key} label={fieldLabel(key)}>
                <Input
                  value={edits[section.id]?.[key] ?? ""}
                  onChange={(v) => setField(section.id, key, v)}
                />
              </FieldGroup>
            ),
          )}

          <SaveBtn onClick={() => save(section.id)} />
        </div>
      ))}
    </div>
  );
}

function SettingsTab() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!currentPassword) {
      setError("Please enter your current password.");
      return;
    }
    if (!newEmail && !newPassword) {
      setError("Enter a new email and/or a new password.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("pg_admin_token");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword,
          ...(newEmail ? { email: newEmail } : {}),
          ...(newPassword ? { password: newPassword } : {}),
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data?.error?.message ?? "Unable to update account.");
        return;
      }

      localStorage.setItem("pg_admin_token", data.data.token);
      setSuccess("Account updated successfully.");
      setCurrentPassword("");
      setNewEmail("");
      setNewPassword("");
    } catch {
      setError("Unable to reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <SectionHeader
        title="Account Settings"
        subtitle="Update the admin login email and/or password. Your current password is required to confirm any change."
      />

      {error && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            backgroundColor: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#b91c1c",
            borderRadius: "0.5rem",
            padding: "0.75rem 1rem",
            fontSize: "0.8rem",
            marginBottom: "1.25rem",
            maxWidth: "440px",
          }}
        >
          <AlertCircle size={15} style={{ flexShrink: 0 }} />
          {error}
        </div>
      )}

      {success && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            backgroundColor: "#f0fdf4",
            border: "1px solid #bbf7d0",
            color: "#15803d",
            borderRadius: "0.5rem",
            padding: "0.75rem 1rem",
            fontSize: "0.8rem",
            marginBottom: "1.25rem",
            maxWidth: "440px",
          }}
        >
          <Check size={15} style={{ flexShrink: 0 }} />
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem", maxWidth: "440px" }}>
        <div>
          <label style={labelStyle} htmlFor="new-email">New Email (optional)</label>
          <div style={{ position: "relative" }}>
            <Mail size={16} style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
            <input
              id="new-email"
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Leave blank to keep current email"
              autoComplete="email"
              style={{ ...inputStyle, paddingLeft: "2.5rem" }}
            />
          </div>
        </div>

        <div>
          <label style={labelStyle} htmlFor="new-password">New Password (optional)</label>
          <div style={{ position: "relative" }}>
            <Lock size={16} style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
            <input
              id="new-password"
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Leave blank to keep current password"
              autoComplete="new-password"
              style={{ ...inputStyle, paddingLeft: "2.5rem", paddingRight: "3rem" }}
            />
            <button
              type="button"
              onClick={() => setShowNew((v) => !v)}
              aria-label={showNew ? "Hide password" : "Show password"}
              style={{ position: "absolute", right: "0.85rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94a3b8", display: "flex" }}
            >
              {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div>
          <label style={labelStyle} htmlFor="current-password">Current Password</label>
          <div style={{ position: "relative" }}>
            <Lock size={16} style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
            <input
              id="current-password"
              type={showCurrent ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Required to confirm changes"
              autoComplete="current-password"
              style={{ ...inputStyle, paddingLeft: "2.5rem", paddingRight: "3rem" }}
            />
            <button
              type="button"
              onClick={() => setShowCurrent((v) => !v)}
              aria-label={showCurrent ? "Hide password" : "Show password"}
              style={{ position: "absolute", right: "0.85rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94a3b8", display: "flex" }}
            >
              {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            alignSelf: "flex-start",
            padding: "0.6rem 1.4rem",
            backgroundColor: loading ? "#93a8d4" : "#1a3270",
            color: "#fff",
            fontSize: "0.85rem",
            fontWeight: 600,
            border: "none",
            borderRadius: "0.5rem",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────

function NavGroupHeader({
  active,
  expanded,
  onClick,
  Icon,
  label,
  showChevron = true,
}: {
  active: boolean;
  expanded: boolean;
  onClick: () => void;
  Icon: React.ElementType;
  label: string;
  showChevron?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.65rem",
        width: "100%",
        padding: "0.65rem 0.85rem",
        borderRadius: "0.5rem",
        border: "none",
        background: active ? "rgba(255,255,255,0.12)" : "transparent",
        color: active ? "#fff" : "rgba(255,255,255,0.55)",
        fontSize: "0.8rem",
        fontWeight: active ? 600 : 400,
        cursor: "pointer",
        textAlign: "left",
        marginBottom: "0.15rem",
        transition: "background 0.15s, color 0.15s",
      }}
    >
      <Icon size={16} />
      <span style={{ flex: 1 }}>{label}</span>
      {showChevron && (expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
    </button>
  );
}

function NavSubItem({
  active,
  onClick,
  Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  Icon?: React.ElementType;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.6rem",
        width: "100%",
        padding: "0.55rem 0.85rem",
        borderRadius: "0.5rem",
        border: "none",
        background: active ? "rgba(255,255,255,0.12)" : "transparent",
        color: active ? "#fff" : "rgba(255,255,255,0.5)",
        fontSize: "0.76rem",
        fontWeight: active ? 600 : 400,
        cursor: "pointer",
        textAlign: "left",
        marginBottom: "0.1rem",
        transition: "background 0.15s, color 0.15s",
      }}
    >
      {Icon && <Icon size={13} />}
      <span
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
    </button>
  );
}

export default function AdminDashboard() {
  const [activeView, setActiveView] = useState<ActiveView>({ kind: "home", id: "hero" });
  const [expandedGroups, setExpandedGroups] = useState<{ home: boolean; pages: boolean }>({
    home: true,
    pages: false,
  });
  const navigate = useNavigate();

  function toggleGroup(group: "home" | "pages") {
    setExpandedGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  }

  const currentLabel =
    activeView.kind === "home"
      ? HOME_PAGE_TABS.find((t) => t.id === activeView.id)?.label
      : activeView.kind === "page"
      ? PAGES.find((p) => p.slug === activeView.slug)?.title
      : activeView.kind === "notifications"
      ? "Notifications"
      : activeView.kind === "rawPhotos"
      ? "Raw Photos"
      : activeView.kind === "whgGallery"
      ? "WHG Gallery"
      : "Account Settings";

  const currentCategory =
    activeView.kind === "home"
      ? "Home Page"
      : activeView.kind === "page"
      ? "Pages"
      : activeView.kind === "notifications"
      ? "Notifications"
      : activeView.kind === "rawPhotos" || activeView.kind === "whgGallery"
      ? "Media"
      : "Settings";

  function logout() {
    localStorage.removeItem("pg_admin_token");
    navigate("/projectG-admin");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: "#f1f5f9",
      }}
    >
      {/* ── Sidebar ── */}
      <aside
        style={{
          width: "240px",
          flexShrink: 0,
          background: "linear-gradient(180deg, #0f1e4a 0%, #1a3270 100%)",
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: "1.5rem 1.25rem",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <img
            src={Logo}
            alt="Project Generation"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid rgba(255,255,255,0.2)",
            }}
          />
          <div>
            <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>
              Project Generation
            </p>
            <p style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.5)" }}>
              Admin Dashboard
            </p>
          </div>
        </div>

        {/* Badge */}
        <div style={{ padding: "1rem 1.25rem 0.5rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
              backgroundColor: "rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.7)",
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              padding: "0.3rem 0.65rem",
              borderRadius: "999px",
            }}
          >
            <Shield size={10} />
            Home Page Editor
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "0.75rem 0.75rem", overflowY: "auto" }}>
          {/* Home Page group */}
          <NavGroupHeader
            active={activeView.kind === "home"}
            expanded={expandedGroups.home}
            onClick={() => toggleGroup("home")}
            Icon={Home}
            label="Home Page"
          />
          {expandedGroups.home && (
            <div style={{ paddingLeft: "1.1rem", marginBottom: "0.25rem" }}>
              {HOME_PAGE_TABS.map(({ id, label, Icon }) => (
                <NavSubItem
                  key={id}
                  active={activeView.kind === "home" && activeView.id === id}
                  onClick={() => setActiveView({ kind: "home", id })}
                  Icon={Icon}
                  label={label}
                />
              ))}
            </div>
          )}

          {/* Pages group */}
          <NavGroupHeader
            active={activeView.kind === "page"}
            expanded={expandedGroups.pages}
            onClick={() => toggleGroup("pages")}
            Icon={FileText}
            label="Pages"
          />
          {expandedGroups.pages && (
            <div style={{ paddingLeft: "1.1rem", marginBottom: "0.25rem" }}>
              {PAGES.map((p) => (
                <NavSubItem
                  key={p.slug}
                  active={activeView.kind === "page" && activeView.slug === p.slug}
                  onClick={() => setActiveView({ kind: "page", slug: p.slug })}
                  label={p.title}
                />
              ))}
            </div>
          )}

          {/* Notifications */}
          <NavGroupHeader
            active={activeView.kind === "notifications"}
            expanded={false}
            showChevron={false}
            onClick={() => setActiveView({ kind: "notifications" })}
            Icon={Bell}
            label="Notifications"
          />

          {/* Raw Photos */}
          <NavGroupHeader
            active={activeView.kind === "rawPhotos"}
            expanded={false}
            showChevron={false}
            onClick={() => setActiveView({ kind: "rawPhotos" })}
            Icon={Camera}
            label="Raw Photos"
          />

          {/* WHG Gallery */}
          <NavGroupHeader
            active={activeView.kind === "whgGallery"}
            expanded={false}
            showChevron={false}
            onClick={() => setActiveView({ kind: "whgGallery" })}
            Icon={Images}
            label="WHG Gallery"
          />

          {/* Account Settings */}
          <NavGroupHeader
            active={activeView.kind === "settings"}
            expanded={false}
            showChevron={false}
            onClick={() => setActiveView({ kind: "settings" })}
            Icon={Settings}
            label="Account Settings"
          />
        </nav>

        {/* Bottom actions */}
        <div
          style={{
            padding: "1rem 0.75rem",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <button
            onClick={logout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              width: "100%",
              padding: "0.6rem 0.85rem",
              borderRadius: "0.5rem",
              border: "none",
              background: "rgba(239,68,68,0.15)",
              color: "#fca5a5",
              fontSize: "0.75rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <LogOut size={13} /> Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main style={{ flex: 1, overflowY: "auto" }}>
        {/* Top bar */}
        <div
          style={{
            background: "#fff",
            borderBottom: "1px solid #e2e8f0",
            padding: "1rem 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <div>
            <p style={{ fontSize: "0.68rem", color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {currentCategory}
            </p>
            <h1 style={{ fontSize: "1rem", fontWeight: 700, color: "#0f1e4a" }}>
              {currentLabel}
            </h1>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.5rem 1rem",
              backgroundColor: "#f1f5f9",
              color: "#475569",
              fontSize: "0.78rem",
              fontWeight: 600,
              borderRadius: "0.4rem",
              textDecoration: "none",
              border: "1px solid #e2e8f0",
            }}
          >
            View Live Site ↗
          </a>
        </div>

        {/* Tab content */}
        <div style={{ padding: "2rem" }}>
          {activeView.kind === "home" && activeView.id === "hero" && <HeroTab />}
          {activeView.kind === "home" && activeView.id === "videos" && <VideoTab />}
          {activeView.kind === "home" && activeView.id === "gallery" && <GalleryTab />}
          {activeView.kind === "home" && activeView.id === "impact" && <ImpactTab />}
          {activeView.kind === "home" && activeView.id === "stories" && <StoriesTab />}
          {activeView.kind === "home" && activeView.id === "activities" && <GroupActivitiesTab />}
          {activeView.kind === "home" && activeView.id === "team" && <TeamTab />}
          {activeView.kind === "page" && <PagesTab activeSlug={activeView.slug} />}
          {activeView.kind === "notifications" && <NotificationsTab />}
          {activeView.kind === "rawPhotos" && <RawPhotosTab />}
          {activeView.kind === "whgGallery" && <WhgGalleryTab />}
          {activeView.kind === "settings" && <SettingsTab />}
        </div>
      </main>
    </div>
  );
}
