import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Scale, BookOpen, Users, Shield, Megaphone, ChevronRight } from "lucide-react";
import { NAV_BLUE, BRIGHT_BLUE, GOLD, fade } from "./lac.constants";

const heroFeatures = [
  { icon: Scale, title: "Know Your Rights", sub: "Legal awareness for all" },
  { icon: BookOpen, title: "Free Guidance", sub: "Accessible legal advice" },
  { icon: Users, title: "Empower Communities", sub: "Building a just and equal society" },
  { icon: Shield, title: "Protect & Support", sub: "Upholding rights, dignity & fairness" },
  { icon: Megaphone, title: "Advocate for Change", sub: "Creating systemic impact" },
];

export default function LacHero() {
  return (
    <section
      style={{
        background: "#ffffff",
        paddingTop: "5.5rem",
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
            "radial-gradient(ellipse at 70% 40%, rgba(37,99,235,0.08) 0%, rgba(37,99,235,0.04) 45%, transparent 70%)",
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
          <Link to="/" style={{ color: "#64748b", textDecoration: "none" }}>
            Home
          </Link>
          <ChevronRight size={13} />
          <span>Our Communities</span>
          <ChevronRight size={13} />
          <span style={{ color: NAV_BLUE, fontWeight: 600 }}>Legal Aid Club</span>
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
                  background: `linear-gradient(135deg, ${NAV_BLUE} 0%, ${BRIGHT_BLUE} 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 20px rgba(26,50,112,0.3)",
                  flexShrink: 0,
                }}
              >
                <Scale size={30} color="#ffffff" strokeWidth={1.5} />
              </div>
            </motion.div>

            <motion.h1
              {...fade(0.1)}
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3rem)",
                fontWeight: 800,
                color: NAV_BLUE,
                lineHeight: 1.15,
                marginBottom: "0.6rem",
                letterSpacing: "-0.01em",
              }}
            >
              LEGAL AID CLUB
            </motion.h1>

            <motion.p
              {...fade(0.15)}
              style={{
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                color: GOLD,
                marginBottom: "1.25rem",
                fontWeight: 400,
                lineHeight: 1.4,
              }}
            >
              Justice for all, barriers for none
            </motion.p>

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
              We believe everyone has the right to justice. The Legal Aid Club works to break down
              legal barriers and empower individuals and communities with knowledge, support, and
              advocacy.
            </motion.p>

            <motion.div
              {...fade(0.25)}
              style={{ display: "flex", gap: "1rem", flexWrap: "wrap" as const }}
            >
              <a
                href="#contact-section"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: `linear-gradient(135deg, ${NAV_BLUE} 0%, ${BRIGHT_BLUE} 100%)`,
                  color: "#fff",
                  padding: "0.75rem 1.75rem",
                  borderRadius: "0.5rem",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  boxShadow: "0 4px 14px rgba(26,50,112,0.3)",
                }}
              >
                <Users size={16} />
                Get Legal Help
              </a>
              <a
                href="/#contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  border: `2px solid ${NAV_BLUE}`,
                  color: NAV_BLUE,
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

          {/* Right – decorative visual */}
          <motion.div
            {...fade(0.15)}
            style={{ position: "relative", display: "flex", justifyContent: "center" }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(ellipse at 50% 50%, rgba(37,99,235,0.12) 0%, transparent 70%)",
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
                boxShadow: "0 20px 60px rgba(26,50,112,0.15)",
                background: `linear-gradient(145deg, ${NAV_BLUE} 0%, ${BRIGHT_BLUE} 100%)`,
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
              <Scale
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
                "Justice for all,
                <br />
                barriers for none"
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,0.65)",
                  fontSize: "0.82rem",
                  marginTop: "0.75rem",
                  position: "relative",
                }}
              >
                Legal Aid Club · Project Generation
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
                  background: "#eef1fb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon size={18} color={NAV_BLUE} strokeWidth={1.6} />
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
