import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, ChevronLeft, ChevronRight, ZoomIn, Images } from "lucide-react";
import type { GalleryGroup, GalleryImage } from "../../../lib/api";

const PREVIEW_COUNT = 6;
const DESCRIPTION_LIMIT = 150;

function formatImageTitle(name: string): string {
  return name.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: "easeOut" as const },
});

// ── Lightbox ──────────────────────────────────────────────────────────────────

function Lightbox({
  images, index, onClose, primary,
}: {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  primary: string;
}) {
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
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose, prev, next]);

  if (!photo) return null;

  return (
    <motion.div
      key="lightbox-backdrop"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}
      onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.92)", display: "flex", flexDirection: "column" as const, overflow: "hidden" }}
    >
      {/* Top bar: counter + close */}
      <div onClick={(e) => e.stopPropagation()} style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "0.9rem 1.5rem", position: "relative" as const }}>
        <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "rgba(255,255,255,0.6)", letterSpacing: "0.08em" }}>{current + 1} / {images.length}</div>
        <button onClick={onClose} style={{ position: "absolute" as const, right: "1.25rem", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", width: "42px", height: "42px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }} aria-label="Close preview">
          <X size={20} />
        </button>
      </div>

      {/* Scrollable image + description */}
      <div onClick={(e) => e.stopPropagation()} style={{ flex: 1, overflowY: "auto" as const, display: "flex", flexDirection: "column" as const, alignItems: "center", padding: "0 0 1rem" }}>
        {/* Image row with inline nav arrows */}
        <div style={{ display: "flex", alignItems: "center", width: "100%", maxWidth: "min(92vw, 1100px)", padding: "0 0.75rem", gap: "0.5rem" }}>
          <button onClick={prev} disabled={current === 0} style={{ flexShrink: 0, background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", width: "46px", height: "46px", cursor: current === 0 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", opacity: current === 0 ? 0.3 : 1 }} aria-label="Previous image">
            <ChevronLeft size={24} />
          </button>
          <motion.div key={current} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.2 }} style={{ flex: 1, display: "flex", justifyContent: "center" as const }}>
            <img src={photo.url} alt={formatImageTitle(photo.name)} style={{ maxWidth: "100%", maxHeight: "65vh", objectFit: "contain" as const, borderRadius: "0.75rem", boxShadow: "0 24px 64px rgba(0,0,0,0.5)" }} />
          </motion.div>
          <button onClick={next} disabled={current === images.length - 1} style={{ flexShrink: 0, background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", width: "46px", height: "46px", cursor: current === images.length - 1 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", opacity: current === images.length - 1 ? 0.3 : 1 }} aria-label="Next image">
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Title + description */}
        <div style={{ textAlign: "center" as const, marginTop: "1.25rem", padding: "0 1.5rem", maxWidth: "min(90vw, 800px)", width: "100%" }}>
          <div style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", marginBottom: photo.description ? "0.5rem" : 0 }}>{formatImageTitle(photo.name)}</div>
          {photo.description && <div style={{ fontSize: "0.84rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>{photo.description}</div>}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div onClick={(e) => e.stopPropagation()} style={{ flexShrink: 0, display: "flex", gap: "0.5rem", overflowX: "auto" as const, maxWidth: "90vw", padding: "0.75rem 1rem", alignSelf: "center" as const }}>
          {images.map((img, idx) => (
            <button key={idx} onClick={() => setCurrent(idx)} style={{ flexShrink: 0, width: "56px", height: "40px", borderRadius: "6px", overflow: "hidden", border: idx === current ? `2px solid ${primary}` : "2px solid transparent", cursor: "pointer", padding: 0, background: "transparent", opacity: idx === current ? 1 : 0.5 }} aria-label={`Go to image ${idx + 1}`}>
              <img src={img.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" as const }} />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ── Group gallery section ─────────────────────────────────────────────────────

function GroupGallery({
  group, primary, lightBg,
}: {
  group: GalleryGroup;
  primary: string;
  lightBg: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const accent = group.themeColor || primary;
  const accentBg = group.themeColor ? `${group.themeColor}18` : lightBg;

  const desc = group.description ?? "";
  const descTruncated = desc.length > DESCRIPTION_LIMIT && !descExpanded;
  const descText = descTruncated ? desc.slice(0, DESCRIPTION_LIMIT).trimEnd() + "…" : desc;

  const displayed = expanded ? group.images : group.images.slice(0, PREVIEW_COUNT);
  const remaining = group.images.length - PREVIEW_COUNT;

  return (
    <motion.div {...fade(0.1)} style={{ marginBottom: "3.5rem" }}>
      {/* Group heading */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: (desc || group.theme) ? "0.75rem" : "1.25rem" }}>
        <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: accentBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Images size={16} color={accent} strokeWidth={1.7} />
        </div>
        <div>
          {group.theme && (
            <span style={{ display: "inline-block", fontSize: "0.64rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: accent, background: accentBg, borderRadius: "4px", padding: "2px 7px", marginBottom: "0.3rem" }}>
              {group.theme}
            </span>
          )}
          <h3 style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", fontWeight: 800, color: "#0f172a", marginBottom: 0 }}>{group.name}</h3>
          <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>{group.images.length} photo{group.images.length !== 1 ? "s" : ""}</span>
        </div>
        <div style={{ flex: 1, height: "1px", background: accentBg }} />
      </div>

      {/* Group description */}
      {desc && (
        <div style={{ marginBottom: "1.25rem", paddingLeft: "44px" }}>
          <span style={{ fontSize: "0.86rem", color: "#475569", lineHeight: 1.7 }}>{descText}</span>
          {desc.length > DESCRIPTION_LIMIT && (
            <button onClick={() => setDescExpanded((v) => !v)} style={{ marginLeft: "0.4rem", background: "none", border: "none", color: primary, fontSize: "0.82rem", fontWeight: 700, cursor: "pointer", padding: 0, textDecoration: "underline" }}>
              {descExpanded ? "Show less" : "Read more"}
            </button>
          )}
        </div>
      )}

      {/* Photo grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1.25rem" }}>
        {displayed.map((img, i) => (
          <motion.div
            key={img.id}
            {...fade(0.04 + i * 0.04)}
            whileHover={{ y: -4, boxShadow: `0 12px 28px ${accent}20` }}
            onClick={() => setLightboxIndex(i)}
            style={{ background: "#fff", borderRadius: "1rem", overflow: "hidden", border: `1px solid ${accentBg}`, boxShadow: `0 2px 12px ${accent}12`, cursor: "pointer" }}
          >
            <div style={{ position: "relative" as const, paddingTop: "62%", background: accentBg, overflow: "hidden" }}>
              <img src={img.url} alt={formatImageTitle(img.name)} loading="lazy"
                style={{ position: "absolute" as const, inset: 0, width: "100%", height: "100%", objectFit: "cover" as const, transition: "transform 0.35s ease" }}
                onMouseEnter={(e) => { (e.target as HTMLImageElement).style.transform = "scale(1.05)"; }}
                onMouseLeave={(e) => { (e.target as HTMLImageElement).style.transform = "scale(1)"; }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              <div style={{ position: "absolute" as const, top: "0.6rem", right: "0.6rem", background: "rgba(0,0,0,0.45)", borderRadius: "6px", padding: "4px 6px", display: "flex", alignItems: "center", opacity: 0.75 }}>
                <ZoomIn size={13} color="#fff" />
              </div>
            </div>
            <div style={{ padding: "0.85rem 1rem 1rem" }}>
              <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#0f172a", marginBottom: img.description ? "0.3rem" : 0 }}>{formatImageTitle(img.name)}</div>
              {img.description && <div style={{ fontSize: "0.74rem", color: "#64748b", lineHeight: 1.6 }}>{img.description}</div>}
            </div>
          </motion.div>
        ))}

        {/* "+N more" tile */}
        {!expanded && remaining > 0 && (
          <motion.button
            {...fade(0.04 + PREVIEW_COUNT * 0.04)}
            onClick={() => setExpanded(true)}
            style={{ background: accentBg, borderRadius: "1rem", overflow: "hidden", border: `1.5px dashed ${accent}`, cursor: "pointer", display: "flex", flexDirection: "column" as const, alignItems: "center", justifyContent: "center", gap: "0.5rem", minHeight: "180px", padding: "1.5rem" }}
            whileHover={{ opacity: 0.85 }}
          >
            <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: `${accent}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Images size={20} color={accent} />
            </div>
            <div style={{ textAlign: "center" as const }}>
              <div style={{ fontSize: "1.1rem", fontWeight: 800, color: accent }}>+{remaining} more</div>
              <div style={{ fontSize: "0.73rem", color: "#64748b", marginTop: "0.2rem" }}>Click to view all photos</div>
            </div>
          </motion.button>
        )}
      </div>

      {/* Show less */}
      {expanded && remaining > 0 && (
        <div style={{ textAlign: "center" as const, marginTop: "1.5rem" }}>
          <button onClick={() => setExpanded(false)} style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.55rem 1.4rem", background: "transparent", border: `1.5px solid ${accent}`, borderRadius: "999px", color: accent, fontSize: "0.82rem", fontWeight: 600, cursor: "pointer" }}>
            Show less
          </button>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox images={group.images} index={lightboxIndex} onClose={() => setLightboxIndex(null)} primary={accent} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main exported component ────────────────────────────────────────────────────

export interface GroupImageGalleryProps {
  primaryColor: string;
  lightBg: string;
  sectionBg?: string;
  eyebrow: string;
  title: string;
  description: string;
  groups: GalleryGroup[];
  loading: boolean;
}

export function GroupImageGallery({
  primaryColor,
  lightBg,
  sectionBg = "#ffffff",
  eyebrow,
  title,
  description,
  groups,
  loading,
}: GroupImageGalleryProps) {
  const totalPhotos = groups.reduce((n, g) => n + g.images.length, 0);

  return (
    <section style={{ background: sectionBg, padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* Section header */}
        <motion.div {...fade(0)} style={{ marginBottom: "3rem" }}>
          <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: primaryColor, display: "block", marginBottom: "0.5rem" }}>{eyebrow}</span>
          <div style={{ width: "40px", height: "3px", background: primaryColor, borderRadius: "2px", marginBottom: "1rem" }} />
          <h2 style={{ fontSize: "clamp(1.4rem, 2.8vw, 2rem)", fontWeight: 800, color: "#0f172a", lineHeight: 1.2, marginBottom: "0.75rem" }}>{title}</h2>
          <p style={{ fontSize: "0.93rem", color: "#475569", maxWidth: "600px", lineHeight: 1.75 }}>{description}</p>
        </motion.div>

        {/* Loading skeleton */}
        {loading && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1.25rem" }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{ borderRadius: "1rem", overflow: "hidden", border: `1px solid ${lightBg}`, background: lightBg }}>
                <div style={{ paddingTop: "62%" }} />
                <div style={{ padding: "0.85rem 1rem" }}>
                  <div style={{ height: "13px", background: `${primaryColor}22`, borderRadius: "6px", marginBottom: "0.5rem", width: "55%" }} />
                  <div style={{ height: "10px", background: `${primaryColor}22`, borderRadius: "6px", width: "85%" }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && totalPhotos === 0 && (
          <div style={{ textAlign: "center" as const, padding: "3rem 1rem", color: "#94a3b8" }}>
            <Camera size={36} strokeWidth={1.3} style={{ opacity: 0.35, marginBottom: "0.75rem" }} />
            <p style={{ fontSize: "0.88rem" }}>No photos uploaded yet.</p>
          </div>
        )}

        {/* Groups */}
        {!loading && groups.map((group) =>
          group.images.length > 0 ? (
            <GroupGallery key={group.id} group={group} primary={primaryColor} lightBg={lightBg} />
          ) : null,
        )}
      </div>
    </section>
  );
}
