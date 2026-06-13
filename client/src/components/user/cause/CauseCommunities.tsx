import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Trophy, Scale, Heart, Users, Globe, type LucideIcon } from "lucide-react";
import { fade } from "./cause.constants";

export interface CauseGroupInfo {
  slug: string;
  abbr: string;
  label: string;
  color: string;
  bg: string;
  Icon: LucideIcon;
  path: string;
}

export const ALL_GROUPS: CauseGroupInfo[] = [
  { slug: "cwg", abbr: "CWG", label: "Competitive World Group", color: "#0f766e", bg: "#e8f7f6", Icon: Trophy, path: "/cwg" },
  { slug: "fseds", abbr: "FSEDS", label: "Foundation for Socio-Economic Development Society", color: "#6d28d9", bg: "#f3f0ff", Icon: Globe, path: "/fseds" },
  { slug: "hrds", abbr: "HRDS", label: "Human Resources Developmental Society", color: "#15803d", bg: "#edf7f1", Icon: Users, path: "/hrds" },
  { slug: "whg", abbr: "WHG", label: "Work for Humanity Group", color: "#c2410c", bg: "#fff4ec", Icon: Heart, path: "/whg" },
  { slug: "lac", abbr: "LAC", label: "Legal Aid Club", color: "#1a3270", bg: "#eef1fb", Icon: Scale, path: "/lac" },
];

interface Props {
  currentSlug: string;
  currentLabel?: string;
  heading: string;
}

export default function CauseCommunities({ currentSlug, currentLabel, heading }: Props) {
  const current = ALL_GROUPS.find((g) => g.slug === currentSlug) ?? ALL_GROUPS[0];
  const others = ALL_GROUPS.filter((g) => g.slug !== currentSlug);

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
          {heading}
        </motion.h3>

        <motion.div
          {...fade(0.1)}
          style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" as const }}
        >
          {/* Current */}
          <div
            style={{
              display: "flex",
              flexDirection: "column" as const,
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1.25rem",
              borderRadius: "1rem",
              background: current.bg,
              border: `2px solid ${current.color}`,
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: current.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <current.Icon size={20} color="#fff" strokeWidth={1.6} />
            </div>
            <span
              style={
                currentLabel
                  ? { fontSize: "0.75rem", fontWeight: 700, color: current.color }
                  : {
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: current.color,
                      maxWidth: "90px",
                      textAlign: "center" as const,
                    }
              }
            >
              {currentLabel ?? current.abbr}
            </span>
          </div>

          {others.map(({ slug, abbr, color, bg, Icon, path }) => (
            <Link
              key={slug}
              to={path}
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
