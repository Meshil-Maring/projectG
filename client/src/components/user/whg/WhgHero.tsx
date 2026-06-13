import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Users, Leaf, Star, ChevronRight, ArrowRight } from "lucide-react";
import { PRIMARY, SECONDARY, LIGHT_BG, fade } from "./whg.constants";
import { usePageSections } from "../../../context/PageContext";

const heroFeatures = [
  { icon: Heart, title: "Serve Selflessly", sub: "Kindness without conditions" },
  { icon: Star, title: "Inspire Hope", sub: "Lifting spirits every day" },
  { icon: Users, title: "Build Communities", sub: "Stronger together" },
  { icon: Leaf, title: "Create Lasting Change", sub: "Impact that endures" },
];

const DEFAULT_HERO = {
  eyebrow: "Work for Humanity Group",
  titleLine1: "Work for Humanity,",
  titleEmphasis: "Serve with Heart.",
  description:
    "We work for a world where kindness leads the way. We uplift lives, support communities, and create lasting change through service and compassion.",
};

export default function WhgHero() {
  const { getSectionData } = usePageSections();
  const hero = { ...DEFAULT_HERO, ...getSectionData("whg-hero") };

  return (
    <section
      style={{
        background: "#ffffff",
        paddingTop: "1.75rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "55%",
          height: "100%",
          background:
            "radial-gradient(ellipse at 70% 40%, rgba(194,65,12,0.07) 0%, rgba(249,115,22,0.04) 45%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Breadcrumb */}
        <motion.div
          {...fade(0)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            fontSize: "0.78rem",
            color: "#64748b",
            marginBottom: "1.5rem",
          }}
        >
          <Link to="/" style={{ color: "#64748b", textDecoration: "none" }}>
            Home
          </Link>
          <ChevronRight size={13} />
          <span>Our Communities</span>
          <ChevronRight size={13} />
          <span style={{ color: PRIMARY, fontWeight: 600 }}>Work for Humanity Group</span>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "3rem",
            alignItems: "center",
            paddingBottom: "3rem",
          }}
        >
          {/* Left */}
          <div>
            <motion.h1
              {...fade(0.1)}
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3rem)",
                fontWeight: 800,
                color: "#0f172a",
                lineHeight: 1.15,
                marginBottom: "0.4rem",
                letterSpacing: "-0.01em",
              }}
            >
              {hero.titleLine1}
            </motion.h1>

            <motion.p
              {...fade(0.13)}
              style={{
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                fontSize: "clamp(1.4rem, 3.5vw, 2.2rem)",
                color: PRIMARY,
                marginBottom: "0.75rem",
                fontWeight: 400,
                lineHeight: 1.3,
              }}
            >
              {hero.titleEmphasis}
            </motion.p>

            <div
              style={{
                width: "56px",
                height: "3px",
                background: PRIMARY,
                borderRadius: "2px",
                marginBottom: "1.25rem",
              }}
            />

            <motion.p
              {...fade(0.2)}
              style={{
                fontSize: "0.95rem",
                color: "#475569",
                lineHeight: 1.75,
                marginBottom: "2rem",
                maxWidth: "420px",
              }}
            >
              {hero.description}
            </motion.p>

            <motion.div
              {...fade(0.25)}
              style={{ display: "flex", gap: "1rem", flexWrap: "wrap" as const }}
            >
              <a
                href="#get-involved"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: `linear-gradient(135deg, ${PRIMARY} 0%, ${SECONDARY} 100%)`,
                  color: "#fff",
                  padding: "0.75rem 1.75rem",
                  borderRadius: "0.5rem",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  boxShadow: `0 4px 14px rgba(194,65,12,0.3)`,
                }}
              >
                <ArrowRight size={16} />
                Get Involved
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
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  background: "transparent",
                }}
              >
                <Users size={16} />
                Join Our Team
              </a>
            </motion.div>
          </div>

          {/* Right – visual card */}
          <motion.div
            {...fade(0.15)}
            style={{ position: "relative", display: "flex", justifyContent: "center" }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(ellipse at 50% 50%, rgba(194,65,12,0.1) 0%, transparent 70%)",
                borderRadius: "50%",
                transform: "scale(1.2)",
              }}
            />
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "460px",
                borderRadius: "1.5rem",
                overflow: "hidden",
                boxShadow: `0 20px 60px rgba(194,65,12,0.15)`,
                background: `linear-gradient(145deg, ${PRIMARY} 0%, ${SECONDARY} 100%)`,
                padding: "3rem 2.5rem",
                minHeight: "320px",
                display: "flex",
                flexDirection: "column" as const,
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center" as const,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-60px",
                  right: "-60px",
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.06)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "-40px",
                  left: "-40px",
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.05)",
                }}
              />
              <Heart
                size={80}
                color="rgba(255,255,255,0.2)"
                strokeWidth={1}
                style={{ marginBottom: "1rem", position: "relative" }}
              />
              <h2
                style={{
                  fontFamily: "Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "1.5rem",
                  color: "#ffffff",
                  lineHeight: 1.4,
                  position: "relative",
                }}
              >
                "The best way to find yourself
                <br />
                is to lose yourself
                <br />
                in the service of others."
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,0.65)",
                  fontSize: "0.82rem",
                  marginTop: "0.75rem",
                  position: "relative",
                }}
              >
                – Mahatma Gandhi
              </p>
            </div>
          </motion.div>
        </div>

        {/* Hero features strip */}
        <motion.div
          {...fade(0.3)}
          style={{
            borderTop: "1px solid #e2e8f0",
            paddingTop: "2rem",
            paddingBottom: "2.5rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "1rem",
          }}
        >
          {heroFeatures.map(({ icon: Icon, title, sub }) => (
            <div key={title} style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem" }}>
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "10px",
                  background: LIGHT_BG,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon size={18} color={PRIMARY} strokeWidth={1.6} />
              </div>
              <div>
                <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#0f172a" }}>{title}</div>
                <div style={{ fontSize: "0.72rem", color: "#94a3b8", lineHeight: 1.4 }}>{sub}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
