import { motion } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function ImpactCTA() {
  return (
    <section
      className="py-20 px-6 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1a3270 0%, #0f1f4a 100%)" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/5" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-xs font-bold uppercase tracking-widest text-white/60 mb-3"
        >
          Be Part of the Change
        </motion.p>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          className="text-3xl xl:text-4xl font-extrabold text-white leading-tight mb-4"
        >
          Your Support Makes This Possible
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
          className="text-sm text-white/70 leading-relaxed mb-10 max-w-lg mx-auto"
        >
          Every contribution — whether time, skills, or a donation — adds to the numbers
          you've seen here. Join us in writing the next chapter of this story.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={3}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/donate"
            className="inline-flex items-center gap-2 bg-[#f97316] text-white font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-orange-500 transition-colors duration-200 shadow-lg"
          >
            Donate Now <Heart size={14} />
          </Link>
          <Link
            to="/get-involved"
            className="inline-flex items-center gap-2 border-2 border-white/60 text-white font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-white/10 transition-colors duration-200"
          >
            Get Involved <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
