import { motion } from "framer-motion";

const FacebookIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const LinkedinIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const TwitterIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: "easeOut" },
  }),
};

const team = [
  { name: "Anita Verma",   role: "Founder & Director",     color: "#4a90d9" },
  { name: "Rahul Mehta",   role: "Programs Manager",        color: "#2ecc71" },
  { name: "Sneha Kapoor",  role: "Education Lead",          color: "#e74c3c" },
  { name: "Vikram Singh",  role: "Community Outreach",      color: "#9b59b6" },
  { name: "Priya Nair",    role: "Volunteer Coordinator",   color: "#f39c12" },
  { name: "Arjun Das",     role: "Finance & Operations",    color: "#1a3270" },
];

export default function AboutTeam() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="flex flex-col items-center mb-12">
          <motion.h2
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-2xl xl:text-3xl font-extrabold text-[#1a1a4b] mb-3"
          >
            Meet Our Team
          </motion.h2>
          <div className="w-14 h-1 bg-[#1a3270] rounded" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-5">
          {team.map(({ name, role, color }, i) => {
            const initials = name.split(" ").map((w) => w[0]).join("");
            return (
              <motion.div
                key={name}
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.4}
                className="bg-white border border-[#e2e8f0] rounded-2xl p-5 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Dummy photo */}
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-xl font-bold mb-3 shadow-sm"
                  style={{ backgroundColor: color }}
                >
                  {initials}
                </div>

                <h3 className="text-sm font-bold text-[#1a1a4b] leading-tight mb-0.5">{name}</h3>
                <p className="text-[11px] text-[#64748b] mb-3">{role}</p>

                {/* Social icons */}
                <div className="flex items-center gap-2">
                  {[FacebookIcon, LinkedinIcon, TwitterIcon].map((Icon, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="w-7 h-7 rounded-full bg-[#f0f4ff] flex items-center justify-center text-[#1a3270] hover:bg-[#1a3270] hover:text-white transition-colors"
                    >
                      <Icon />
                    </a>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
