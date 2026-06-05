import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Trophy,
  BookOpen,
  Target,
  Star,
  TrendingUp,
  Lightbulb,
  Award,
  Users,
  Heart,
  ArrowRight,
  ChevronRight,
  Scale,
  Globe,
  Clock,
  MapPin,
  Megaphone,
  Zap,
  Medal,
  Brain,
  Swords,
  Flame,
} from "lucide-react";
import Navbar from "../shared/components/Navbar";
import Footer from "../shared/components/Footer";

const PRIMARY = "#0f766e";
const SECONDARY = "#0d9488";
const LIGHT_BG = "#e8f7f6";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: "easeOut" as const },
});

const heroFeatures = [
  { icon: Brain, title: "Sharpen Critical Thinking", sub: "Logic, reasoning & analysis" },
  { icon: Medal, title: "Build Champions", sub: "Competitions & achievement" },
  { icon: Target, title: "Goal-Oriented Training", sub: "Focused, structured growth" },
  { icon: Zap, title: "Ignite Competitive Spirit", sub: "Drive to excel and win" },
  { icon: TrendingUp, title: "Drive Sustainable Growth", sub: "Long-term excellence" },
];

const missionPillars = [
  { icon: Trophy, label: "Academic Excellence" },
  { icon: Megaphone, label: "Quiz & Debate" },
  { icon: Star, label: "Sports & Athletics" },
  { icon: Lightbulb, label: "Creative Skills" },
  { icon: Target, label: "Life Readiness" },
];

const whatWeDo = [
  { icon: BookOpen, title: "Academic Excellence Training", desc: "Preparing students and members for competitive exams, Olympiads, and academic tournaments." },
  { icon: Megaphone, title: "Quiz & Debate Programs", desc: "Hosting and coaching for interschool, college, and open-category quiz and debate competitions." },
  { icon: Trophy, title: "Sports & Athletics", desc: "Developing physical excellence through organized sports events, fitness camps, and athletic coaching." },
  { icon: Lightbulb, title: "Creative Arts & Innovation", desc: "Encouraging creative expression through art, science, and innovation challenges." },
  { icon: Target, title: "Life Skills Development", desc: "Building communication, leadership, and confidence for real-world competitive environments." },
];

const focusAreas = [
  { icon: BookOpen, title: "Academic Competitions", desc: "Olympiads, science fairs & talent hunts" },
  { icon: Megaphone, title: "Quiz & Debates", desc: "Elocution, MUN & quiz leagues" },
  { icon: Trophy, title: "Sports Championships", desc: "Indoor, outdoor & e-sports events" },
  { icon: Lightbulb, title: "Creative Arts", desc: "Art, innovation & cultural contests" },
  { icon: Brain, title: "Digital Skills", desc: "Coding, tech-quiz & digital challenges" },
  { icon: Star, title: "Personal Development", desc: "Leadership, confidence & growth mindset" },
];

const impactStats = [
  { value: "2,800+", label: "Students", sub: "Coached" },
  { value: "500+", label: "Competitions", sub: "Participated In" },
  { value: "180+", label: "Medals &", sub: "Awards Won" },
  { value: "60+", label: "Events", sub: "Organized" },
  { value: "100%", label: "Commitment", sub: "to Excellence" },
];

const ctaActions = [
  { icon: Clock, label: "Train With Us" },
  { icon: Trophy, label: "Join a Competition" },
  { icon: Users, label: "Mentor Others" },
  { icon: Flame, label: "Champion a Cause" },
];

const bottomStats = [
  { icon: Award, value: "8+", label: "Years of Excellence" },
  { icon: Users, value: "60+", label: "Active Members" },
  { icon: Trophy, value: "500+", label: "Competitions Joined" },
  { icon: MapPin, value: "15+", label: "Locations Reached" },
  { icon: Medal, value: "Countless", label: "Champions Shaped" },
];

const otherGroups = [
  { slug: "lac", abbr: "LAC", label: "Legal Aid Club", color: "#1a3270", bg: "#eef1fb", Icon: Scale },
  { slug: "whg", abbr: "WHG", label: "Work for Humanity Group", color: "#c2410c", bg: "#fff4ec", Icon: Heart },
  { slug: "hrds", abbr: "HRDS", label: "Human Resources Developmental Society", color: "#15803d", bg: "#edf7f1", Icon: Users },
  { slug: "fseds", abbr: "FSEDS", label: "Foundation for Socio-Economic Development Society", color: "#6d28d9", bg: "#f3f0ff", Icon: Globe },
];

