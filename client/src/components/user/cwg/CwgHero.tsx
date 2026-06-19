import { motion } from "framer-motion";
import {
  Trophy,
  Star,
  TrendingUp,
  Users,
  ArrowRight,
  Brain,
  Target,
  Zap,
  Medal,
  Swords,
} from "lucide-react";
import { PRIMARY, SECONDARY, LIGHT_BG, fade } from "./cwg.constants";
import { usePageSections } from "../../../context/PageContext";
import CauseFeatureStrip from "../cause/CauseFeatureStrip";

const DEFAULT_HERO = {
  eyebrow: "Competitive World Group",
  titleLine1: "Sharpen Minds.",
  titleEmphasis1: "Shape Champions.",
  titleEmphasis2: "Build a Legacy of Excellence.",
  description:
    "We prepare individuals to compete, excel, and win — fostering a culture of academic rigor, athletic discipline, and creative brilliance across every arena.",
};

const heroFeatures = [
  { icon: Brain, title: "Sharpen Critical Thinking", sub: "Logic, reasoning & analysis" },
  { icon: Medal, title: "Build Champions", sub: "Competitions & achievement" },
  { icon: Target, title: "Goal-Oriented Training", sub: "Focused, structured growth" },
  { icon: Zap, title: "Ignite Competitive Spirit", sub: "Drive to excel and win" },
  { icon: TrendingUp, title: "Drive Sustainable Growth", sub: "Long-term excellence" },
];

const cardItems = [
  { label: "Compete", Icon: Swords },
  { label: "Excel", Icon: Star },
  { label: "Lead", Icon: Trophy },
  { label: "Win", Icon: Medal },
  { label: "Grow", Icon: TrendingUp },
];

export default function CwgHero() {
  const { getSectionData } = usePageSections();
  const hero = { ...DEFAULT_HERO, ...getSectionData("cwg-hero") };

  return (
    <section
      style={{ background: "#ffffff", paddingTop: "1.75rem", position: "relative", overflow: "hidden" }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "55%",
          height: "100%",
          background:
            "radial-gradient(ellipse at 70% 40%, rgba(15,118,110,0.07) 0%, rgba(13,148,136,0.04) 45%, transparent 70%)",
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
                marginBottom: "0",
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
                  boxShadow: `0 4px 14px rgba(15,118,110,0.3)`,
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

          {/* Visual card – centered */}
          <motion.div
            {...fade(0.15)}
            style={{ position: "relative", display: "flex", justifyContent: "center", width: "100%" }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(ellipse at 50% 50%, rgba(15,118,110,0.1) 0%, transparent 70%)",
                borderRadius: "50%",
                transform: "scale(1.2)",
              }}
            />
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "400px",
                borderRadius: "1.75rem",
                overflow: "hidden",
                boxShadow: `0 24px 70px rgba(15,118,110,0.22), 0 4px 16px rgba(15,118,110,0.12)`,
                background: `linear-gradient(145deg, ${PRIMARY} 0%, ${SECONDARY} 100%)`,
                padding: "2.75rem 2.75rem 2.75rem 2.25rem",
                display: "flex",
                flexDirection: "column" as const,
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              {/* Decorative circles */}
              <div
                style={{
                  position: "absolute",
                  top: "-70px",
                  right: "-70px",
                  width: "220px",
                  height: "220px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.07)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "-50px",
                  left: "-50px",
                  width: "170px",
                  height: "170px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.05)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "-30px",
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.04)",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                }}
              />

              {/* Header */}
              <div style={{ position: "relative", marginBottom: "1.75rem", width: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  <div style={{ height: "1px", width: "20px", background: "rgba(255,255,255,0.35)" }} />
                  <Trophy size={12} color="rgba(255,255,255,0.75)" />
                  <div style={{ height: "1px", flex: 1, background: "rgba(255,255,255,0.15)" }} />
                </div>
                <p
                  style={{
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase" as const,
                    color: "rgba(255,255,255,0.75)",
                    margin: 0,
                  }}
                >
                  Compete · Excel · Lead · Win · Grow
                </p>
              </div>

              {/* Items with connecting timeline line */}
              <div style={{ position: "relative", width: "100%" }}>
                {/* Vertical connector line */}
                <div
                  style={{
                    position: "absolute",
                    left: "18px",
                    top: "20px",
                    bottom: "20px",
                    width: "1px",
                    background:
                      "linear-gradient(to bottom, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.1) 100%)",
                    zIndex: 0,
                  }}
                />

                {cardItems.map(({ label, Icon }, i) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      marginBottom: i < cardItems.length - 1 ? "1rem" : 0,
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    <div
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "50%",
                        background:
                          i === 0
                            ? "rgba(255,255,255,0.28)"
                            : "rgba(255,255,255,0.13)",
                        border: `1.5px solid ${i === 0 ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.22)"}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        boxShadow:
                          i === 0
                            ? "0 0 0 4px rgba(255,255,255,0.08)"
                            : "none",
                      }}
                    >
                      <Icon size={16} color="#fff" strokeWidth={i === 0 ? 2 : 1.7} />
                    </div>
                    <div>
                      <span
                        style={{
                          fontSize: i === 0 ? "1.05rem" : "0.95rem",
                          fontWeight: i === 0 ? 800 : 600,
                          color: i === 0 ? "#ffffff" : "rgba(255,255,255,0.85)",
                          letterSpacing: i === 0 ? "-0.01em" : "normal",
                        }}
                      >
                        {label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features strip */}
        <CauseFeatureStrip features={heroFeatures} primary={PRIMARY} lightBg={LIGHT_BG} />
      </div>
    </section>
  );
}
