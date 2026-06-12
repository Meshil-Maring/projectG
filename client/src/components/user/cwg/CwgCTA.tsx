import { motion } from "framer-motion";
import { Trophy, Users, ArrowRight, Clock, Flame } from "lucide-react";
import { PRIMARY, SECONDARY, LIGHT_BG, fade } from "./cwg.constants";
import { usePageSections } from "../../../context/PageContext";

const ctaActions = [
  { icon: Clock, label: "Train With Us" },
  { icon: Trophy, label: "Join a Competition" },
  { icon: Users, label: "Mentor Others" },
  { icon: Flame, label: "Champion a Cause" },
];

const DEFAULT_CTA = {
  eyebrow: "RISE TO THE CHALLENGE",
  headingLine1: "Empowered communities.",
  headingLine2: "Stronger economies.",
  headingLine3: "Brighter futures.",
  description:
    "Your competitive spirit creates ripples of inspiration. Join us to compete, grow, and champion excellence across every field.",
};

export default function CwgCTA() {
  const { getSectionData } = usePageSections();
  const cta = { ...DEFAULT_CTA, ...getSectionData("cwg-cta") };

  return (
    <section
      id="get-involved"
      style={{ background: "#ffffff", padding: "5rem 1.5rem", position: "relative", overflow: "hidden" }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          background: LIGHT_BG,
          borderRadius: "2rem",
          padding: "3.5rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "3rem",
          alignItems: "center",
          border: `1px solid rgba(15,118,110,0.1)`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-60px",
            left: "-60px",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: `rgba(15,118,110,0.06)`,
          }}
        />

        {/* Left – trophy icon */}
        <motion.div
          {...fade(0)}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "180px" }}
        >
          <div
            style={{
              borderRadius: "1.25rem",
              background: `linear-gradient(145deg, ${PRIMARY} 0%, ${SECONDARY} 100%)`,
              padding: "2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "140px",
              height: "140px",
              boxShadow: `0 12px 32px rgba(15,118,110,0.25)`,
            }}
          >
            <Trophy size={64} color="rgba(255,255,255,0.4)" strokeWidth={1} />
          </div>
        </motion.div>

        {/* Center – heading + buttons */}
        <motion.div {...fade(0.1)} style={{ position: "relative" }}>
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase" as const,
              color: PRIMARY,
              display: "block",
              marginBottom: "0.6rem",
            }}
          >
            {cta.eyebrow}
          </span>
          <h2
            style={{
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              fontWeight: 800,
              color: "#0f172a",
              marginBottom: "0.6rem",
              lineHeight: 1.25,
            }}
          >
            {cta.headingLine1}
            <br />
            {cta.headingLine2}
            <br />
            {cta.headingLine3}
          </h2>
          <p style={{ fontSize: "0.9rem", color: "#64748b", lineHeight: 1.7, marginBottom: "1.75rem" }}>
            {cta.description}
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" as const }}>
            <a
              href="/get-involved"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: `linear-gradient(135deg, ${PRIMARY} 0%, ${SECONDARY} 100%)`,
                color: "#fff",
                padding: "0.75rem 1.75rem",
                borderRadius: "0.5rem",
                fontWeight: 700,
                fontSize: "0.875rem",
                textDecoration: "none",
                boxShadow: `0 4px 14px rgba(15,118,110,0.3)`,
              }}
            >
              Get Involved
              <ArrowRight size={15} />
            </a>
            <a
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                border: `2px solid ${PRIMARY}`,
                color: PRIMARY,
                padding: "0.73rem 1.75rem",
                borderRadius: "0.5rem",
                fontWeight: 700,
                fontSize: "0.875rem",
                textDecoration: "none",
                background: "transparent",
              }}
            >
              <Users size={15} />
              Join Our Team
            </a>
          </div>
        </motion.div>

        {/* Right – 4 action tiles */}
        <motion.div
          {...fade(0.2)}
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}
        >
          {ctaActions.map(({ icon: Icon, label }) => (
            <div
              key={label}
              style={{
                background: "#ffffff",
                borderRadius: "0.875rem",
                padding: "1.1rem 0.75rem",
                textAlign: "center" as const,
                boxShadow: "0 2px 8px rgba(15,118,110,0.07)",
                border: "1px solid #ccf0ed",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: LIGHT_BG,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 0.5rem",
                }}
              >
                <Icon size={18} color={PRIMARY} strokeWidth={1.6} />
              </div>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0f172a", lineHeight: 1.3 }}>
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
