import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { usePageSections } from "../../../context/PageContext";

const DEFAULT_HERO = {
  eyebrow: "Contact Us",
  headingLine1: "We'd Love to",
  headingLine2: "Hear From",
  headingLine3: "You",
  description:
    "Have a question, want to collaborate, or just want to say hello? Reach out to us and our team will get back to you as soon as possible.",
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: "easeOut" as const },
  }),
};

const contactPoints = [
  { icon: Mail, label: "Email Us", value: "projectgmanipur@gmail.com" },
  { icon: Phone, label: "Call Us", value: "+91 87983 03158" },
  { icon: MapPin, label: "Visit Us", value: "Sagolband Ingudam Leikai, Manipur, India - 795001" },
];

export default function ContactHero() {
  const { getSectionData } = usePageSections();
  const hero = { ...DEFAULT_HERO, ...getSectionData("contact-hero") };

  return (
    <section className="relative overflow-hidden">
      {/* Gradient banner */}
      <div
        className="relative"
        style={{ background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)" }}
      >
        {/* Decorative circles */}
        <div className="absolute -top-24 -right-20 w-72 h-72 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-28 -left-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-white/5 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 pt-20 pb-32 sm:pt-24 sm:pb-36 text-center">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="text-xs font-bold uppercase tracking-widest text-white/80 mb-4 flex items-center justify-center gap-2"
          >
            <span className="inline-block w-6 h-0.5 bg-white/60" />
            {hero.eyebrow}
            <span className="inline-block w-6 h-0.5 bg-white/60" />
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-white leading-tight mb-5"
          >
            {hero.headingLine1} {hero.headingLine2}
            <br />
            {hero.headingLine3}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-sm sm:text-base text-white/75 leading-relaxed max-w-xl mx-auto whitespace-pre-wrap"
          >
            {hero.description}
          </motion.p>
        </div>
      </div>

      {/* Floating contact cards */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 -mt-14 sm:-mt-16 pb-16 sm:pb-20">
        <div className="grid sm:grid-cols-3 gap-5">
          {contactPoints.map(({ icon: Icon, label, value }, i) => (
            <motion.div
              key={label}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={i + 3}
              className="bg-white rounded-2xl shadow-card border border-border p-6 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Icon size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-1">{label}</p>
                <p className="text-sm font-bold text-heading">{value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
