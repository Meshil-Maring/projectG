import { motion } from "framer-motion";
import { ArrowDown, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageSections } from "../../../context/PageContext";

const DEFAULT_HERO = {
  eyebrow: "Project Generation",
  headingLine1: "Measuring Change,",
  headingLine2: "One Life at a Time",
  description:
    "Every number here represents a real person whose life has been touched. Explore the tangible difference our societies create every single day.",
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: "easeOut" as const },
  }),
};

export default function ImpactHero() {
  const { getSectionData } = usePageSections();
  const hero = { ...DEFAULT_HERO, ...getSectionData("impact-hero") };

  return (
    <section
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0d9488 0%, #1a3270 55%, #0f1f4a 100%)" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute bottom-0 -left-20 w-72 h-72 rounded-full bg-white/5" />
        <svg
          className="absolute right-8 top-10 opacity-10 w-44 h-44"
          viewBox="0 0 200 200"
          fill="none"
        >
          <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="50" stroke="white" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="20" stroke="white" strokeWidth="1.5" />
          <line x1="20" y1="100" x2="180" y2="100" stroke="white" strokeWidth="1" />
          <line x1="100" y1="20" x2="100" y2="180" stroke="white" strokeWidth="1" />
        </svg>
      </div>

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
          className="text-base text-white/75 leading-relaxed mb-10 max-w-xl mx-auto whitespace-pre-wrap"
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
            href="#impact-numbers"
            className="inline-flex items-center gap-2 bg-white text-[#1a3270] font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-blue-50 transition-colors duration-200 shadow-lg"
          >
            Explore Our Impact <ArrowDown size={15} />
          </a>
          <Link
            to="/donate"
            className="inline-flex items-center gap-2 border-2 border-white/70 text-white font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-white/10 transition-colors duration-200"
          >
            Support Our Work <TrendingUp size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
