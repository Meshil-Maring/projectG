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
  { icon: Mail, label: "Email Us", value: "projectgmanipur@gmail.com", href: "mailto:projectgmanipur@gmail.com" },
  { icon: Phone, label: "Call Us", value: "+91 87983 03158", href: "tel:+918798303158" },
  { icon: MapPin, label: "Visit Us", value: "Sagolband Ingudam Leikai, Manipur, India - 795001", href: "https://maps.google.com/?q=Sagolband+Ingudam+Leikai,Manipur,India" },
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
<div className="relative z-10 max-w-3xl mx-auto px-6 pr-14 sm:pr-6 pt-16 pb-28 sm:pt-24 sm:pb-36 text-center">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="text-xs font-bold uppercase tracking-widest text-white/80 mb-3 flex items-center justify-center gap-2"
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
            className="text-3xl sm:text-5xl xl:text-6xl font-extrabold text-white leading-tight mb-4"
          >
            {hero.headingLine1}
            <br />
            {hero.headingLine2} {hero.headingLine3}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-sm sm:text-base text-white/75 leading-relaxed max-w-xl mx-auto"
          >
            {hero.description}
          </motion.p>
        </div>
      </div>

      {/* Floating contact cards */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 -mt-10 sm:-mt-16 pb-12 sm:pb-20">
        <div className="grid sm:grid-cols-3 gap-3 sm:gap-5">
          {contactPoints.map(({ icon: Icon, label, value, href }, i) => (
            <motion.a
              key={label}
              href={href}
              target={label === "Visit Us" ? "_blank" : undefined}
              rel={label === "Visit Us" ? "noopener noreferrer" : undefined}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={i + 3}
              className="bg-white rounded-2xl shadow-card border border-border p-4 sm:p-6 flex items-center gap-3 sm:gap-4 hover:border-primary/40 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Icon size={18} className="text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-0.5">{label}</p>
                <p className="text-sm font-bold text-heading wrap-break-word leading-snug">{value}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
