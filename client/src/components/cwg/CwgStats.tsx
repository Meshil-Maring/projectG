import { motion } from "framer-motion";
import { Award, Users, Trophy, MapPin, Medal } from "lucide-react";
import { PRIMARY, LIGHT_BG, fade } from "./cwg.constants";

const bottomStats = [
  { icon: Award, value: "8+", label: "Years of Excellence" },
  { icon: Users, value: "60+", label: "Active Members" },
  { icon: Trophy, value: "500+", label: "Competitions Joined" },
  { icon: MapPin, value: "15+", label: "Locations Reached" },
  { icon: Medal, value: "Countless", label: "Champions Shaped" },
];

export default function CwgStats() {
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
          {bottomStats.map(({ icon: Icon, value, label }) => (
            <div key={label}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: LIGHT_BG,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 0.6rem",
                }}
              >
                <Icon size={19} color={PRIMARY} strokeWidth={1.6} />
              </div>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: PRIMARY, lineHeight: 1 }}>
                {value}
              </div>
              <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "0.25rem" }}>{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
