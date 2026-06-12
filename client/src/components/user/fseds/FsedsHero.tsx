import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Globe,
  TrendingUp,
  Briefcase,
  Users,
  Leaf,
  Building,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { PRIMARY, SECONDARY, LIGHT_BG, fade } from "./fseds.constants";
import { usePageSections } from "../../../context/PageContext";

const DEFAULT_HERO = {
  eyebrow: "Foundation for Socio-Economic Development Society",
  titleLine1: "Foundation for",
  titleLine2: "Socio-Economic",
  titleLine3: "Development Society",
  taglineLine1: "Building communities through",
  taglineLine2: "economic empowerment",
  description:
    "We work to create sustainable livelihoods, promote entrepreneurship, and strengthen local economies so communities can thrive with dignity and self-reliance.",
};

const heroFeatures = [
  { icon: Users, title: "Empower Communities", sub: "Inclusive growth for all" },
  { icon: TrendingUp, title: "Promote Livelihoods", sub: "Sustainable income pathways" },
  { icon: Briefcase, title: "Support Entrepreneurship", sub: "Helping businesses thrive" },
  { icon: Building, title: "Strengthen Local Economies", sub: "Grassroots economic resilience" },
  { icon: Leaf, title: "Drive Sustainable Development", sub: "Progress with purpose" },
];

const chartBars = [40, 60, 50, 75, 65, 90];

export default function FsedsHero() {
  const { getSectionData } = usePageSections();
  const hero = { ...DEFAULT_HERO, ...getSectionData("fseds-hero") };

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
            "radial-gradient(ellipse at 70% 40%, rgba(109,40,217,0.07) 0%, rgba(124,58,237,0.04) 45%, transparent 70%)",
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
          <span style={{ color: PRIMARY, fontWeight: 600 }}>
            Foundation for Socio-Economic Development Society
          </span>
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
                  boxShadow: `0 4px 20px rgba(109,40,217,0.3)`,
                  flexShrink: 0,
                }}
              >
                <Globe size={30} color="#ffffff" strokeWidth={1.5} />
              </div>
              <span
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase" as const,
                  color: PRIMARY,
                  lineHeight: 1.4,
                  maxWidth: "200px",
                }}
              >
                {hero.eyebrow}
              </span>
            </motion.div>

            <motion.h1
              {...fade(0.1)}
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 800,
                color: "#0f172a",
                lineHeight: 1.1,
                marginBottom: 0,
                letterSpacing: "-0.01em",
              }}
            >
              {hero.titleLine1}
            </motion.h1>
            <motion.h1
              {...fade(0.12)}
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 800,
                color: PRIMARY,
                lineHeight: 1.1,
                marginBottom: 0,
                letterSpacing: "-0.01em",
              }}
            >
              {hero.titleLine2}
            </motion.h1>
            <motion.h1
              {...fade(0.14)}
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 800,
                color: "#0f172a",
                lineHeight: 1.1,
                marginBottom: "0.5rem",
                letterSpacing: "-0.01em",
              }}
            >
              {hero.titleLine3}
            </motion.h1>

            <motion.p
              {...fade(0.16)}
              style={{
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
                color: PRIMARY,
                marginBottom: "0.5rem",
                fontWeight: 400,
                lineHeight: 1.35,
              }}
            >
              {hero.taglineLine1}
              <br />
              {hero.taglineLine2}
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
                  boxShadow: `0 4px 14px rgba(109,40,217,0.3)`,
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

          {/* Right – Quote + chart card */}
          <motion.div
            {...fade(0.15)}
            style={{ position: "relative", display: "flex", justifyContent: "center" }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(ellipse at 50% 50%, rgba(109,40,217,0.1) 0%, transparent 70%)",
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
                boxShadow: `0 20px 60px rgba(109,40,217,0.15)`,
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
              <div
                style={{
                  fontSize: "5rem",
                  color: "rgba(255,255,255,0.25)",
                  lineHeight: 1,
                  fontFamily: "Georgia, serif",
                  marginBottom: "0.5rem",
                  position: "relative",
                }}
              >
                "
              </div>
              <p
                style={{
                  fontFamily: "Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "1.15rem",
                  color: "#ffffff",
                  lineHeight: 1.65,
                  position: "relative",
                  marginBottom: "1.5rem",
                }}
              >
                Strong economies build strong communities. Empowered people build a brighter future
                for all.
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: "0.4rem",
                  position: "relative",
                }}
              >
                {chartBars.map((h, i) => (
                  <div
                    key={i}
                    style={{
                      width: "14px",
                      height: `${h * 0.5}px`,
                      borderRadius: "3px 3px 0 0",
                      background:
                        i === chartBars.length - 1
                          ? "rgba(255,255,255,0.9)"
                          : "rgba(255,255,255,0.35)",
                    }}
                  />
                ))}
                <TrendingUp
                  size={18}
                  color="rgba(255,255,255,0.7)"
                  style={{ marginLeft: "0.25rem", marginBottom: "0.2rem" }}
                />
              </div>
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
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
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