export default function CwgPage() {
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
            background: "radial-gradient(ellipse at 70% 40%, rgba(15,118,110,0.07) 0%, rgba(13,148,136,0.04) 45%, transparent 70%)",
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
            <span style={{ color: PRIMARY, fontWeight: 600 }}>Competitive World Group</span>
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
                    boxShadow: `0 4px 20px rgba(15,118,110,0.3)`,
                    flexShrink: 0,
                  }}
                >
                  <Trophy size={30} color="#ffffff" strokeWidth={1.5} />
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
                  Competitive World Group
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
                Sharpen Minds.
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
                Shape Champions.
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
                Build a Legacy of Excellence.
              </motion.p>

              <div style={{ width: "56px", height: "3px", background: PRIMARY, borderRadius: "2px", marginBottom: "1.25rem" }} />

              <motion.p
                {...fade(0.2)}
                style={{ fontSize: "0.95rem", color: "#475569", lineHeight: 1.75, marginBottom: "2rem", maxWidth: "420px" }}
              >
                We prepare individuals to compete, excel, and win — fostering
                a culture of academic rigor, athletic discipline, and creative
                brilliance across every arena.
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
                    boxShadow: `0 4px 14px rgba(15,118,110,0.3)`,
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
                  background: "radial-gradient(ellipse at 50% 50%, rgba(15,118,110,0.1) 0%, transparent 70%)",
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
                  boxShadow: `0 20px 60px rgba(15,118,110,0.15)`,
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
                  Compete · Excel · Lead · Win · Grow
                </p>
                {["Compete", "Excel", "Lead", "Win", "Grow"].map((item, i) => (
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
                      {i === 0 && <Swords size={13} color="#fff" />}
                      {i === 1 && <Star size={13} color="#fff" />}
                      {i === 2 && <Trophy size={13} color="#fff" />}
                      {i === 3 && <Medal size={13} color="#fff" />}
                      {i === 4 && <TrendingUp size={13} color="#fff" />}
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
                boxShadow: `0 16px 48px rgba(15,118,110,0.2)`,
              }}
            >
              <div style={{ position: "absolute", top: "-50px", right: "-50px", width: "180px", height: "180px", borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
              <Trophy size={56} color="rgba(255,255,255,0.2)" strokeWidth={1} style={{ marginBottom: "1.5rem" }} />
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
                  Champions are not born — they are built through discipline, dedication, and an unbreakable will to excel.
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
              Empowering People.
              <br />
              Strengthening Livelihoods.
              <br />
              Transforming Communities.
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#475569", lineHeight: 1.8, marginBottom: "2rem" }}>
              Our mission is to cultivate a competitive, growth-driven culture
              by providing platforms, training, and mentorship that help
              individuals achieve their highest potential in academics, sports,
              and beyond.
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
                    boxShadow: "0 2px 8px rgba(15,118,110,0.06)",
                    border: "1px solid #ccf0ed",
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

          {/* Right – achievement ladder */}
          <motion.div {...fade(0.2)}>
            <div
              style={{
                borderRadius: "1.5rem",
                background: LIGHT_BG,
                border: `1px solid rgba(15,118,110,0.12)`,
                padding: "2.5rem",
                minHeight: "300px",
                display: "flex",
                flexDirection: "column" as const,
                justifyContent: "center",
                gap: "1.25rem",
              }}
            >
              {[
                { label: "Prepare", sub: "Master your craft with dedication" },
                { label: "Compete", sub: "Step into the arena fearlessly" },
                { label: "Excel", sub: "Rise above and outperform" },
                { label: "Champion", sub: "Lead, inspire, and build legacy" },
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
      <section style={{ background: "#f0fdfa", padding: "5rem 1.5rem" }}>
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
                    boxShadow: "0 2px 8px rgba(15,118,110,0.05)",
                    border: "1px solid #ccf0ed",
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
              FOCUS AREAS
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.85rem",
              }}
            >
              {focusAreas.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  style={{
                    background: "#ffffff",
                    borderRadius: "0.875rem",
                    padding: "1.25rem 1rem",
                    textAlign: "center" as const,
                    boxShadow: "0 2px 8px rgba(15,118,110,0.05)",
                    border: "1px solid #ccf0ed",
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
                    boxShadow: "0 2px 8px rgba(15,118,110,0.05)",
                    border: "1px solid #ccf0ed",
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

      {/* ── RISE TO THE CHALLENGE CTA ── */}
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
            border: `1px solid rgba(15,118,110,0.1)`,
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
              background: `rgba(15,118,110,0.06)`,
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
                boxShadow: `0 12px 32px rgba(15,118,110,0.25)`,
              }}
            >
              <Trophy size={64} color="rgba(255,255,255,0.4)" strokeWidth={1} />
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
              RISE TO THE CHALLENGE
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
              Empowered communities.
              <br />
              Stronger economies.
              <br />
              Brighter futures.
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#64748b", lineHeight: 1.7, marginBottom: "1.75rem" }}>
              Your competitive spirit creates ripples of inspiration. Join us
              to compete, grow, and champion excellence across every field.
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
                  boxShadow: `0 4px 14px rgba(15,118,110,0.3)`,
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
                  boxShadow: "0 2px 8px rgba(15,118,110,0.07)",
                  border: "1px solid #ccf0ed",
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
            {/* Current: CWG */}
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
                <Trophy size={20} color="#fff" strokeWidth={1.6} />
              </div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: PRIMARY, maxWidth: "90px", textAlign: "center" as const }}>
                CWG
              </span>
            </div>

            {otherGroups.map(({ slug, abbr, color, bg, Icon }) => (
              <Link
                key={slug}
                to={slug === "lac" ? "/lac" : slug === "whg" ? "/whg" : slug === "hrds" ? "/hrds" : slug === "fseds" ? "/fseds" : `/groups/${slug}`}
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
