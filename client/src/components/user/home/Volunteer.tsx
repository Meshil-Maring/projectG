import { useState } from "react";
import { motion } from "framer-motion";
import handImg from "../../../assets/image/hand.png";
import { Heart, BookOpen, Users, Handshake } from "lucide-react";
import VolunteerModal from "./VolunteerModal";

const pillars = [
  { icon: Heart, label: "Make\nImpact" },
  { icon: BookOpen, label: "Learn &\nGrow" },
  { icon: Users, label: "Inspire\nOthers" },
  { icon: Handshake, label: "Build Strong\nCommunities" },
];

export default function Volunteer() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    <section className="py-14 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8">

        {/* Left — text block */}
        <motion.div
          initial={{ opacity: 0, x: -36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as const }}
          className="shrink-0 max-w-xs"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-[#e63975] mb-3">
            Join Our Mission
          </p>
          <h2 className="text-3xl xl:text-4xl font-extrabold text-[#1a1a4b] leading-tight mb-4">
            Be A Volunteer,<br />Be The Change
          </h2>
          <p className="text-sm text-[#64748b] leading-relaxed mb-7">
            Join our team of passionate volunteers and help us create a better
            tomorrow for all.
          </p>
          <motion.button
            whileHover={{ scale: 1.06, backgroundColor: "#c72d60" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 bg-[#e63975] text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors duration-200 cursor-pointer"
          >
            Join Us Today <span aria-hidden>→</span>
          </motion.button>
        </motion.div>

        {/* Center — pillar icons */}
        <div className="flex flex-wrap justify-center gap-6 flex-1">
          {pillars.map(({ icon: Icon, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.7, y: 16 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.45, ease: "easeOut" as const }}
              whileHover={{ scale: 1.12, y: -4 }}
              className="flex flex-col items-center gap-2 w-24 text-center cursor-default"
            >
              <div className="w-16 h-16 rounded-full bg-[#fce7ef] flex items-center justify-center shadow-sm">
                <Icon size={26} className="text-[#e63975]" strokeWidth={1.8} />
              </div>
              <span className="text-xs font-semibold text-[#1a1a4b] leading-tight whitespace-pre-line">
                {label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Right — watercolor hand image */}
        <motion.div
          initial={{ opacity: 0, x: 36, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="shrink-0 w-64 h-48 xl:w-80 xl:h-60 relative"
        >
          <img
            src={handImg}
            alt="Volunteers raising hands together"
            className="w-full h-full object-contain"
          />
        </motion.div>

      </div>
    </section>

    {showModal && <VolunteerModal onClose={() => setShowModal(false)} />}
    </>
  );
}
