import { motion } from "framer-motion";
import { Share2, MessageCircle, Mail, Users } from "lucide-react";
import { usePageSections } from "../../../context/PageContext";

const DEFAULT_SPREAD = {
  eyebrow: "Spread the Word",
  heading: "Amplify Our Impact",
  description:
    "You don't need money or a lot of time. A share, a conversation, or a simple message can bring more people into our mission.",
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const actions = [
  {
    icon: Share2,
    title: "Share on Social Media",
    description: "Post about our campaigns and stories on Facebook, Instagram, or X to help us reach more supporters.",
    color: "#2563eb",
    bg: "#eff6ff",
  },
  {
    icon: MessageCircle,
    title: "Tell Your Community",
    description: "Talk to friends, family, and colleagues about Project Generation and invite them to get involved.",
    color: "#7c3aed",
    bg: "#f5f3ff",
  },
  {
    icon: Mail,
    title: "Subscribe to Updates",
    description: "Join our newsletter to stay informed and be the first to hear about new campaigns and impact stories.",
    color: "#0d9488",
    bg: "#f0fdfa",
  },
  {
    icon: Users,
    title: "Bring a Group",
    description: "Organize a group volunteer day or fundraiser with your school, company, or organization.",
    color: "#e63975",
    bg: "#fce7ef",
  },
];

export default function GetInvolvedSpread() {
  const { getSectionData } = usePageSections();
  const content = { ...DEFAULT_SPREAD, ...getSectionData("gi-spread") };

  return (
    <section id="spread" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-14">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-widest text-[#2563eb] mb-3 flex items-center justify-center gap-2"
          >
            <span className="inline-block w-6 h-0.5 bg-[#2563eb]" />
            {content.eyebrow}
            <span className="inline-block w-6 h-0.5 bg-[#2563eb]" />
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="text-3xl xl:text-4xl font-extrabold text-[#1a1a4b] leading-tight"
          >
            {content.heading}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            className="text-sm text-[#64748b] mt-3 max-w-md mx-auto leading-relaxed"
          >
            {content.description}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {actions.map(({ icon: Icon, title, description, color, bg }, i) => (
            <motion.div
              key={title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="bg-[#f8fafc] rounded-2xl p-6 border border-slate-100 hover:shadow-md transition-shadow duration-200 flex flex-col gap-3"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: bg }}
              >
                <Icon size={20} style={{ color }} strokeWidth={1.8} />
              </div>
              <h3 className="text-sm font-bold text-[#1a1a4b]">{title}</h3>
              <p className="text-xs text-[#64748b] leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
