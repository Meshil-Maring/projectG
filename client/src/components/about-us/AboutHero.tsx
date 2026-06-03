import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: "easeOut" },
  }),
};

export default function AboutHero() {
  return (
    <section
      className="relative py-24 px-6 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0f2057 0%, #1a3270 60%, #1e4d8c 100%)",
      }}
    >
      <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full opacity-10 bg-white" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full opacity-5 bg-white" />

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="text-sm font-semibold uppercase tracking-widest text-[#f97316] mb-3"
        >
          Who We Are
        </motion.p>
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight"
        >
          About Project Generation
        </motion.h1>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed"
        >
          PROJECT "G" is a non-profitable students' organisation. All the
          executive members of the Project "G" are the students of various
          Universities & Colleges. We are voluntarily work for a better nation.
        </motion.p>
      </div>
    </section>
  );
}
