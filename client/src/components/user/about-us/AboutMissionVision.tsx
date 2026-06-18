import { motion } from "framer-motion";
import { Heart, Eye, CheckCircle2, Sparkles, Target, Globe, Leaf, BookOpen } from "lucide-react";
import { usePageSections } from "../../../context/PageContext";

const DEFAULTS = {
  eyebrow: "Our Direction",
  heading: "Mission & Vision",
  missionTitle: "Our Mission",
  missionText:
    "To uplift underprivileged communities by providing quality education, accessible healthcare, nutritious food, and a safe environment — empowering individuals to realise their full potential and build a better future for themselves and their families.",
  missionPoints:
    "Provide quality education to underserved children\nDeliver accessible healthcare to rural communities\nEnsure nutritious food and long-term food security\nCreate safe, supportive environments for families\nEmpower women and youth through skill training",
  visionTitle: "Our Vision",
  visionText:
    "A world where every child grows up with equal opportunities — a society free from poverty and inequality, where communities thrive through collective compassion, shared knowledge, and sustainable growth that benefits generations to come.",
  visionPoints:
    "Equal opportunities for every child regardless of background\nCommunities free from poverty and preventable disease\nSustainable growth that benefits future generations\nInclusive societies built on compassion and shared knowledge\nThriving local economies driven by education and innovation",
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: "easeOut" as const },
  }),
};

const EXTRA_ACCENTS = [
  { bg: "#e8f5f0", color: "#059669" },
  { bg: "#f5e8ff", color: "#7c3aed" },
  { bg: "#fff8e8", color: "#b45309" },
  { bg: "#fce8f3", color: "#be185d" },
];

const EXTRA_ICONS = [Sparkles, Target, Globe, Leaf, BookOpen];

interface ExtraCard {
  title: string;
  text: string;
  points: string;
}

function BulletList({ points, color }: { points: string; color: string }) {
  const items = points.split("\n").map((s) => s.trim()).filter(Boolean);
  if (!items.length) return null;
  return (
    <ul className="mt-5 space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <CheckCircle2 size={16} style={{ color }} className="shrink-0 mt-0.5" strokeWidth={2} />
          <span className="text-sm text-body leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function AboutMissionVision() {
  const { getSectionData } = usePageSections();
  const raw = getSectionData("about-mission-vision") ?? {};
  const d = {
    ...DEFAULTS,
    ...Object.fromEntries(Object.entries(raw).filter(([, v]) => v != null)),
  };

  let extraCards: ExtraCard[] = [];
  if ((d as Record<string, unknown>).extraCards) {
    try {
      extraCards = JSON.parse((d as Record<string, unknown>).extraCards as string) as ExtraCard[];
    } catch { /* keep empty */ }
  }

  return (
    <section className="py-20 px-6 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-secondary mb-2">
            {d.eyebrow}
          </p>
          <h2 className="text-2xl xl:text-3xl font-bold text-heading">
            {d.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="bg-white rounded-2xl p-8 border border-border shadow-sm"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#fff3e8] flex items-center justify-center mb-5">
              <Heart size={26} className="text-secondary" />
            </div>
            <h3 className="text-lg font-bold text-heading mb-3">{d.missionTitle}</h3>
            <p className="text-sm text-body leading-relaxed">{d.missionText}</p>
            {d.missionPoints && <BulletList points={d.missionPoints} color="#f97316" />}
          </motion.div>

          {/* Vision card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="bg-white rounded-2xl p-8 border border-border shadow-sm"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#e8f0ff] flex items-center justify-center mb-5">
              <Eye size={26} className="text-[#1a3270]" />
            </div>
            <h3 className="text-lg font-bold text-heading mb-3">{d.visionTitle}</h3>
            <p className="text-sm text-body leading-relaxed">{d.visionText}</p>
            {d.visionPoints && <BulletList points={d.visionPoints} color="#1a3270" />}
          </motion.div>

          {/* Extra cards */}
          {extraCards.map((card, i) => {
            const accent = EXTRA_ACCENTS[i % EXTRA_ACCENTS.length];
            const Icon = EXTRA_ICONS[i % EXTRA_ICONS.length];
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i + 2}
                className="bg-white rounded-2xl p-8 border border-border shadow-sm"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: accent.bg }}
                >
                  <Icon size={26} style={{ color: accent.color }} />
                </div>
                <h3 className="text-lg font-bold text-heading mb-3">{card.title}</h3>
                <p className="text-sm text-body leading-relaxed">{card.text}</p>
                {card.points && <BulletList points={card.points} color={accent.color} />}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
