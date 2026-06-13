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
import { useGroupActivities } from "../../../context/GroupActivitiesContext";
import { usePageSections } from "../../../context/PageContext";
import CauseActivitiesGallery from "../cause/CauseActivitiesGallery";

const DEFAULT_ACTIVITIES = {
  doEyebrow: "What We Do",
  doHeading: "Our Core Programs",
  focusEyebrow: "Focus Areas",
  focusHeading: "Where We Compete & Excel",
  impactEyebrow: "Our Impact",
  impactHeading: "By The Numbers",
  galleryEyebrow: "Our Activities",
  galleryHeading: "What We've Been Doing",
};

const whatWeDo = [
  { icon: BookOpen, title: "Academic Excellence Training", desc: "Preparing students and members for competitive exams, Olympiads, and academic tournaments." },
  { icon: Megaphone, title: "Quiz & Debate Programs", desc: "Hosting and coaching for interschool, college, and open-category quiz and debate competitions." },
  { icon: Trophy, title: "Sports & Athletics", desc: "Developing physical excellence through organized sports events, fitness camps, and athletic coaching." },
  { icon: Lightbulb, title: "Creative Arts & Innovation", desc: "Encouraging creative expression through art, science, and innovation challenges." },
  { icon: Target, title: "Life Skills Development", desc: "Building communication, leadership, and confidence for real-world competitive environments." },
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
  { value: "2,800+", label: "Students Coached" },
  { value: "500+", label: "Competitions Participated" },
  { value: "180+", label: "Medals & Awards Won" },
  { value: "60+", label: "Events Organized" },
  { value: "100%", label: "Commitment to Excellence" },
];

const sectionLabel: React.CSSProperties = {
  fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em",
  textTransform: "uppercase", color: PRIMARY, marginBottom: "0.5rem", display: "block",
};

const sectionTitle: React.CSSProperties = {
  fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)", fontWeight: 800,
  color: "#0f172a", marginBottom: "2.5rem", lineHeight: 1.2,
};

export default function CwgActivities() {
  const { data } = useGroupActivities();
  const activities = data.cwg;
  const { getSectionData } = usePageSections();
  const content = { ...DEFAULT_ACTIVITIES, ...getSectionData("cwg-activities") };

  return (
    <section style={{ background: "#f0fdfa", padding: "6rem 1.5rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        <motion.div {...fade(0)} style={{ marginBottom: "5rem" }}>
          <span style={sectionLabel}>{content.doEyebrow}</span>
          <div style={{ width: "40px", height: "3px", background: PRIMARY, borderRadius: "2px", marginBottom: "1rem" }} />
          <h2 style={sectionTitle}>{content.doHeading}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem" }}>
            {whatWeDo.map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title} {...fade(i * 0.07)} style={{ display: "flex", alignItems: "flex-start", gap: "1rem", background: "#ffffff", borderRadius: "1rem", padding: "1.25rem 1.5rem", boxShadow: "0 2px 12px rgba(15,118,110,0.06)", border: "1px solid #d1faf5" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: LIGHT_BG, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={19} color={PRIMARY} strokeWidth={1.6} />
                </div>
                <div>
                  <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.3rem" }}>{title}</div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b", lineHeight: 1.6 }}>{desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div {...fade(0.1)} style={{ marginBottom: "5rem" }}>
          <span style={sectionLabel}>{content.focusEyebrow}</span>
          <div style={{ width: "40px", height: "3px", background: PRIMARY, borderRadius: "2px", marginBottom: "1rem" }} />
          <h2 style={sectionTitle}>{content.focusHeading}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.25rem" }}>
            {focusAreas.map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title} {...fade(i * 0.07)} style={{ background: "#ffffff", borderRadius: "1rem", padding: "2rem 1.5rem", textAlign: "center", boxShadow: "0 2px 12px rgba(15,118,110,0.06)", border: "1px solid #d1faf5" }}>
                <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: LIGHT_BG, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
                  <Icon size={22} color={PRIMARY} strokeWidth={1.6} />
                </div>
                <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.4rem" }}>{title}</div>
                <div style={{ fontSize: "0.78rem", color: "#64748b", lineHeight: 1.55 }}>{desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div {...fade(0.2)} style={{ marginBottom: "5rem" }}>
          <span style={sectionLabel}>{content.impactEyebrow}</span>
          <div style={{ width: "40px", height: "3px", background: PRIMARY, borderRadius: "2px", marginBottom: "1rem" }} />
          <h2 style={sectionTitle}>{content.impactHeading}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1.25rem" }}>
            {impactStats.map(({ value, label }, i) => (
              <motion.div key={value} {...fade(i * 0.07)} style={{ background: "#ffffff", borderRadius: "1rem", padding: "2rem 1rem", textAlign: "center", boxShadow: "0 2px 12px rgba(15,118,110,0.06)", border: "1px solid #d1faf5" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: LIGHT_BG, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
                  <TrendingUp size={19} color={PRIMARY} strokeWidth={1.6} />
                </div>
                <div style={{ fontSize: "1.6rem", fontWeight: 800, color: PRIMARY, lineHeight: 1 }}>{value}</div>
                <div style={{ fontSize: "0.78rem", color: "#475569", marginTop: "0.4rem", lineHeight: 1.4 }}>{label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Activities Gallery */}
        <CauseActivitiesGallery
          activities={activities}
          primary={PRIMARY}
          lightBg={LIGHT_BG}
          borderColor="#d1faf5"
          shadowRgb="15,118,110"
          eyebrow={content.galleryEyebrow}
          heading={content.galleryHeading}
        />

      </div>
    </section>
  );
}
