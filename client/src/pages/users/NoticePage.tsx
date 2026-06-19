import { useState } from "react";
import { Bell, Calendar, Tag } from "lucide-react";
import { motion } from "framer-motion";
import SEO from "../../shared/components/SEO";
import Navbar from "../../shared/components/Navbar";
import Footer from "../../shared/components/Footer";
import SectionNavigator from "../../shared/components/SectionNavigator";
import { useNoticeData, formatNoticeDate, type NoticeEntry, type NoticeCategory } from "../../context/NoticeContext";
import { NoticeDetailModal } from "../../components/user/shared/NoticeDetailModal";

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
  const [selectedNotice, setSelectedNotice] = useState<NoticeEntry | null>(null);
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
      <SEO
        title="Notices & Events"
        description="Stay updated with the latest notices, announcements, and upcoming events from Project G Manipur."
      />
      <Navbar />
      <SectionNavigator sections={sections} />

      {/* Hero */}
      <section id="notice-hero" style={{ backgroundColor: "#1a3270", padding: "4rem 0 3rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
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
      <section id="notice-list" style={{ backgroundColor: "#f8fafc", padding: "2.5rem 0 4rem", minHeight: "calc(100vh - 280px)" }}>
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
                  onOpen={() => setSelectedNotice(notice)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />

      {selectedNotice && (
        <NoticeDetailModal notice={selectedNotice} onClose={() => setSelectedNotice(null)} />
      )}
    </>
  );
}

function NoticeCard({ notice, onOpen }: { notice: Notice; onOpen: () => void }) {
  const cat = categoryColors[notice.category];

  return (
    <motion.button
      onClick={onOpen}
      whileHover={{ boxShadow: "0 6px 24px rgba(0,0,0,0.1)", y: -1 }}
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "0.75rem",
        border: "1px solid #e2e8f0",
        overflow: "hidden",
        boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        width: "100%",
        textAlign: "left",
        cursor: "pointer",
        padding: 0,
        display: "block",
      }}
    >
      {/* Image preview */}
      {notice.imageUrl && (
        <img
          src={notice.imageUrl}
          alt={notice.title}
          style={{ width: "100%", height: "200px", objectFit: "cover", display: "block" }}
        />
      )}

      <div style={{ padding: "1.25rem 1.5rem" }}>
        {/* Category + date */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.65rem", flexWrap: "wrap" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.25rem",
              padding: "0.2rem 0.65rem",
              borderRadius: "9999px",
              fontSize: "0.68rem",
              fontWeight: 700,
              fontFamily: "'Poppins', sans-serif",
              backgroundColor: cat.bg,
              color: cat.text,
            }}
          >
            <Tag size={9} />
            {notice.category}
          </span>
          <span style={{ fontSize: "0.75rem", color: "#94a3b8", fontFamily: "'Poppins', sans-serif", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
            <Calendar size={11} />
            {formatNoticeDate(notice.date)}
          </span>
        </div>

        {/* Title */}
        <p
          style={{
            fontSize: "0.95rem",
            fontWeight: 700,
            color: "#1e293b",
            fontFamily: "'Poppins', sans-serif",
            marginBottom: "0.4rem",
            lineHeight: 1.4,
          }}
        >
          {notice.title}
        </p>

        {/* Summary */}
        <p
          style={{
            fontSize: "0.82rem",
            color: "#64748b",
            fontFamily: "'Poppins', sans-serif",
            lineHeight: 1.65,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {notice.summary}
        </p>

        <p
          style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            color: "#1a3270",
            fontFamily: "'Poppins', sans-serif",
            marginTop: "0.75rem",
          }}
        >
          Read full notice →
        </p>
      </div>
    </motion.button>
  );
}
