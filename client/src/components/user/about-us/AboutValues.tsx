import { motion } from "framer-motion";
import {
  Heart, Shield, Users, GraduationCap, Handshake, Leaf,
  Search, Lightbulb, Zap, BarChart2,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: "easeOut" },
  }),
};

const values = [
  { icon: Heart,        label: "Compassion",    desc: "We care deeply about people and their needs.",                     bg: "bg-purple-100",  color: "text-purple-600" },
  { icon: Shield,       label: "Integrity",     desc: "We act honestly, transparently and responsibly.",                 bg: "bg-green-100",   color: "text-green-600" },
  { icon: Users,        label: "Inclusivity",   desc: "We embrace diversity and respect every individual.",              bg: "bg-orange-100",  color: "text-orange-500" },
  { icon: GraduationCap,label: "Empowerment",   desc: "We equip people with skills, knowledge and confidence.",         bg: "bg-violet-100",  color: "text-violet-600" },
  { icon: Handshake,    label: "Collaboration", desc: "We work together with partners and communities.",                 bg: "bg-pink-100",    color: "text-pink-600" },
  { icon: Leaf,         label: "Sustainability",desc: "We build lasting solutions for a better future.",                bg: "bg-teal-100",    color: "text-teal-600" },
];

const approach = [
  { icon: Search,    title: "Identify Needs",     desc: "Understanding the real challenges faced by communities." },
  { icon: Lightbulb, title: "Plan & Collaborate", desc: "Designing effective programs with partners and experts." },
  { icon: Zap,       title: "Take Action",        desc: "Implementing projects that create real and measurable change." },
  { icon: BarChart2, title: "Measure Impact",     desc: "Tracking results and continuously improving our work." },
];

export default function AboutValues() {
  return (
    <section className="py-20 px-6 bg-[#f8fafc] overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 relative">

        {/* Left — Our Values */}
        <div className="flex-1">
          <motion.p
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-widest text-[#1a3270] mb-2"
          >
            Our Values
          </motion.p>
          <motion.h2
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
            className="text-2xl xl:text-3xl font-extrabold text-[#1a1a4b] mb-8"
          >
            What Guides Us
          </motion.h2>

          <div className="grid grid-cols-3 gap-6">
            {values.map(({ icon: Icon, label, desc, bg, color }, i) => (
              <motion.div
                key={label}
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.5}
                className="flex flex-col items-center text-center"
              >
                <div className={`w-14 h-14 rounded-full ${bg} flex items-center justify-center mb-3 shadow-sm`}>
                  <Icon size={22} className={color} strokeWidth={1.8} />
                </div>
                <h3 className="text-sm font-bold text-[#1a1a4b] mb-1">{label}</h3>
                <p className="text-xs text-[#64748b] leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right — Our Approach */}
        <div className="flex-1 relative">
          <motion.p
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-widest text-[#1a3270] mb-2"
          >
            Our Approach
          </motion.p>
          <motion.h2
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
            className="text-2xl xl:text-3xl font-extrabold text-[#1a1a4b] mb-8"
          >
            How We Work
          </motion.h2>

          <div className="flex flex-col gap-5">
            {approach.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i + 2}
                className="flex items-start gap-4"
              >
                <div className="w-11 h-11 rounded-full bg-[#e8f0ff] flex items-center justify-center shrink-0 mt-0.5">
                  <Icon size={18} className="text-[#1a3270]" strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1a1a4b] mb-1">{title}</h3>
                  <p className="text-xs text-[#64748b] leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Blue tree + silhouette decoration */}
          <svg
            className="absolute -right-8 bottom-0 w-28 h-52 opacity-20 pointer-events-none hidden lg:block"
            viewBox="0 0 100 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M50 180 L50 100" stroke="#1a3270" strokeWidth="4" strokeLinecap="round" />
            <path d="M50 100 C50 100, 20 70, 30 40 C35 25, 50 20, 50 20 C50 20, 65 25, 70 40 C80 70, 50 100, 50 100Z" fill="#1a3270" />
            <path d="M50 130 C50 130, 28 115, 32 95 C34 85, 50 80, 50 80 C50 80, 66 85, 68 95 C72 115, 50 130, 50 130Z" fill="#1a3270" />
            <ellipse cx="25" cy="188" rx="20" ry="4" fill="#1a3270" opacity="0.3" />
            <ellipse cx="75" cy="188" rx="20" ry="4" fill="#1a3270" opacity="0.3" />
            <rect x="20" y="172" width="6" height="16" rx="3" fill="#1a3270" />
            <rect x="74" y="172" width="6" height="16" rx="3" fill="#1a3270" />
          </svg>
        </div>

      </div>
    </section>
  );
}
