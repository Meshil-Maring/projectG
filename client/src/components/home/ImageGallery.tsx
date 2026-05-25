import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, LayoutGrid, X } from "lucide-react";

const photos = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&q=90",
    alt: "Children planting trees",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=90",
    alt: "Children having a meal",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=90",
    alt: "Doctor with students",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=1200&q=90",
    alt: "Children raising hands",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&q=90",
    alt: "Volunteer distributing supplies",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200&q=90",
    alt: "Education for all",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&q=90",
    alt: "Environment protection",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200&q=90",
    alt: "Community gathering",
  },
];

export default function ImageGallery() {
  const [showGrid, setShowGrid] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const isLightboxOpen = activeIndex !== null;
  const isAnyOverlayOpen = showGrid || isLightboxOpen;

  function openGrid() {
    setShowGrid(true);
  }

  function closeAll() {
    setShowGrid(false);
    setActiveIndex(null);
  }

  function openLightbox(index: number) {
    setActiveIndex(index);
  }

  function closeLightbox() {
    setActiveIndex(null);
  }

  function prev() {
    setActiveIndex((i) => (i === null ? 0 : (i - 1 + photos.length) % photos.length));
  }

  function next() {
    setActiveIndex((i) => (i === null ? 0 : (i + 1) % photos.length));
  }

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

      {/* ── Grid overlay ── */}
      {showGrid && !isLightboxOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-sm">
          {/* Grid header */}
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
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end p-3">
                    <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
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
            className="relative flex items-center justify-center w-full max-w-5xl px-16"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top bar */}
            <div className="absolute -top-12 inset-x-0 flex items-center justify-between">
              {/* Back to grid (only if came from grid) */}
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

            {/* Prev */}
            <button
              onClick={prev}
              className="absolute left-0 flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
              aria-label="Previous photo"
            >
              <ChevronLeft size={26} />
            </button>

            {/* Image */}
            <div className="w-full overflow-hidden rounded-2xl shadow-2xl">
              <img
                key={activeIndex}
                src={photos[activeIndex].src}
                alt={photos[activeIndex].alt}
                className="w-full max-h-[80vh] object-contain bg-black"
              />
            </div>

            {/* Next */}
            <button
              onClick={next}
              className="absolute right-0 flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
              aria-label="Next photo"
            >
              <ChevronRight size={26} />
            </button>

            {/* Dot indicators */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
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
