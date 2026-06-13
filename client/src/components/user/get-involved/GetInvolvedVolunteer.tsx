import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import handImg from "../../../assets/image/hand.png";
import VolunteerModal from "../home/VolunteerModal";
import { usePageSections } from "../../../context/PageContext";

const DEFAULT_VOLUNTEER = {
  eyebrow: "Volunteer",
  headingLine1: "Be The Change",
  headingLine2: "You Wish to See",
  description:
    "Volunteering with Project Generation means becoming part of a movement that puts people first. No experience needed — just a heart ready to serve.",
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const benefits = [
  "Flexible hours to fit your schedule",
  "Work with passionate, like-minded people",
  "Gain hands-on community experience",
  "Make a measurable impact in lives",
  "Receive recognition and certificates",
];

export default function GetInvolvedVolunteer() {
  const [showModal, setShowModal] = useState(false);
  const { getSectionData } = usePageSections();
  const content = { ...DEFAULT_VOLUNTEER, ...getSectionData("gi-volunteer") };

  return (
    <>
      <section id="volunteer" className="py-20 px-6 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-14">

          {/* Left — image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: "easeOut" as const }}
            className="flex-shrink-0 w-72 h-64 xl:w-96 xl:h-80 relative"
          >
            <div className="absolute inset-0 rounded-3xl bg-[#fce7ef] -rotate-3" />
            <img
              src={handImg}
              alt="Volunteers"
              className="relative w-full h-full object-contain drop-shadow-lg"
            />
          </motion.div>

          {/* Right — text */}
          <div className="flex-1">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-xs font-bold uppercase tracking-widest text-[#e63975] mb-3 flex items-center gap-2"
            >
              <span className="inline-block w-6 h-0.5 bg-[#e63975]" />
              {content.eyebrow}
            </motion.p>

            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              className="text-3xl xl:text-4xl font-extrabold text-heading leading-tight mb-4"
            >
              {content.headingLine1}<br />{content.headingLine2}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
              className="text-sm text-[#64748b] leading-relaxed mb-6 max-w-md"
            >
              {content.description}
            </motion.p>

            <ul className="flex flex-col gap-2.5 mb-8">
              {benefits.map((benefit, i) => (
                <motion.li
                  key={benefit}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i + 3}
                  className="flex items-center gap-2.5 text-sm text-[#475569]"
                >
                  <CheckCircle2 size={16} className="text-[#e63975] shrink-0" strokeWidth={2} />
                  {benefit}
                </motion.li>
              ))}
            </ul>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={8}
            >
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-2 bg-[#e63975] hover:bg-[#c72d60] text-white text-sm font-semibold px-7 py-3.5 rounded-full transition-colors duration-200 cursor-pointer shadow-md"
              >
                Join Us Today →
              </button>
            </motion.div>
          </div>

        </div>
      </section>

      {showModal && <VolunteerModal onClose={() => setShowModal(false)} />}
    </>
  );
}
