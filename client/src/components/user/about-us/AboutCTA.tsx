import { motion } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import handImg from "../../../assets/image/hand.png";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: "easeOut" as const },
  }),
};

export default function AboutCTA() {
  return (
    <section
      className="relative py-24 px-6 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1a3270 0%, #2563eb 100%)",
      }}
    >
      {/* Hands background image */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={handImg}
          alt=""
          className="absolute left-0 bottom-0 h-full w-auto max-w-xs object-contain opacity-20"
        />
      </div>

      {/* Leaf decoration — right side */}
      <svg
        className="absolute right-0 top-0 h-full w-40 opacity-10 pointer-events-none"
        viewBox="0 0 160 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M80 20 C110 60, 155 130, 130 260 C110 360, 30 380, 10 300 C-10 210, 30 80, 80 20Z"
          fill="white"
        />
        <path
          d="M90 10 C120 50, 162 122, 138 252"
          stroke="white"
          strokeWidth="2"
          fill="none"
        />
        <line
          x1="80"
          y1="20"
          x2="62"
          y2="270"
          stroke="white"
          strokeWidth="1.5"
        />
        <line
          x1="68"
          y1="90"
          x2="35"
          y2="130"
          stroke="white"
          strokeWidth="1.2"
        />
        <line
          x1="70"
          y1="150"
          x2="110"
          y2="175"
          stroke="white"
          strokeWidth="1.2"
        />
        <line
          x1="66"
          y1="200"
          x2="38"
          y2="230"
          stroke="white"
          strokeWidth="1.2"
        />
      </svg>

      {/* Content */}
      <div className="relative z-10 max-w-xl mx-auto text-center">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl xl:text-4xl font-extrabold text-white mb-3 leading-tight"
        >
          Be Part of Our Journey
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          className="text-sm text-white/70 leading-relaxed mb-10"
        >
          Your support helps us turn hope into reality.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/get-involved"
            className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold text-sm px-8 py-3 rounded-full hover:bg-white hover:text-[#1a3270] transition-colors duration-200"
          >
            Join Us <ArrowRight size={15} />
          </Link>
          <Link
            to="/donate"
            className="inline-flex items-center gap-2 bg-white text-[#1a3270] font-semibold text-sm px-8 py-3 rounded-full hover:bg-blue-50 transition-colors duration-200 shadow-md"
          >
            Donate Now <Heart size={14} fill="#1a3270" strokeWidth={0} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
