import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: "easeOut" },
  }),
};

const team = [
  {
    name: "Team Member Name",
    role: "Founder & Executive Director",
    initials: "TM",
    accent: "#1a3270",
  },
  {
    name: "Team Member Name",
    role: "Program Coordinator",
    initials: "TM",
    accent: "#f97316",
  },
  {
    name: "Team Member Name",
    role: "Community Outreach Lead",
    initials: "TM",
    accent: "#0d9488",
  },
  {
    name: "Team Member Name",
    role: "Volunteer & Partnership Manager",
    initials: "TM",
    accent: "#7c3aed",
  },
];

export default function AboutTeam() {
  return (
    <section className="py-20 px-6 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#f97316] mb-2">
            The People Behind It All
          </p>
          <h2 className="text-2xl xl:text-3xl font-bold text-[#1e293b]">
            Meet Our Team
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map(({ name, role, initials, accent }, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i * 0.5}
              className="bg-white rounded-2xl p-6 text-center border border-[#e2e8f0] shadow-sm hover:shadow-md transition-shadow"
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4"
                style={{ backgroundColor: accent }}
              >
                {initials}
              </div>
              <h3 className="font-bold text-[#1e293b] mb-1">{name}</h3>
              <p className="text-xs text-[#475569]">{role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
