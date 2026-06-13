import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { fade } from "./cause.constants";

export interface CauseAction {
  icon: LucideIcon;
  label: string;
}

interface Props {
  actions: CauseAction[];
  primary: string;
  lightBg: string;
  borderColor: string;
  shadowRgb: string;
  delay?: number;
}

export default function CauseActionTiles({ actions, primary, lightBg, borderColor, shadowRgb, delay = 0.2 }: Props) {
  return (
    <motion.div {...fade(delay)} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
      {actions.map(({ icon: Icon, label }) => (
        <div
          key={label}
          style={{
            background: "#ffffff",
            borderRadius: "0.875rem",
            padding: "1.1rem 0.75rem",
            textAlign: "center" as const,
            boxShadow: `0 2px 8px rgba(${shadowRgb},0.07)`,
            border: `1px solid ${borderColor}`,
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: lightBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 0.5rem",
            }}
          >
            <Icon size={18} color={primary} strokeWidth={1.6} />
          </div>
          <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0f172a", lineHeight: 1.3 }}>{label}</div>
        </div>
      ))}
    </motion.div>
  );
}
