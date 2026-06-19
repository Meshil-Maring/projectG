import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useHomePageData } from "../../../context/HomePageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: "easeOut" as const },
  }),
};

const VISIBLE = 3;

export default function StoriesOfChange() {
  const { data } = useHomePageData();
  const stories = data.stories;
  const [index, setIndex] = useState(0);
  const maxIndex = Math.max(stories.length - VISIBLE, 0);

  const prev = () => setIndex((i) => Math.max(i - 1, 0));
  const next = () => setIndex((i) => Math.min(i + 1, maxIndex));

  const visible = stories.slice(index, index + VISIBLE);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header row */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              className="text-xs font-bold uppercase tracking-widest text-(--color-secondary) mb-2"
            >
              Stories of Change
            </motion.p>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              className="text-3xl font-bold text-heading"
            >
              Real People. Real Impact.
            </motion.h2>
          </div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
          >
            <Link
              to="/stories"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-(--color-primary-light) hover:underline mt-1 shrink-0"
            >
              Read More Stories <span aria-hidden>→</span>
            </Link>
          </motion.div>
        </div>

        {/* Cards + nav wrapper */}
        <div className="flex items-center gap-4">
          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 flex-1 min-w-0">
            <AnimatePresence mode="popLayout">
              {visible.map((story, i) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 24, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -16, scale: 0.96 }}
                  transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" as const }}
                >
                  <StoryCard {...story} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Nav arrows */}
          <div className="hidden lg:flex flex-col gap-2 shrink-0">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.93 }}
              onClick={prev}
              disabled={index === 0}
              aria-label="Previous stories"
              className="w-10 h-10 rounded-full border border-(--color-border) flex items-center justify-center text-muted hover:border-(--color-primary-light) hover:text-(--color-primary-light) disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.93 }}
              onClick={next}
              disabled={index >= maxIndex}
              aria-label="Next stories"
              className="w-10 h-10 rounded-full border border-(--color-primary-light) flex items-center justify-center text-(--color-primary-light) hover:bg-(--color-primary-light) hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={18} />
            </motion.button>
          </div>
        </div>

        {/* Mobile nav */}
        <div className="flex justify-center gap-3 mt-8 lg:hidden">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.93 }}
            onClick={prev}
            disabled={index === 0}
            aria-label="Previous stories"
            className="w-10 h-10 rounded-full border border-(--color-border) flex items-center justify-center text-muted disabled:opacity-30 transition-colors"
          >
            <ChevronLeft size={18} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.93 }}
            onClick={next}
            disabled={index >= maxIndex}
            aria-label="Next stories"
            className="w-10 h-10 rounded-full border border-(--color-primary-light) flex items-center justify-center text-(--color-primary-light) disabled:opacity-30 transition-colors"
          >
            <ChevronRight size={18} />
          </motion.button>
        </div>
      </div>
    </section>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

type StoryCardProps = {
  image: string;
  quote: string;
  name: string;
  role: string;
};

function StoryCard({ image, quote, name, role }: StoryCardProps) {
  const initials = getInitials(name);

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "var(--shadow-card)" }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="flex flex-col p-5 rounded-2xl border border-(--color-border) bg-white transition-shadow duration-200"
    >
      {/* Quote mark */}
      <span
        className="text-4xl leading-none font-script text-(--color-primary-light) select-none mb-2"
        aria-hidden
      >
        &ldquo;
      </span>

      {/* Quote text */}
      <p className="text-sm text-body leading-relaxed flex-1 mb-4">{quote}</p>

      {/* Author row */}
      <div className="flex items-center gap-3 pt-3 border-t border-(--color-border)">
        {image ? (
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-(--color-border) shrink-0"
          />
        ) : (
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary/10 text-primary font-bold text-sm shrink-0 ring-2 ring-primary/20">
            {initials}
          </div>
        )}
        <div className="min-w-0">
          <p className="text-sm font-bold text-heading truncate">{name}</p>
          <p className="text-xs text-muted truncate">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}
