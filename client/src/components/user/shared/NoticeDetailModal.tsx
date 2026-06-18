import { useEffect } from "react";
import { X, Calendar, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatNoticeDate, type NoticeEntry, type NoticeCategory } from "../../../context/NoticeContext";

const categoryColors: Record<NoticeCategory, { bg: string; text: string }> = {
  Announcement: { bg: "#dbeafe", text: "#1d4ed8" },
  Event:        { bg: "#dcfce7", text: "#15803d" },
  Update:       { bg: "#fef9c3", text: "#a16207" },
  Reminder:     { bg: "#fce7f3", text: "#be185d" },
};

export function NoticeDetailModal({ notice, onClose }: { notice: NoticeEntry; onClose: () => void }) {
  const cat = categoryColors[notice.category];

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(10,20,50,0.65)",
          backdropFilter: "blur(5px)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
        }}
      >
        <motion.div
          key="panel"
          initial={{ opacity: 0, y: 36, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.97 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] as const }}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "relative",
            backgroundColor: "#ffffff",
            borderRadius: "1.125rem",
            width: "100%",
            maxWidth: "660px",
            maxHeight: "90vh",
            overflowY: "auto",
            boxShadow: "0 28px 72px rgba(0,0,0,0.24)",
          }}
        >
          {/* Close button — always top-right corner */}
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              position: "absolute",
              top: "0.85rem",
              right: "0.85rem",
              zIndex: 10,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              border: "1.5px solid #e2e8f0",
              background: "#ffffff",
              cursor: "pointer",
              color: "#64748b",
              boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
            }}
          >
            <X size={15} />
          </button>

          {/* Full image */}
          {notice.imageUrl && (
            <div style={{ width: "100%", overflow: "hidden", borderRadius: "1.125rem 1.125rem 0 0" }}>
              <img
                src={notice.imageUrl}
                alt={notice.title}
                style={{ width: "100%", maxHeight: "360px", objectFit: "cover", display: "block" }}
              />
            </div>
          )}

          {/* Body */}
          <div style={{ padding: "1.75rem 2rem 2rem" }}>

            {/* Category + date */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  padding: "0.22rem 0.72rem",
                  borderRadius: "9999px",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  fontFamily: "'Poppins', sans-serif",
                  backgroundColor: cat.bg,
                  color: cat.text,
                }}
              >
                <Tag size={10} />
                {notice.category}
              </span>
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "#94a3b8",
                  fontFamily: "'Poppins', sans-serif",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.3rem",
                }}
              >
                <Calendar size={12} />
                {formatNoticeDate(notice.date)}
              </span>
            </div>

            {/* Title */}
            <h2
              style={{
                fontSize: "clamp(1.1rem, 3vw, 1.45rem)",
                fontWeight: 800,
                color: "#1e293b",
                fontFamily: "'Poppins', sans-serif",
                lineHeight: 1.3,
                marginBottom: "0.9rem",
              }}
            >
              {notice.title}
            </h2>

            {/* Summary */}
            {notice.summary && (
              <p
                style={{
                  fontSize: "0.88rem",
                  color: "#475569",
                  fontFamily: "'Poppins', sans-serif",
                  lineHeight: 1.7,
                  marginBottom: "1.1rem",
                  fontStyle: "italic",
                  borderLeft: "3px solid #dde6f7",
                  paddingLeft: "0.85rem",
                }}
              >
                {notice.summary}
              </p>
            )}

            {/* Full body */}
            <p
              style={{
                fontSize: "0.9rem",
                color: "#374151",
                fontFamily: "'Poppins', sans-serif",
                lineHeight: 1.85,
                whiteSpace: "pre-line",
              }}
            >
              {notice.body}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
