import { motion } from "framer-motion";
import { Trophy, Target, Star, Lightbulb, Megaphone } from "lucide-react";
import { PRIMARY, SECONDARY, LIGHT_BG, fade } from "./cwg.constants";

const missionPillars = [
  { icon: Trophy, label: "Academic Excellence" },
  { icon: Megaphone, label: "Quiz & Debate" },
  { icon: Star, label: "Sports & Athletics" },
  { icon: Lightbulb, label: "Creative Skills" },
  { icon: Target, label: "Life Readiness" },
];

const ladder = [
  { label: "Prepare", sub: "Master your craft with dedication" },
  { label: "Compete", sub: "Step into the arena fearlessly" },
  { label: "Excel", sub: "Rise above and outperform" },
  { label: "Champion", sub: "Lead, inspire, and build legacy" },
];

export default function CwgMission() {
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
        {/* Left – quote card */}
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
              boxShadow: `0 16px 48px rgba(15,118,110,0.2)`,
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
            <Trophy size={56} color="rgba(255,255,255,0.2)" strokeWidth={1} style={{ marginBottom: "1.5rem" }} />
            <div
              style={{
                background: "rgba(255,255,255,0.12)",
                borderRadius: "0.875rem",
                padding: "1.25rem",
                position: "relative",
              }}
            >
              <div style={{ fontSize: "1.5rem", color: "rgba(255,255,255,0.6)", lineHeight: 1, marginBottom: "0.5rem" }}>
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
                Champions are not born — they are built through discipline, dedication, and an
                unbreakable will to excel.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Center – mission copy + pillars */}
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
            OUR MISSION
          </span>
          <div
            style={{ width: "40px", height: "3px", background: PRIMARY, borderRadius: "2px", marginBottom: "1rem" }}
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
            Empowering People.
            <br />
            Strengthening Livelihoods.
            <br />
            Transforming Communities.
          </h2>
          <p style={{ fontSize: "0.9rem", color: "#475569", lineHeight: 1.8, marginBottom: "2rem" }}>
            Our mission is to cultivate a competitive, growth-driven culture by providing platforms,
            training, and mentorship that help individuals achieve their highest potential in
            academics, sports, and beyond.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "0.85rem" }}>
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
                  boxShadow: "0 2px 8px rgba(15,118,110,0.06)",
                  border: "1px solid #ccf0ed",
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

        {/* Right – achievement ladder */}
        <motion.div {...fade(0.2)}>
          <div
            style={{
              borderRadius: "1.5rem",
              background: LIGHT_BG,
              border: `1px solid rgba(15,118,110,0.12)`,
              padding: "2.5rem",
              minHeight: "300px",
              display: "flex",
              flexDirection: "column" as const,
              justifyContent: "center",
              gap: "1.25rem",
            }}
          >
            {ladder.map(({ label, sub }, i) => (
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
