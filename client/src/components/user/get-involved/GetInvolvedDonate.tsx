import { motion } from "framer-motion";
import { Heart, Zap, Shield, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import donateImg from "../../../assets/image/donate.png";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const pillars = [
  { icon: Zap, label: "Immediate Impact", desc: "Funds go directly to programs" },
  { icon: Shield, label: "Transparent Use", desc: "Full accountability on spending" },
  { icon: Globe, label: "Lasting Change", desc: "Building long-term solutions" },
];

export default function GetInvolvedDonate() {
  return (
    <section id="donate" className="py-20 px-6 bg-[#f8fafc] overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-14">

        {/* Left — text */}
        <div className="flex-1 max-w-lg">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-widest text-[#1a3270] mb-3 flex items-center gap-2"
          >
            <span className="inline-block w-6 h-0.5 bg-[#1a3270]" />
            Donate
          </motion.p>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="text-3xl xl:text-4xl font-extrabold text-[#1a1a4b] leading-tight mb-4"
          >
            Your Generosity<br />Transforms Lives
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            className="text-sm text-[#64748b] leading-relaxed mb-8"
          >
            Every contribution — big or small — goes towards education, health,
            and welfare programs that uplift the most vulnerable in our communities.
            Your gift creates real, lasting change.
          </motion.p>

          <div className="flex flex-col gap-4 mb-8">
            {pillars.map(({ icon: Icon, label, desc }, i) => (
              <motion.div
                key={label}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i + 3}
                className="flex items-start gap-4"
              >
                <div className="w-9 h-9 rounded-lg bg-[#f0f4ff] flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-[#1a3270]" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1a1a4b]">{label}</p>
                  <p className="text-xs text-[#64748b]">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={6}
          >
            <Link
              to="/donate"
              className="inline-flex items-center gap-2 bg-[#1a3270] hover:bg-[#0f1f4a] text-white text-sm font-semibold px-7 py-3.5 rounded-full transition-colors duration-200 shadow-md"
            >
              Donate Now <Heart size={14} fill="white" strokeWidth={0} />
            </Link>
          </motion.div>
        </div>

        {/* Right — image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="flex-shrink-0 flex items-center justify-center"
        >
          <div className="relative w-72 h-64 xl:w-96 xl:h-80">
            <div className="absolute inset-0 rounded-3xl bg-[#f0f4ff] rotate-3" />
            <img
              src={donateImg}
              alt="Donate and make an impact"
              className="relative w-full h-full object-contain drop-shadow-lg"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
