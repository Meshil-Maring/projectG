import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useHomePageData } from "../../../context/HomePageContext";

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
            <p className="text-xs font-bold uppercase tracking-widest text-[color:var(--color-secondary)] mb-2">
              Stories of Change
            </p>
            <h2 className="text-3xl font-bold text-[color:var(--color-heading)]">
              Real People. Real Impact.
            </h2>
          </div>
          <Link
            to="/stories"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-[color:var(--color-primary-light)] hover:underline mt-1 shrink-0"
          >
            Read More Stories <span aria-hidden>→</span>
          </Link>
        </div>

        {/* Cards + nav wrapper */}
        <div className="flex items-center gap-4">
          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 flex-1 min-w-0">
            {visible.map((story) => (
              <StoryCard key={story.id} {...story} />
            ))}
          </div>

          {/* Nav arrows */}
          <div className="hidden lg:flex flex-col gap-2 shrink-0">
            <button
              onClick={prev}
              disabled={index === 0}
              aria-label="Previous stories"
              className="w-10 h-10 rounded-full border border-[color:var(--color-border)] flex items-center justify-center text-[color:var(--color-muted)] hover:border-[color:var(--color-primary-light)] hover:text-[color:var(--color-primary-light)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              disabled={index >= maxIndex}
              aria-label="Next stories"
              className="w-10 h-10 rounded-full border border-[color:var(--color-primary-light)] flex items-center justify-center text-[color:var(--color-primary-light)] hover:bg-[color:var(--color-primary-light)] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <div className="flex justify-center gap-3 mt-8 lg:hidden">
          <button
            onClick={prev}
            disabled={index === 0}
            aria-label="Previous stories"
            className="w-10 h-10 rounded-full border border-[color:var(--color-border)] flex items-center justify-center text-[color:var(--color-muted)] disabled:opacity-30 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            disabled={index >= maxIndex}
            aria-label="Next stories"
            className="w-10 h-10 rounded-full border border-[color:var(--color-primary-light)] flex items-center justify-center text-[color:var(--color-primary-light)] disabled:opacity-30 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

type StoryCardProps = {
  image: string;
  quote: string;
  name: string;
  role: string;
};

function StoryCard({ image, quote, name, role }: StoryCardProps) {
  return (
    <div className="flex gap-4 p-5 rounded-2xl border border-[color:var(--color-border)] bg-white hover:shadow-[var(--shadow-card)] transition-shadow duration-200">
      {/* Avatar */}
      <div className="shrink-0">
        <img
          src={image}
          alt={name}
          className="w-14 h-14 rounded-full object-cover ring-2 ring-[color:var(--color-border)]"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 min-w-0">
        {/* Opening quote mark */}
        <span
          className="text-4xl leading-none font-serif text-[color:var(--color-primary-light)] select-none -mt-1"
          aria-hidden
        >
          &ldquo;
        </span>
        <p className="text-sm text-[color:var(--color-body)] leading-relaxed -mt-2">
          {quote}
        </p>
        <div className="mt-1">
          <p className="text-sm font-bold text-[color:var(--color-heading)]">
            {name}
          </p>
          <p className="text-xs text-[color:var(--color-muted)]">{role}</p>
        </div>
      </div>
    </div>
  );
}
