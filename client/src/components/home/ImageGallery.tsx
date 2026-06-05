import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, LayoutGrid, X } from "lucide-react";

const photos = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&q=90",
    alt: "Children Planting Trees",
    description:
      "Young community members learn environmental stewardship by planting trees in their neighborhood park — one sapling at a time, they are reshaping the future.",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=90",
    alt: "Children Having a Meal",
    description:
      "Nutritious meals are provided daily to over 500 children through our feeding program, ensuring no child has to study on an empty stomach.",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=90",
    alt: "Doctor With Students",
    description:
      "Healthcare volunteers bring free medical check-ups and health education to underserved school communities, bridging the gap between care and access.",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=1200&q=90",
    alt: "Children Raising Hands",
    description:
      "Eager students participate in our after-school learning program, breaking barriers to quality education and discovering the joy of curiosity.",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&q=90",
    alt: "Volunteer Distributing Supplies",
    description:
      "Dedicated volunteers distribute emergency relief kits to families in need, bringing warmth, dignity, and hope during the most difficult times.",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200&q=90",
    alt: "Education for All",
    description:
      "Books and learning materials donated to rural schools where resources are scarce — because every child deserves the tools to dream bigger.",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&q=90",
    alt: "Environment Protection",
    description:
      "Community-led clean energy and conservation initiatives help reduce carbon footprints across rural villages, protecting nature for generations to come.",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200&q=90",
    alt: "Community Gathering",
    description:
      "Neighbors unite at our annual community fair to celebrate shared progress, strengthen bonds, and plan a brighter future together.",
  },
];

export default function ImageGallery() {
  const [showGrid, setShowGrid] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const isLightboxOpen = activeIndex !== null;
  const isAnyOverlayOpen = showGrid || isLightboxOpen;

  function openGrid() { setShowGrid(true); }
  function closeAll() { setShowGrid(false); setActiveIndex(null); }
  function openLightbox(index: number) { setActiveIndex(index); }
  function closeLightbox() { setActiveIndex(null); }
  function prev() { setActiveIndex((i) => (i === null ? 0 : (i - 1 + photos.length) % photos.length)); }
  function next() { setActiveIndex((i) => (i === null ? 0 : (i + 1) % photos.length)); }

  useEffect(() => {
    if (!isAnyOverlayOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (isLightboxOpen) closeLightbox();
        else closeAll();
      }
      if (isLightboxOpen) {
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isAnyOverlayOpen, isLightboxOpen]);

  useEffect(() => {
    document.body.style.overflow = isAnyOverlayOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isAnyOverlayOpen]);

  const [large, ...small] = photos;

  return (
    <>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-(--color-secondary) mb-1">
                Moments of Change
              </p>
              <h2 className="text-3xl font-bold text-heading">
                Moments That Inspire Us
              </h2>
            </div>
            <button
              onClick={openGrid}
              className="flex items-center gap-1.5 text-primary font-semibold text-sm hover:underline mt-1 shrink-0"
            >
              View All Photos
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Gallery grid */}
          <div className="grid grid-cols-3 grid-rows-2 gap-4 h-120">
            <button
              onClick={() => openLightbox(0)}
              className="row-span-2 overflow-hidden rounded-2xl focus:outline-none group"
            >
              <img
                src={large.src}
                alt={large.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </button>
            {small.slice(0, 4).map((photo, i) => (
              <button
                key={photo.id}
                onClick={() => openLightbox(i + 1)}
                className="overflow-hidden rounded-2xl focus:outline-none group"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Grid overlay (View All Photos) ── */}
      {showGrid && !isLightboxOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-sm">
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-5 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2 text-white">
              <LayoutGrid size={20} className="text-white/60" />
              <span className="font-semibold text-lg">All Photos</span>
              <span className="text-white/40 text-sm ml-1">({photos.length})</span>
            </div>
            <button
              onClick={closeAll}
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X size={26} />
            </button>
          </div>

          {/* ── Description section ── */}
          <div className="px-8 py-5 border-b border-white/10 shrink-0">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-widest text-[#f97316] mb-2">
                Our Gallery
              </p>
              <h3 className="text-xl font-bold text-white mb-2">
                Every Picture Tells a Story of Hope
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                A glimpse into the lives we touch — from classrooms to community fields, each
                photograph captures a real moment of change. These are the faces, places, and
                stories that fuel our mission every single day. Click any photo to explore the
                story behind it.
              </p>
            </div>
          </div>

          {/* Scrollable photo grid */}
          <div className="flex-1 overflow-y-auto px-8 py-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map((photo, i) => (
                <button
                  key={photo.id}
                  onClick={() => openLightbox(i)}
                  className="group relative overflow-hidden rounded-xl aspect-square focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                  />
                  {/* Hover overlay with title */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-end p-3">
                    <span className="text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2 text-left">
                      {photo.alt}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Lightbox overlay ── */}
      {isLightboxOpen && activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-sm"
          onClick={showGrid ? closeLightbox : closeAll}
        >
          <div
            className="relative flex flex-col items-center w-full max-w-5xl px-16"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top bar */}
            <div className="w-full flex items-center justify-between mb-4">
              {showGrid ? (
                <button
                  onClick={closeLightbox}
                  className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm transition-colors"
                  aria-label="Back to grid"
                >
                  <LayoutGrid size={16} />
                  Back to grid
                </button>
              ) : (
                <span className="text-white/50 text-sm">
                  {activeIndex + 1} / {photos.length}
                </span>
              )}

              <div className="flex items-center gap-4">
                {showGrid && (
                  <span className="text-white/50 text-sm">
                    {activeIndex + 1} / {photos.length}
                  </span>
                )}
                <button
                  onClick={closeAll}
                  className="text-white/60 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X size={26} />
                </button>
              </div>
            </div>

            {/* Image + Prev/Next */}
            <div className="relative flex items-center w-full">
              {/* Prev */}
              <button
                onClick={prev}
                className="absolute left-0 z-10 flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
                aria-label="Previous photo"
              >
                <ChevronLeft size={26} />
              </button>

              {/* Image */}
              <div className="w-full overflow-hidden rounded-t-2xl shadow-2xl">
                <img
                  key={activeIndex}
                  src={photos[activeIndex].src}
                  alt={photos[activeIndex].alt}
                  className="w-full max-h-[65vh] object-contain bg-black"
                />
              </div>

              {/* Next */}
              <button
                onClick={next}
                className="absolute right-0 z-10 flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
                aria-label="Next photo"
              >
                <ChevronRight size={26} />
              </button>
            </div>

            {/* ── Description panel ── */}
            <div className="w-full bg-white/5 border border-white/10 rounded-b-2xl px-6 py-4 backdrop-blur-sm">
              <h4 className="text-white font-semibold text-base mb-1">
                {photos[activeIndex].alt}
              </h4>
              <p className="text-white/60 text-sm leading-relaxed">
                {photos[activeIndex].description}
              </p>
            </div>

            {/* Dot indicators */}
            <div className="flex gap-2 mt-5">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    i === activeIndex ? "bg-white scale-125" : "bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Go to photo ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
