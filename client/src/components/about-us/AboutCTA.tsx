import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: "easeOut" },
  }),
};

export default function AboutCTA() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-2xl mx-auto text-center">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-sm font-semibold uppercase tracking-widest text-[#f97316] mb-2"
        >
          Be Part of the Change
        </motion.p>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          className="text-2xl xl:text-3xl font-bold text-[#1e293b] mb-4"
        >
          Join Us in Building a Better Tomorrow
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
          className="text-sm text-[#475569] leading-relaxed mb-8"
        >
          PROJECT "G" is a non-profitable students' organisation. All the
          executive members of the Project "G" are the students of various
          Universities & Colleges. We are voluntarily work for a better nation.
        </motion.p>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={3}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="/#donate"
            className="inline-flex items-center gap-2 bg-[#1a3270] text-white font-semibold text-sm px-7 py-3 rounded-lg shadow-md hover:bg-[#142a5e] transition-colors"
          >
            <Heart size={15} fill="white" strokeWidth={0} />
            Donate Now
          </a>
          <a
            href="/#get-involved"
            className="inline-flex items-center gap-2 border border-[#1a3270] text-[#1a3270] font-semibold text-sm px-7 py-3 rounded-lg hover:bg-[#f0f4ff] transition-colors"
          >
            Become a Volunteer
          </a>
        </motion.div>
      </div>
    </section>
  );
}
