import { motion } from "framer-motion";
import { Users, GraduationCap, Globe, HandHeart, Utensils, Clock } from "lucide-react";
import { usePageSections } from "../../../context/PageContext";

const DEFAULT_NUMBERS = {
  eyebrow: "By the Numbers",
  heading: "Our Impact in Numbers",
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const stats = [
  {
    icon: Users,
    value: "25,000+",
    label: "Lives Impacted",
    sub: "Across all programs",
    color: "#1a3270",
    bg: "#eef1fb",
  },
  {
    icon: GraduationCap,
    value: "10,000+",
    label: "Children Educated",
    sub: "Scholarships & school kits",
    color: "#2563eb",
    bg: "#eff6ff",
  },
  {
    icon: Globe,
    value: "150+",
    label: "Communities Served",
    sub: "Urban, rural & tribal areas",
    color: "#16a34a",
    bg: "#f0fdf4",
  },
  {
    icon: HandHeart,
    value: "500+",
    label: "Active Volunteers",
    sub: "Giving time every month",
    color: "#7c3aed",
    bg: "#f5f3ff",
  },
  {
    icon: Utensils,
    value: "50,000+",
    label: "Meals Distributed",
    sub: "Through community kitchens",
    color: "#f97316",
    bg: "#fff7ed",
  },
  {
    icon: Clock,
    value: "12+",
    label: "Years of Service",
    sub: "Serving since 2013",
    color: "#0d9488",
    bg: "#f0fdf9",
  },
];

export default function ImpactNumbers() {
  const { getSectionData } = usePageSections();
  const content = { ...DEFAULT_NUMBERS, ...getSectionData("impact-numbers") };

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-widest text-[#0d9488] mb-2"
          >
            {content.eyebrow}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="text-2xl xl:text-4xl font-extrabold text-[#1e293b] mb-4"
          >
            {content.heading}
          </motion.h2>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            className="w-12 h-1 bg-[#0d9488] rounded mx-auto"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {stats.map(({ icon: Icon, value, label, sub, color, bg }, i) => (
            <motion.div
              key={label}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              custom={i * 0.4}
              className="bg-[#f8fafc] rounded-2xl border border-[#e2e8f0] p-7 flex flex-col gap-4"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: bg }}
              >
                <Icon size={24} style={{ color }} strokeWidth={1.8} />
              </div>
              <div>
                <p
                  className="text-3xl font-extrabold text-[#1e293b] leading-none mb-1"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {value}
                </p>
                <p className="text-sm font-semibold text-[#1e293b] mb-0.5">{label}</p>
                <p className="text-xs text-[#64748b]">{sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
