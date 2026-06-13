import { useState } from "react";
import { ArrowLeft, Bell, Calendar, Tag, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../shared/components/Navbar";
import Footer from "../../shared/components/Footer";
import SectionNavigator from "../../shared/components/SectionNavigator";
import { useNoticeData, formatNoticeDate, type NoticeEntry, type NoticeCategory } from "../../context/NoticeContext";

const sections = [
  { id: "notice-hero", label: "Overview" },
  { id: "notice-filter", label: "Filter" },
  { id: "notice-list", label: "Notices" },
];

type Notice = NoticeEntry;

const categoryColors: Record<NoticeCategory, { bg: string; text: string }> = {
  Announcement: { bg: "#dbeafe", text: "#1d4ed8" },
  Event:        { bg: "#dcfce7", text: "#15803d" },
  Update:       { bg: "#fef9c3", text: "#a16207" },
  Reminder:     { bg: "#fce7f3", text: "#be185d" },
};

export default function NoticePage() {
  const { notices } = useNoticeData();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<NoticeCategory | "All">("All");

  const categories: Array<NoticeCategory | "All"> = [
    "All",
    "Announcement",
    "Event",
    "Update",
    "Reminder",
  ];

  const filtered =
    activeCategory === "All"
      ? notices
      : notices.filter((n) => n.category === activeCategory);

  return (
    <>
      <Navbar />
      <SectionNavigator sections={sections} />

      {/* Hero */}
      <section id="notice-hero" style={{ backgroundColor: "#1a3270", padding: "4rem 0 3rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.82rem",
              color: "rgba(255,255,255,0.65)",
              textDecoration: "none",
              marginBottom: "1.25rem",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#fff")}
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)")
            }
          >
            <ArrowLeft size={14} /> Back to Home
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <Bell size={18} color="#f59e0b" />
            <p
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#f59e0b",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Official Notices
            </p>
          </div>

          <h1
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 800,
              color: "#ffffff",
              fontFamily: "'Poppins', sans-serif",
              marginBottom: "0.75rem",
              lineHeight: 1.2,
            }}
          >
            Notices &amp; Announcements
          </h1>
          <p
            style={{
              fontSize: "0.92rem",
              color: "rgba(255,255,255,0.65)",
              maxWidth: "560px",
              lineHeight: 1.7,
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Stay up to date with the latest announcements, events, reminders, and
            updates from Project Generation.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <section id="notice-filter" style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 1.5rem",
            display: "flex",
            gap: "0.5rem",
            overflowX: "auto",
            paddingTop: "1rem",
            paddingBottom: "1rem",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "0.4rem 1rem",
                borderRadius: "9999px",
                fontSize: "0.78rem",
                fontWeight: 600,
                fontFamily: "'Poppins', sans-serif",
                cursor: "pointer",
                whiteSpace: "nowrap",
                border:
                  activeCategory === cat
                    ? "2px solid #1a3270"
                    : "2px solid #e2e8f0",
                backgroundColor: activeCategory === cat ? "#1a3270" : "#ffffff",
                color: activeCategory === cat ? "#ffffff" : "#64748b",
                transition: "all 0.15s",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Notices list */}
      <section id="notice-list" style={{ backgroundColor: "#f8fafc", padding: "2.5rem 0 4rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 1.5rem" }}>
          {filtered.length === 0 ? (
            <p style={{ textAlign: "center", color: "#94a3b8", fontFamily: "'Poppins', sans-serif" }}>
              No notices in this category.
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {filtered.map((notice) => (
                <NoticeCard
                  key={notice.id}
                  notice={notice}
                  isOpen={expandedId === notice.id}
                  onToggle={() =>
                    setExpandedId((prev) => (prev === notice.id ? null : notice.id))
                  }
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

function NoticeCard({
  notice,
  isOpen,
  onToggle,
}: {
  notice: Notice;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const cat = categoryColors[notice.category];

  return (
    <motion.div
      layout
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "0.75rem",
        border: "1px solid #e2e8f0",
        overflow: "hidden",
        boxShadow: isOpen ? "0 4px 20px rgba(0,0,0,0.08)" : "none",
        transition: "box-shadow 0.2s",
      }}
    >
      {/* Header row */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`notice-panel-${notice.id}`}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "flex-start",
          gap: "1rem",
          padding: "1.25rem 1.5rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        {/* Category badge */}
        <span
          style={{
            display: "inline-block",
            padding: "0.2rem 0.65rem",
            borderRadius: "9999px",
            fontSize: "0.68rem",
            fontWeight: 700,
            fontFamily: "'Poppins', sans-serif",
            backgroundColor: cat.bg,
            color: cat.text,
            whiteSpace: "nowrap",
            flexShrink: 0,
            marginTop: "0.15rem",
          }}
        >
          <Tag size={9} style={{ display: "inline", marginRight: "0.3rem", verticalAlign: "middle" }} />
          {notice.category}
        </span>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontSize: "0.95rem",
              fontWeight: 700,
              color: "#1e293b",
              fontFamily: "'Poppins', sans-serif",
              marginBottom: "0.3rem",
              lineHeight: 1.4,
            }}
          >
            {notice.title}
          </p>
          <p style={{ fontSize: "0.78rem", color: "#94a3b8", fontFamily: "'Poppins', sans-serif" }}>
            <Calendar size={11} style={{ display: "inline", marginRight: "0.3rem", verticalAlign: "middle" }} />
            {formatNoticeDate(notice.date)}
          </p>
          {!isOpen && (
            <p
              style={{
                fontSize: "0.82rem",
                color: "#64748b",
                marginTop: "0.4rem",
                fontFamily: "'Poppins', sans-serif",
                lineHeight: 1.6,
              }}
            >
              {notice.summary}
            </p>
          )}
        </div>

        {/* Chevron */}
        <span style={{ color: "#94a3b8", flexShrink: 0, marginTop: "0.1rem" }}>
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </button>

      {/* Expanded body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="body"
            id={`notice-panel-${notice.id}`}
            role="region"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" as const }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                padding: "0 1.5rem 1.5rem 1.5rem",
                borderTop: "1px solid #f1f5f9",
                paddingTop: "1rem",
              }}
            >
              <p
                style={{
                  fontSize: "0.88rem",
                  color: "#475569",
                  fontFamily: "'Poppins', sans-serif",
                  lineHeight: 1.75,
                }}
              >
                {notice.body}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
