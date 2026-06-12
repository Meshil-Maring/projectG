import { motion } from "framer-motion";
import { Heart, ArrowDown } from "lucide-react";
import { usePageSections } from "../../../context/PageContext";

const DEFAULT_HERO = {
  badge: "Make a Difference Today",
  headingLine1: "Your Generosity",
  headingLine2: "Changes Lives",
  description:
    "Every rupee you give goes directly towards education, healthcare, and community development programs that uplift the most vulnerable.",
};

export default function DonateHero() {
  const { getSectionData } = usePageSections();
  const hero = { ...DEFAULT_HERO, ...getSectionData("donate-hero") };
  function scrollToForm() {
    document.getElementById("donate-form")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      style={{
        background: "linear-gradient(135deg, #1a3270 0%, #2563eb 100%)",
        padding: "5rem 1.5rem 6rem",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Decorative blobs */}
      <div
        style={{
          position: "absolute",
          top: "-120px",
          right: "-120px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.05)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-80px",
          left: "-80px",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.04)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "700px", margin: "0 auto", position: "relative" }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            backgroundColor: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "999px",
            padding: "0.4rem 1.1rem",
            marginBottom: "1.75rem",
          }}
        >
          <Heart size={14} color="#f97316" fill="#f97316" />
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "rgba(255,255,255,0.9)",
              letterSpacing: "0.05em",
            }}
          >
            {hero.badge}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.2,
            marginBottom: "1.25rem",
          }}
        >
          {hero.headingLine1}<br />
          <span style={{ color: "#f97316" }}>{hero.headingLine2}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          style={{
            fontSize: "1rem",
            color: "rgba(255,255,255,0.78)",
            lineHeight: 1.75,
            marginBottom: "2.5rem",
            maxWidth: "520px",
            margin: "0 auto 2.5rem",
          }}
        >
          {hero.description}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={scrollToForm}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            backgroundColor: "#f97316",
            color: "#ffffff",
            fontWeight: 700,
            fontSize: "0.95rem",
            padding: "0.85rem 2.25rem",
            borderRadius: "0.6rem",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(249,115,22,0.35)",
          }}
        >
          Donate Now
          <Heart size={16} fill="white" strokeWidth={0} />
        </motion.button>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{
            marginTop: "3rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.35rem",
            color: "rgba(255,255,255,0.4)",
            fontSize: "0.72rem",
            cursor: "pointer",
          }}
          onClick={scrollToForm}
        >
          <span>Scroll to donate</span>
          <ArrowDown size={14} />
        </motion.div>
      </div>
    </section>
  );
}
