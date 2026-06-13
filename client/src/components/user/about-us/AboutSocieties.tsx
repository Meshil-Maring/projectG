import { motion } from "framer-motion";
import {
  Heart,
  PlayCircle,
  GraduationCap,
  Trophy,
  Globe,
  CheckCircle2,
} from "lucide-react";
import { usePageSections } from "../../../context/PageContext";

const DEFAULT_SOCIETIES = {
  eyebrow: "How We Operate",
  heading: "Our Societies & Clubs",
  description:
    "PROJECT 'G' Foundation operates through five dedicated societies and clubs, each with a special focus area to drive meaningful community impact.",
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: "easeOut" as const },
  }),
};

const societies = [
  {
    number: "01",
    icon: Heart,
    name: "Medical Awareness Society",
    color: "#c2410c",
    lightColor: "#fff4ec",
    gradientFrom: "#c2410c",
    gradientTo: "#f97316",
    activities: [
      "Organizes health awareness campaigns",
      "Conducts medical camps and basic checkups",
      "Supports rehabilitation efforts",
      "Donates to orphanages, old age homes, and children's shelters",
    ],
  },
  {
    number: "02",
    icon: PlayCircle,
    name: "YouTube & Digital Outreach",
    color: "#1d4ed8",
    lightColor: "#eff6ff",
    gradientFrom: "#1a3270",
    gradientTo: "#2563eb",
    activities: [
      "Produces educational and awareness content",
      "Shares tips, stories, and campaigns online to reach wider audiences",
    ],
  },
  {
    number: "03",
    icon: GraduationCap,
    name: "Human Resource Development Society",
    color: "#15803d",
    lightColor: "#f0fdf4",
    gradientFrom: "#15803d",
    gradientTo: "#16a34a",
    activities: [
      "Facilitates vocational training, workshops, and seminars",
      "Hosts career counseling and life-skills sessions",
      "Manages science exhibitions, magic shows, competitive events",
    ],
  },
  {
    number: "04",
    icon: Trophy,
    name: "Competitive World Group",
    color: "#0f766e",
    lightColor: "#f0fdfa",
    gradientFrom: "#0f766e",
    gradientTo: "#0d9488",
    activities: [
      "Organizes debates, quizzes, essay writing, and gaming contests",
      "Promotes critical thinking and peer-learning",
      "Arranges prizes and recognition for youth achievements",
    ],
  },
  {
    number: "05",
    icon: Globe,
    name: "Foundation for Socio-Economic Development",
    color: "#6d28d9",
    lightColor: "#faf5ff",
    gradientFrom: "#6d28d9",
    gradientTo: "#7c3aed",
    activities: [
      "Drives social and cultural activities",
      "Raises awareness of government schemes and policies",
      "Encourages artistic skills, environment education, and economic literacy",
    ],
  },
];

export default function AboutSocieties() {
  const { getSectionData } = usePageSections();
  const content = { ...DEFAULT_SOCIETIES, ...getSectionData("about-societies") };

  return (
    <section className="py-24 px-6 bg-surface overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* ── Section header ── */}
        <div className="text-center mb-16">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-widest text-[#f97316] mb-3"
          >
            {content.eyebrow}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="text-3xl xl:text-4xl font-extrabold text-heading leading-tight mb-4"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {content.heading}
          </motion.h2>
          <div className="w-12 h-1 bg-[#1a3270] rounded mx-auto mb-5" />
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            className="text-sm text-[#64748b] leading-relaxed max-w-lg mx-auto"
          >
            {content.description}
          </motion.p>
        </div>

        {/* ── Cards grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {societies.map(
            ({ number, icon: Icon, name, color, lightColor, gradientFrom, gradientTo, activities }, i) => (
              <motion.div
                key={name}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                custom={i}
                className={`bg-white rounded-2xl border border-[#e8edf5] shadow-sm overflow-hidden flex flex-col${
                  i === 4 ? " md:col-span-2 md:max-w-xl md:mx-auto md:w-full" : ""
                }`}
              >
                {/* Gradient top strip */}
                <div
                  className="h-1.5 w-full shrink-0"
                  style={{
                    background: `linear-gradient(90deg, ${gradientFrom}, ${gradientTo})`,
                  }}
                />

                <div className="p-7 flex flex-col flex-1">
                  {/* Top row: number badge + icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className="text-4xl font-black leading-none select-none"
                      style={{
                        color: `${color}20`,
                        fontFamily: "'Poppins', sans-serif",
                        letterSpacing: "-0.03em",
                      }}
                    >
                      {number}
                    </span>
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: lightColor }}
                    >
                      <Icon size={20} style={{ color }} strokeWidth={1.9} />
                    </div>
                  </div>

                  {/* Society name */}
                  <h3
                    className="text-base font-extrabold text-heading leading-snug mb-5"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {name}
                  </h3>

                  {/* Divider */}
                  <div
                    className="h-px w-full mb-5"
                    style={{ backgroundColor: `${color}18` }}
                  />

                  {/* Activities */}
                  <ul className="flex flex-col gap-3 flex-1">
                    {activities.map((activity) => (
                      <li key={activity} className="flex items-start gap-3">
                        <CheckCircle2
                          size={14}
                          className="shrink-0 mt-0.5"
                          style={{ color }}
                          strokeWidth={2.2}
                        />
                        <span className="text-sm text-body leading-snug">
                          {activity}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )
          )}
        </div>

      </div>
    </section>
  );
}
