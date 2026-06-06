import { motion } from "framer-motion";
import {
  GraduationCap, Heart, Trophy, Briefcase, Lightbulb,
  Users, Handshake, Shield, Star, Leaf,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.5, ease: "easeOut" },
  }),
};

const objectives = [
  {
    icon: GraduationCap,
    text: "Organize educational, awareness, and capacity-building programs for students and communities.",
  },
  {
    icon: Heart,
    text: "Promote health, legal, environmental, and social awareness through campaigns and outreach.",
  },
  {
    icon: Trophy,
    text: "Conduct competitions, workshops, seminars, and cultural activities that enhance creativity and critical thinking.",
  },
  {
    icon: Briefcase,
    text: "Support skill development, career guidance, and life skills training for youth.",
  },
  {
    icon: Lightbulb,
    text: "Encourage scientific temper, innovation, and Indian Knowledge Systems (IKS) among students.",
  },
  {
    icon: Users,
    text: "Assist underprivileged and vulnerable sections through social service initiatives.",
  },
  {
    icon: Handshake,
    text: "Collaborate with educational institutions, NGOs, professionals, and government bodies.",
  },
  {
    icon: Shield,
    text: "Promote ethical leadership, constitutional values, and civic responsibility.",
  },
  {
    icon: Star,
    text: "Provide platforms for talent identification, recognition, and youth empowerment.",
  },
  {
    icon: Leaf,
    text: "Work towards sustainable development goals (SDGs) at the grassroots level.",
  },
];

export default function AboutObjectives() {
  return (
    <section className="py-20 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-widest text-[#f97316] mb-2"
          >
            What We Stand For
          </motion.p>
          <motion.h2
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
            className="text-2xl xl:text-3xl font-extrabold text-[#1a1a4b] mb-3"
          >
            Our Objectives
          </motion.h2>
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}
            className="flex items-center justify-center gap-3"
          >
            <div className="h-[3px] w-8 bg-[#b8860b] rounded" />
            <p className="text-sm text-[#64748b]">
              The guiding goals behind every program we run
            </p>
            <div className="h-[3px] w-8 bg-[#b8860b] rounded" />
          </motion.div>
        </div>

        {/* Objectives grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {objectives.map(({ icon: Icon, text }, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="flex items-start gap-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl px-5 py-4 hover:shadow-md hover:border-[#c7d7f8] transition-all duration-200"
            >
              {/* Number badge */}
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1a3270] flex items-center justify-center text-xs font-bold text-white">
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* Icon */}
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#e8f0ff] flex items-center justify-center">
                <Icon size={19} className="text-[#1a3270]" strokeWidth={1.7} />
              </div>

              {/* Text */}
              <p className="text-sm text-[#475569] leading-relaxed pt-1">{text}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
