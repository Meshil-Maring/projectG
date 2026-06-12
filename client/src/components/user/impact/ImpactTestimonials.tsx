import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { usePageSections } from "../../../context/PageContext";

const DEFAULT_TESTIMONIALS = {
  eyebrow: "Real Stories",
  heading: "Voices of Change",
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const testimonials = [
  {
    quote:
      "The scholarship I received from Project Generation changed everything. I was the first in my family to finish school. Now I want to give back the same way.",
    name: "Anita Sharma",
    location: "Rural District, UP",
    category: "Education",
    color: "#2563eb",
    initials: "AS",
  },
  {
    quote:
      "The free health camp caught my husband's illness early. Without Project Generation, we would never have afforded the tests. We are forever grateful.",
    name: "Rekha Devi",
    location: "Urban Slum, Bihar",
    category: "Health",
    color: "#ec4899",
    initials: "RD",
  },
  {
    quote:
      "Their vocational training gave me the skills to start my own tailoring shop. Today I employ three other women from my village. That is real change.",
    name: "Sunita Kumari",
    location: "Semi-Urban, Rajasthan",
    category: "Empowerment",
    color: "#7c3aed",
    initials: "SK",
  },
];

export default function ImpactTestimonials() {
  return (
    <section className="py-20 px-6 bg-[#f8fafc]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-widest text-[#0d9488] mb-2"
          >
            Real Stories
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="text-2xl xl:text-4xl font-extrabold text-[#1e293b]"
          >
            Voices of Change
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ quote, name, location, category, color, initials }, i) => (
            <motion.div
              key={name}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              custom={i * 0.4}
              className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-7 flex flex-col gap-5"
            >
              <Quote size={28} style={{ color, opacity: 0.3 }} />
              <p className="text-sm text-[#475569] leading-relaxed flex-1 italic">
                "{quote}"
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ backgroundColor: color }}
                >
                  {initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1e293b]">{name}</p>
                  <p className="text-xs text-[#94a3b8]">{location}</p>
                </div>
                <span
                  className="ml-auto text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: `${color}18`, color }}
                >
                  {category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
