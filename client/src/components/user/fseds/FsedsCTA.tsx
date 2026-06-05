import { motion } from "framer-motion";
import { Users, Clock, TrendingUp, Star, Lightbulb, ArrowRight } from "lucide-react";
import { PRIMARY, SECONDARY, LIGHT_BG, fade } from "./fseds.constants";

const ctaActions = [
  { icon: Clock, label: "Volunteer Your Time" },
  { icon: TrendingUp, label: "Support Local Initiatives" },
  { icon: Lightbulb, label: "Share Resources" },
  { icon: Star, label: "Be the Change" },
];

const chartBars = [28, 44, 36, 56, 48, 64];

export default function FsedsCTA() {
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

        {/* Left – bar chart icon */}
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
              boxShadow: `0 12px 32px rgba(109,40,217,0.25)`,
              position: "relative",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-end", gap: "5px" }}>
              {chartBars.map((h, i) => (
                <div
                  key={i}
                  style={{
                    width: "10px",
                    height: `${h * 0.6}px`,
                    borderRadius: "2px 2px 0 0",
                    background:
                      i === chartBars.length - 1
                        ? "rgba(255,255,255,0.95)"
                        : "rgba(255,255,255,0.35)",
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>

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
            TOGETHER WE RISE
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
            Empowered communities.
            <br />
            Stronger economies.
            <br />
            Brighter futures.
          </h2>
          <p style={{ fontSize: "0.9rem", color: "#64748b", lineHeight: 1.7, marginBottom: "1.75rem" }}>
            Your support creates ripples of economic change. Join us in shaping thriving,
            self-reliant communities.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" as const }}>
            <a
              href="/#contact"
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
              href="/#contact"
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
                boxShadow: "0 2px 8px rgba(109,40,217,0.07)",
                border: "1px solid #e4d9ff",
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
