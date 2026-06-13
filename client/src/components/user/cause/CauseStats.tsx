import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { fade } from "./cause.constants";

export interface CauseStat {
  icon: LucideIcon;
  value: string;
  label: string;
}

interface Props {
  stats: CauseStat[];
  primary: string;
  lightBg: string;
}

export default function CauseStats({ stats, primary, lightBg }: Props) {
  return (
    <section
      style={{ background: "#fafaf8", padding: "3.5rem 1.5rem", borderTop: "1px solid #e2e8f0" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div
          {...fade(0)}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "1.5rem",
            textAlign: "center" as const,
          }}
        >
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: lightBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 0.6rem",
                }}
              >
                <Icon size={19} color={primary} strokeWidth={1.6} />
              </div>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: primary, lineHeight: 1 }}>
                {value}
              </div>
              <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "0.25rem" }}>
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
