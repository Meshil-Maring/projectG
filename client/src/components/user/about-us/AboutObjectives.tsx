import { motion } from "framer-motion";
import {
  GraduationCap, Heart, Trophy, Briefcase, Lightbulb,
  Users, Handshake, Shield, Star, Leaf,
} from "lucide-react";
import { usePageSections } from "../../../context/PageContext";

const DEFAULT_OBJECTIVES = {
  eyebrow: "What We Stand For",
  heading: "Our Objectives",
  description: "The guiding goals behind every program we run",
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.5, ease: "easeOut" as const },
  }),
};

const ICON_MAP: Record<string, React.ElementType> = {
  GraduationCap, Heart, Trophy, Briefcase, Lightbulb,
  Users, Handshake, Shield, Star, Leaf,
};

const DEFAULT_ITEMS = [
  { icon: GraduationCap, text: "Organize educational, awareness, and capacity-building programs for students and communities." },
  { icon: Heart,         text: "Promote health, legal, environmental, and social awareness through campaigns and outreach." },
  { icon: Trophy,        text: "Conduct competitions, workshops, seminars, and cultural activities that enhance creativity and critical thinking." },
  { icon: Briefcase,     text: "Support skill development, career guidance, and life skills training for youth." },
  { icon: Lightbulb,    text: "Encourage scientific temper, innovation, and Indian Knowledge Systems (IKS) among students." },
  { icon: Users,         text: "Assist underprivileged and vulnerable sections through social service initiatives." },
  { icon: Handshake,     text: "Collaborate with educational institutions, NGOs, professionals, and government bodies." },
  { icon: Shield,        text: "Promote ethical leadership, constitutional values, and civic responsibility." },
  { icon: Star,          text: "Provide platforms for talent identification, recognition, and youth empowerment." },
  { icon: Leaf,          text: "Work towards sustainable development goals (SDGs) at the grassroots level." },
];

export default function AboutObjectives() {
  const { getSectionData } = usePageSections();
  const sectionData = getSectionData("about-objectives") ?? {};
  const content = { ...DEFAULT_OBJECTIVES, ...sectionData };

  // Parse dynamic items if the admin has saved them; otherwise use the hardcoded defaults.
  let objectives: Array<{ icon: React.ElementType; text: string }> = DEFAULT_ITEMS;
  if (sectionData.items) {
    try {
      const parsed = JSON.parse(sectionData.items) as Array<{ text: string; icon: string }>;
      objectives = parsed.map((item) => ({
        icon: ICON_MAP[item.icon] ?? GraduationCap,
        text: item.text,
      }));
    } catch { /* keep defaults */ }
  }

  return (
    <section className="py-20 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-widest text-[#f97316] mb-2"
          >
            {content.eyebrow}
          </motion.p>
          <motion.h2
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
            className="text-2xl xl:text-3xl font-extrabold text-heading mb-3"
          >
            {content.heading}
          </motion.h2>
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}
            className="flex items-center justify-center gap-3"
          >
            <div className="h-[3px] w-8 bg-[#b8860b] rounded" />
            <p className="text-sm text-[#64748b]">
              {content.description}
            </p>
            <div className="h-[3px] w-8 bg-[#b8860b] rounded" />
          </motion.div>
        </div>

        {/* Objectives grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
          {objectives.map(({ icon: Icon, text }, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="flex items-center gap-3 sm:gap-4 bg-surface border border-[#e2e8f0] rounded-2xl px-4 py-3 sm:px-5 sm:py-4 hover:shadow-md hover:border-[#c7d7f8] transition-all duration-200"
            >
              {/* Number badge */}
              <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary flex items-center justify-center text-[10px] sm:text-xs font-bold text-white">
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* Icon */}
              <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#e8f0ff] flex items-center justify-center">
                <Icon size={16} className="text-[#1a3270] sm:hidden" strokeWidth={1.7} />
                <Icon size={19} className="text-[#1a3270] hidden sm:block" strokeWidth={1.7} />
              </div>

              {/* Text */}
              <p className="text-xs sm:text-sm text-body leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
