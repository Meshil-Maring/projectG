import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Calendar, MapPin, Users, Droplets, Award, Camera, X, ChevronLeft, ChevronRight, ZoomIn, Images } from "lucide-react";
import { PRIMARY, SECONDARY, ACCENT, LIGHT_BG, fade } from "./whg.constants";
import { fetchWhgGroups, type WhgGroup, type WhgGalleryImage } from "../../../lib/api";

const PREVIEW_COUNT = 6;

function formatImageTitle(name: string): string {
  return name.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

const highlights = [
  { icon: Droplets, title: "Voluntary Donation", desc: "Every drop given freely saves a life in need." },
  { icon: Heart,    title: "State Support",      desc: "Backed by STATE BLOOD CELL – NHM Manipur." },
  { icon: Users,    title: "Community Drive",    desc: "Volunteers from across the region came together." },
  { icon: Award,    title: "Honouring Heroes",   desc: "Dedicated to the heroes preserving Manipur's integrity." },
];

// ── Lightbox ──────────────────────────────────────────────────────────────────

function Lightbox({
  images, index, onClose,
}: {
  images: WhgGalleryImage[];
  index: number;
  onClose: () => void;
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
      style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.92)", display: "flex", flexDirection: "column" as const, alignItems: "center", justifyContent: "center" }}
    >
      {/* Close */}
      <button onClick={onClose} style={{ position: "absolute", top: "1.25rem", right: "1.25rem", background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", width: "42px", height: "42px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }} aria-label="Close preview">
        <X size={20} />
      </button>
      {/* Counter */}
      <div style={{ position: "absolute", top: "1.35rem", left: "50%", transform: "translateX(-50%)", fontSize: "0.78rem", fontWeight: 600, color: "rgba(255,255,255,0.6)", letterSpacing: "0.08em" }}>
        {current + 1} / {images.length}
      </div>
      {/* Prev */}
      <button onClick={(e) => { e.stopPropagation(); prev(); }} disabled={current === 0} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", width: "46px", height: "46px", cursor: current === 0 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", opacity: current === 0 ? 0.3 : 1 }} aria-label="Previous image">
        <ChevronLeft size={24} />
      </button>
      {/* Next */}
      <button onClick={(e) => { e.stopPropagation(); next(); }} disabled={current === images.length - 1} style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", width: "46px", height: "46px", cursor: current === images.length - 1 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", opacity: current === images.length - 1 ? 0.3 : 1 }} aria-label="Next image">
        <ChevronRight size={24} />
      </button>
      {/* Image */}
      <motion.div key={current} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.2 }} onClick={(e) => e.stopPropagation()} style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", maxWidth: "min(90vw, 1000px)", width: "100%", padding: "0 4rem" }}>
        <img src={photo.url} alt={formatImageTitle(photo.name)} style={{ maxWidth: "100%", maxHeight: "72vh", objectFit: "contain" as const, borderRadius: "0.75rem", boxShadow: "0 24px 64px rgba(0,0,0,0.5)" }} />
        <div style={{ textAlign: "center" as const, marginTop: "1.25rem", padding: "0 1rem" }}>
          <div style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", marginBottom: photo.description ? "0.4rem" : 0 }}>{formatImageTitle(photo.name)}</div>
          {photo.description && <div style={{ fontSize: "0.84rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.65 }}>{photo.description}</div>}
        </div>
      </motion.div>
      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div onClick={(e) => e.stopPropagation()} style={{ position: "absolute", bottom: "1.5rem", display: "flex", gap: "0.5rem", overflowX: "auto" as const, maxWidth: "90vw", padding: "0 1rem" }}>
          {images.map((img, idx) => (
            <button key={idx} onClick={() => setCurrent(idx)} style={{ flexShrink: 0, width: "56px", height: "40px", borderRadius: "6px", overflow: "hidden", border: idx === current ? `2px solid ${PRIMARY}` : "2px solid transparent", cursor: "pointer", padding: 0, background: "transparent", opacity: idx === current ? 1 : 0.5 }} aria-label={`Go to image ${idx + 1}`}>
              <img src={img.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" as const }} />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ── Group gallery section ─────────────────────────────────────────────────────

const DESCRIPTION_LIMIT = 150;

function GroupGallery({ group }: { group: WhgGroup }) {
  const [expanded, setExpanded] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const desc = group.description ?? "";
  const descTruncated = desc.length > DESCRIPTION_LIMIT && !descExpanded;
  const descText = descTruncated ? desc.slice(0, DESCRIPTION_LIMIT).trimEnd() + "…" : desc;

  const displayed = expanded ? group.images : group.images.slice(0, PREVIEW_COUNT);
  const remaining = group.images.length - PREVIEW_COUNT;

  return (
    <motion.div {...fade(0.1)} style={{ marginBottom: "3.5rem" }}>
      {/* Group heading */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: desc ? "0.75rem" : "1.25rem" }}>
        <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: LIGHT_BG, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Images size={16} color={PRIMARY} strokeWidth={1.7} />
        </div>
        <div>
          <h3 style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", fontWeight: 800, color: "#0f172a", marginBottom: 0 }}>{group.name}</h3>
          <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>{group.images.length} photo{group.images.length !== 1 ? "s" : ""}</span>
        </div>
        <div style={{ flex: 1, height: "1px", background: "#fde8da" }} />
      </div>

      {/* Group description */}
      {desc && (
        <div style={{ marginBottom: "1.25rem", paddingLeft: "44px" }}>
          <span style={{ fontSize: "0.86rem", color: "#475569", lineHeight: 1.7 }}>{descText}</span>
          {desc.length > DESCRIPTION_LIMIT && (
            <button
              onClick={() => setDescExpanded((v) => !v)}
              style={{ marginLeft: "0.4rem", background: "none", border: "none", color: PRIMARY, fontSize: "0.82rem", fontWeight: 700, cursor: "pointer", padding: 0, textDecoration: "underline" }}
            >
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
            whileHover={{ y: -4, boxShadow: "0 12px 28px rgba(194,65,12,0.12)" }}
            onClick={() => setLightboxIndex(i)}
            style={{ background: "#fff", borderRadius: "1rem", overflow: "hidden", border: "1px solid #fde8da", boxShadow: "0 2px 12px rgba(194,65,12,0.07)", cursor: "pointer" }}
          >
            <div style={{ position: "relative" as const, paddingTop: "62%", background: LIGHT_BG, overflow: "hidden" }}>
              <img src={img.url} alt={formatImageTitle(img.name)} loading="lazy" style={{ position: "absolute" as const, inset: 0, width: "100%", height: "100%", objectFit: "cover" as const, transition: "transform 0.35s ease" }}
                onMouseEnter={(e) => { (e.target as HTMLImageElement).style.transform = "scale(1.05)"; }}
                onMouseLeave={(e) => { (e.target as HTMLImageElement).style.transform = "scale(1)"; }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              <div style={{ position: "absolute" as const, top: "0.6rem", right: "0.6rem", background: "rgba(0,0,0,0.45)", borderRadius: "6px", padding: "4px 6px", display: "flex", alignItems: "center", gap: "4px", opacity: 0.75 }}>
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
            style={{ background: LIGHT_BG, borderRadius: "1rem", overflow: "hidden", border: `1.5px dashed ${PRIMARY}`, cursor: "pointer", display: "flex", flexDirection: "column" as const, alignItems: "center", justifyContent: "center", gap: "0.5rem", minHeight: "180px", padding: "1.5rem" }}
            whileHover={{ backgroundColor: "#fde8da" }}
          >
            <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: `${PRIMARY}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Images size={20} color={PRIMARY} />
            </div>
            <div style={{ textAlign: "center" as const }}>
              <div style={{ fontSize: "1.1rem", fontWeight: 800, color: PRIMARY }}>+{remaining} more</div>
              <div style={{ fontSize: "0.73rem", color: "#64748b", marginTop: "0.2rem" }}>Click to view all photos</div>
            </div>
          </motion.button>
        )}
      </div>

      {/* Show less */}
      {expanded && remaining > 0 && (
        <div style={{ textAlign: "center" as const, marginTop: "1.5rem" }}>
          <button onClick={() => setExpanded(false)} style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.55rem 1.4rem", background: "transparent", border: `1.5px solid ${PRIMARY}`, borderRadius: "999px", color: PRIMARY, fontSize: "0.82rem", fontWeight: 600, cursor: "pointer" }}>
            Show less
          </button>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={group.images}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function WhgBloodDonation() {
  const [groups, setGroups] = useState<WhgGroup[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(true);

  useEffect(() => {
    fetchWhgGroups()
      .then(setGroups)
      .catch(() => setGroups([]))
      .finally(() => setLoadingPhotos(false));
  }, []);

  const totalPhotos = groups.reduce((n, g) => n + g.images.length, 0);

  return (
    <section style={{ background: "#fff8f4", padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* Section header */}
        <motion.div {...fade(0)} style={{ marginBottom: "3rem" }}>
          <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: PRIMARY, display: "block", marginBottom: "0.5rem" }}>Campaigns &amp; Events</span>
          <div style={{ width: "40px", height: "3px", background: PRIMARY, borderRadius: "2px", marginBottom: "1rem" }} />
          <h2 style={{ fontSize: "clamp(1.4rem, 2.8vw, 2rem)", fontWeight: 800, color: "#0f172a", lineHeight: 1.2, marginBottom: "0.75rem" }}>Voluntary Blood Donation Camp &amp; Campaign</h2>
          <p style={{ fontSize: "0.93rem", color: "#475569", maxWidth: "600px", lineHeight: 1.75 }}>Project "G" organised a voluntary blood donation drive at the Department of Transfusion Medicine, RIMS — bringing the community together in solidarity and service.</p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", marginBottom: "3.5rem" }}>
          {/* Event Details Card */}
          <motion.div {...fade(0.08)} style={{ background: "#ffffff", borderRadius: "1.25rem", border: "1px solid #fde8da", boxShadow: "0 4px 20px rgba(194,65,12,0.08)", overflow: "hidden" }}>
            <div style={{ background: `linear-gradient(120deg, ${ACCENT} 0%, ${PRIMARY} 60%, ${SECONDARY} 120%)`, padding: "1.75rem 1.75rem 1.5rem", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: "-50px", right: "-50px", width: "160px", height: "160px", borderRadius: "50%", background: "rgba(255,255,255,0.07)", pointerEvents: "none" }} />
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem" }}>
                <Heart size={18} color="#fff" fill="rgba(255,255,255,0.85)" />
                <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.85)" }}>Event Spotlight</span>
              </div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#ffffff", lineHeight: 1.3, position: "relative" }}>Voluntary Blood Donation<br />Camp &amp; Campaign</h3>
            </div>
            <div style={{ padding: "1.5rem 1.75rem" }}>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: "1rem" }}>
                {[
                  { Icon: Calendar, label: "Date",         value: "28th February, 2024 — Wednesday" },
                  { Icon: MapPin,   label: "Venue",        value: "Department of Transfusion Medicine, RIMS" },
                  { Icon: Users,    label: "Supported By", value: "State Blood Cell – NHM Manipur" },
                ].map(({ Icon, label, value }) => (
                  <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "9px", background: LIGHT_BG, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={16} color={PRIMARY} strokeWidth={1.7} />
                    </div>
                    <div>
                      <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "#94a3b8", textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: "0.15rem" }}>{label}</div>
                      <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0f172a" }}>{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Theme Quote Card */}
          <motion.div {...fade(0.12)} style={{ background: "#ffffff", borderRadius: "1.25rem", border: "1px solid #fde8da", boxShadow: "0 4px 20px rgba(194,65,12,0.08)", padding: "2rem 1.75rem", display: "flex", flexDirection: "column" as const, justifyContent: "center" }}>
            <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: PRIMARY, marginBottom: "1rem", display: "block" }}>Theme</span>
            <div style={{ borderLeft: `3px solid ${PRIMARY}`, paddingLeft: "1.25rem", marginBottom: "1.5rem" }}>
              <p style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)", color: "#1e293b", lineHeight: 1.7, fontWeight: 400 }}>
                "Honouring the heroes of Manipur who are trying to save our state integrity."
              </p>
            </div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: LIGHT_BG, borderRadius: "0.5rem", padding: "0.6rem 1rem" }}>
              <Heart size={13} color={PRIMARY} fill={PRIMARY} />
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: PRIMARY }}>Organised by WHG · Project "G"</span>
            </div>
            <p style={{ fontSize: "0.74rem", color: "#94a3b8", marginTop: "0.65rem", fontStyle: "italic" }}>Motto: Learn Serve &amp; Transform</p>
          </motion.div>
        </div>

        {/* Highlights grid */}
        <motion.div {...fade(0.05)} style={{ marginBottom: "0.5rem" }}>
          <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: PRIMARY, display: "block", marginBottom: "0.5rem" }}>Why It Matters</span>
          <div style={{ width: "40px", height: "3px", background: PRIMARY, borderRadius: "2px", marginBottom: "1.5rem" }} />
        </motion.div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "4.5rem" }}>
          {highlights.map(({ icon: Icon, title, desc }, i) => (
            <motion.div key={title} {...fade(0.08 + i * 0.06)} whileHover={{ y: -4, boxShadow: "0 12px 28px rgba(194,65,12,0.13)" }} style={{ background: "#ffffff", borderRadius: "1rem", padding: "1.4rem 1.25rem", border: "1px solid #fde8da", boxShadow: "0 2px 8px rgba(194,65,12,0.05)" }}>
              <div style={{ width: "42px", height: "42px", borderRadius: "11px", background: LIGHT_BG, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.9rem" }}>
                <Icon size={19} color={PRIMARY} strokeWidth={1.6} />
              </div>
              <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.35rem" }}>{title}</div>
              <div style={{ fontSize: "0.76rem", color: "#64748b", lineHeight: 1.6 }}>{desc}</div>
            </motion.div>
          ))}
        </div>

        {/* ── Event Photo Gallery ── */}
        <motion.div {...fade(0.1)}>
          <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: PRIMARY, display: "block", marginBottom: "0.5rem" }}>Event Gallery</span>
          <div style={{ width: "40px", height: "3px", background: PRIMARY, borderRadius: "2px", marginBottom: "1rem" }} />
          <h2 style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)", fontWeight: 800, color: "#0f172a", marginBottom: "2.5rem", lineHeight: 1.2 }}>Campaign Photos</h2>

          {/* Loading skeleton */}
          {loadingPhotos && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1.25rem" }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} style={{ borderRadius: "1rem", overflow: "hidden", border: "1px solid #fde8da", background: LIGHT_BG }}>
                  <div style={{ paddingTop: "62%", background: "#fde8da" }} />
                  <div style={{ padding: "0.85rem 1rem" }}>
                    <div style={{ height: "13px", background: "#fde8da", borderRadius: "6px", marginBottom: "0.5rem", width: "55%" }} />
                    <div style={{ height: "10px", background: "#fde8da", borderRadius: "6px", width: "85%" }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loadingPhotos && totalPhotos === 0 && (
            <div style={{ textAlign: "center" as const, padding: "3rem 1rem", color: "#94a3b8" }}>
              <Camera size={36} strokeWidth={1.3} style={{ opacity: 0.35, marginBottom: "0.75rem" }} />
              <p style={{ fontSize: "0.88rem" }}>No photos uploaded yet.</p>
            </div>
          )}

          {/* Groups */}
          {!loadingPhotos && groups.map((group) =>
            group.images.length > 0 ? <GroupGallery key={group.id} group={group} /> : null,
          )}
        </motion.div>

      </div>
    </section>
  );
}
