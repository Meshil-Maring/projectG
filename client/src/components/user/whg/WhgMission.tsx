import { motion } from "framer-motion";
import { Heart, Users, HandHeart, Star } from "lucide-react";
import { PRIMARY, SECONDARY, LIGHT_BG, fade } from "./whg.constants";
import { usePageSections } from "../../../context/PageContext";

const missionValues = [
  { icon: Heart, label: "Humanity First" },
  { icon: HandHeart, label: "Dignity & Respect" },
  { icon: Star, label: "Hope & Compassion" },
  { icon: Users, label: "Unity in Diversity" },
];

const pillars = [
  { value: "Service", sub: "above self" },
  { value: "Compassion", sub: "in every action" },
  { value: "Hope", sub: "for all communities" },
];

const DEFAULT_MISSION = {
  eyebrow: "OUR MISSION",
  headingLine1: "Empathy in Action.",
  headingLine2: "Change in Motion.",
  description:
    "We believe every act of kindness creates ripples of change. Our mission is to serve humanity by addressing real needs, spreading kindness, and empowering people to live with dignity and hope.",
};

export default function WhgMission() {
  const { getSectionData } = usePageSections();
  const mission = { ...DEFAULT_MISSION, ...getSectionData("whg-mission") };

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
        {/* Left – visual */}
        <motion.div {...fade(0)}>
          <div
            style={{
              borderRadius: "1.5rem",
              background: `linear-gradient(145deg, ${PRIMARY} 0%, ${SECONDARY} 100%)`,
              padding: "2.5rem",
              minHeight: "280px",
              display: "flex",
              flexDirection: "column" as const,
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center" as const,
              position: "relative",
              overflow: "hidden",
              boxShadow: `0 16px 48px rgba(194,65,12,0.2)`,
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
              size={64}
              color="rgba(255,255,255,0.25)"
              strokeWidth={1}
              style={{ marginBottom: "1rem" }}
            />
            <p
              style={{
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                fontSize: "1.1rem",
                color: "#fff",
                lineHeight: 1.6,
                position: "relative",
              }}
            >
              "Every act of kindness creates ripples of change."
            </p>
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
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
            {missionValues.map(({ icon: Icon, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background: LIGHT_BG,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={16} color={PRIMARY} strokeWidth={1.6} />
                </div>
                <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#0f172a" }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right – decorative pillars */}
        <motion.div {...fade(0.2)}>
          <div
            style={{
              borderRadius: "1.5rem",
              background: LIGHT_BG,
              border: `1px solid rgba(194,65,12,0.12)`,
              padding: "2.5rem",
              minHeight: "280px",
              display: "flex",
              flexDirection: "column" as const,
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center" as const,
              gap: "1.25rem",
            }}
          >
            {pillars.map(({ value, sub }) => (
              <div key={value}>
                <div style={{ fontSize: "1.1rem", fontWeight: 800, color: PRIMARY }}>{value}</div>
                <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{sub}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
