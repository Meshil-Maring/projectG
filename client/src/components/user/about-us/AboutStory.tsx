import { motion } from "framer-motion";
import { Play, Calendar, MapPin, FileCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import familyImg from "../../../assets/image/family.jpeg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: "easeOut" },
  }),
};

const infoBadges = [
  { icon: Calendar, label: "Founded", value: "2012" },
  { icon: MapPin, label: "Headquarters", value: "Manipur, India" },
  { icon: FileCheck, label: "Legal Status", value: "Registered NGO" },
];

export default function AboutStory() {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-14 relative">

        {/* Left — image with play button */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="shrink-0 w-full lg:w-[420px] relative rounded-2xl overflow-hidden shadow-xl"
        >
          <img
            src={familyImg}
            alt="Our story"
            className="w-full h-72 lg:h-96 object-cover"
          />
          <button
            onClick={() => navigate("/stories")}
            className="absolute inset-0 flex items-center justify-center group"
            aria-label="Watch our stories"
          >
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
              <Play size={22} className="text-[#1a3270] ml-1" fill="#1a3270" />
            </div>
          </button>
        </motion.div>

        {/* Right — story text */}
        <div className="flex-1 relative">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-xs font-bold uppercase tracking-widest text-[#f97316] mb-2"
          >
            Our Story
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="text-3xl xl:text-4xl font-extrabold text-[#1a1a4b] leading-tight mb-3"
          >
            How It All Began
          </motion.h2>
          <div className="w-12 h-1 bg-[#1a3270] rounded mb-6" />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            className="space-y-3 text-sm text-[#64748b] leading-relaxed mb-8"
          >
            <p>
              Project Generation was founded with a simple belief — that small acts
              of kindness can create a big change.
            </p>
            <p>
              What started as a group of passionate students has grown into a movement
              that touches thousands of lives every year.
            </p>
          </motion.div>

          {/* Info badges */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3}
            className="flex flex-wrap gap-3"
          >
            {infoBadges.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center gap-3 border border-[#e2e8f0] rounded-xl px-4 py-3 bg-[#f8fafc]"
              >
                <Icon size={16} className="text-[#1a3270] shrink-0" />
                <div>
                  <p className="text-[10px] text-[#94a3b8] uppercase font-semibold tracking-wide">
                    {label}
                  </p>
                  <p className="text-sm font-bold text-[#1a1a4b]">{value}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Blue birds / silhouette decoration */}
          <svg
            className="absolute -right-6 top-0 w-20 h-40 opacity-30 pointer-events-none hidden lg:block"
            viewBox="0 0 80 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M40 10 Q55 2 65 12 Q55 14 40 10Z" fill="#1a3270" />
            <path d="M30 28 Q45 20 55 30 Q45 32 30 28Z" fill="#1a3270" />
            <path d="M50 48 Q62 42 70 50 Q62 52 50 48Z" fill="#1a3270" />
            <path d="M20 65 Q32 58 42 66 Q32 68 20 65Z" fill="#1a3270" />
          </svg>
        </div>

      </div>
    </section>
  );
}
