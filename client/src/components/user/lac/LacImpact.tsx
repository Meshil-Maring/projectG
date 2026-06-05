import { motion } from "framer-motion";
import { Scale } from "lucide-react";
import { NAV_BLUE, fade } from "./lac.constants";

const stats = [
  { value: "3,200+", label: "People Provided", sub: "Legal Support" },
  { value: "150+", label: "Legal Awareness", sub: "Sessions Conducted" },
  { value: "800+", label: "Cases", sub: "Assisted" },
  { value: "50+", label: "Communities", sub: "Reached" },
  { value: "120+", label: "Active Student", sub: "Volunteers" },
];

export default function LacImpact() {
  return (
    <section style={{ background: "#faf9f5", padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 3fr",
            gap: "3rem",
            alignItems: "center",
          }}
        >
          <motion.div {...fade(0)}>
            <h2
              style={{
                fontSize: "clamp(1.4rem, 2.8vw, 1.8rem)",
                fontWeight: 800,
                color: "#0f172a",
                marginBottom: "0.75rem",
              }}
            >
              Our Impact
            </h2>
            <p style={{ fontSize: "0.875rem", color: "#64748b", lineHeight: 1.7 }}>
              Through legal knowledge and support, we are creating a fairer, more just society.
            </p>
          </motion.div>

          <motion.div
            {...fade(0.1)}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "0.5rem",
            }}
          >
            {stats.map(({ value, label, sub }, i) => (
              <motion.div
                key={value}
                {...fade(0.05 * i)}
                style={{
                  textAlign: "center" as const,
                  background: "#fff",
                  borderRadius: "1rem",
                  padding: "1.5rem 0.75rem",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                  border: "1px solid #f1f5f9",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "#eef1fb",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 0.75rem",
                  }}
                >
                  <Scale size={18} color={NAV_BLUE} strokeWidth={1.6} />
                </div>
                <div
                  style={{
                    fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)",
                    fontWeight: 800,
                    color: NAV_BLUE,
                    lineHeight: 1,
                    marginBottom: "0.4rem",
                  }}
                >
                  {value}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "#475569",
                    fontWeight: 600,
                    lineHeight: 1.3,
                  }}
                >
                  {label}
                  <br />
                  <span style={{ color: "#94a3b8", fontWeight: 500 }}>{sub}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
