import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { fade } from "./cause.constants";

export interface CauseFeature {
  icon: LucideIcon;
  title: string;
  sub: string;
}

interface Props {
  features: CauseFeature[];
  primary: string;
  lightBg: string;
  minWidth?: string;
  delay?: number;
}

export default function CauseFeatureStrip({ features, primary, lightBg, minWidth = "160px", delay = 0.3 }: Props) {
  return (
    <motion.div
      {...fade(delay)}
      style={{
        borderTop: "1px solid #e2e8f0",
        paddingTop: "2rem",
        paddingBottom: "2.5rem",
        display: "grid",
        gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth}, 1fr))`,
        gap: "1rem",
      }}
    >
      {features.map(({ icon: Icon, title, sub }) => (
        <div key={title} style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem" }}>
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "10px",
              background: lightBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon size={18} color={primary} strokeWidth={1.6} />
          </div>
          <div>
            <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#0f172a" }}>{title}</div>
            <div style={{ fontSize: "0.72rem", color: "#94a3b8", lineHeight: 1.4 }}>{sub}</div>
          </div>
        </div>
      ))}
    </motion.div>
  );
}
