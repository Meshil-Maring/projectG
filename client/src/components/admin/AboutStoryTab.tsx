import { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  FileCheck,
  Check,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { YoutubeLogoIcon } from "../../assets/icons";
import { api } from "../../lib/api";
import { ImageUploadField } from "./shared/ImageUploadField";
import type { Section } from "../../context/PageContext";

type SiteSettings = {
  storyTitle: string;
  storyDescription: string;
  storyThumbnail: string;
  storyYoutubeId: string;
  storyVideoUrl: string;
  storyDuration: string;
};

function parseYoutubeId(input: string): string {
  const s = input.trim();
  const m =
    s.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/) ??
    s.match(/[?&]v=([a-zA-Z0-9_-]{11})/) ??
    s.match(/embed\/([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : s;
}

// ── Shared sub-components (match AdminDashboard style) ─────────────────────────

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#0f1e4a", marginBottom: "0.25rem" }}>
        {title}
      </h2>
      <p style={{ fontSize: "0.8rem", color: "#64748b" }}>{subtitle}</p>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e2e8f0",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        marginBottom: "1.5rem",
        maxWidth: "680px",
      }}
    >
      {children}
    </div>
  );
}

function CardHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        fontSize: "0.95rem",
        fontWeight: 700,
        color: "#0f1e4a",
        marginBottom: "1.25rem",
        paddingBottom: "0.75rem",
        borderBottom: "1px solid #f1f5f9",
      }}
    >
      {children}
    </h3>
  );
}

function FieldGroup({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "0.85rem" }}>
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

const baseInputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.55rem 0.75rem",
  fontSize: "0.83rem",
  border: "1.5px solid #e2e8f0",
  borderRadius: "0.4rem",
  color: "#1e293b",
  backgroundColor: "#f8fafc",
  outline: "none",
  boxSizing: "border-box",
};

function TextInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      style={baseInputStyle}
      onFocus={(e) => (e.target.style.borderColor = "#1a3270")}
      onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
    />
  );
}

function TextareaInput({
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
      placeholder={placeholder}
      rows={rows}
      onChange={(e) => onChange(e.target.value)}
      style={{ ...baseInputStyle, resize: "vertical" }}
      onFocus={(e) => (e.target.style.borderColor = "#1a3270")}
      onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
    />
  );
}

