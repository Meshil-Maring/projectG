import { motion } from "framer-motion";
import {
  Users,
  Clock,
  TrendingUp,
  Star,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import { PRIMARY, SECONDARY, LIGHT_BG, fade } from "./fseds.constants";
import { usePageSections } from "../../../context/PageContext";
import CauseActionTiles from "../cause/CauseActionTiles";

const ctaActions = [
  { icon: Clock, label: "Volunteer Your Time" },
  { icon: TrendingUp, label: "Support Local Initiatives" },
  { icon: Lightbulb, label: "Share Resources" },
  { icon: Star, label: "Be the Change" },
];

const chartBars = [28, 44, 36, 56, 48, 64];

const DEFAULT_CTA = {
  eyebrow: "TOGETHER WE RISE",
  headingLine1: "Empowered communities.",
  headingLine2: "Stronger economies.",
  headingLine3: "Brighter futures.",
  description:
    "Your support creates ripples of economic change. Join us in shaping thriving, self-reliant communities.",
};

export default function FsedsCTA() {
  const { getSectionData } = usePageSections();
  const cta = { ...DEFAULT_CTA, ...getSectionData("fseds-cta") };

  return (
    <section
      id="get-involved"
      style={{
        background: "#ffffff",
        padding: "5rem 1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
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
          border: `1px solid rgba(109,40,217,0.1)`,
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
            background: `rgba(109,40,217,0.06)`,
          }}
        />

        {/* Center text + buttons */}
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
          <p
            style={{
              fontSize: "0.9rem",
              color: "#64748b",
              lineHeight: 1.7,
              marginBottom: "1.75rem",
              whiteSpace: "pre-wrap",
            }}
          >
            {cta.description}
          </p>
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              flexWrap: "wrap" as const,
            }}
          >
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
                boxShadow: `0 4px 14px rgba(109,40,217,0.3)`,
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
        <CauseActionTiles
          actions={ctaActions}
          primary={PRIMARY}
          lightBg={LIGHT_BG}
          borderColor="#e4d9ff"
          shadowRgb="109,40,217"
        />
      </div>
    </section>
  );
}
