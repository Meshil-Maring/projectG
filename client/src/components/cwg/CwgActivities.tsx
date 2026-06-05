import { motion } from "framer-motion";
import {
  BookOpen,
  Megaphone,
  Trophy,
  Lightbulb,
  Target,
  Brain,
  Star,
  TrendingUp,
} from "lucide-react";
import { PRIMARY, LIGHT_BG, fade } from "./cwg.constants";

const whatWeDo = [
  {
    icon: BookOpen,
    title: "Academic Excellence Training",
    desc: "Preparing students and members for competitive exams, Olympiads, and academic tournaments.",
  },
  {
    icon: Megaphone,
    title: "Quiz & Debate Programs",
    desc: "Hosting and coaching for interschool, college, and open-category quiz and debate competitions.",
  },
  {
    icon: Trophy,
    title: "Sports & Athletics",
    desc: "Developing physical excellence through organized sports events, fitness camps, and athletic coaching.",
  },
  {
    icon: Lightbulb,
    title: "Creative Arts & Innovation",
    desc: "Encouraging creative expression through art, science, and innovation challenges.",
  },
  {
    icon: Target,
    title: "Life Skills Development",
    desc: "Building communication, leadership, and confidence for real-world competitive environments.",
  },
];

const focusAreas = [
  { icon: BookOpen, title: "Academic Competitions", desc: "Olympiads, science fairs & talent hunts" },
  { icon: Megaphone, title: "Quiz & Debates", desc: "Elocution, MUN & quiz leagues" },
  { icon: Trophy, title: "Sports Championships", desc: "Indoor, outdoor & e-sports events" },
  { icon: Lightbulb, title: "Creative Arts", desc: "Art, innovation & cultural contests" },
  { icon: Brain, title: "Digital Skills", desc: "Coding, tech-quiz & digital challenges" },
  { icon: Star, title: "Personal Development", desc: "Leadership, confidence & growth mindset" },
];

const impactStats = [
  { value: "2,800+", label: "Students", sub: "Coached" },
  { value: "500+", label: "Competitions", sub: "Participated In" },
  { value: "180+", label: "Medals &", sub: "Awards Won" },
  { value: "60+", label: "Events", sub: "Organized" },
  { value: "100%", label: "Commitment", sub: "to Excellence" },
];

export default function CwgActivities() {
  return (
    <section style={{ background: "#f0fdfa", padding: "5rem 1.5rem" }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "2.5rem",
          alignItems: "start",
        }}
      >
        {/* What We Do */}
        <motion.div {...fade(0)}>
          <h3
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase" as const,
              color: PRIMARY,
              marginBottom: "1.25rem",
            }}
          >
            WHAT WE DO
          </h3>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.85rem" }}>
            {whatWeDo.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                  background: "#ffffff",
                  borderRadius: "0.875rem",
                  padding: "0.875rem 1rem",
                  boxShadow: "0 2px 8px rgba(15,118,110,0.05)",
                  border: "1px solid #ccf0ed",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "9px",
                    background: LIGHT_BG,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={17} color={PRIMARY} strokeWidth={1.6} />
                </div>
                <div>
                  <div style={{ fontSize: "0.83rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.15rem" }}>
                    {title}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#64748b", lineHeight: 1.5 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Focus Areas */}
        <motion.div {...fade(0.1)}>
          <h3
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase" as const,
              color: PRIMARY,
              marginBottom: "1.25rem",
            }}
          >
            FOCUS AREAS
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
            {focusAreas.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                style={{
                  background: "#ffffff",
                  borderRadius: "0.875rem",
                  padding: "1.25rem 1rem",
                  textAlign: "center" as const,
                  boxShadow: "0 2px 8px rgba(15,118,110,0.05)",
                  border: "1px solid #ccf0ed",
                }}
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    background: LIGHT_BG,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 0.6rem",
                  }}
                >
                  <Icon size={19} color={PRIMARY} strokeWidth={1.6} />
                </div>
                <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.2rem" }}>
                  {title}
                </div>
                <div style={{ fontSize: "0.72rem", color: "#64748b", lineHeight: 1.45 }}>{desc}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Our Impact */}
        <motion.div {...fade(0.2)}>
          <h3
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase" as const,
              color: PRIMARY,
              marginBottom: "1.25rem",
            }}
          >
            OUR IMPACT
          </h3>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.75rem" }}>
            {impactStats.map(({ value, label, sub }) => (
              <div
                key={value}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  background: "#ffffff",
                  borderRadius: "0.875rem",
                  padding: "0.875rem 1.1rem",
                  boxShadow: "0 2px 8px rgba(15,118,110,0.05)",
                  border: "1px solid #ccf0ed",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: LIGHT_BG,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <TrendingUp size={18} color={PRIMARY} strokeWidth={1.6} />
                </div>
                <div>
                  <div style={{ fontSize: "1.3rem", fontWeight: 800, color: PRIMARY, lineHeight: 1 }}>
                    {value}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#475569", fontWeight: 600 }}>
                    {label} <span style={{ color: "#94a3b8", fontWeight: 500 }}>{sub}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
