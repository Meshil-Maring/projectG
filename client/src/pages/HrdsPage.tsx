import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Users,
  BookOpen,
  Briefcase,
  TrendingUp,
  Heart,
  Star,
  GraduationCap,
  Target,
  Handshake,
  Lightbulb,
  ArrowRight,
  ChevronRight,
  Scale,
  Globe,
  Trophy,
  Clock,
  MapPin,
  Megaphone,
  Award,
  UserCheck,
} from "lucide-react";
import Navbar from "../shared/components/Navbar";
import Footer from "../shared/components/Footer";

const PRIMARY = "#15803d";
const SECONDARY = "#16a34a";
const LIGHT_BG = "#edf7f1";
const ACCENT = "#14532d";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: "easeOut" as const },
});

const heroFeatures = [
  { icon: Users, title: "Empower Individuals", sub: "Building confidence and capacity" },
  { icon: TrendingUp, title: "Build Skills & Capabilities", sub: "Practical growth programs" },
  { icon: Star, title: "Promote Leadership", sub: "Developing tomorrow's leaders" },
  { icon: Handshake, title: "Strengthen Communities", sub: "Together we rise" },
];

const missionPillars = [
  { icon: GraduationCap, label: "Skill Development" },
  { icon: BookOpen, label: "Education & Training" },
  { icon: Briefcase, label: "Career Guidance" },
  { icon: Star, label: "Leadership Building" },
  { icon: Users, label: "Inclusive Growth" },
];

const whatWeDo = [
  { icon: TrendingUp, title: "Capacity Building", desc: "Enhancing skills and knowledge to help individuals excel in life." },
  { icon: BookOpen, title: "Training & Workshops", desc: "Providing practical training and workshops for personal and professional growth." },
  { icon: Briefcase, title: "Career Development", desc: "Guiding individuals to discover opportunities and achieve their career goals." },
  { icon: UserCheck, title: "Mentorship Programs", desc: "Connecting with mentors to inspire, guide, and support growth." },
  { icon: Heart, title: "Community Engagement", desc: "Working together to create a supportive and empowered society." },
];

const focusAreas = [
  { icon: Users, title: "Youth Empowerment", desc: "Building confidence, skills & vision" },
  { icon: Star, title: "Women Development", desc: "Promoting leadership & independence" },
  { icon: BookOpen, title: "Education & Literacy", desc: "Supporting access to quality education" },
  { icon: Briefcase, title: "Employability Skills", desc: "Preparing for future job opportunities" },
  { icon: Lightbulb, title: "Personal Growth", desc: "Encouraging mindset, communication and life skills" },
];

const impactStats = [
  { value: "3,200+", label: "Individuals", sub: "Trained" },
  { value: "150+", label: "Workshops", sub: "Conducted" },
  { value: "1,000+", label: "Youth", sub: "Empowered" },
  { value: "80+", label: "Partner", sub: "Organizations" },
  { value: "100%", label: "Commitment", sub: "to Growth" },
];

const ctaActions = [
  { icon: Clock, label: "Volunteer Your Time" },
  { icon: TrendingUp, label: "Share Your Skills" },
  { icon: UserCheck, label: "Mentor Someone" },
  { icon: Heart, label: "Support Our Mission" },
];

const bottomStats = [
  { icon: Award, value: "10+", label: "Years of Service" },
  { icon: Users, value: "50+", label: "Active Volunteers" },
  { icon: Target, value: "70+", label: "Projects Completed" },
  { icon: MapPin, value: "20+", label: "Locations Reached" },
  { icon: Heart, value: "Countless", label: "Lives Transformed" },
];

const otherGroups = [
  { slug: "lac", abbr: "LAC", label: "Legal Aid Club", color: "#1a3270", bg: "#eef1fb", Icon: Scale },
  { slug: "whg", abbr: "WHG", label: "Work for Humanity Group", color: "#c2410c", bg: "#fff4ec", Icon: Heart },
  { slug: "fseds", abbr: "FSEDS", label: "Foundation for Socio-Economic Development Society", color: "#6d28d9", bg: "#f3f0ff", Icon: Globe },
  { slug: "cwg", abbr: "CWG", label: "Competitive World Group", color: "#0f766e", bg: "#e8f7f6", Icon: Trophy },
];

