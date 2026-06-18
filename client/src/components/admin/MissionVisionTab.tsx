import { useState, useEffect } from "react";
import { Check, AlertCircle, Plus, Trash2 } from "lucide-react";
import { api } from "../../lib/api";
import type { Section } from "../../context/PageContext";

// ── Shared sub-components ──────────────────────────────────────────────────────

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

function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
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

const baseInput: React.CSSProperties = {
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
      style={baseInput}
      onFocus={(e) => (e.target.style.borderColor = "#1a3270")}
      onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
    />
  );
}

function TextareaInput({
  value,
  onChange,
  placeholder,
  rows = 4,
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
      style={{ ...baseInput, resize: "vertical", fontFamily: "inherit" }}
      onFocus={(e) => (e.target.style.borderColor = "#1a3270")}
      onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
    />
  );
}

function SaveBtn({ onClick, label = "Save Changes" }: { onClick: () => Promise<void>; label?: string }) {
  const [state, setState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  async function handle() {
    setState("saving");
    try {
      await onClick();
      setState("saved");
    } catch {
      setState("error");
    }
    setTimeout(() => setState("idle"), 2000);
  }
  return (
    <button
      onClick={handle}
      disabled={state === "saving"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.4rem",
        padding: "0.55rem 1.2rem",
        backgroundColor: state === "saved" ? "#0d9488" : state === "error" ? "#dc2626" : "#1a3270",
        color: "#fff",
        fontSize: "0.82rem",
        fontWeight: 600,
        border: "none",
        borderRadius: "0.5rem",
        cursor: state === "saving" ? "not-allowed" : "pointer",
        opacity: state === "saving" ? 0.7 : 1,
        transition: "background-color 0.2s",
        marginTop: "0.5rem",
      }}
    >
      {state === "saved" ? <Check size={14} /> : state === "error" ? <AlertCircle size={14} /> : null}
      {state === "saved" ? "Saved!" : state === "error" ? "Error — try again" : state === "saving" ? "Saving…" : label}
    </button>
  );
}

// ── Defaults ───────────────────────────────────────────────────────────────────

interface ExtraCard {
  title: string;
  text: string;
  points: string;
}

const DEFAULTS = {
  eyebrow: "Our Direction",
  heading: "Mission & Vision",
  missionTitle: "Our Mission",
  missionText:
    "To uplift underprivileged communities by providing quality education, accessible healthcare, nutritious food, and a safe environment — empowering individuals to realise their full potential and build a better future for themselves and their families.",
  missionPoints:
    "Provide quality education to underserved children\nDeliver accessible healthcare to rural communities\nEnsure nutritious food and long-term food security\nCreate safe, supportive environments for families\nEmpower women and youth through skill training",
  visionTitle: "Our Vision",
  visionText:
    "A world where every child grows up with equal opportunities — a society free from poverty and inequality, where communities thrive through collective compassion, shared knowledge, and sustainable growth that benefits generations to come.",
  visionPoints:
    "Equal opportunities for every child regardless of background\nCommunities free from poverty and preventable disease\nSustainable growth that benefits future generations\nInclusive societies built on compassion and shared knowledge\nThriving local economies driven by education and innovation",
};

const BLANK_CARD: ExtraCard = { title: "", text: "", points: "" };

// ── Main component ─────────────────────────────────────────────────────────────

