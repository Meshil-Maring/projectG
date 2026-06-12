import { motion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import { usePageSections } from "../../../context/PageContext";

const DEFAULT_HERO = {
  eyebrow: "Project Generation",
  headingLine1: "Get Involved &",
  headingLine2: "Make a Difference",
  description:
    "Whether you volunteer your time, donate, or simply spread the word — every action counts. Join us in empowering communities and transforming lives.",
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: "easeOut" as const },
  }),
};

export default function GetInvolvedHero() {
  const { getSectionData } = usePageSections();
  const hero = { ...DEFAULT_HERO, ...getSectionData("gi-hero") };

  return (
    <section
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1a3270 0%, #2563eb 100%)" }}
    >
      {/* Decorative leaf — right */}
      <svg
        className="absolute right-0 top-0 h-full w-44 opacity-10 pointer-events-none"
        viewBox="0 0 160 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M80 20 C110 60, 155 130, 130 260 C110 360, 30 380, 10 300 C-10 210, 30 80, 80 20Z" fill="white" />
        <path d="M90 10 C120 50, 162 122, 138 252" stroke="white" strokeWidth="2" fill="none" />
        <line x1="80" y1="20" x2="62" y2="270" stroke="white" strokeWidth="1.5" />
        <line x1="68" y1="90" x2="35" y2="130" stroke="white" strokeWidth="1.2" />
        <line x1="70" y1="150" x2="110" y2="175" stroke="white" strokeWidth="1.2" />
        <line x1="66" y1="200" x2="38" y2="230" stroke="white" strokeWidth="1.2" />
      </svg>

      {/* Decorative circles */}
      <div className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute left-8 top-8 w-24 h-24 rounded-full bg-white/5 pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="text-xs font-bold uppercase tracking-widest text-white/70 mb-4 flex items-center justify-center gap-2"
        >
          <span className="inline-block w-6 h-0.5 bg-white/50" />
          {hero.eyebrow}
          <span className="inline-block w-6 h-0.5 bg-white/50" />
        </motion.p>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="text-4xl xl:text-6xl font-extrabold text-white leading-tight mb-5"
        >
          {hero.headingLine1}<br />{hero.headingLine2}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="text-base text-white/75 leading-relaxed mb-10 max-w-xl mx-auto"
        >
          {hero.description}
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#volunteer"
            className="inline-flex items-center gap-2 bg-white text-[#1a3270] font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-blue-50 transition-colors duration-200 shadow-lg"
          >
            Volunteer With Us <ArrowRight size={15} />
          </a>
          <a
            href="#donate"
            className="inline-flex items-center gap-2 border-2 border-white/70 text-white font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-white/10 transition-colors duration-200"
          >
            Donate Now <Heart size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