export default function HrdsPage() {
  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", overflowX: "hidden" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ background: "#ffffff", paddingTop: "5.5rem", position: "relative", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "55%",
            height: "100%",
            background: "radial-gradient(ellipse at 70% 40%, rgba(21,128,61,0.07) 0%, rgba(22,163,74,0.04) 45%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          {/* Breadcrumb */}
          <motion.div
            {...fade(0)}
            style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.78rem", color: "#64748b", marginBottom: "2.5rem" }}
          >
            <Link to="/" style={{ color: "#64748b", textDecoration: "none" }}>Home</Link>
            <ChevronRight size={13} />
            <span>Our Communities</span>
            <ChevronRight size={13} />
            <span style={{ color: PRIMARY, fontWeight: 600 }}>Human Resources Developmental Society</span>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "3rem",
              alignItems: "center",
              paddingBottom: "3rem",
            }}
          >
            {/* Left */}
            <div>
              {/* Badge row */}
              <motion.div {...fade(0.05)} style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "12px",
                    background: `linear-gradient(135deg, ${PRIMARY} 0%, ${SECONDARY} 100%)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 4px 20px rgba(21,128,61,0.3)`,
                    flexShrink: 0,
                  }}
                >
                  <Users size={30} color="#ffffff" strokeWidth={1.5} />
                </div>
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase" as const,
                    color: PRIMARY,
                    lineHeight: 1.4,
                    maxWidth: "180px",
                  }}
                >
                  Human Resources Developmental Society
                </span>
              </motion.div>

              <motion.h1
                {...fade(0.1)}
                style={{
                  fontSize: "clamp(2rem, 4.5vw, 3rem)",
                  fontWeight: 800,
                  color: "#0f172a",
                  lineHeight: 1.15,
                  marginBottom: "0.3rem",
                  letterSpacing: "-0.01em",
                }}
              >
                Empower People.
              </motion.h1>

              <motion.p
                {...fade(0.13)}
                style={{
                  fontFamily: "Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "clamp(1.2rem, 3vw, 2rem)",
                  color: PRIMARY,
                  marginBottom: "0",
                  fontWeight: 400,
                  lineHeight: 1.3,
                }}
              >
                Enrich Potential.
              </motion.p>

              <motion.p
                {...fade(0.16)}
                style={{
                  fontFamily: "Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "clamp(1.2rem, 3vw, 2rem)",
                  color: PRIMARY,
                  marginBottom: "0.75rem",
                  fontWeight: 400,
                  lineHeight: 1.3,
                }}
              >
                Build a Better Tomorrow.
              </motion.p>

              <div style={{ width: "56px", height: "3px", background: PRIMARY, borderRadius: "2px", marginBottom: "1.25rem" }} />

              <motion.p
                {...fade(0.2)}
                style={{ fontSize: "0.95rem", color: "#475569", lineHeight: 1.75, marginBottom: "2rem", maxWidth: "420px" }}
              >
                We are committed to developing human potential and building
                capacities to create a skilled, confident, and empowered
                community.
              </motion.p>

              <motion.div {...fade(0.25)} style={{ display: "flex", gap: "1rem", flexWrap: "wrap" as const }}>
                <a
                  href="#get-involved"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    background: `linear-gradient(135deg, ${PRIMARY} 0%, ${SECONDARY} 100%)`,
                    color: "#fff",
                    padding: "0.75rem 1.75rem",
                    borderRadius: "0.5rem",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    textDecoration: "none",
                    boxShadow: `0 4px 14px rgba(21,128,61,0.3)`,
                  }}
                >
                  <ArrowRight size={16} />
                  Get Involved
                </a>
                <a
                  href="/#contact"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    border: `2px solid ${PRIMARY}`,
                    color: PRIMARY,
                    padding: "0.73rem 1.75rem",
                    borderRadius: "0.5rem",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    textDecoration: "none",
                    background: "transparent",
                  }}
                >
                  <Users size={16} />
                  Join Our Team
                </a>
              </motion.div>
            </div>

            {/* Right – visual card */}
            <motion.div {...fade(0.15)} style={{ position: "relative", display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "radial-gradient(ellipse at 50% 50%, rgba(21,128,61,0.1) 0%, transparent 70%)",
                  borderRadius: "50%",
                  transform: "scale(1.2)",
                }}
              />
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "460px",
                  borderRadius: "1.5rem",
                  overflow: "hidden",
                  boxShadow: `0 20px 60px rgba(21,128,61,0.15)`,
                  background: `linear-gradient(145deg, ${PRIMARY} 0%, ${SECONDARY} 100%)`,
                  padding: "3rem 2.5rem",
                  minHeight: "320px",
                  display: "flex",
                  flexDirection: "column" as const,
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
                <div style={{ position: "absolute", bottom: "-40px", left: "-40px", width: "150px", height: "150px", borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
                <p
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase" as const,
                    color: "rgba(255,255,255,0.65)",
                    marginBottom: "1.5rem",
                    position: "relative",
                  }}
                >
                  Skills we build
                </p>
                {["Skills", "Knowledge", "Growth", "Leadership", "Opportunity"].map((item, i) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      marginBottom: i < 4 ? "0.85rem" : 0,
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {i === 0 && <TrendingUp size={13} color="#fff" />}
                      {i === 1 && <BookOpen size={13} color="#fff" />}
                      {i === 2 && <Star size={13} color="#fff" />}
                      {i === 3 && <Users size={13} color="#fff" />}
                      {i === 4 && <Lightbulb size={13} color="#fff" />}
                    </div>
                    <span style={{ fontSize: "1rem", fontWeight: 700, color: "#ffffff" }}>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Hero features strip */}
          <motion.div
            {...fade(0.3)}
            style={{
              borderTop: "1px solid #e2e8f0",
              paddingTop: "2rem",
              paddingBottom: "2.5rem",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "1rem",
            }}
          >
            {heroFeatures.map(({ icon: Icon, title, sub }) => (
              <div key={title} style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem" }}>
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "10px",
                    background: LIGHT_BG,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={18} color={PRIMARY} strokeWidth={1.6} />
                </div>
                <div>
                  <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#0f172a" }}>{title}</div>
                  <div style={{ fontSize: "0.72rem", color: "#94a3b8", lineHeight: 1.4 }}>{sub}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── OUR MISSION ── */}
      <section style={{ background: "#fafaf8", padding: "5rem 1.5rem" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "3rem",
            alignItems: "center",
          }}
        >
          {/* Left – visual with quote */}
          <motion.div {...fade(0)} style={{ position: "relative" }}>
            <div
              style={{
                borderRadius: "1.5rem",
                background: `linear-gradient(145deg, ${PRIMARY} 0%, ${SECONDARY} 100%)`,
                padding: "2.5rem",
                minHeight: "300px",
                display: "flex",
                flexDirection: "column" as const,
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                boxShadow: `0 16px 48px rgba(21,128,61,0.2)`,
              }}
            >
              <div style={{ position: "absolute", top: "-50px", right: "-50px", width: "180px", height: "180px", borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
              <Users size={56} color="rgba(255,255,255,0.2)" strokeWidth={1} style={{ marginBottom: "1.5rem" }} />
              <div
                style={{
                  background: "rgba(255,255,255,0.12)",
                  borderRadius: "0.875rem",
                  padding: "1.25rem",
                  position: "relative",
                }}
              >
                <div style={{ fontSize: "1.5rem", color: "rgba(255,255,255,0.6)", lineHeight: 1, marginBottom: "0.5rem" }}>"</div>
                <p
                  style={{
                    fontFamily: "Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "0.95rem",
                    color: "#ffffff",
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  Investing in people today, builds a stronger society tomorrow.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Center – mission content */}
          <motion.div {...fade(0.1)}>
            <span
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase" as const,
                color: PRIMARY,
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              OUR MISSION
            </span>
            <div style={{ width: "40px", height: "3px", background: PRIMARY, borderRadius: "2px", marginBottom: "1rem" }} />
            <h2
              style={{
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                fontWeight: 800,
                color: "#0f172a",
                lineHeight: 1.25,
                marginBottom: "1rem",
              }}
            >
              Developing People.
              <br />
              Transforming Lives.
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#475569", lineHeight: 1.8, marginBottom: "2rem" }}>
              We focus on nurturing talent, enhancing skills, and promoting
              personal and professional growth through education, training,
              mentorship, and opportunities.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                gap: "0.85rem",
              }}
            >
              {missionPillars.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    flexDirection: "column" as const,
                    alignItems: "center",
                    gap: "0.5rem",
                    background: "#fff",
                    borderRadius: "0.875rem",
                    padding: "1rem 0.5rem",
                    boxShadow: "0 2px 8px rgba(21,128,61,0.06)",
                    border: "1px solid #d1fae5",
                    textAlign: "center" as const,
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: LIGHT_BG,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={16} color={PRIMARY} strokeWidth={1.6} />
                  </div>
                  <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#0f172a", lineHeight: 1.3 }}>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right – decorative achievement visual */}
          <motion.div {...fade(0.2)}>
            <div
              style={{
                borderRadius: "1.5rem",
                background: LIGHT_BG,
                border: `1px solid rgba(21,128,61,0.12)`,
                padding: "2.5rem",
                minHeight: "300px",
                display: "flex",
                flexDirection: "column" as const,
                justifyContent: "center",
                gap: "1.25rem",
              }}
            >
              {[
                { label: "Grow", sub: "Unlock your full potential" },
                { label: "Lead", sub: "Inspire and guide others" },
                { label: "Achieve", sub: "Turn vision into reality" },
                { label: "Transform", sub: "Change lives, change society" },
              ].map(({ label, sub }, i) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.85rem",
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: PRIMARY,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontSize: "0.72rem",
                      fontWeight: 800,
                      color: "#fff",
                    }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 700, color: PRIMARY }}>{label}</div>
                    <div style={{ fontSize: "0.73rem", color: "#64748b" }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── THREE COLUMN: WHAT WE DO / FOCUS AREAS / IMPACT ── */}
      <section style={{ background: "#f0fdf4", padding: "5rem 1.5rem" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2.5rem",
            alignItems: "start",
          }}
        >
          {/* What We Do */}
          <motion.div {...fade(0)}>
            <h3
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase" as const,
                color: PRIMARY,
                marginBottom: "1.25rem",
              }}
            >
              WHAT WE DO
            </h3>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.85rem" }}>
              {whatWeDo.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.75rem",
                    background: "#ffffff",
                    borderRadius: "0.875rem",
                    padding: "0.875rem 1rem",
                    boxShadow: "0 2px 8px rgba(21,128,61,0.05)",
                    border: "1px solid #d1fae5",
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "9px",
                      background: LIGHT_BG,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={17} color={PRIMARY} strokeWidth={1.6} />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.83rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.15rem" }}>{title}</div>
                    <div style={{ fontSize: "0.75rem", color: "#64748b", lineHeight: 1.5 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Focus Areas */}
          <motion.div {...fade(0.1)}>
            <h3
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase" as const,
                color: PRIMARY,
                marginBottom: "1.25rem",
              }}
            >
              OUR FOCUS AREAS
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.85rem",
              }}
            >
              {focusAreas.map(({ icon: Icon, title, desc }, i) => (
                <div
                  key={title}
                  style={{
                    background: "#ffffff",
                    borderRadius: "0.875rem",
                    padding: "1.25rem 1rem",
                    textAlign: "center" as const,
                    boxShadow: "0 2px 8px rgba(21,128,61,0.05)",
                    border: "1px solid #d1fae5",
                    ...(i === 4 ? { gridColumn: "1 / -1" } : {}),
                  }}
                >
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "50%",
                      background: LIGHT_BG,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 0.6rem",
                    }}
                  >
                    <Icon size={19} color={PRIMARY} strokeWidth={1.6} />
                  </div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.2rem" }}>{title}</div>
                  <div style={{ fontSize: "0.72rem", color: "#64748b", lineHeight: 1.45 }}>{desc}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Our Impact */}
          <motion.div {...fade(0.2)}>
            <h3
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase" as const,
                color: PRIMARY,
                marginBottom: "1.25rem",
              }}
            >
              OUR IMPACT
            </h3>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.75rem" }}>
              {impactStats.map(({ value, label, sub }) => (
                <div
                  key={value}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    background: "#ffffff",
                    borderRadius: "0.875rem",
                    padding: "0.875rem 1.1rem",
                    boxShadow: "0 2px 8px rgba(21,128,61,0.05)",
                    border: "1px solid #d1fae5",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      background: LIGHT_BG,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <TrendingUp size={18} color={PRIMARY} strokeWidth={1.6} />
                  </div>
                  <div>
                    <div style={{ fontSize: "1.3rem", fontWeight: 800, color: PRIMARY, lineHeight: 1 }}>{value}</div>
                    <div style={{ fontSize: "0.75rem", color: "#475569", fontWeight: 600 }}>
                      {label} <span style={{ color: "#94a3b8", fontWeight: 500 }}>{sub}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── BE THE CHANGE CTA ── */}
      <section
        id="get-involved"
        style={{ background: "#ffffff", padding: "5rem 1.5rem", position: "relative", overflow: "hidden" }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            background: LIGHT_BG,
            borderRadius: "2rem",
            padding: "3.5rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "3rem",
            alignItems: "center",
            border: `1px solid rgba(21,128,61,0.1)`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-60px",
              left: "-60px",
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              background: `rgba(21,128,61,0.06)`,
            }}
          />

          {/* Left decorative */}
          <motion.div
            {...fade(0)}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "180px" }}
          >
            <div
              style={{
                borderRadius: "1.25rem",
                background: `linear-gradient(145deg, ${PRIMARY} 0%, ${SECONDARY} 100%)`,
                padding: "2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "140px",
                height: "140px",
                boxShadow: `0 12px 32px rgba(21,128,61,0.25)`,
              }}
            >
              <Users size={64} color="rgba(255,255,255,0.4)" strokeWidth={1} />
            </div>
          </motion.div>

          {/* Center */}
          <motion.div {...fade(0.1)} style={{ position: "relative" }}>
            <span
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase" as const,
                color: PRIMARY,
                display: "block",
                marginBottom: "0.6rem",
              }}
            >
              BE THE CHANGE
            </span>
            <h2
              style={{
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                fontWeight: 800,
                color: "#0f172a",
                marginBottom: "0.6rem",
                lineHeight: 1.25,
              }}
            >
              Together, We Develop
              <br />
              Stronger Communities.
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#64748b", lineHeight: 1.7, marginBottom: "1.75rem" }}>
              Your participation creates ripples of growth. Join us in shaping
              a skilled and empowered society.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" as const }}>
              <a
                href="/#contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: `linear-gradient(135deg, ${PRIMARY} 0%, ${SECONDARY} 100%)`,
                  color: "#fff",
                  padding: "0.75rem 1.75rem",
                  borderRadius: "0.5rem",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  textDecoration: "none",
                  boxShadow: `0 4px 14px rgba(21,128,61,0.3)`,
                }}
              >
                Get Involved
                <ArrowRight size={15} />
              </a>
              <a
                href="/#contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  border: `2px solid ${PRIMARY}`,
                  color: PRIMARY,
                  padding: "0.73rem 1.75rem",
                  borderRadius: "0.5rem",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  textDecoration: "none",
                  background: "transparent",
                }}
              >
                <Users size={15} />
                Join Our Team
              </a>
            </div>
          </motion.div>

          {/* Right – 4 action tiles */}
          <motion.div
            {...fade(0.2)}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}
          >
            {ctaActions.map(({ icon: Icon, label }) => (
              <div
                key={label}
                style={{
                  background: "#ffffff",
                  borderRadius: "0.875rem",
                  padding: "1.1rem 0.75rem",
                  textAlign: "center" as const,
                  boxShadow: "0 2px 8px rgba(21,128,61,0.07)",
                  border: "1px solid #d1fae5",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: LIGHT_BG,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 0.5rem",
                  }}
                >
                  <Icon size={18} color={PRIMARY} strokeWidth={1.6} />
                </div>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0f172a", lineHeight: 1.3 }}>{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── BOTTOM STATS STRIP ── */}
      <section style={{ background: "#fafaf8", padding: "3.5rem 1.5rem", borderTop: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <motion.div
            {...fade(0)}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "1.5rem",
              textAlign: "center" as const,
            }}
          >
            {bottomStats.map(({ icon: Icon, value, label }) => (
              <div key={label}>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: LIGHT_BG,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 0.6rem",
                  }}
                >
                  <Icon size={19} color={PRIMARY} strokeWidth={1.6} />
                </div>
                <div style={{ fontSize: "1.5rem", fontWeight: 800, color: PRIMARY, lineHeight: 1 }}>{value}</div>
                <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "0.25rem" }}>{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── EXPLORE OTHER COMMUNITIES ── */}
      <section style={{ background: "#f8fafc", padding: "3rem 1.5rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" as const }}>
          <motion.h3
            {...fade(0)}
            style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", marginBottom: "1.5rem", letterSpacing: "0.02em" }}
          >
            Explore Our Five Communities
          </motion.h3>
          <motion.div
            {...fade(0.1)}
            style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" as const }}
          >
            {/* Current: HRDS */}
            <div
              style={{
                display: "flex",
                flexDirection: "column" as const,
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.25rem",
                borderRadius: "1rem",
                background: LIGHT_BG,
                border: `2px solid ${PRIMARY}`,
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: PRIMARY,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Users size={20} color="#fff" strokeWidth={1.6} />
              </div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: PRIMARY, maxWidth: "90px", textAlign: "center" as const }}>
                HRDS
              </span>
            </div>

            {otherGroups.map(({ slug, abbr, color, bg, Icon }) => (
              <Link
                key={slug}
                to={slug === "lac" ? "/lac" : slug === "whg" ? "/whg" : slug === "cwg" ? "/cwg" : slug === "fseds" ? "/fseds" : `/groups/${slug}`}
                style={{
                  display: "flex",
                  flexDirection: "column" as const,
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.75rem 1.25rem",
                  borderRadius: "1rem",
                  background: bg,
                  border: `2px solid transparent`,
                  textDecoration: "none",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = color)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "transparent")}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={20} color="#fff" strokeWidth={1.6} />
                </div>
                <span style={{ fontSize: "0.75rem", fontWeight: 600, color: color, textAlign: "center" as const, maxWidth: "90px" }}>
                  {abbr}
                </span>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
