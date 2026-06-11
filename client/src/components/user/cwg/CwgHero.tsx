import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Trophy,
  Star,
  TrendingUp,
  Users,
  ArrowRight,
  ChevronRight,
  Brain,
  Target,
  Zap,
  Medal,
  Swords,
} from "lucide-react";
import { PRIMARY, SECONDARY, LIGHT_BG, fade } from "./cwg.constants";

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
  return (
    <section
      style={{ background: "#ffffff", paddingTop: "5.5rem", position: "relative", overflow: "hidden" }}
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
        {/* Breadcrumb */}
        <motion.div
          {...fade(0)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            fontSize: "0.78rem",
            color: "#64748b",
            marginBottom: "2.5rem",
          }}
        >
          <Link to="/" style={{ color: "#64748b", textDecoration: "none" }}>Home</Link>
          <ChevronRight size={13} />
          <span>Our Communities</span>
          <ChevronRight size={13} />
          <span style={{ color: PRIMARY, fontWeight: 600 }}>Competitive World Group</span>
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
            <motion.div
              {...fade(0.05)}
              style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "12px",
                  background: `linear-gradient(135deg, ${PRIMARY} 0%, ${SECONDARY} 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 4px 20px rgba(15,118,110,0.3)`,
                  flexShrink: 0,
                }}
              >
                <Trophy size={30} color="#ffffff" strokeWidth={1.5} />
              </div>
              <span
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase" as const,
                  color: PRIMARY,
                  lineHeight: 1.4,
                  maxWidth: "180px",
                }}
              >
                Competitive World Group
              </span>
            </motion.div>

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
              Sharpen Minds.
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
              Shape Champions.
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
              Build a Legacy of Excellence.
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
              We prepare individuals to compete, excel, and win — fostering a culture of academic
              rigor, athletic discipline, and creative brilliance across every arena.
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
                  "radial-gradient(ellipse at 50% 50%, rgba(15,118,110,0.1) 0%, transparent 70%)",
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
                boxShadow: `0 20px 60px rgba(15,118,110,0.15)`,
                background: `linear-gradient(145deg, ${PRIMARY} 0%, ${SECONDARY} 100%)`,
                padding: "3rem 2.5rem",
                minHeight: "320px",
                display: "flex",
                flexDirection: "column" as const,
                justifyContent: "center",
                alignItems: "flex-start",
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
              <p
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase" as const,
                  color: "rgba(255,255,255,0.65)",
                  marginBottom: "1.5rem",
                  position: "relative",
                }}
              >
                Compete · Excel · Lead · Win · Grow
              </p>
              {cardItems.map(({ label, Icon }, i) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    marginBottom: i < 4 ? "0.85rem" : 0,
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={13} color="#fff" />
                  </div>
                  <span style={{ fontSize: "1rem", fontWeight: 700, color: "#ffffff" }}>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Features strip */}
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
