import { useState } from "react";
import { Bell, Calendar, Tag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useNoticeData, formatNoticeDate, type NoticeEntry, type NoticeCategory } from "../../../context/NoticeContext";
import { NoticeDetailModal } from "../shared/NoticeDetailModal";

const categoryColors: Record<NoticeCategory, { bg: string; text: string }> = {
  Announcement: { bg: "#dbeafe", text: "#1d4ed8" },
  Event:        { bg: "#dcfce7", text: "#15803d" },
  Update:       { bg: "#fef9c3", text: "#a16207" },
  Reminder:     { bg: "#fce7f3", text: "#be185d" },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const, delay: i * 0.08 },
  }),
};


export default function RecentNotices() {
  const { notices, loading } = useNoticeData();
  const [selected, setSelected] = useState<NoticeEntry | null>(null);

  const recent = [...notices]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  if (loading || recent.length === 0) return null;

  return (
    <>
      <section style={{ backgroundColor: "#f0f4ff", borderBottom: "1px solid #dde6f7", padding: "3rem 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1.75rem",
              flexWrap: "wrap",
              gap: "0.75rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <Bell size={18} color="#1a3270" />
              <h2
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 800,
                  color: "#1a3270",
                  fontFamily: "'Poppins', sans-serif",
                  margin: 0,
                }}
              >
                Recent Notices
              </h2>
            </div>
            <Link
              to="/notice"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                fontSize: "0.8rem",
                fontWeight: 700,
                fontFamily: "'Poppins', sans-serif",
                color: "#1a3270",
                textDecoration: "none",
                border: "2px solid #1a3270",
                borderRadius: "9999px",
                padding: "0.35rem 1rem",
                transition: "all 0.18s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#1a3270";
                (e.currentTarget as HTMLElement).style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                (e.currentTarget as HTMLElement).style.color = "#1a3270";
              }}
            >
              View All Notices <ArrowRight size={13} />
            </Link>
          </div>

          {/* Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1rem",
            }}
          >
            {recent.map((notice, i) => {
              const cat = categoryColors[notice.category];
              return (
                <motion.div
                  key={notice.id}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  onClick={() => setSelected(notice)}
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "0.875rem",
                    border: "1px solid #dde6f7",
                    padding: "1.25rem 1.4rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.6rem",
                    boxShadow: "0 2px 8px rgba(26,50,112,0.06)",
                    cursor: "pointer",
                    transition: "box-shadow 0.18s, transform 0.18s",
                  }}
                  whileHover={{ boxShadow: "0 8px 28px rgba(26,50,112,0.13)", y: -2 }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem" }}>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        padding: "0.18rem 0.6rem",
                        borderRadius: "9999px",
                        fontSize: "0.67rem",
                        fontWeight: 700,
                        fontFamily: "'Poppins', sans-serif",
                        backgroundColor: cat.bg,
                        color: cat.text,
                      }}
                    >
                      <Tag size={9} />
                      {notice.category}
                    </span>
                    <span
                      style={{
                        fontSize: "0.72rem",
                        color: "#94a3b8",
                        fontFamily: "'Poppins', sans-serif",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                      }}
                    >
                      <Calendar size={11} />
                      {formatNoticeDate(notice.date)}
                    </span>
                  </div>

                  <p
                    style={{
                      fontSize: "0.92rem",
                      fontWeight: 700,
                      color: "#1e293b",
                      fontFamily: "'Poppins', sans-serif",
                      lineHeight: 1.4,
                      margin: 0,
                    }}
                  >
                    {notice.title}
                  </p>

                  {notice.imageUrl && (
                    <img
                      src={notice.imageUrl}
                      alt={notice.title}
                      style={{
                        width: "100%",
                        height: "160px",
                        objectFit: "cover",
                        borderRadius: "0.5rem",
                      }}
                    />
                  )}

                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "#64748b",
                      fontFamily: "'Poppins', sans-serif",
                      lineHeight: 1.65,
                      margin: 0,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {notice.summary}
                  </p>

                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "#1a3270",
                      fontFamily: "'Poppins', sans-serif",
                      marginTop: "auto",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.25rem",
                    }}
                  >
                    Read full notice <ArrowRight size={12} />
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {selected && <NoticeDetailModal notice={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
