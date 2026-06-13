import { motion } from "framer-motion";
import { fade } from "./cause.constants";

export interface CauseGrowthStep {
  label: string;
  sub: string;
}

interface Props {
  steps: CauseGrowthStep[];
  primary: string;
  lightBg: string;
  shadowRgb: string;
  delay?: number;
}

export default function CauseGrowthSteps({ steps, primary, lightBg, shadowRgb, delay = 0.2 }: Props) {
  return (
    <motion.div {...fade(delay)}>
      <div
        style={{
          borderRadius: "1.5rem",
          background: lightBg,
          border: `1px solid rgba(${shadowRgb},0.12)`,
          padding: "2.5rem",
          minHeight: "300px",
          display: "flex",
          flexDirection: "column" as const,
          justifyContent: "center",
          gap: "1.25rem",
        }}
      >
        {steps.map(({ label, sub }, i) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: primary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                fontSize: "0.72rem",
                fontWeight: 800,
                color: "#fff",
              }}
            >
              {i + 1}
            </div>
            <div>
              <div style={{ fontSize: "0.9rem", fontWeight: 700, color: primary }}>{label}</div>
              <div style={{ fontSize: "0.73rem", color: "#64748b" }}>{sub}</div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
