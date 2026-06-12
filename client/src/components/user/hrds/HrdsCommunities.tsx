import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Users, Scale, Heart, Globe, Trophy } from "lucide-react";
import { PRIMARY, LIGHT_BG, fade } from "./hrds.constants";
import { usePageSections } from "../../../context/PageContext";

const DEFAULT_COMMUNITIES = {
  heading: "Explore Our Other Communities",
};

const otherGroups = [
  { slug: "lac", abbr: "LAC", color: "#1a3270", bg: "#eef1fb", Icon: Scale },
  { slug: "whg", abbr: "WHG", color: "#c2410c", bg: "#fff4ec", Icon: Heart },
  { slug: "fseds", abbr: "FSEDS", color: "#6d28d9", bg: "#f3f0ff", Icon: Globe },
  { slug: "cwg", abbr: "CWG", color: "#0f766e", bg: "#e8f7f6", Icon: Trophy },
];

const slugToPath: Record<string, string> = {
  lac: "/lac",
  whg: "/whg",
  cwg: "/cwg",
  fseds: "/fseds",
};

export default function HrdsCommunities() {
  const { getSectionData } = usePageSections();
  const communities = { ...DEFAULT_COMMUNITIES, ...getSectionData("hrds-communities") };

  return (
    <section style={{ background: "#f8fafc", padding: "3rem 1.5rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" as const }}>
        <motion.h3
          {...fade(0)}
          style={{
            fontSize: "1rem",
            fontWeight: 700,
            color: "#0f172a",
            marginBottom: "1.5rem",
            letterSpacing: "0.02em",
          }}
        >
          {communities.heading}
        </motion.h3>

        <motion.div
          {...fade(0.1)}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            flexWrap: "wrap" as const,
          }}
        >
          {/* Current: HRDS */}
          <div
            style={{
              display: "flex",
              flexDirection: "column" as const,
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1.25rem",
              borderRadius: "1rem",
              background: LIGHT_BG,
              border: `2px solid ${PRIMARY}`,
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: PRIMARY,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Users size={20} color="#fff" strokeWidth={1.6} />
            </div>
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                color: PRIMARY,
                maxWidth: "90px",
                textAlign: "center" as const,
              }}
            >
              HRDS
            </span>
          </div>

          {otherGroups.map(({ slug, abbr, color, bg, Icon }) => (
            <Link
              key={slug}
              to={slugToPath[slug] ?? `/groups/${slug}`}
              style={{
                display: "flex",
                flexDirection: "column" as const,
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.25rem",
                borderRadius: "1rem",
                background: bg,
                border: "2px solid transparent",
                textDecoration: "none",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = color)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "transparent")}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon size={20} color="#fff" strokeWidth={1.6} />
              </div>
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: color,
                  textAlign: "center" as const,
                  maxWidth: "90px",
                }}
              >
                {abbr}
              </span>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
