import { motion } from "framer-motion";
import { Heart, HandHelping, Share2, Handshake } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const ways = [
  {
    icon: HandHelping,
    title: "Volunteer",
    description:
      "Give your time and skills to support our programs. From tutoring students to organizing community events, there's a role for everyone.",
    cta: "Sign Up to Volunteer",
    href: "#volunteer",
    color: "#e63975",
    bg: "#fce7ef",
  },
  {
    icon: Heart,
    title: "Donate",
    description:
      "Your financial contribution helps fund education, health, and welfare programs that uplift lives across our communities.",
    cta: "Make a Donation",
    href: "#donate",
    color: "#1a3270",
    bg: "#f0f4ff",
  },
  {
    icon: Share2,
    title: "Spread the Word",
    description:
      "Follow us on social media, share our campaigns, and help us reach more people who want to make a difference.",
    cta: "Share Our Mission",
    href: "#spread",
    color: "#2563eb",
    bg: "#eff6ff",
  },
  {
    icon: Handshake,
    title: "Partner With Us",
    description:
      "Organisations and businesses can collaborate with us to create sustainable impact through joint programs and resources.",
    cta: "Become a Partner",
    href: "/contact",
    color: "#0d9488",
    bg: "#f0fdfa",
  },
];

export default function GetInvolvedWays() {
  return (
    <section className="py-20 px-6 bg-[#f8fafc]">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-widest text-[#1a3270] mb-3 flex items-center justify-center gap-2"
          >
            <span className="inline-block w-6 h-0.5 bg-[#1a3270]" />
            How You Can Help
            <span className="inline-block w-6 h-0.5 bg-[#1a3270]" />
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="text-3xl xl:text-4xl font-extrabold text-[#1a1a4b] leading-tight"
          >
            Ways to Make a Difference
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            className="text-sm text-[#64748b] mt-3 max-w-lg mx-auto leading-relaxed"
          >
            There are many ways to support our mission. Choose the path that fits
            you best and start creating real change today.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ways.map(({ icon: Icon, title, description, cta, href, color, bg }, i) => (
            <motion.div
              key={title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: bg }}
              >
                <Icon size={22} style={{ color }} strokeWidth={1.8} />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#1a1a4b] mb-1">{title}</h3>
                <p className="text-sm text-[#64748b] leading-relaxed">{description}</p>
              </div>
              <a
                href={href}
                className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold transition-colors duration-150"
                style={{ color }}
              >
                {cta} →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