function SaveBtn({ onClick, label = "Save Changes" }: { onClick: () => void; label?: string }) {
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
        marginTop: "0.5rem",
      }}
    >
      {saved ? <Check size={14} /> : null}
      {saved ? "Saved!" : label}
    </button>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export function AboutStoryTab() {
  // Video settings (stored in SiteSettings)
  const [youtubeInput, setYoutubeInput] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [duration, setDuration] = useState("");

  // Section text (stored in about-story section JSON)
  const [sectionId, setSectionId] = useState<number | null>(null);
  const [eyebrow, setEyebrow] = useState("");
  const [heading, setHeading] = useState("");
  const [paragraph1, setParagraph1] = useState("");
  const [paragraph2, setParagraph2] = useState("");

  // Info badges (stored in about-story section JSON)
  const [founded, setFounded] = useState("");
  const [headquarters, setHeadquarters] = useState("");
  const [legalStatus, setLegalStatus] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    Promise.all([
      api.get<SiteSettings>("/content/settings"),
      api.get<{ sections: Section[] }>("/pages/about-us"),
    ])
      .then(([settings, page]) => {
        setYoutubeInput(settings.storyYoutubeId ?? "");
        setThumbnail(settings.storyThumbnail ?? "");
        setVideoTitle(settings.storyTitle ?? "");
        setVideoDescription(settings.storyDescription ?? "");
        setDuration(settings.storyDuration ?? "");

        const section = page.sections.find((s) => s.type === "about-story");
        if (section) {
          setSectionId(section.id);
          setEyebrow(section.data.eyebrow ?? "");
          setHeading(section.data.heading ?? "");
          setParagraph1(section.data.paragraph1 ?? "");
          setParagraph2(section.data.paragraph2 ?? "");
          setFounded(section.data.founded ?? "");
          setHeadquarters(section.data.headquarters ?? "");
          setLegalStatus(section.data.legalStatus ?? "");
        }
      })
      .catch(() => setError("Could not load story data. The About Us page may not be seeded yet."))
      .finally(() => setLoading(false));
  }, []);

  function saveVideo() {
    void api.put("/content/settings", {
      storyTitle: videoTitle,
      storyDescription: videoDescription,
      storyThumbnail: thumbnail,
      storyYoutubeId: parseYoutubeId(youtubeInput),
      storyVideoUrl: "",
      storyDuration: duration,
    });
  }

  function saveContent() {
    if (!sectionId) return;
    void api.patch(`/sections/${sectionId}`, {
      data: {
        eyebrow,
        heading,
        paragraph1,
        paragraph2,
        founded,
        headquarters,
        legalStatus,
      },
    });
  }

  const youtubeId = parseYoutubeId(youtubeInput);
  const hasValidId = youtubeId.length === 11 && !/\s|[/?&]/.test(youtubeId);

  return (
    <div>
      <SectionHeader
        title="Our Story Section"
        subtitle='Edit the "How It All Began" section on the About Us page — video, text, and info badges.'
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
            maxWidth: "680px",
          }}
        >
          <AlertCircle size={15} style={{ flexShrink: 0 }} />
          {error}
        </div>
      )}

      {loading && (
        <p style={{ fontSize: "0.85rem", color: "#94a3b8" }}>Loading...</p>
      )}

      {!loading && !error && (
        <>
          {/* ── Card 1: Video ── */}
          <Card>
            <CardHeading>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                <YoutubeLogoIcon style={{ width: 16, height: 16, fill: "#dc2626" }} />
                Story Video
              </span>
            </CardHeading>

            <FieldGroup label="YouTube URL or Video ID">
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <TextInput
                  value={youtubeInput}
                  onChange={setYoutubeInput}
                  placeholder="e.g. lArdfIpLlAA or https://youtu.be/lArdfIpLlAA"
                />
                {hasValidId && (
                  <a
                    href={`https://www.youtube.com/watch?v=${youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "0 0.75rem",
                      backgroundColor: "#f8fafc",
                      border: "1.5px solid #e2e8f0",
                      borderRadius: "0.4rem",
                      color: "#475569",
                      flexShrink: 0,
                    }}
                    title="Preview on YouTube"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
              {hasValidId && (
                <p style={{ fontSize: "0.72rem", color: "#0d9488", marginTop: "0.3rem" }}>
                  Video ID: <strong>{youtubeId}</strong>
                </p>
              )}
            </FieldGroup>

            <ImageUploadField
              label="Video Thumbnail"
              value={thumbnail}
              onChange={setThumbnail}
              specKey="videoThumbnail"
              previewHeight={180}
            />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <FieldGroup label="Video Title">
                <TextInput
                  value={videoTitle}
                  onChange={setVideoTitle}
                  placeholder="e.g. How Project Generation Began"
                />
              </FieldGroup>
              <FieldGroup label="Duration">
                <TextInput
                  value={duration}
                  onChange={setDuration}
                  placeholder="e.g. 3:45"
                />
              </FieldGroup>
            </div>

            <FieldGroup label="Video Description">
              <TextareaInput
                value={videoDescription}
                onChange={setVideoDescription}
                placeholder="A short description shown with the video..."
                rows={3}
              />
            </FieldGroup>

            <SaveBtn onClick={saveVideo} label="Save Video" />
          </Card>

          {/* ── Card 2: Story Text ── */}
          <Card>
            <CardHeading>Story Text</CardHeading>

            <FieldGroup label="Eyebrow Label">
              <TextInput
                value={eyebrow}
                onChange={setEyebrow}
                placeholder="e.g. Our Story"
              />
            </FieldGroup>

            <FieldGroup label="Heading">
              <TextInput
                value={heading}
                onChange={setHeading}
                placeholder="e.g. How It All Began"
              />
            </FieldGroup>

            <FieldGroup label="First Paragraph">
              <TextareaInput
                value={paragraph1}
                onChange={setParagraph1}
                placeholder="First paragraph of the story..."
                rows={3}
              />
            </FieldGroup>

            <FieldGroup label="Second Paragraph">
              <TextareaInput
                value={paragraph2}
                onChange={setParagraph2}
                placeholder="Second paragraph of the story..."
                rows={3}
              />
            </FieldGroup>

            <SaveBtn onClick={saveContent} label="Save Text" />
          </Card>

          {/* ── Card 3: Info Badges ── */}
          <Card>
            <CardHeading>Info Badges</CardHeading>
            <p
              style={{
                fontSize: "0.78rem",
                color: "#64748b",
                marginBottom: "1.25rem",
                marginTop: "-0.5rem",
              }}
            >
              The three fact chips displayed below the story text.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
              <FieldGroup label={<><Calendar size={12} style={{ display: "inline", marginRight: "0.3rem" }} />Founded</>}>
                <TextInput
                  value={founded}
                  onChange={setFounded}
                  placeholder="e.g. 2012"
                />
              </FieldGroup>
              <FieldGroup label={<><MapPin size={12} style={{ display: "inline", marginRight: "0.3rem" }} />Headquarters</>}>
                <TextInput
                  value={headquarters}
                  onChange={setHeadquarters}
                  placeholder="e.g. Manipur, India"
                />
              </FieldGroup>
              <FieldGroup label={<><FileCheck size={12} style={{ display: "inline", marginRight: "0.3rem" }} />Legal Status</>}>
                <TextInput
                  value={legalStatus}
                  onChange={setLegalStatus}
                  placeholder="e.g. Registered NGO"
                />
              </FieldGroup>
            </div>

            <SaveBtn onClick={saveContent} label="Save Badges" />
          </Card>
        </>
      )}
    </div>
  );
}
