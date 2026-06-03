import { motion } from "framer-motion";
import { Heart, Target, Lightbulb, Shield, Users, Globe } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: "easeOut" },
  }),
};

const values = [
  {
    icon: Heart,
    title: "Compassion",
    desc: "We lead with empathy, ensuring every person we serve feels seen, heard, and valued.",
    color: "bg-pink-100",
    iconColor: "text-pink-500",
  },
  {
    icon: Target,
    title: "Impact",
    desc: "Every action is measured by the tangible difference it creates in people's lives.",
    color: "bg-orange-100",
    iconColor: "text-[#f97316]",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "We seek new and creative approaches to solve the complex challenges communities face.",
    color: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    icon: Shield,
    title: "Integrity",
    desc: "We operate with full transparency and accountability in all that we do.",
    color: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: Users,
    title: "Community",
    desc: "We believe in the power of people coming together to uplift one another.",
    color: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    icon: Globe,
    title: "Inclusivity",
    desc: "We serve without discrimination — every child, family and community matters.",
    color: "bg-purple-100",
    iconColor: "text-purple-600",
  },
];

export default function AboutValues() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#f97316] mb-2">
            What Guides Us
          </p>
          <h2 className="text-2xl xl:text-3xl font-bold text-[#1e293b]">
            Our Core Values
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map(({ icon: Icon, title, desc, color, iconColor }, i) => (
            <motion.div
              key={title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i * 0.5}
              className="bg-white border border-[#e2e8f0] rounded-2xl p-6 hover:shadow-md transition-shadow"
            >
              <div
                className={`w-12 h-12 rounded-full ${color} flex items-center justify-center mb-4`}
              >
                <Icon size={22} className={iconColor} />
              </div>
              <h3 className="font-bold text-[#1e293b] mb-2">{title}</h3>
              <p className="text-sm text-[#475569] leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
