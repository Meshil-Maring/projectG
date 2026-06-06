import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTeamData } from "../../../context/TeamContext";

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

const ChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const ChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
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

const slideVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.38, ease: "easeOut" } },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60, transition: { duration: 0.28, ease: "easeIn" } }),
};

const CARDS_PER_PAGE = 6;

function SocialIcons() {
  return (
    <div className="flex items-center gap-2">
      {[FacebookIcon, LinkedinIcon, TwitterIcon].map((Icon, idx) => (
        <span
          key={idx}
          title="Coming soon"
          className="w-7 h-7 rounded-full bg-[#f0f4ff] flex items-center justify-center text-primary opacity-40 cursor-not-allowed"
        >
          <Icon />
        </span>
      ))}
    </div>
  );
}

export default function AboutTeam() {
  const { data } = useTeamData();
  const boardCommittee = data.board;
  const team = data.members;

  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);

  const totalPages = Math.ceil(team.length / CARDS_PER_PAGE);
  const currentMembers = team.slice(page * CARDS_PER_PAGE, page * CARDS_PER_PAGE + CARDS_PER_PAGE);

  function goNext() {
    if (page < totalPages - 1) {
      setDirection(1);
      setPage((p) => p + 1);
    }
  }

  function goPrev() {
    if (page > 0) {
      setDirection(-1);
      setPage((p) => p - 1);
    }
  }

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Main heading */}
        <div className="flex flex-col items-center mb-14">
          <motion.h2
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-2xl xl:text-3xl font-extrabold text-[#1a1a4b] mb-3"
          >
            Meet Our Team
          </motion.h2>
          <div className="w-14 h-1 bg-[#1a3270] rounded" />
        </div>

        {/* ── Board Committee Cum Chairman ── */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mb-16"
        >
          {/* Section label */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" />
            <div className="flex items-center gap-2 px-5 py-1.5 rounded-full border border-primary/20 bg-[#f0f4ff]">
              <span className="w-2 h-2 rounded-full bg-primary inline-block" />
              <span className="text-xs font-bold tracking-widest text-primary uppercase">
                Board Committee Cum Chairman
              </span>
              <span className="w-2 h-2 rounded-full bg-primary inline-block" />
            </div>
            <div className="flex-1 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" />
          </div>

          {/* Board cards */}
          <div className="flex flex-wrap justify-center gap-6">
            {boardCommittee.map(({ name, role, color, badge }, i) => {
              const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2);
              return (
                <motion.div
                  key={name}
                  variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.4}
                  className="relative bg-linear-to-b from-[#f0f4ff] to-white border-2 border-primary/15 rounded-2xl p-6 flex flex-col items-center text-center shadow-md hover:shadow-xl transition-shadow w-56"
                >
                  {/* Badge */}
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase text-white bg-primary shadow">
                    {badge}
                  </span>

                  {/* Avatar */}
                  <div
                    className="w-24 h-24 rounded-2xl flex items-center justify-center text-white text-2xl font-extrabold mb-4 shadow-md ring-4 ring-white"
                    style={{ backgroundColor: color }}
                  >
                    {initials}
                  </div>

                  <h3 className="text-sm font-extrabold text-[#1a1a4b] leading-snug mb-1">{name}</h3>
                  <p className="text-[11px] text-primary font-semibold mb-4">{role}</p>
                  <SocialIcons />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ── Rest of the Team ── */}
        <div>
          {/* Sub-label */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-[#e2e8f0]" />
            <span className="text-xs font-bold tracking-widest text-[#64748b] uppercase px-3">
              Our Team Members
            </span>
            <div className="flex-1 h-px bg-[#e2e8f0]" />
          </div>

          {/* Animated cards */}
          <div className="relative overflow-hidden min-h-65">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-5"
              >
                {currentMembers.map(({ name, role, color }, i) => {
                  const initials = name.split(" ").map((w) => w[0]).join("");
                  return (
                    <div
                      key={name}
                      className="bg-white border border-[#e2e8f0] rounded-2xl p-5 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-xl font-bold mb-3 shadow-sm"
                        style={{ backgroundColor: color }}
                      >
                        {initials}
                      </div>
                      <h3 className="text-sm font-bold text-[#1a1a4b] leading-tight mb-0.5">{name}</h3>
                      <p className="text-[11px] text-[#64748b] mb-3">{role}</p>
                      <SocialIcons />
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Prev / Next navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={goPrev}
              disabled={page === 0}
              className="flex items-center gap-1.5 px-5 py-2 rounded-full border border-primary/20 text-primary text-sm font-semibold bg-white hover:bg-[#f0f4ff] disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft /> Prev
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => { setDirection(idx > page ? 1 : -1); setPage(idx); }}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${idx === page ? "bg-primary scale-125" : "bg-[#cbd5e1]"}`}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              disabled={page === totalPages - 1}
              className="flex items-center gap-1.5 px-5 py-2 rounded-full border border-primary/20 text-primary text-sm font-semibold bg-white hover:bg-[#f0f4ff] disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              Next <ChevronRight />
            </button>
          </div>

          {/* Page indicator */}
          <p className="text-center text-[11px] text-muted mt-3">
            Showing {page * CARDS_PER_PAGE + 1}–{Math.min((page + 1) * CARDS_PER_PAGE, team.length)} of {team.length} members
          </p>
        </div>

      </div>
    </section>
  );
}
