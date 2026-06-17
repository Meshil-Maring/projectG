import { motion } from "framer-motion";
import {
  Globe,
  BarChart3,
  GraduationCap,
  TrendingUp,
  Briefcase,
  Users,
} from "lucide-react";
import { PRIMARY, SECONDARY, LIGHT_BG, fade } from "./fseds.constants";
import { usePageSections } from "../../../context/PageContext";
import CauseMissionPillars from "../cause/CauseMissionPillars";
import CauseGrowthSteps from "../cause/CauseGrowthSteps";

const DEFAULT_MISSION = {
  eyebrow: "OUR MISSION",
  headingLine1: "Empowering People.",
  headingLine2: "Strengthening Livelihoods.",
  headingLine3: "Transforming Communities.",
  description:
    "Our mission is to foster inclusive economic growth by providing resources, skills, and opportunities that enable individuals and communities to achieve lasting prosperity.",
};

const missionPillars = [
  { icon: BarChart3, label: "Economic Empowerment" },
  { icon: GraduationCap, label: "Skills & Capacity Building" },
  { icon: TrendingUp, label: "Inclusive Growth" },
  { icon: Briefcase, label: "Sustainable Livelihoods" },
  { icon: Users, label: "Community Prosperity" },
];

const growthSteps = [
  { label: "Grow", sub: "Build skills and capabilities" },
  { label: "Earn", sub: "Create sustainable livelihoods" },
  { label: "Prosper", sub: "Strengthen local economies" },
  { label: "Transform", sub: "Change lives, build communities" },
];

export default function FsedsMission() {
  const { getSectionData } = usePageSections();
  const mission = { ...DEFAULT_MISSION, ...getSectionData("fseds-mission") };

  return (
    <section style={{ background: "#fafaf8", padding: "5rem 1.5rem" }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "3rem",
          alignItems: "center",
        }}
      >
        {/* Center – mission content */}
        <motion.div {...fade(0.1)}>
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase" as const,
              color: PRIMARY,
              display: "block",
              marginBottom: "0.5rem",
            }}
          >
            {mission.eyebrow}
          </span>
          <div
            style={{
              width: "40px",
              height: "3px",
              background: PRIMARY,
              borderRadius: "2px",
              marginBottom: "1rem",
            }}
          />
          <h2
            style={{
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              fontWeight: 800,
              color: "#0f172a",
              lineHeight: 1.25,
              marginBottom: "1rem",
            }}
          >
            {mission.headingLine1}
            <br />
            {mission.headingLine2}
            <br />
            {mission.headingLine3}
          </h2>
          <p
            style={{
              fontSize: "0.9rem",
              color: "#475569",
              lineHeight: 1.8,
              marginBottom: "2rem",
            }}
          >
            {mission.description}
          </p>
          <CauseMissionPillars
            pillars={missionPillars}
            primary={PRIMARY}
            lightBg={LIGHT_BG}
            borderColor="#e4d9ff"
            shadowRgb="109,40,217"
          />
        </motion.div>

        {/* Right – growth steps */}
        <CauseGrowthSteps
          steps={growthSteps}
          primary={PRIMARY}
          lightBg={LIGHT_BG}
          shadowRgb="109,40,217"
        />
      </div>
    </section>
  );
}
