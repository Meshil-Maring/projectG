import { useRef, useState } from "react";
import { Upload, Link2, Loader2, AlertCircle, CheckCircle2, Image as ImageIcon } from "lucide-react";
import { uploadImageFile, uploadImageFromUrl } from "../../../lib/api";
import { ALLOWED_ACCEPT, IMAGE_SPECS, formatSpec, type ImageSpecKey } from "../../../lib/imageSpecs";

interface ImageUploadFieldProps {
  value: string;
  onChange: (url: string) => void;
  specKey: ImageSpecKey;
  label: string;
  previewHeight?: number;
}

type Status = { type: "idle" | "loading" | "error" | "success"; message?: string };

export function ImageUploadField({ value, onChange, specKey, label, previewHeight = 160 }: ImageUploadFieldProps) {
  const spec = IMAGE_SPECS[specKey];
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const [urlInput, setUrlInput] = useState("");
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (fileInputRef.current) fileInputRef.current.value = "";

    setStatus({ type: "loading" });
    try {
      const result = await uploadImageFile(file, specKey, value || undefined);
      onChange(result.url);
      setStatus({ type: "success", message: "Image uploaded successfully." });
    } catch (err) {
      setStatus({ type: "error", message: err instanceof Error ? err.message : "Upload failed." });
    }
  }

  async function handleUrlSubmit() {
    const url = urlInput.trim();
    if (!url) return;

    setStatus({ type: "loading" });
    try {
      const result = await uploadImageFromUrl(url, specKey, value || undefined);
      onChange(result.url);
      setUrlInput("");
      setStatus({ type: "success", message: "Image saved successfully." });
    } catch (err) {
      setStatus({ type: "error", message: err instanceof Error ? err.message : "Could not use this image." });
    }
  }

  const loading = status.type === "loading";

  return (
    <div style={{ marginBottom: "1rem" }}>
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

      {/* Preview */}
      <div
        style={{
          width: "100%",
          height: `${previewHeight}px`,
          borderRadius: "0.5rem",
          overflow: "hidden",
          background: "#f1f5f9",
          marginBottom: "0.6rem",
          position: "relative",
          border: "1px solid #e2e8f0",
        }}
      >
        {value ? (
          <img
            src={value}
            alt={label}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
          />
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              color: "#94a3b8",
              gap: "0.4rem",
            }}
          >
            <ImageIcon size={28} />
            <span style={{ fontSize: "0.75rem" }}>No image set</span>
          </div>
        )}
      </div>

      {/* Spec hint */}
      <p style={{ fontSize: "0.72rem", color: "#94a3b8", marginBottom: "0.6rem" }}>{formatSpec(spec)}</p>

      {/* Mode toggle */}
      <div style={{ display: "flex", gap: "0.4rem", marginBottom: "0.6rem" }}>
        <button
          type="button"
          onClick={() => setMode("upload")}
          style={modeBtnStyle(mode === "upload")}
        >
          <Upload size={13} /> Upload file
        </button>
        <button
          type="button"
          onClick={() => setMode("url")}
          style={modeBtnStyle(mode === "url")}
        >
          <Link2 size={13} /> Image URL
        </button>
      </div>

      {mode === "upload" ? (
        <>
          {/* Hidden native file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept={ALLOWED_ACCEPT}
            disabled={loading}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          {/* Styled button that triggers the picker */}
          <button
            type="button"
            disabled={loading}
            onClick={() => fileInputRef.current?.click()}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.55rem 1rem",
              fontSize: "0.8rem",
              fontWeight: 600,
              color: loading ? "#94a3b8" : "#1a3270",
              backgroundColor: "#f8fafc",
              border: "1.5px solid",
              borderColor: loading ? "#e2e8f0" : "#cbd5e1",
              borderRadius: "0.4rem",
              cursor: loading ? "default" : "pointer",
            }}
          >
            {loading ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
            {loading ? "Uploading…" : "Choose file"}
          </button>
        </>
      ) : (
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <input
            type="text"
            value={urlInput}
            disabled={loading}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://example.com/image.jpg"
            style={{
              flex: 1,
              padding: "0.55rem 0.75rem",
              fontSize: "0.83rem",
              border: "1.5px solid #e2e8f0",
              borderRadius: "0.4rem",
              color: "#1e293b",
              backgroundColor: "#f8fafc",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          <button
            type="button"
            onClick={handleUrlSubmit}
            disabled={loading || !urlInput.trim()}
            style={{
              padding: "0.55rem 1rem",
              fontSize: "0.8rem",
              fontWeight: 600,
              color: "#fff",
              backgroundColor: "#1a3270",
              border: "none",
              borderRadius: "0.4rem",
              cursor: loading || !urlInput.trim() ? "default" : "pointer",
              opacity: loading || !urlInput.trim() ? 0.6 : 1,
              whiteSpace: "nowrap",
            }}
          >
            Use image
          </button>
        </div>
      )}

      {/* Status */}
      {status.type !== "idle" && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            marginTop: "0.5rem",
            fontSize: "0.75rem",
            color: status.type === "error" ? "#dc2626" : status.type === "success" ? "#0d9488" : "#64748b",
          }}
        >
          {status.type === "loading" && <Loader2 size={14} className="animate-spin" />}
          {status.type === "error" && <AlertCircle size={14} />}
          {status.type === "success" && <CheckCircle2 size={14} />}
          <span>{status.type === "loading" ? "Uploading…" : status.message}</span>
        </div>
      )}
    </div>
  );
}

function modeBtnStyle(active: boolean): React.CSSProperties {
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.35rem",
    padding: "0.4rem 0.75rem",
    fontSize: "0.75rem",
    fontWeight: 600,
    color: active ? "#fff" : "#374151",
    backgroundColor: active ? "#1a3270" : "#f1f5f9",
    border: "1px solid",
    borderColor: active ? "#1a3270" : "#e2e8f0",
    borderRadius: "0.4rem",
    cursor: "pointer",
  };
}
