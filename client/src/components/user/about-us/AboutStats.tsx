import { motion } from "framer-motion";
import { Users, GraduationCap, Globe, HandHeart, Clock } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: "easeOut" },
  }),
};

const stats = [
  { icon: Users,         value: "25K+",  label: "Lives Impacted",       bg: "bg-blue-100",   color: "text-blue-600" },
  { icon: GraduationCap, value: "10K+",  label: "Children Educated",    bg: "bg-green-100",  color: "text-green-600" },
  { icon: Globe,         value: "150+",  label: "Communities Served",   bg: "bg-orange-100", color: "text-orange-500" },
  { icon: HandHeart,     value: "500+",  label: "Volunteers Worldwide", bg: "bg-purple-100", color: "text-purple-600" },
  { icon: Clock,         value: "12+",   label: "Years of Service",     bg: "bg-pink-100",   color: "text-pink-600" },
];

export default function AboutStats() {
  return (
    <section className="py-16 px-6 bg-[#f8fafc] border-y border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
          {stats.map(({ icon: Icon, value, label, bg, color }, i) => (
            <motion.div
              key={value}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="flex items-center gap-4 bg-white rounded-2xl px-5 py-5 shadow-sm border border-[#e2e8f0]"
            >
              <div className={`w-12 h-12 rounded-full ${bg} flex items-center justify-center shrink-0`}>
                <Icon size={22} className={color} strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-[#1a1a4b] leading-none mb-0.5">{value}</p>
                <p className="text-xs text-[#64748b] font-medium leading-tight">{label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
