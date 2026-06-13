import type { LucideIcon } from "lucide-react";

export interface CauseMissionPillar {
  icon: LucideIcon;
  label: string;
}

interface Props {
  pillars: CauseMissionPillar[];
  primary: string;
  lightBg: string;
  borderColor: string;
  shadowRgb: string;
}

export default function CauseMissionPillars({ pillars, primary, lightBg, borderColor, shadowRgb }: Props) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "0.85rem" }}>
      {pillars.map(({ icon: Icon, label }) => (
        <div
          key={label}
          style={{
            display: "flex",
            flexDirection: "column" as const,
            alignItems: "center",
            gap: "0.5rem",
            background: "#fff",
            borderRadius: "0.875rem",
            padding: "1rem 0.5rem",
            boxShadow: `0 2px 8px rgba(${shadowRgb},0.06)`,
            border: `1px solid ${borderColor}`,
            textAlign: "center" as const,
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: lightBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={16} color={primary} strokeWidth={1.6} />
          </div>
          <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#0f172a", lineHeight: 1.3 }}>{label}</span>
        </div>
      ))}
    </div>
  );
}
