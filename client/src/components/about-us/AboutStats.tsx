import { motion } from "framer-motion";
import { Users, GraduationCap, Leaf, HandHeart } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: "easeOut" },
  }),
};

const stats = [
  { icon: Users, value: "25K+", label: "Lives\nImpacted" },
  { icon: GraduationCap, value: "10K+", label: "Children\nEducated" },
  { icon: Leaf, value: "150+", label: "Communities\nServed" },
  { icon: HandHeart, value: "500+", label: "Volunteers\nWorldwide" },
];

export default function AboutStats() {
  return (
    <section className="py-20 px-6 bg-[#0f2057]">
      <div className="max-w-7xl mx-auto text-center">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-sm font-semibold uppercase tracking-widest text-[#f97316] mb-2"
        >
          Our Impact
        </motion.p>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          className="text-2xl xl:text-3xl font-bold text-white mb-12"
        >
          Numbers That Tell Our Story
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ icon: Icon, value, label }, i) => (
            <motion.div
              key={value}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="flex flex-col items-center gap-3 bg-white/10 border border-white/15 rounded-2xl py-8 px-4"
            >
              <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center">
                <Icon size={22} className="text-white" />
              </div>
              <span className="text-3xl font-bold text-white">{value}</span>
              <span className="text-xs text-white/60 leading-tight whitespace-pre-line font-medium">
                {label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
