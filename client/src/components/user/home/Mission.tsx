import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import familyImg from "../../../assets/image/family.jpeg";
import {
  Users,
  BookOpen,
  HeartPulse,
  Briefcase,
  Heart,
  HandHelping,
  Gift,
  Share2,
  ChevronRight,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: "easeOut" as const },
  }),
};

const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
};

const slideRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const pillars = [
  { icon: Users, label: "Support\nFamilies" },
  { icon: BookOpen, label: "Educate\nChildren" },
  { icon: HeartPulse, label: "Provide\nHealthcare" },
  { icon: Briefcase, label: "Create\nOpportunities" },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

async function handleShare(setCopied: (v: boolean) => void) {
  const shareData = {
    title: "Help Us Change Lives",
    text: "Join our mission to support families, educate children, and build better communities.",
    url: window.location.href,
  };
  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch {
      // user cancelled — no-op
    }
  } else {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
}

const helpItems = [
  {
    icon: Heart,
    iconBg: "bg-pink-100",
    iconColor: "text-pink-500",
    title: "Donate",
    desc: "Your contribution helps us change lives.",
    route: "/donate",
    sectionId: null,
  },
  {
    icon: HandHelping,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    title: "Volunteer",
    desc: "Give your time and inspire others.",
    route: null,
    sectionId: "get-involved",
  },
  {
    icon: Gift,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    title: "Fundraise",
    desc: "Start a fundraiser and spread the word.",
    route: null,
    sectionId: "causes",
  },
  {
    icon: Share2,
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    title: "Share",
    desc: "Share our mission with your network.",
    route: null,
    sectionId: null,
  },
];

export default function Mission() {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
        {/* ── Our Mission ── */}
        <motion.div
          variants={slideLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex-1 flex flex-col lg:flex-row gap-6 bg-white rounded-2xl border border-border overflow-hidden p-6"
        >
          {/* Family image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.15 }}
            className="shrink-0 w-full lg:w-56 xl:w-64 rounded-xl overflow-hidden"
          >
            <img
              src={familyImg}
              alt="Family silhouette"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Text + pillars */}
          <div className="flex flex-col justify-center gap-6">
            <div>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0}
                className="text-sm font-semibold uppercase tracking-widest text-secondary mb-2"
              >
                Our Mission
              </motion.p>
              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={1}
                className="text-3xl xl:text-4xl font-bold text-heading leading-snug mb-3"
              >
                Empowering Lives,
                <br />
                Building Better Future
              </motion.h2>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={2}
                className="text-sm text-body leading-relaxed max-w-sm"
              >
                We work for the upliftment of underprivileged communities by
                providing education, healthcare, food and a safe environment.
              </motion.p>
            </div>

            {/* Pillars */}
            <div className="flex flex-wrap gap-4">
              {pillars.map(({ icon: Icon, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.7, y: 12 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.45, ease: "easeOut" as const }}
                  whileHover={{ scale: 1.1, y: -3 }}
                  className="flex flex-col items-center gap-2 w-16 text-center cursor-default"
                >
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shadow-sm">
                    <Icon size={20} className="text-white" />
                  </div>
                  <span className="text-xs text-body font-medium leading-tight whitespace-pre-line">
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── How You Can Help ── */}
        <motion.div
          variants={slideRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="w-full lg:w-72 xl:w-80 flex flex-col gap-4"
        >
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-xs font-bold uppercase tracking-widest text-heading"
          >
            How You Can Help
          </motion.p>
          {helpItems.map(({ icon: Icon, iconBg, iconColor, title, desc, route, sectionId }, i) => (
            <motion.button
              key={title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i + 1}
              whileHover={{ x: 4, boxShadow: "0 6px 24px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() =>
                route
                  ? navigate(route)
                  : sectionId
                  ? scrollToSection(sectionId)
                  : handleShare(setCopied)
              }
              className="flex items-center gap-4 bg-white border border-border rounded-xl px-4 py-3 shadow-sm cursor-pointer text-left w-full"
            >
              <div
                className={`w-10 h-10 rounded-full ${iconBg} flex items-center justify-center shrink-0`}
              >
                <Icon size={18} className={iconColor} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-heading text-sm">{title}</p>
                <p className="text-xs text-body leading-snug">
                  {title === "Share" && copied ? "Link copied!" : desc}
                </p>
              </div>
              <ChevronRight
                size={16}
                className="text-muted shrink-0"
              />
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
