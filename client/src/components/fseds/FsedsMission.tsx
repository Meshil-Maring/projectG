import { motion } from "framer-motion";
import { Globe, BarChart3, GraduationCap, TrendingUp, Briefcase, Users } from "lucide-react";
import { PRIMARY, SECONDARY, LIGHT_BG, fade } from "./fseds.constants";

const missionPillars = [
  { icon: BarChart3, label: "Economic Empowerment" },
  { icon: GraduationCap, label: "Skills & Capacity Building" },
  { icon: TrendingUp, label: "Inclusive Growth" },
  { icon: Briefcase, label: "Sustainable Livelihoods" },
  { icon: Users, label: "Community Prosperity" },
];

const growthSteps = [
  { label: "Grow", sub: "Build skills and capabilities" },
  { label: "Earn", sub: "Create sustainable livelihoods" },
  { label: "Prosper", sub: "Strengthen local economies" },
  { label: "Transform", sub: "Change lives, build communities" },
];

export default function FsedsMission() {
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
        {/* Left – Empower Educate Elevate visual */}
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
              boxShadow: `0 16px 48px rgba(109,40,217,0.2)`,
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
            <div
              style={{
                position: "absolute",
                bottom: "-30px",
                left: "-30px",
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.04)",
              }}
            />
            <Globe
              size={52}
              color="rgba(255,255,255,0.2)"
              strokeWidth={1}
              style={{ marginBottom: "1.5rem", position: "relative" }}
            />
            {["EMPOWER", "EDUCATE", "ELEVATE"].map((word, i) => (
              <div
                key={word}
                style={{
                  fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)",
                  fontWeight: 800,
                  color: i === 1 ? "rgba(255,255,255,0.55)" : "#ffffff",
                  letterSpacing: "0.04em",
                  lineHeight: 1.3,
                  position: "relative",
                }}
              >
                {word}
              </div>
            ))}
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
            OUR MISSION
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
            Empowering People.
            <br />
            Strengthening Livelihoods.
            <br />
            Transforming Communities.
          </h2>
          <p
            style={{
              fontSize: "0.9rem",
              color: "#475569",
              lineHeight: 1.8,
              marginBottom: "2rem",
            }}
          >
            Our mission is to foster inclusive economic growth by providing resources, skills, and
            opportunities that enable individuals and communities to achieve lasting prosperity.
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
                  boxShadow: "0 2px 8px rgba(109,40,217,0.06)",
                  border: "1px solid #e4d9ff",
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
                <span
                  style={{ fontSize: "0.72rem", fontWeight: 600, color: "#0f172a", lineHeight: 1.3 }}
                >
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
              border: `1px solid rgba(109,40,217,0.12)`,
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
