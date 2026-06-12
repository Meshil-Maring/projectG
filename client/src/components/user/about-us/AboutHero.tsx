import { motion } from "framer-motion";
import { Users, Heart, Globe } from "lucide-react";
import familyImg from "../../../assets/image/family.jpeg";
import { usePageSections } from "../../../context/PageContext";

const DEFAULT_HERO = {
  eyebrow: "About Us",
  headingLine1: "Together, We",
  headingLine2: "Build a Better",
  headingLine3: "Tomorrow",
  description:
    "Project Generation is a non-profit students' organisation dedicated to empowering lives and creating opportunities for children, families and communities to thrive.",
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: "easeOut" as const },
  }),
};

const badges = [
  { icon: Users, label: "Compassion in Action" },
  { icon: Heart, label: "Integrity Always" },
  { icon: Globe, label: "Empowerment for All" },
];

export default function AboutHero() {
  const { getSectionData } = usePageSections();
  const hero = { ...DEFAULT_HERO, ...getSectionData("about-hero") };

  return (
    <section className="py-16 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">

        {/* Left — text */}
        <div className="flex-1 max-w-lg">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="text-xs font-bold uppercase tracking-widest text-[#1a3270] mb-4 flex items-center gap-2"
          >
            <span className="inline-block w-8 h-0.5 bg-[#1a3270]" />
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-4xl xl:text-5xl font-extrabold text-[#1a1a4b] leading-tight mb-5"
          >
            {hero.headingLine1}<br />{hero.headingLine2}<br />{hero.headingLine3}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-sm text-[#64748b] leading-relaxed mb-8"
          >
            {hero.description}
          </motion.p>

          <div className="flex flex-wrap gap-3">
            {badges.map(({ icon: Icon, label }, i) => (
              <motion.div
                key={label}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={i + 3}
                className="flex items-center gap-2.5 bg-[#f0f4ff] border border-[#d0ddf7] rounded-full px-4 py-2.5"
              >
                <div className="w-7 h-7 rounded-full bg-[#1a3270] flex items-center justify-center shrink-0">
                  <Icon size={13} className="text-white" />
                </div>
                <span className="text-xs font-semibold text-[#1a3270]">{label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right — image with decorative leaf */}
        <motion.div
          className="flex-1 relative"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" as const, delay: 0.2 }}
        >
          {/* Watercolor leaf decoration */}
          <svg
            className="absolute -top-8 right-0 w-28 h-44 opacity-75 pointer-events-none z-10"
            viewBox="0 0 110 170"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M55 8 C75 25, 105 58, 88 118 C72 158, 18 155, 8 112 C-2 68, 25 18, 55 8Z" fill="#b8d4f0" opacity="0.45" />
            <path d="M62 4 C82 22, 110 55, 94 115 C78 155, 24 152, 14 109" stroke="#5a9fd4" strokeWidth="1.2" fill="none" opacity="0.6" />
            <line x1="55" y1="8" x2="46" y2="130" stroke="#5a9fd4" strokeWidth="1" opacity="0.5" />
            <line x1="49" y1="45" x2="25" y2="62" stroke="#5a9fd4" strokeWidth="0.9" opacity="0.45" />
            <line x1="50" y1="68" x2="74" y2="82" stroke="#5a9fd4" strokeWidth="0.9" opacity="0.45" />
            <line x1="48" y1="92" x2="26" y2="108" stroke="#5a9fd4" strokeWidth="0.9" opacity="0.45" />
            <line x1="48" y1="115" x2="60" y2="128" stroke="#5a9fd4" strokeWidth="0.9" opacity="0.4" />
          </svg>

          <img
            src={familyImg}
            alt="Community members"
            className="w-full h-80 lg:h-[440px] object-cover rounded-3xl shadow-xl"
          />
        </motion.div>

      </div>
    </section>
  );
}
