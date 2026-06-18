import { useState, useEffect } from "react";
import {
  Check,
  AlertCircle,
  Plus,
  Trash2,
  Edit3,
  X,
  ChevronUp,
  ChevronDown,
  GraduationCap,
  Heart,
  Trophy,
  Briefcase,
  Lightbulb,
  Users,
  Handshake,
  Shield,
  Star,
  Leaf,
} from "lucide-react";
import { api } from "../../lib/api";
import type { Section } from "../../context/PageContext";

// ── Icon registry ─────────────────────────────────────────────────────────────

const ICON_OPTIONS = [
  { key: "GraduationCap", Icon: GraduationCap },
  { key: "Heart",         Icon: Heart },
  { key: "Trophy",        Icon: Trophy },
  { key: "Briefcase",     Icon: Briefcase },
  { key: "Lightbulb",    Icon: Lightbulb },
  { key: "Users",         Icon: Users },
  { key: "Handshake",     Icon: Handshake },
  { key: "Shield",        Icon: Shield },
  { key: "Star",          Icon: Star },
  { key: "Leaf",          Icon: Leaf },
] as const;

type ObjectiveIconKey = (typeof ICON_OPTIONS)[number]["key"];

const ICON_MAP = Object.fromEntries(
  ICON_OPTIONS.map(({ key, Icon }) => [key, Icon])
) as Record<ObjectiveIconKey, React.ElementType>;

type ObjectiveItem = { text: string; icon: ObjectiveIconKey };

const DEFAULT_ITEMS: ObjectiveItem[] = [
  { icon: "GraduationCap", text: "Organize educational, awareness, and capacity-building programs for students and communities." },
  { icon: "Heart",         text: "Promote health, legal, environmental, and social awareness through campaigns and outreach." },
  { icon: "Trophy",        text: "Conduct competitions, workshops, seminars, and cultural activities that enhance creativity and critical thinking." },
  { icon: "Briefcase",     text: "Support skill development, career guidance, and life skills training for youth." },
  { icon: "Lightbulb",    text: "Encourage scientific temper, innovation, and Indian Knowledge Systems (IKS) among students." },
  { icon: "Users",         text: "Assist underprivileged and vulnerable sections through social service initiatives." },
  { icon: "Handshake",     text: "Collaborate with educational institutions, NGOs, professionals, and government bodies." },
  { icon: "Shield",        text: "Promote ethical leadership, constitutional values, and civic responsibility." },
  { icon: "Star",          text: "Provide platforms for talent identification, recognition, and youth empowerment." },
  { icon: "Leaf",          text: "Work towards sustainable development goals (SDGs) at the grassroots level." },
];

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

