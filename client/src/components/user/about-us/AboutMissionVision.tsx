import { motion } from "framer-motion";
import { Heart, Eye } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: "easeOut" as const },
  }),
};

export default function AboutMissionVision() {
  return (
    <section className="py-20 px-6 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-secondary mb-2">
            Our Direction
          </p>
          <h2 className="text-2xl xl:text-3xl font-bold text-heading">
            Mission & Vision
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="bg-white rounded-2xl p-8 border border-border shadow-sm"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#fff3e8] flex items-center justify-center mb-5">
              <Heart size={26} className="text-secondary" />
            </div>
            <h3 className="text-lg font-bold text-heading mb-3">Our Mission</h3>
            <p className="text-sm text-body leading-relaxed">
              To uplift underprivileged communities by providing quality
              education, accessible healthcare, nutritious food, and a safe
              environment — empowering individuals to realise their full
              potential and build a better future for themselves and their
              families.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="bg-white rounded-2xl p-8 border border-border shadow-sm"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#e8f0ff] flex items-center justify-center mb-5">
              <Eye size={26} className="text-[#1a3270]" />
            </div>
            <h3 className="text-lg font-bold text-heading mb-3">Our Vision</h3>
            <p className="text-sm text-body leading-relaxed">
              A world where every child grows up with equal opportunities — a
              society free from poverty and inequality, where communities
              thrive through collective compassion, shared knowledge, and
              sustainable growth that benefits generations to come.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
