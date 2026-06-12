import { motion } from "framer-motion";
import { Utensils, BookOpen, Stethoscope, Home } from "lucide-react";
import { usePageSections } from "../../../context/PageContext";

const DEFAULT_IMPACT = {
  eyebrow: "Your Impact",
  heading: "What Your Donation Achieves",
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const impacts = [
  {
    icon: Utensils,
    amount: "₹500",
    label: "Feeds a child for a week",
    color: "#f97316",
    lightColor: "#fff4ec",
  },
  {
    icon: BookOpen,
    amount: "₹1,000",
    label: "Provides school supplies for a student",
    color: "#1a3270",
    lightColor: "#eef1fb",
  },
  {
    icon: Stethoscope,
    amount: "₹2,500",
    label: "Supports medical care for a family",
    color: "#15803d",
    lightColor: "#edf7f1",
  },
  {
    icon: Home,
    amount: "₹5,000",
    label: "Empowers a family toward self-sufficiency",
    color: "#6d28d9",
    lightColor: "#f3f0ff",
  },
];

export default function DonateImpact() {
  const { getSectionData } = usePageSections();
  const content = { ...DEFAULT_IMPACT, ...getSectionData("donate-impact") };

  return (
    <section className="py-16 px-6 bg-[#f8fafc]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
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
            className="text-2xl xl:text-3xl font-extrabold text-[#1a1a4b] mb-3"
          >
            {content.heading}
          </motion.h2>
          <div className="w-10 h-1 bg-[#1a3270] rounded mx-auto" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {impacts.map(({ icon: Icon, amount, label, color, lightColor }, i) => (
            <motion.div
              key={amount}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              custom={i * 0.5}
              className="bg-white rounded-2xl border border-[#f1f5f9] shadow-sm p-6 flex flex-col items-center text-center"
            >
              <div
                className="w-13 h-13 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: lightColor, width: "52px", height: "52px" }}
              >
                <Icon size={22} style={{ color }} strokeWidth={1.8} />
              </div>
              <p
                className="text-xl font-extrabold mb-1"
                style={{ color, fontFamily: "'Poppins', sans-serif" }}
              >
                {amount}
              </p>
              <p className="text-xs text-[#64748b] leading-relaxed">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
