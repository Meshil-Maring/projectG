import { motion } from "framer-motion";
import { Leaf, BookOpen, HeartPulse, Utensils, UserRound, Rocket } from "lucide-react";
import { usePageSections } from "../../../context/PageContext";

const DEFAULT_AREAS = {
  eyebrow: "Focus Areas",
  heading: "Where We Create Change",
  description:
    "Our societies tackle the most pressing challenges communities face, delivering measurable outcomes across six key areas.",
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const areas = [
  {
    icon: Leaf,
    title: "Environment",
    color: "#16a34a",
    bg: "#f0fdf4",
    metric: "1,200+ beneficiaries",
    description:
      "Community-led conservation, tree planting, and river clean-ups restore ecosystems and educate youth on sustainable living.",
  },
  {
    icon: BookOpen,
    title: "Education",
    color: "#2563eb",
    bg: "#eff6ff",
    metric: "850+ students supported",
    description:
      "Scholarships, school supplies, and mobile classrooms bring quality education to the most underserved children.",
  },
  {
    icon: HeartPulse,
    title: "Health & Wellness",
    color: "#ec4899",
    bg: "#fdf2f8",
    metric: "2,300+ patients treated",
    description:
      "Free health camps, vaccination drives, and maternal care programs reduce preventable illness across communities.",
  },
  {
    icon: Utensils,
    title: "Hunger & Food",
    color: "#f97316",
    bg: "#fff7ed",
    metric: "640+ families fed",
    description:
      "Community kitchens and food distribution networks deliver nutritious meals and build long-term food security.",
  },
  {
    icon: UserRound,
    title: "Women Empowerment",
    color: "#7c3aed",
    bg: "#f5f3ff",
    metric: "520+ women trained",
    description:
      "Vocational training and micro-finance programs equip women with skills and capital to achieve financial independence.",
  },
  {
    icon: Rocket,
    title: "Youth Development",
    color: "#0891b2",
    bg: "#ecfeff",
    metric: "980+ youth engaged",
    description:
      "Coding bootcamps, leadership workshops, and mentorship programs prepare young people for a competitive world.",
  },
];

export default function ImpactAreas() {
  const { getSectionData } = usePageSections();
  const content = { ...DEFAULT_AREAS, ...getSectionData("impact-areas") };

  return (
    <section className="py-20 px-6 bg-[#f8fafc]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-widest text-[#f97316] mb-2"
          >
            {content.eyebrow}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="text-2xl xl:text-4xl font-extrabold text-[#1e293b] mb-3"
          >
            {content.heading}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            className="text-sm text-[#64748b] max-w-xl mx-auto"
          >
            {content.description}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map(({ icon: Icon, title, color, bg, metric, description }, i) => (
            <motion.div
              key={title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              custom={i * 0.3}
              className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-7 hover:shadow-md transition-shadow duration-200"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: bg }}
              >
                <Icon size={22} style={{ color }} strokeWidth={1.8} />
              </div>
              <h3 className="text-base font-bold text-[#1e293b] mb-1">{title}</h3>
              <p className="text-xs font-semibold mb-3" style={{ color }}>
                {metric}
              </p>
              <p className="text-sm text-[#64748b] leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