function IconPicker({
  value,
  onChange,
}: {
  value: ObjectiveIconKey;
  onChange: (k: ObjectiveIconKey) => void;
}) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
      {ICON_OPTIONS.map(({ key, Icon }) => (
        <button
          key={key}
          title={key}
          onClick={() => onChange(key)}
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "0.4rem",
            border: value === key ? "2px solid #1a3270" : "1.5px solid #e2e8f0",
            background: value === key ? "#e8f0ff" : "#f8fafc",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={16} color={value === key ? "#1a3270" : "#64748b"} />
        </button>
      ))}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export function ObjectivesTab() {
  const [sectionId, setSectionId] = useState<number | null>(null);
  const [eyebrow, setEyebrow] = useState("What We Stand For");
  const [heading, setHeading] = useState("Our Objectives");
  const [description, setDescription] = useState("The guiding goals behind every program we run");
  const [items, setItems] = useState<ObjectiveItem[]>(DEFAULT_ITEMS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<ObjectiveItem>({ text: "", icon: "GraduationCap" });
  const [addingNew, setAddingNew] = useState(false);
  const [newForm, setNewForm] = useState<ObjectiveItem>({ text: "", icon: "GraduationCap" });

  useEffect(() => {
    setLoading(true);
    setError("");
    api
      .get<{ sections: Section[] }>("/pages/about-us")
      .then((page) => {
        const sec = page.sections.find((s) => s.type === "about-objectives");
        if (sec) {
          setSectionId(sec.id);
          setEyebrow(sec.data.eyebrow ?? "What We Stand For");
          setHeading(sec.data.heading ?? "Our Objectives");
          setDescription(sec.data.description ?? "The guiding goals behind every program we run");
          if (sec.data.items) {
            try {
              setItems(JSON.parse(sec.data.items) as ObjectiveItem[]);
            } catch { /* keep defaults */ }
          }
        }
      })
      .catch(() => setError("Could not load data. The About Us page may not be seeded yet."))
      .finally(() => setLoading(false));
  }, []);

  function persist(updatedItems: ObjectiveItem[]) {
    if (!sectionId) return;
    void api.patch(`/sections/${sectionId}`, {
      data: {
        eyebrow,
        heading,
        description,
        items: JSON.stringify(updatedItems),
      },
    });
  }

  async function saveHeader() {
    if (!sectionId) return;
    await api.patch(`/sections/${sectionId}`, {
      data: { eyebrow, heading, description, items: JSON.stringify(items) },
    });
  }

  function moveUp(idx: number) {
    if (idx === 0) return;
    const arr = [...items];
    [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
    setItems(arr);
    persist(arr);
  }

  function moveDown(idx: number) {
    if (idx === items.length - 1) return;
    const arr = [...items];
    [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
    setItems(arr);
    persist(arr);
  }

  function startEdit(idx: number) {
    setEditingIdx(idx);
    setEditForm({ ...items[idx] });
    setAddingNew(false);
  }

  function saveEdit() {
    if (editingIdx === null) return;
    const updated = items.map((item, i) => (i === editingIdx ? editForm : item));
    setItems(updated);
    persist(updated);
    setEditingIdx(null);
  }

  function deleteItem(idx: number) {
    const updated = items.filter((_, i) => i !== idx);
    setItems(updated);
    persist(updated);
    if (editingIdx === idx) setEditingIdx(null);
  }

  function addItem() {
    if (!newForm.text.trim()) return;
    const updated = [...items, { ...newForm }];
    setItems(updated);
    persist(updated);
    setAddingNew(false);
    setNewForm({ text: "", icon: "GraduationCap" });
  }

  return (
    <div>
      <SectionHeader
        title="Our Objectives Section"
        subtitle="Edit the section heading and manage the objectives list on the About Us page."
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

      {loading && <p style={{ fontSize: "0.85rem", color: "#94a3b8" }}>Loading...</p>}

      {!loading && !error && (
        <>
          {/* Card: Section heading */}
          <Card>
            <CardHeading>Section Heading</CardHeading>
            <FieldGroup label="Eyebrow Label">
              <TextInput value={eyebrow} onChange={setEyebrow} placeholder="e.g. What We Stand For" />
            </FieldGroup>
            <FieldGroup label="Heading">
              <TextInput value={heading} onChange={setHeading} placeholder="e.g. Our Objectives" />
            </FieldGroup>
            <FieldGroup label="Subheading">
              <TextInput
                value={description}
                onChange={setDescription}
                placeholder="e.g. The guiding goals behind every program we run"
              />
            </FieldGroup>
            <SaveBtn onClick={saveHeader} label="Save Heading" />
          </Card>

          {/* Objectives list */}
          <div style={{ maxWidth: "680px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
            >
              <div>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f1e4a", margin: 0 }}>
                  Objectives List
                </h3>
                <p style={{ fontSize: "0.78rem", color: "#64748b", marginTop: "0.2rem" }}>
                  Add, edit, reorder, or remove objectives shown on the page.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {items.map((item, idx) => {
                const ItemIcon = ICON_MAP[item.icon] ?? GraduationCap;
                return (
                  <div
                    key={idx}
                    style={{
                      background: "#fff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "0.75rem",
                      overflow: "hidden",
                    }}
                  >
                    {/* Row */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "0.75rem 1rem",
                        borderBottom: editingIdx === idx ? "1px solid #e2e8f0" : "none",
                      }}
                    >
                      {/* Number badge */}
                      <div
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          backgroundColor: "#1a3270",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <span style={{ color: "#fff", fontSize: "0.62rem", fontWeight: 700 }}>
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Icon preview */}
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "0.4rem",
                          backgroundColor: "#e8f0ff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <ItemIcon size={15} color="#1a3270" />
                      </div>

                      {/* Text */}
                      <p
                        style={{
                          flex: 1,
                          fontSize: "0.82rem",
                          color: "#475569",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          margin: 0,
                        }}
                      >
                        {item.text || "(No text)"}
                      </p>

                      {/* Actions */}
                      <div style={{ display: "flex", gap: "0.3rem" }}>
                        <button onClick={() => moveUp(idx)} disabled={idx === 0} style={iconBtnStyle(idx === 0)}>
                          <ChevronUp size={14} />
                        </button>
                        <button
                          onClick={() => moveDown(idx)}
                          disabled={idx === items.length - 1}
                          style={iconBtnStyle(idx === items.length - 1)}
                        >
                          <ChevronDown size={14} />
                        </button>
                        <button
                          onClick={() => (editingIdx === idx ? setEditingIdx(null) : startEdit(idx))}
                          style={iconBtnStyle(false)}
                        >
                          {editingIdx === idx ? <X size={14} /> : <Edit3 size={14} />}
                        </button>
                        <button
                          onClick={() => deleteItem(idx)}
                          style={{ ...iconBtnStyle(false), color: "#dc2626" }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Edit form */}
                    {editingIdx === idx && (
                      <div style={{ padding: "1rem", background: "#f8fafc" }}>
                        <FieldGroup label="Objective Text">
                          <TextareaInput
                            value={editForm.text}
                            onChange={(v) => setEditForm((f) => ({ ...f, text: v }))}
                            placeholder="Describe this objective..."
                            rows={3}
                          />
                        </FieldGroup>
                        <FieldGroup label="Icon">
                          <IconPicker
                            value={editForm.icon}
                            onChange={(k) => setEditForm((f) => ({ ...f, icon: k }))}
                          />
                        </FieldGroup>
                        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
                          <button onClick={saveEdit} style={primaryBtnStyle}>
                            <Check size={13} /> Save
                          </button>
                          <button onClick={() => setEditingIdx(null)} style={secondaryBtnStyle}>
                            <X size={13} /> Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Add new */}
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
                    New Objective
                  </p>
                  <FieldGroup label="Objective Text">
                    <TextareaInput
                      value={newForm.text}
                      onChange={(v) => setNewForm((f) => ({ ...f, text: v }))}
                      placeholder="Describe this objective..."
                      rows={3}
                    />
                  </FieldGroup>
                  <FieldGroup label="Icon">
                    <IconPicker
                      value={newForm.icon}
                      onChange={(k) => setNewForm((f) => ({ ...f, icon: k }))}
                    />
                  </FieldGroup>
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
                    <button onClick={addItem} style={primaryBtnStyle}>
                      <Plus size={13} /> Add Objective
                    </button>
                    <button
                      onClick={() => {
                        setAddingNew(false);
                        setNewForm({ text: "", icon: "GraduationCap" });
                      }}
                      style={secondaryBtnStyle}
                    >
                      <X size={13} /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => { setAddingNew(true); setEditingIdx(null); }}
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
                  <Plus size={16} /> Add Objective
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
