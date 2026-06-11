import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: "easeOut" as const },
  }),
};

const highlights = [
  { icon: Mail, label: "Quick Response" },
  { icon: Phone, label: "Always Available" },
  { icon: MapPin, label: "Based in Nepal" },
];

export default function ContactHero() {
  return (
    <section className="py-16 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">

        {/* Left — text */}
        <div className="flex-1 max-w-lg">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="text-xs font-bold uppercase tracking-widest text-[#1a3270] mb-4 flex items-center gap-2"
          >
            <span className="inline-block w-8 h-0.5 bg-[#1a3270]" />
            Contact Us
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-4xl xl:text-5xl font-extrabold text-[#1a1a4b] leading-tight mb-5"
          >
            We'd Love to<br />Hear From<br />You
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-sm text-[#64748b] leading-relaxed mb-8"
          >
            Have a question, want to collaborate, or just want to say hello?
            Reach out to us and our team will get back to you as soon as possible.
          </motion.p>

          <div className="flex flex-wrap gap-3">
            {highlights.map(({ icon: Icon, label }, i) => (
              <motion.div
                key={label}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={i + 3}
                className="flex items-center gap-2.5 bg-[#f0f4ff] border border-[#d0ddf7] rounded-full px-4 py-2.5"
              >
                <div className="w-7 h-7 rounded-full bg-[#1a3270] flex items-center justify-center shrink-0">
                  <Icon size={13} className="text-white" />
                </div>
                <span className="text-xs font-semibold text-[#1a3270]">{label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right — decorative illustration */}
        <motion.div
          className="flex-1 relative flex items-center justify-center"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" as const, delay: 0.2 }}
        >
          {/* Leaf decoration */}
          <svg
            className="absolute -top-8 right-0 w-28 h-44 opacity-75 pointer-events-none z-10"
            viewBox="0 0 110 170"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M55 8 C75 25, 105 58, 88 118 C72 158, 18 155, 8 112 C-2 68, 25 18, 55 8Z" fill="#b8d4f0" opacity="0.45" />
            <path d="M62 4 C82 22, 110 55, 94 115 C78 155, 24 152, 14 109" stroke="#5a9fd4" strokeWidth="1.2" fill="none" opacity="0.6" />
            <line x1="55" y1="8" x2="46" y2="130" stroke="#5a9fd4" strokeWidth="1" opacity="0.5" />
            <line x1="49" y1="45" x2="25" y2="62" stroke="#5a9fd4" strokeWidth="0.9" opacity="0.45" />
            <line x1="50" y1="68" x2="74" y2="82" stroke="#5a9fd4" strokeWidth="0.9" opacity="0.45" />
            <line x1="48" y1="92" x2="26" y2="108" stroke="#5a9fd4" strokeWidth="0.9" opacity="0.45" />
          </svg>

          {/* Decorative card */}
          <div
            className="relative z-10 w-full max-w-md rounded-3xl overflow-hidden shadow-xl"
            style={{ background: "linear-gradient(135deg, #1a3270 0%, #2563eb 100%)" }}
          >
            <div className="p-10 text-white">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                <Mail size={26} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Get in Touch</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-8">
                Our team is ready to answer your questions and welcome you to the Project Generation family.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Mail, text: "projectgeneration@gmail.com" },
                  { icon: Phone, text: "+977 9800000000" },
                  { icon: MapPin, text: "Kathmandu, Nepal" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                      <Icon size={15} className="text-white" />
                    </div>
                    <span className="text-sm text-white/85">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom decoration */}
            <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-white/5 translate-x-10 translate-y-10" />
            <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-white/5 translate-x-6 -translate-y-6" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