export function MissionVisionTab() {
  const [sectionId, setSectionId] = useState<number | null>(null);
  const [eyebrow, setEyebrow] = useState(DEFAULTS.eyebrow);
  const [heading, setHeading] = useState(DEFAULTS.heading);
  const [missionTitle, setMissionTitle] = useState(DEFAULTS.missionTitle);
  const [missionText, setMissionText] = useState(DEFAULTS.missionText);
  const [missionPoints, setMissionPoints] = useState(DEFAULTS.missionPoints);
  const [visionTitle, setVisionTitle] = useState(DEFAULTS.visionTitle);
  const [visionText, setVisionText] = useState(DEFAULTS.visionText);
  const [visionPoints, setVisionPoints] = useState(DEFAULTS.visionPoints);
  const [extraCards, setExtraCards] = useState<ExtraCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    api
      .get<{ sections: Section[] }>("/pages/about-us")
      .then((page) => {
        const sec = page.sections.find((s) => s.type === "about-mission-vision");
        if (sec) {
          setSectionId(sec.id);
          const d = sec.data;
          setEyebrow(d.eyebrow ?? DEFAULTS.eyebrow);
          setHeading(d.heading ?? DEFAULTS.heading);
          setMissionTitle(d.missionTitle ?? DEFAULTS.missionTitle);
          setMissionText(d.missionText ?? DEFAULTS.missionText);
          setMissionPoints(d.missionPoints ?? DEFAULTS.missionPoints);
          setVisionTitle(d.visionTitle ?? DEFAULTS.visionTitle);
          setVisionText(d.visionText ?? DEFAULTS.visionText);
          setVisionPoints(d.visionPoints ?? DEFAULTS.visionPoints);
          if (d.extraCards) {
            try { setExtraCards(JSON.parse(d.extraCards as string) as ExtraCard[]); } catch { /* keep empty */ }
          }
        }
      })
      .catch(() =>
        setError("Could not load data. The About Us page may not be seeded yet.")
      )
      .finally(() => setLoading(false));
  }, []);

  async function save() {
    if (!sectionId) return;
    await api.patch(`/sections/${sectionId}`, {
      data: {
        eyebrow, heading,
        missionTitle, missionText, missionPoints,
        visionTitle, visionText, visionPoints,
        extraCards: JSON.stringify(extraCards),
      },
    });
  }

  function updateExtraCard(index: number, field: keyof ExtraCard, value: string) {
    setExtraCards((prev) => prev.map((c, i) => i === index ? { ...c, [field]: value } : c));
  }

  function addCard() {
    setExtraCards((prev) => [...prev, { ...BLANK_CARD }]);
  }

  function removeCard(index: number) {
    setExtraCards((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div>
      <SectionHeader
        title="Mission & Vision Section"
        subtitle='Edit the "Mission & Vision" section shown on the About Us page.'
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
          {/* Card 1: Section Heading */}
          <Card>
            <CardHeading>Section Heading</CardHeading>
            <FieldGroup label="Eyebrow Label">
              <TextInput value={eyebrow} onChange={setEyebrow} placeholder="e.g. Our Direction" />
            </FieldGroup>
            <FieldGroup label="Heading">
              <TextInput value={heading} onChange={setHeading} placeholder="e.g. Mission & Vision" />
            </FieldGroup>
            <SaveBtn onClick={save} label="Save Heading" />
          </Card>

          {/* Card 2: Mission */}
          <Card>
            <CardHeading>Mission Card</CardHeading>
            <FieldGroup label="Card Title">
              <TextInput value={missionTitle} onChange={setMissionTitle} placeholder="e.g. Our Mission" />
            </FieldGroup>
            <FieldGroup label="Mission Statement">
              <TextareaInput value={missionText} onChange={setMissionText} placeholder="Describe the organisation's mission..." rows={5} />
            </FieldGroup>
            <FieldGroup label="Bullet Points (one per line)">
              <TextareaInput value={missionPoints} onChange={setMissionPoints} placeholder="Provide quality education to underserved children&#10;Deliver accessible healthcare..." rows={6} />
            </FieldGroup>
            <SaveBtn onClick={save} label="Save Mission" />
          </Card>

          {/* Card 3: Vision */}
          <Card>
            <CardHeading>Vision Card</CardHeading>
            <FieldGroup label="Card Title">
              <TextInput value={visionTitle} onChange={setVisionTitle} placeholder="e.g. Our Vision" />
            </FieldGroup>
            <FieldGroup label="Vision Statement">
              <TextareaInput value={visionText} onChange={setVisionText} placeholder="Describe the organisation's vision..." rows={5} />
            </FieldGroup>
            <FieldGroup label="Bullet Points (one per line)">
              <TextareaInput value={visionPoints} onChange={setVisionPoints} placeholder="Equal opportunities for every child&#10;Communities free from poverty..." rows={6} />
            </FieldGroup>
            <SaveBtn onClick={save} label="Save Vision" />
          </Card>

          {/* Extra cards */}
          {extraCards.map((card, i) => (
            <Card key={i}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem", paddingBottom: "0.75rem", borderBottom: "1px solid #f1f5f9" }}>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f1e4a", margin: 0 }}>
                  Extra Card {i + 1}
                </h3>
                <button
                  onClick={() => removeCard(i)}
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", padding: "0.3rem 0.7rem", backgroundColor: "#fef2f2", color: "#b91c1c", fontSize: "0.75rem", fontWeight: 600, border: "1px solid #fecaca", borderRadius: "0.4rem", cursor: "pointer" }}
                >
                  <Trash2 size={13} /> Remove
                </button>
              </div>
              <FieldGroup label="Card Title">
                <TextInput value={card.title} onChange={(v) => updateExtraCard(i, "title", v)} placeholder="e.g. Our Values" />
              </FieldGroup>
              <FieldGroup label="Description">
                <TextareaInput value={card.text} onChange={(v) => updateExtraCard(i, "text", v)} placeholder="Describe this section..." rows={4} />
              </FieldGroup>
              <FieldGroup label="Bullet Points (one per line)">
                <TextareaInput value={card.points} onChange={(v) => updateExtraCard(i, "points", v)} placeholder="First point&#10;Second point&#10;Third point" rows={5} />
              </FieldGroup>
              <SaveBtn onClick={save} label={`Save Card ${i + 1}`} />
            </Card>
          ))}

          {/* Add card button */}
          <div style={{ maxWidth: "680px" }}>
            <button
              onClick={addCard}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.6rem 1.2rem",
                backgroundColor: "#f0f4ff",
                color: "#1a3270",
                fontSize: "0.83rem",
                fontWeight: 600,
                border: "1.5px dashed #a5b4fc",
                borderRadius: "0.5rem",
                cursor: "pointer",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <Plus size={16} /> Add Another Card
            </button>
          </div>
        </>
      )}
    </div>
  );
}
