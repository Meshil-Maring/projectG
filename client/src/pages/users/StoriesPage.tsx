import { useState } from "react";
import { ArrowLeft, MapPin, Calendar, X } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../../shared/components/Navbar";
import Footer from "../../shared/components/Footer";
import { stories } from "../../data/stories";

export default function StoriesPage() {
  const [selected, setSelected] = useState<(typeof stories)[number] | null>(null);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-[color:var(--color-primary)] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={15} /> Back to Home
          </Link>
          <p className="text-xs font-bold uppercase tracking-widest text-[color:var(--color-secondary)] mb-3">
            Stories of Change
          </p>
          <h1 className="text-4xl font-bold text-white mb-4">
            Real People. Real Impact.
          </h1>
          <p className="text-white/70 max-w-xl text-sm leading-relaxed">
            Every number in our impact report represents a person with a name, a
            story, and a future. Here are just a few of the lives that have been
            changed through your support.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {stories.map((story) => (
              <StoryCard
                key={story.id}
                story={story}
                onOpen={() => setSelected(story)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selected && (
        <StoryModal story={selected} onClose={() => setSelected(null)} />
      )}

      <Footer />
    </>
  );
}

function StoryCard({
  story,
  onOpen,
}: {
  story: (typeof stories)[number];
  onOpen: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 p-5 rounded-2xl border border-[color:var(--color-border)] bg-white hover:shadow-[var(--shadow-card)] transition-shadow duration-200">
      {/* Avatar + meta */}
      <div className="flex items-center gap-3">
        <img
          src={story.image}
          alt={story.name}
          className="w-12 h-12 rounded-full object-cover ring-2 ring-[color:var(--color-border)] shrink-0"
        />
        <div>
          <p className="text-sm font-bold text-[color:var(--color-heading)] leading-tight">
            {story.name}
          </p>
          <p className="text-xs text-[color:var(--color-muted)]">{story.role}</p>
        </div>
      </div>

      {/* Quote */}
      <div>
        <span
          className="text-3xl leading-none font-serif text-[color:var(--color-primary-light)] select-none"
          aria-hidden
        >
          &ldquo;
        </span>
        <p className="text-sm text-[color:var(--color-body)] leading-relaxed -mt-1 line-clamp-3">
          {story.quote}
        </p>
      </div>

      {/* Location / year */}
      <div className="flex items-center gap-3 mt-auto pt-1">
        <span className="flex items-center gap-1 text-xs text-[color:var(--color-muted)]">
          <MapPin size={11} /> {story.location}
        </span>
        <span className="flex items-center gap-1 text-xs text-[color:var(--color-muted)]">
          <Calendar size={11} /> {story.year}
        </span>
      </div>

      <button
        onClick={onOpen}
        className="mt-1 text-xs font-semibold text-[color:var(--color-primary-light)] hover:underline text-left"
      >
        Read full story →
      </button>
    </div>
  );
}

function StoryModal({
  story,
  onClose,
}: {
  story: (typeof stories)[number];
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border border-[color:var(--color-border)] text-[color:var(--color-muted)] hover:text-[color:var(--color-heading)] transition-colors"
        >
          <X size={15} />
        </button>

        <div className="flex items-center gap-4 mb-5">
          <img
            src={story.image}
            alt={story.name}
            className="w-16 h-16 rounded-full object-cover ring-2 ring-[color:var(--color-border)]"
          />
          <div>
            <p className="font-bold text-[color:var(--color-heading)]">{story.name}</p>
            <p className="text-xs text-[color:var(--color-muted)]">{story.role}</p>
            <div className="flex items-center gap-3 mt-1">
              <span className="flex items-center gap-1 text-xs text-[color:var(--color-muted)]">
                <MapPin size={11} /> {story.location}
              </span>
              <span className="flex items-center gap-1 text-xs text-[color:var(--color-muted)]">
                <Calendar size={11} /> {story.year}
              </span>
            </div>
          </div>
        </div>

        <span
          className="text-4xl leading-none font-serif text-[color:var(--color-primary-light)] select-none"
          aria-hidden
        >
          &ldquo;
        </span>
        <p className="text-base italic font-medium text-[color:var(--color-heading)] mb-4 -mt-1">
          {story.quote}
        </p>
        <p className="text-sm text-[color:var(--color-body)] leading-relaxed">
          {story.fullStory}
        </p>
      </div>
    </div>
  );
}
