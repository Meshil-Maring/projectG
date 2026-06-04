import { motion } from "framer-motion";
import {
  Heart,
  PlayCircle,
  GraduationCap,
  Trophy,
  Globe,
  CheckCircle2,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: "easeOut" },
  }),
};

const societies = [
  {
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
    icon: PlayCircle,
    name: "YouTube & Digital Outreach",
    color: "#1a3270",
    lightColor: "#eef1fb",
    gradientFrom: "#1a3270",
    gradientTo: "#2563eb",
    activities: [
      "Produces educational and awareness content",
      "Shares tips, stories, and campaigns online to reach wider audiences",
    ],
  },
  {
    icon: GraduationCap,
    name: "Human Resource Development Society",
    color: "#15803d",
    lightColor: "#edf7f1",
    gradientFrom: "#15803d",
    gradientTo: "#16a34a",
    activities: [
      "Facilitates vocational training, workshops, and seminars",
      "Hosts career counseling and life-skills sessions",
      "Manages science exhibitions, magic shows, competitive events",
    ],
  },
  {
    icon: Trophy,
    name: "Competitive World Group",
    color: "#0f766e",
    lightColor: "#e8f7f6",
    gradientFrom: "#0f766e",
    gradientTo: "#0d9488",
    activities: [
      "Organizes debates, quizzes, essay writing, and gaming contests",
      "Promotes critical thinking and peer-learning",
      "Arranges prizes and recognition for youth achievements",
    ],
  },
  {
    icon: Globe,
    name: "Foundation for Socio-Economic Development",
    color: "#6d28d9",
    lightColor: "#f3f0ff",
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
  return (
    <section className="py-20 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-widest text-[#f97316] mb-2"
          >
            How We Operate
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="text-3xl xl:text-4xl font-extrabold text-[#1a1a4b] leading-tight mb-4"
          >
            Our Societies & Clubs
          </motion.h2>
          <div className="w-12 h-1 bg-[#1a3270] rounded mx-auto mb-5" />
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            className="text-sm text-[#64748b] leading-relaxed max-w-xl mx-auto"
          >
            PROJECT 'G' Foundation operates through several dedicated
            societies and clubs, each with a special focus area to maximize
            community impact.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {societies.map(
            (
              { icon: Icon, name, color, lightColor, gradientFrom, gradientTo, activities },
              i
            ) => (
              <motion.div
                key={name}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                custom={i * 0.5}
                className="bg-white rounded-2xl shadow-md border border-[#f1f5f9] overflow-hidden flex flex-col"
              >
                {/* Top gradient bar */}
                <div
                  className="h-1.5 w-full"
                  style={{
                    background: `linear-gradient(90deg, ${gradientFrom}, ${gradientTo})`,
                  }}
                />

                <div className="p-6 flex flex-col flex-1">
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shrink-0"
                    style={{ backgroundColor: lightColor }}
                  >
                    <Icon size={22} style={{ color }} strokeWidth={1.8} />
                  </div>

                  {/* Society name */}
                  <h3
                    className="font-extrabold text-[#1a1a4b] text-base leading-snug mb-4"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {name}
                  </h3>

                  {/* Activities list */}
                  <ul className="flex flex-col gap-2.5 flex-1">
                    {activities.map((activity) => (
                      <li key={activity} className="flex items-start gap-2.5">
                        <CheckCircle2
                          size={15}
                          className="shrink-0 mt-0.5"
                          style={{ color }}
                          strokeWidth={2}
                        />
                        <span className="text-xs text-[#64748b] leading-relaxed">
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
