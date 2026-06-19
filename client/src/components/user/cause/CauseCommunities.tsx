import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Trophy, Scale, Heart, Users, Globe, ChevronRight, type LucideIcon } from "lucide-react";
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
  { slug: "cwg",   abbr: "CWG",   label: "Competitive World Group",                          color: "#0f766e", bg: "#e8f7f6", Icon: Trophy, path: "/cwg"   },
  { slug: "fseds", abbr: "FSEDS", label: "Foundation for Socio-Economic Development Society", color: "#6d28d9", bg: "#f3f0ff", Icon: Globe,  path: "/fseds" },
  { slug: "hrds",  abbr: "HRDS",  label: "Human Resources Developmental Society",             color: "#15803d", bg: "#edf7f1", Icon: Users,  path: "/hrds"  },
  { slug: "whg",   abbr: "WHG",   label: "Work for Humanity Group",                           color: "#c2410c", bg: "#fff4ec", Icon: Heart,  path: "/whg"   },
  { slug: "lac",   abbr: "LAC",   label: "Legal Aid Club",                                    color: "#1a3270", bg: "#eef1fb", Icon: Scale,  path: "/lac"   },
];

interface Props {
  currentSlug: string;
  currentLabel?: string;
  heading: string;
}

function Card({
  group,
  isCurrent,
  currentLabel,
  index,
}: {
  group: CauseGroupInfo;
  isCurrent: boolean;
  currentLabel?: string;
  index: number;
}) {
  const { abbr, label, color, bg, Icon, path } = group;
  const displayName = isCurrent && currentLabel ? currentLabel : label;

  const inner = (
    <div className="flex items-center gap-3 w-full">
      <div
        className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center"
        style={{
          background: isCurrent ? color : bg,
          border: isCurrent ? "none" : `1.5px solid ${color}35`,
        }}
      >
        <Icon size={18} color={isCurrent ? "#fff" : color} strokeWidth={1.6} />
      </div>

      <div className="flex flex-col min-w-0 flex-1 text-left">
        <span
          className="text-[0.65rem] font-bold uppercase tracking-widest leading-none mb-0.5"
          style={{ color: `${color}99` }}
        >
          {abbr}
        </span>
        <span
          className="text-[0.8rem] font-semibold leading-snug"
          style={{ color: isCurrent ? color : "#374151" }}
        >
          {displayName}
        </span>
      </div>

      {isCurrent ? (
        <div
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ background: color }}
        />
      ) : (
        <ChevronRight size={15} color="#9ca3af" className="flex-shrink-0" />
      )}
    </div>
  );

  const baseStyle = {
    background: isCurrent ? bg : "#fff",
    border: isCurrent ? `1.5px solid ${color}` : "1.5px solid #e8edf5",
    borderRadius: "14px",
    padding: "12px 14px",
  };

  if (isCurrent) {
    return (
      <motion.div {...fade(index * 0.06)} style={baseStyle}>
        {inner}
      </motion.div>
    );
  }

  return (
    <motion.div {...fade(index * 0.06)}>
      <Link
        to={path}
        className="block no-underline transition-all duration-200"
        style={baseStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = color;
          e.currentTarget.style.boxShadow = `0 4px 14px ${color}20`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "#e8edf5";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {inner}
      </Link>
    </motion.div>
  );
}

export default function CauseCommunities({ currentSlug, currentLabel, heading }: Props) {
  const current = ALL_GROUPS.find((g) => g.slug === currentSlug) ?? ALL_GROUPS[0];
  const others = ALL_GROUPS.filter((g) => g.slug !== currentSlug);
  const all = [current, ...others];

  return (
    <section className="py-12 px-6 bg-surface">
      <div className="max-w-sm mx-auto">
        <motion.h3
          {...fade(0)}
          className="text-base font-bold text-heading mb-5 text-center"
        >
          {heading}
        </motion.h3>

        <div className="flex flex-col gap-2.5">
          {all.map((g, i) => (
            <Card
              key={g.slug}
              group={g}
              isCurrent={g.slug === currentSlug}
              currentLabel={currentLabel}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
