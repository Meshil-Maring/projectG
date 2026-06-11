import { motion } from "framer-motion";
import { Scale, Users, ArrowRight } from "lucide-react";
import { NAV_BLUE, BRIGHT_BLUE, fade } from "./lac.constants";

export default function LacCTA() {
  return (
    <section
      style={{
        background: "#ffffff",
        padding: "5.5rem 1.5rem",
        textAlign: "center" as const,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "5%",
          top: "50%",
          transform: "translateY(-50%)",
          opacity: 0.07,
        }}
      >
        <Scale size={120} color={NAV_BLUE} strokeWidth={1} />
      </div>
      <div
        style={{
          position: "absolute",
          right: "5%",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          gap: "0.3rem",
          opacity: 0.07,
        }}
      >
        {[...Array(4)].map((_, i) => (
          <Users key={i} size={40 + i * 8} color={NAV_BLUE} strokeWidth={1} />
        ))}
      </div>

      <motion.div {...fade(0)} style={{ position: "relative" }}>
        <h2
          style={{
            fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
            fontWeight: 800,
            color: "#0f172a",
            marginBottom: "0.75rem",
          }}
        >
          Be the Voice of Justice
        </h2>
        <p
          style={{
            fontSize: "0.95rem",
            color: "#64748b",
            marginBottom: "2.5rem",
            maxWidth: "480px",
            margin: "0 auto 2.5rem",
            lineHeight: 1.7,
          }}
        >
          Join the Legal Aid Club and help us build a world where justice is not a privilege, but a
          right.
        </p>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap" as const,
          }}
        >
          <a
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: `linear-gradient(135deg, ${NAV_BLUE} 0%, ${BRIGHT_BLUE} 100%)`,
              color: "#fff",
              padding: "0.8rem 2rem",
              borderRadius: "0.5rem",
              fontWeight: 700,
              fontSize: "0.9rem",
              textDecoration: "none",
              boxShadow: "0 4px 14px rgba(26,50,112,0.25)",
            }}
          >
            Join Now
            <ArrowRight size={15} />
          </a>
          <a
            href="/get-involved"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              border: `2px solid ${NAV_BLUE}`,
              color: NAV_BLUE,
              padding: "0.78rem 2rem",
              borderRadius: "0.5rem",
              fontWeight: 700,
              fontSize: "0.9rem",
              textDecoration: "none",
              background: "transparent",
            }}
          >
            <Users size={15} />
            Volunteer With Us
          </a>
        </div>
      </motion.div>
    </section>
  );
}
