import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Scale, Users, Globe, Heart, Trophy } from "lucide-react";
import { NAV_BLUE, fade } from "./lac.constants";

const otherGroups = [
  {
    slug: "whg",
    abbr: "WHG",
    label: "Work for Humanity Group",
    color: "#c2410c",
    bg: "#fff4ec",
    Icon: Heart,
  },
  {
    slug: "hrds",
    abbr: "HRDS",
    label: "Human Resources Developmental Society",
    color: "#15803d",
    bg: "#edf7f1",
    Icon: Users,
  },
  {
    slug: "fseds",
    abbr: "FSEDS",
    label: "Foundation for Socio-Economic Development Society",
    color: "#6d28d9",
    bg: "#f3f0ff",
    Icon: Globe,
  },
  {
    slug: "cwg",
    abbr: "CWG",
    label: "Competitive World Group",
    color: "#0f766e",
    bg: "#e8f7f6",
    Icon: Trophy,
  },
];

const slugToPath: Record<string, string> = {
  whg: "/whg",
  hrds: "/hrds",
  cwg: "/cwg",
  fseds: "/fseds",
};

export default function LacCommunities() {
  return (
    <section style={{ background: "#f8fafc", padding: "3rem 1.5rem" }}>
      <div
        style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" as const }}
      >
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
          Explore Our Other Communities
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
          {/* Current: LAC */}
          <div
            style={{
              display: "flex",
              flexDirection: "column" as const,
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1.25rem",
              borderRadius: "1rem",
              background: "#eef1fb",
              border: `2px solid ${NAV_BLUE}`,
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: NAV_BLUE,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Scale size={20} color="#fff" strokeWidth={1.6} />
            </div>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: NAV_BLUE }}>
              Legal Aid Club
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
