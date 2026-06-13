import { motion } from "framer-motion";
import { Heart, Users, Clock, Megaphone, Star, ArrowRight } from "lucide-react";
import { PRIMARY, SECONDARY, LIGHT_BG, fade } from "./whg.constants";
import { usePageSections } from "../../../context/PageContext";
import CauseActionTiles from "../cause/CauseActionTiles";

const ctaActions = [
  { icon: Clock, label: "Volunteer Your Time" },
  { icon: Heart, label: "Donate With Love" },
  { icon: Megaphone, label: "Spread Awareness" },
  { icon: Star, label: "Be the Change" },
];

const DEFAULT_CTA = {
  headingLine1: "Small Actions.",
  headingLine2: "Big Impact.",
  description: "Together, we can build a kinder, stronger, and more compassionate world.",
};

export default function WhgCTA() {
  const { getSectionData } = usePageSections();
  const cta = { ...DEFAULT_CTA, ...getSectionData("whg-cta") };

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
          border: `1px solid rgba(194,65,12,0.1)`,
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
            background: `rgba(194,65,12,0.06)`,
          }}
        />

        {/* Left decorative icon */}
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
              boxShadow: `0 12px 32px rgba(194,65,12,0.25)`,
            }}
          >
            <Heart size={64} color="rgba(255,255,255,0.4)" strokeWidth={1} />
          </div>
        </motion.div>

        {/* Center text + buttons */}
        <motion.div {...fade(0.1)} style={{ position: "relative" }}>
          <h2
            style={{
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              fontWeight: 800,
              color: "#0f172a",
              marginBottom: "0.6rem",
            }}
          >
            {cta.headingLine1}
            <br />
            {cta.headingLine2}
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
                boxShadow: `0 4px 14px rgba(194,65,12,0.3)`,
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
        <CauseActionTiles actions={ctaActions} primary={PRIMARY} lightBg={LIGHT_BG} borderColor="#fde8da" shadowRgb="194,65,12" />
      </div>
    </section>
  );
}
