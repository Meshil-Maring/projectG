import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface LightboxImage {
  url: string;
  title?: string;
  description?: string;
}

interface LightboxProps {
  images: LightboxImage[];
  index: number;
  onClose: () => void;
  accentColor?: string;
}

export function Lightbox({ images, index, onClose, accentColor = "#3b82f6" }: LightboxProps) {
  const [current, setCurrent] = useState(index);
  const photo = images[current];

  const prev = useCallback(() => setCurrent((i) => Math.max(0, i - 1)), []);
  const next = useCallback(() => setCurrent((i) => Math.min(images.length - 1, i + 1)), [images.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  if (!photo) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "#000",
        display: "flex", flexDirection: "column" as const,
        overflow: "hidden",
      }}
    >
      {/* Counter — top center gradient overlay */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "absolute" as const, top: 0, left: 0, right: 0, zIndex: 10,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "1.1rem 5rem",
          background: "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      >
        <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "rgba(255,255,255,0.75)", letterSpacing: "0.08em" }}>
          {current + 1} / {images.length}
        </span>
      </div>

      {/* Close button — top right */}
      <button
        onClick={onClose}
        style={{
          position: "absolute" as const, top: "1rem", right: "1.25rem", zIndex: 11,
          background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "50%", width: "44px", height: "44px",
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", transition: "background 0.2s",
        }}
        aria-label="Close preview"
      >
        <X size={20} />
      </button>

      {/* Full-screen image area */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          flex: 1,
          position: "relative" as const,
          display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden",
          minHeight: 0,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={photo.url}
            alt={photo.title || `Photo ${current + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            style={{ width: "100%", height: "100%", objectFit: "contain" as const }}
          />
        </AnimatePresence>

        {/* Prev */}
        <button
          onClick={prev}
          disabled={current === 0}
          aria-label="Previous image"
          style={{
            position: "absolute" as const, left: "1.25rem", top: "50%", transform: "translateY(-50%)",
            background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "50%", width: "48px", height: "48px",
            cursor: current === 0 ? "default" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", opacity: current === 0 ? 0.25 : 1,
            transition: "opacity 0.2s, background 0.2s",
          }}
        >
          <ChevronLeft size={24} />
        </button>

        {/* Next */}
        <button
          onClick={next}
          disabled={current === images.length - 1}
          aria-label="Next image"
          style={{
            position: "absolute" as const, right: "1.25rem", top: "50%", transform: "translateY(-50%)",
            background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "50%", width: "48px", height: "48px",
            cursor: current === images.length - 1 ? "default" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", opacity: current === images.length - 1 ? 0.25 : 1,
            transition: "opacity 0.2s, background 0.2s",
          }}
        >
          <ChevronRight size={24} />
        </button>

      </div>

      {/* Title + description panel */}
      {(photo.title || photo.description) && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            flexShrink: 0,
            background: "rgba(15,15,15,0.97)",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            padding: "0.75rem 1.5rem",
            maxHeight: "120px",
            overflowY: "auto" as const,
          }}
        >
          {photo.title && (
            <div style={{
              fontSize: "0.9rem", fontWeight: 700, color: "#fff",
              marginBottom: photo.description ? "0.3rem" : 0,
              letterSpacing: "0.01em",
            }}>
              {photo.title}
            </div>
          )}
          {photo.description && (
            <div style={{
              fontSize: "0.78rem", color: "rgba(255,255,255,0.65)",
              lineHeight: 1.6,
            }}>
              {photo.description}
            </div>
          )}
        </div>
      )}

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            flexShrink: 0,
            display: "flex", gap: "0.5rem",
            overflowX: "auto" as const,
            padding: "0.75rem 1rem",
            background: "rgba(0,0,0,0.65)",
            justifyContent: "center",
          }}
        >
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              style={{
                flexShrink: 0, width: "56px", height: "40px",
                borderRadius: "6px", overflow: "hidden",
                border: idx === current ? `2px solid ${accentColor}` : "2px solid transparent",
                cursor: "pointer", padding: 0, background: "transparent",
                opacity: idx === current ? 1 : 0.5,
                transition: "opacity 0.2s, border-color 0.2s",
              }}
              aria-label={`Go to image ${idx + 1}`}
            >
              <img src={img.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" as const }} />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}
