import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTeamData } from "../../../context/TeamContext";
import { usePageSections } from "../../../context/PageContext";
import { ChevronLeftIcon, ChevronRightIcon } from "../../../assets/icons";

const DEFAULT_TEAM = {
  heading: "Meet Our Team",
  boardLabel: "Board Committee Cum Chairman",
  teamLabel: "Our Team Members",
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: "easeOut" as const },
  }),
};

const slideVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.38, ease: "easeOut" as const } },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60, transition: { duration: 0.28, ease: "easeIn" as const } }),
};

const CARDS_PER_PAGE = 6;

export default function AboutTeam() {
  const { data } = useTeamData();
  const boardCommittee = data.board;
  const team = data.members;
  const { getSectionData } = usePageSections();
  const content = { ...DEFAULT_TEAM, ...getSectionData("about-team") };

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
            className="text-2xl xl:text-3xl font-extrabold text-heading mb-3"
          >
            {content.heading}
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
                {content.boardLabel}
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

                  <h3 className="text-sm font-extrabold text-heading leading-snug mb-1">{name}</h3>
                  <p className="text-[11px] text-primary font-semibold">{role}</p>
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
              {content.teamLabel}
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
                {currentMembers.map(({ name, role, color }) => {
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
                      <h3 className="text-sm font-bold text-heading leading-tight mb-0.5">{name}</h3>
                      <p className="text-[11px] text-[#64748b]">{role}</p>
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
              <ChevronLeftIcon /> Prev
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
              Next <ChevronRightIcon />
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
