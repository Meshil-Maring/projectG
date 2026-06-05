import { motion } from "framer-motion";
import {
  Users,
  HandHeart,
  BookOpen,
  Leaf,
  Heart,
  Baby,
  PersonStanding,
  Stethoscope,
  TreePine,
  AlertTriangle,
} from "lucide-react";
import { PRIMARY, LIGHT_BG, fade } from "./whg.constants";

const whatWeDo = [
  { icon: Users, title: "Community Service", desc: "Organizing drives and activities to support those in need." },
  { icon: HandHeart, title: "Support & Relief", desc: "Providing essentials, care, and comfort during difficult times." },
  { icon: BookOpen, title: "Education & Awareness", desc: "Spreading knowledge and life skills for a better tomorrow." },
  { icon: Leaf, title: "Environment Care", desc: "Working for a cleaner, greener, healthier planet." },
  { icon: Heart, title: "Inclusive Outreach", desc: "Reaching out to all, leaving no one behind." },
];

const focusAreas = [
  { icon: Baby, title: "Children", desc: "Education, nutrition, and child welfare" },
  { icon: PersonStanding, title: "Elderly", desc: "Care, support, and companionship" },
  { icon: Stethoscope, title: "Health", desc: "Health camps and wellness support" },
  { icon: TreePine, title: "Environment", desc: "Tree plantation, cleanliness drives" },
  { icon: AlertTriangle, title: "Disaster Relief", desc: "Immediate help and rehabilitation for affected families" },
];

const impactStats = [
  { value: "5,000+", label: "Lives", sub: "Touched" },
  { value: "120+", label: "Community", sub: "Programs" },
  { value: "300+", label: "Volunteers", sub: "Involved" },
  { value: "25+", label: "Cities", sub: "Reached" },
  { value: "100%", label: "Commitment", sub: "to Humanity" },
];

export default function WhgActivities() {
  return (
    <section style={{ background: "#fff8f4", padding: "5rem 1.5rem" }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "2.5rem",
          alignItems: "start",
        }}
      >
        {/* What We Do */}
        <motion.div {...fade(0)}>
          <h3
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase" as const,
              color: PRIMARY,
              marginBottom: "1.25rem",
            }}
          >
            WHAT WE DO
          </h3>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.85rem" }}>
            {whatWeDo.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                  background: "#ffffff",
                  borderRadius: "0.875rem",
                  padding: "0.875rem 1rem",
                  boxShadow: "0 2px 8px rgba(194,65,12,0.05)",
                  border: "1px solid #fde8da",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "9px",
                    background: LIGHT_BG,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={17} color={PRIMARY} strokeWidth={1.6} />
                </div>
                <div>
                  <div
                    style={{ fontSize: "0.83rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.15rem" }}
                  >
                    {title}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#64748b", lineHeight: 1.5 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Focus Areas */}
        <motion.div {...fade(0.1)}>
          <h3
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase" as const,
              color: PRIMARY,
              marginBottom: "1.25rem",
            }}
          >
            OUR FOCUS AREAS
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
            {focusAreas.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={title}
                style={{
                  background: "#ffffff",
                  borderRadius: "0.875rem",
                  padding: "1.25rem 1rem",
                  textAlign: "center" as const,
                  boxShadow: "0 2px 8px rgba(194,65,12,0.05)",
                  border: "1px solid #fde8da",
                  ...(i === 4 ? { gridColumn: "1 / -1" } : {}),
                }}
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
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
                <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.2rem" }}>
                  {title}
                </div>
                <div style={{ fontSize: "0.72rem", color: "#64748b", lineHeight: 1.45 }}>{desc}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Our Impact */}
        <motion.div {...fade(0.2)}>
          <h3
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase" as const,
              color: PRIMARY,
              marginBottom: "1.25rem",
            }}
          >
            OUR IMPACT
          </h3>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.75rem" }}>
            {impactStats.map(({ value, label, sub }) => (
              <div
                key={value}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  background: "#ffffff",
                  borderRadius: "0.875rem",
                  padding: "0.875rem 1.1rem",
                  boxShadow: "0 2px 8px rgba(194,65,12,0.05)",
                  border: "1px solid #fde8da",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: LIGHT_BG,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Heart size={18} color={PRIMARY} strokeWidth={1.6} />
                </div>
                <div>
                  <div style={{ fontSize: "1.3rem", fontWeight: 800, color: PRIMARY, lineHeight: 1 }}>
                    {value}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#475569", fontWeight: 600 }}>
                    {label}{" "}
                    <span style={{ color: "#94a3b8", fontWeight: 500 }}>{sub}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
