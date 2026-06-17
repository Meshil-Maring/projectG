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

const STAT_ICONS = [Users, GraduationCap, Globe, HandHeart, Utensils, Clock];
const STAT_COLORS = ["#1a3270", "#2563eb", "#16a34a", "#7c3aed", "#f97316", "#0d9488"];
const STAT_BGS = ["#eef1fb", "#eff6ff", "#f0fdf4", "#f5f3ff", "#fff7ed", "#f0fdf9"];
const STAT_DEFAULTS = [
  { value: "25,000+", label: "Lives Impacted", sub: "Across all programs" },
  { value: "10,000+", label: "Children Educated", sub: "Scholarships & school kits" },
  { value: "150+", label: "Communities Served", sub: "Urban, rural & tribal areas" },
  { value: "500+", label: "Active Volunteers", sub: "Giving time every month" },
  { value: "50,000+", label: "Meals Distributed", sub: "Through community kitchens" },
  { value: "12+", label: "Years of Service", sub: "Serving since 2013" },
];

export default function ImpactNumbers() {
  const { getSectionData } = usePageSections();
  const data = getSectionData("impact-numbers") ?? {};
  const content = { ...DEFAULT_NUMBERS, ...data };

  const stats = STAT_DEFAULTS.map((defaults, i) => ({
    icon: STAT_ICONS[i],
    color: STAT_COLORS[i],
    bg: STAT_BGS[i],
    value: data[`stat${i}Value`] || defaults.value,
    label: data[`stat${i}Label`] || defaults.label,
    sub: data[`stat${i}Sub`] || defaults.sub,
  }));

  return (
    <section className="py-20 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-widest text-teal mb-2"
          >
            {content.eyebrow}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="text-2xl xl:text-4xl font-extrabold text-heading mb-4"
          >
            {content.heading}
          </motion.h2>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            className="w-12 h-1 bg-teal rounded mx-auto"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {stats.map(({ icon: Icon, value, label, sub, color, bg }, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              custom={i * 0.4}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl border border-border shadow-card hover:shadow-lg transition-shadow p-7 flex flex-col gap-4"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: bg }}
              >
                <Icon size={24} style={{ color }} strokeWidth={1.8} />
              </div>
              <div>
                <p
                  className="text-2xl sm:text-3xl font-extrabold text-heading leading-none mb-1 tabular-nums"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {value}
                </p>
                <p className="text-sm font-semibold text-heading mb-0.5">{label}</p>
                <p className="text-xs text-body">{sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
