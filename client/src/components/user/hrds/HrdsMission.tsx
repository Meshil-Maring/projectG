import { motion } from "framer-motion";
import { Users, GraduationCap, BookOpen, Briefcase, Star } from "lucide-react";
import { PRIMARY, SECONDARY, LIGHT_BG, fade } from "./hrds.constants";
import { usePageSections } from "../../../context/PageContext";

const DEFAULT_MISSION = {
  eyebrow: "OUR MISSION",
  headingLine1: "Developing People.",
  headingLine2: "Transforming Lives.",
  description:
    "We focus on nurturing talent, enhancing skills, and promoting personal and professional growth through education, training, mentorship, and opportunities.",
};

const missionPillars = [
  { icon: GraduationCap, label: "Skill Development" },
  { icon: BookOpen, label: "Education & Training" },
  { icon: Briefcase, label: "Career Guidance" },
  { icon: Star, label: "Leadership Building" },
  { icon: Users, label: "Inclusive Growth" },
];

const growthSteps = [
  { label: "Grow", sub: "Unlock your full potential" },
  { label: "Lead", sub: "Inspire and guide others" },
  { label: "Achieve", sub: "Turn vision into reality" },
  { label: "Transform", sub: "Change lives, change society" },
];

export default function HrdsMission() {
  const { getSectionData } = usePageSections();
  const mission = { ...DEFAULT_MISSION, ...getSectionData("hrds-mission") };

  return (
    <section style={{ background: "#fafaf8", padding: "5rem 1.5rem" }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "3rem",
          alignItems: "center",
        }}
      >
        {/* Left – visual with quote */}
        <motion.div {...fade(0)} style={{ position: "relative" }}>
          <div
            style={{
              borderRadius: "1.5rem",
              background: `linear-gradient(145deg, ${PRIMARY} 0%, ${SECONDARY} 100%)`,
              padding: "2.5rem",
              minHeight: "300px",
              display: "flex",
              flexDirection: "column" as const,
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
              boxShadow: `0 16px 48px rgba(21,128,61,0.2)`,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-50px",
                right: "-50px",
                width: "180px",
                height: "180px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.06)",
              }}
            />
            <Users
              size={56}
              color="rgba(255,255,255,0.2)"
              strokeWidth={1}
              style={{ marginBottom: "1.5rem" }}
            />
            <div
              style={{
                background: "rgba(255,255,255,0.12)",
                borderRadius: "0.875rem",
                padding: "1.25rem",
                position: "relative",
              }}
            >
              <div
                style={{
                  fontSize: "1.5rem",
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                }}
              >
                "
              </div>
              <p
                style={{
                  fontFamily: "Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "0.95rem",
                  color: "#ffffff",
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                Investing in people today, builds a stronger society tomorrow.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Center – mission content */}
        <motion.div {...fade(0.1)}>
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase" as const,
              color: PRIMARY,
              display: "block",
              marginBottom: "0.5rem",
            }}
          >
            {mission.eyebrow}
          </span>
          <div
            style={{
              width: "40px",
              height: "3px",
              background: PRIMARY,
              borderRadius: "2px",
              marginBottom: "1rem",
            }}
          />
          <h2
            style={{
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              fontWeight: 800,
              color: "#0f172a",
              lineHeight: 1.25,
              marginBottom: "1rem",
            }}
          >
            {mission.headingLine1}
            <br />
            {mission.headingLine2}
          </h2>
          <p
            style={{
              fontSize: "0.9rem",
              color: "#475569",
              lineHeight: 1.8,
              marginBottom: "2rem",
            }}
          >
            {mission.description}
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
              gap: "0.85rem",
            }}
          >
            {missionPillars.map(({ icon: Icon, label }) => (
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
                  boxShadow: "0 2px 8px rgba(21,128,61,0.06)",
                  border: "1px solid #d1fae5",
                  textAlign: "center" as const,
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: LIGHT_BG,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={16} color={PRIMARY} strokeWidth={1.6} />
                </div>
                <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#0f172a", lineHeight: 1.3 }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right – growth steps */}
        <motion.div {...fade(0.2)}>
          <div
            style={{
              borderRadius: "1.5rem",
              background: LIGHT_BG,
              border: `1px solid rgba(21,128,61,0.12)`,
              padding: "2.5rem",
              minHeight: "300px",
              display: "flex",
              flexDirection: "column" as const,
              justifyContent: "center",
              gap: "1.25rem",
            }}
          >
            {growthSteps.map(({ label, sub }, i) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: PRIMARY,
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
                  <div style={{ fontSize: "0.9rem", fontWeight: 700, color: PRIMARY }}>{label}</div>
                  <div style={{ fontSize: "0.73rem", color: "#64748b" }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
