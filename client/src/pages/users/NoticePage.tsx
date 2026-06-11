import { useState } from "react";
import { ArrowLeft, Bell, Calendar, Tag, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../shared/components/Navbar";
import Footer from "../../shared/components/Footer";
import SectionNavigator from "../../shared/components/SectionNavigator";

const sections = [
  { id: "notice-hero", label: "Overview" },
  { id: "notice-filter", label: "Filter" },
  { id: "notice-list", label: "Notices" },
];

type Notice = {
  id: number;
  title: string;
  category: "Announcement" | "Event" | "Update" | "Reminder";
  date: string;
  summary: string;
  body: string;
};

const categoryColors: Record<Notice["category"], { bg: string; text: string }> = {
  Announcement: { bg: "#dbeafe", text: "#1d4ed8" },
  Event:        { bg: "#dcfce7", text: "#15803d" },
  Update:       { bg: "#fef9c3", text: "#a16207" },
  Reminder:     { bg: "#fce7f3", text: "#be185d" },
};

const notices: Notice[] = [
  {
    id: 1,
    title: "Annual General Meeting – June 2026",
    category: "Announcement",
    date: "June 3, 2026",
    summary:
      "All members are invited to attend the Annual General Meeting scheduled for June 28, 2026.",
    body: "The Annual General Meeting (AGM) will be held on Saturday, June 28, 2026 at 10:00 AM at the Project Generation Community Hall. The agenda includes reviewing the 2025 annual report, electing new board members, and setting goals for 2027. All registered members are encouraged to attend. RSVP by June 20 via the contact form on our website.",
  },
  {
    id: 2,
    title: "New Scholarship Applications Now Open",
    category: "Update",
    date: "May 28, 2026",
    summary:
      "Applications for the 2026–2027 scholarship cycle are now open. Deadline is July 15, 2026.",
    body: "Project Generation is pleased to announce that scholarship applications for the 2026–2027 academic year are now open. Eligible applicants must be enrolled in an accredited institution, demonstrate financial need, and show active community involvement. Applications close on July 15, 2026. Download the application form from the Resources section or pick one up at our main office.",
  },
  {
    id: 3,
    title: "Community Clean-Up Drive – July 5",
    category: "Event",
    date: "May 22, 2026",
    summary:
      "Join us for our quarterly community clean-up drive on July 5, 2026 starting at 7:00 AM.",
    body: "Our quarterly Community Clean-Up Drive returns on July 5, 2026 starting at 7:00 AM. Volunteers will be divided into teams and assigned to different barangays. Bring gloves and wear comfortable clothes. Breakfast snacks and water will be provided. This event is open to all members, supporters, and the general public. Meet at the Barangay Hall parking area.",
  },
  {
    id: 4,
    title: "Reminder: Membership Renewal Deadline",
    category: "Reminder",
    date: "May 15, 2026",
    summary:
      "Annual membership renewals are due by June 30, 2026. Renew early to avoid lapses in benefits.",
    body: "This is a reminder that annual membership renewals are due on or before June 30, 2026. Members who fail to renew by this date will lose access to member-only resources, scholarship eligibility, and voting rights at the AGM. Renewal can be done online through the member portal or in person at our office during business hours (Monday–Friday, 9 AM–5 PM).",
  },
  {
    id: 5,
    title: "Leadership Training Workshop – Registration Open",
    category: "Event",
    date: "May 10, 2026",
    summary:
      "A two-day leadership training workshop is scheduled for July 12–13. Limited slots available.",
    body: "Project Generation is conducting a two-day Leadership Training Workshop on July 12–13, 2026 at the Community Learning Center. The workshop covers communication, project management, and community organizing. It is open to youth members aged 18–30. Only 40 slots are available. Registration fee: ₱200 (includes meals and materials). Register through the website or contact our office.",
  },
  {
    id: 6,
    title: "Office Closure – National Holiday",
    category: "Announcement",
    date: "May 5, 2026",
    summary:
      "Our office will be closed on June 12, 2026 in observance of Independence Day.",
    body: "Please be informed that the Project Generation office will be closed on Thursday, June 12, 2026 in observance of Philippine Independence Day. Regular operations will resume on June 13, 2026. For urgent concerns, please send an email to our official address and we will respond on the next business day.",
  },
];

export default function NoticePage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<Notice["category"] | "All">("All");

  const categories: Array<Notice["category"] | "All"> = [
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
            {notice.date}
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
