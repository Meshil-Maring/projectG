import { motion } from "framer-motion";
import {
  Users,
  TrendingUp,
  Star,
  Handshake,
  BookOpen,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import { PRIMARY, SECONDARY, LIGHT_BG, fade } from "./hrds.constants";
import { usePageSections } from "../../../context/PageContext";
import CauseFeatureStrip from "../cause/CauseFeatureStrip";

const heroFeatures = [
  { icon: Users, title: "Empower Individuals", sub: "Building confidence and capacity" },
  { icon: TrendingUp, title: "Build Skills & Capabilities", sub: "Practical growth programs" },
  { icon: Star, title: "Promote Leadership", sub: "Developing tomorrow's leaders" },
  { icon: Handshake, title: "Strengthen Communities", sub: "Together we rise" },
];

const skillItems = [
  { label: "Skills", Icon: TrendingUp },
  { label: "Knowledge", Icon: BookOpen },
  { label: "Growth", Icon: Star },
  { label: "Leadership", Icon: Users },
  { label: "Opportunity", Icon: Lightbulb },
];

const DEFAULT_HERO = {
  eyebrow: "Human Resources Developmental Society",
  titleLine1: "Empower People.",
  titleEmphasis1: "Enrich Potential.",
  titleEmphasis2: "Build a Better Tomorrow.",
  description:
    "We are committed to developing human potential and building capacities to create a skilled, confident, and empowered community.",
};

export default function HrdsHero() {
  const { getSectionData } = usePageSections();
  const hero = { ...DEFAULT_HERO, ...getSectionData("hrds-hero") };

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
            "radial-gradient(ellipse at 70% 40%, rgba(21,128,61,0.07) 0%, rgba(22,163,74,0.04) 45%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            paddingBottom: "3rem",
            gap: "2.5rem",
          }}
        >
          {/* Text content */}
          <div style={{ maxWidth: "620px", width: "100%" }}>
            <motion.h1
              {...fade(0.1)}
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3rem)",
                fontWeight: 800,
                color: "#0f172a",
                lineHeight: 1.15,
                marginBottom: "0.3rem",
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
                fontSize: "clamp(1.2rem, 3vw, 2rem)",
                color: PRIMARY,
                marginBottom: 0,
                fontWeight: 400,
                lineHeight: 1.3,
              }}
            >
              {hero.titleEmphasis1}
            </motion.p>

            <motion.p
              {...fade(0.16)}
              style={{
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                fontSize: "clamp(1.2rem, 3vw, 2rem)",
                color: PRIMARY,
                marginBottom: "0.75rem",
                fontWeight: 400,
                lineHeight: 1.3,
              }}
            >
              {hero.titleEmphasis2}
            </motion.p>

            <div
              style={{
                width: "56px",
                height: "3px",
                background: PRIMARY,
                borderRadius: "2px",
                margin: "0 auto 1.25rem",
              }}
            />

            <motion.p
              {...fade(0.2)}
              style={{
                fontSize: "0.95rem",
                color: "#475569",
                lineHeight: 1.75,
                marginBottom: "2rem",
                whiteSpace: "pre-wrap",
              }}
            >
              {hero.description}
            </motion.p>

            <motion.div
              {...fade(0.25)}
              style={{ display: "flex", gap: "1rem", flexWrap: "wrap" as const, justifyContent: "center" }}
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
                  boxShadow: `0 4px 14px rgba(21,128,61,0.3)`,
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

          {/* Skills visual card – centered */}
          <motion.div
            {...fade(0.15)}
            style={{ position: "relative", display: "flex", justifyContent: "center", width: "100%" }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "400px",
                borderRadius: "1.75rem",
                overflow: "hidden",
                boxShadow: `0 24px 64px rgba(21,128,61,0.22), 0 4px 16px rgba(0,0,0,0.08)`,
                background: `linear-gradient(145deg, ${PRIMARY} 0%, ${SECONDARY} 100%)`,
                padding: "2.25rem 2rem 1.75rem",
              }}
            >
              {/* Decorative circles */}
              <div style={{ position: "absolute", top: "-50px", right: "-50px", width: "180px", height: "180px", borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
              <div style={{ position: "absolute", bottom: "-30px", left: "-30px", width: "130px", height: "130px", borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />

              {/* Dot pattern texture */}
              <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)", backgroundSize: "18px 18px", pointerEvents: "none" }} />

              {/* Header */}
              <div style={{ position: "relative", textAlign: "center" as const, marginBottom: "1.5rem" }}>
                <p style={{ fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.5)", marginBottom: "0.5rem" }}>
                  Skills We Build
                </p>
                <div style={{ width: "28px", height: "2px", background: "rgba(255,255,255,0.35)", borderRadius: "2px", margin: "0 auto" }} />
              </div>

              {/* Skill grid */}
              <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.65rem" }}>
                {skillItems.map(({ label, Icon }, i) => (
                  <div
                    key={label}
                    style={{
                      gridColumn: i === skillItems.length - 1 && skillItems.length % 2 !== 0 ? "1 / -1" : undefined,
                      display: "flex",
                      flexDirection: "column" as const,
                      alignItems: "center",
                      gap: "0.5rem",
                      background: "rgba(255,255,255,0.11)",
                      borderRadius: "1rem",
                      padding: "1rem 0.75rem 0.875rem",
                      border: "1px solid rgba(255,255,255,0.14)",
                    }}
                  >
                    <div
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.18)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon size={16} color="#fff" />
                    </div>
                    <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#ffffff", textAlign: "center" as const, lineHeight: 1.2 }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <p style={{ position: "relative", textAlign: "center" as const, fontSize: "0.65rem", color: "rgba(255,255,255,0.38)", marginTop: "1.25rem", letterSpacing: "0.04em" }}>
                Empowering communities · Est. 1997
              </p>
            </div>
          </motion.div>
        </div>

        {/* Hero features strip */}
        <CauseFeatureStrip features={heroFeatures} primary={PRIMARY} lightBg={LIGHT_BG} />
      </div>
    </section>
  );
}
