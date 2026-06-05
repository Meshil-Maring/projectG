import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Heart,
  Users,
  BookOpen,
  Leaf,
  HandHeart,
  Baby,
  PersonStanding,
  Stethoscope,
  TreePine,
  AlertTriangle,
  Phone,
  Mail,
  MapPin,
  Scale,
  Globe,
  Trophy,
  ArrowRight,
  ChevronRight,
  Megaphone,
  Star,
  Clock,
  Building,
  Handshake,
} from "lucide-react";
import Navbar from "../shared/components/Navbar";
import Footer from "../shared/components/Footer";

const PRIMARY = "#c2410c";
const SECONDARY = "#f97316";
const LIGHT_BG = "#fff4ec";
const ACCENT = "#7c2d12";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: "easeOut" as const },
});

const heroFeatures = [
  { icon: Heart, title: "Serve Selflessly", sub: "Kindness without conditions" },
  { icon: Star, title: "Inspire Hope", sub: "Lifting spirits every day" },
  { icon: Users, title: "Build Communities", sub: "Stronger together" },
  { icon: Leaf, title: "Create Lasting Change", sub: "Impact that endures" },
];

const missionValues = [
  { icon: Heart, label: "Humanity First" },
  { icon: HandHeart, label: "Dignity & Respect" },
  { icon: Star, label: "Hope & Compassion" },
  { icon: Users, label: "Unity in Diversity" },
];

const whatWeDo = [
  { icon: Users, title: "Community Service", desc: "Organizing drives and activities to support those in need." },
  { icon: HandHeart, title: "Support & Relief", desc: "Providing essentials, care, and comfort during difficult times." },
  { icon: BookOpen, title: "Education & Awareness", desc: "Spreading knowledge and life skills for a better tomorrow." },
  { icon: Leaf, title: "Environment Care", desc: "Working for a cleaner, greener, healthier planet." },
  { icon: Heart, title: "Inclusive Outreach", desc: "Reaching out to all, leaving no one behind." },
];

const focusAreas = [
  { icon: Baby, title: "Children", desc: "Education, nutrition, and child welfare" },
  { icon: PersonStanding, title: "Elderly", desc: "Care, support, and companionship" },
  { icon: Stethoscope, title: "Health", desc: "Health camps and wellness support" },
  { icon: TreePine, title: "Environment", desc: "Tree plantation, cleanliness drives" },
  { icon: AlertTriangle, title: "Disaster Relief", desc: "Immediate help and rehabilitation for affected families" },
];

const impactStats = [
  { value: "5,000+", label: "Lives", sub: "Touched" },
  { value: "120+", label: "Community", sub: "Programs" },
  { value: "300+", label: "Volunteers", sub: "Involved" },
  { value: "25+", label: "Cities", sub: "Reached" },
  { value: "100%", label: "Commitment", sub: "to Humanity" },
];

const ctaActions = [
  { icon: Clock, label: "Volunteer Your Time" },
  { icon: Heart, label: "Donate With Love" },
  { icon: Megaphone, label: "Spread Awareness" },
  { icon: Star, label: "Be the Change" },
];

const bottomStats = [
  { icon: Clock, value: "8+", label: "Years of Service" },
  { icon: Users, value: "50+", label: "Active Volunteers" },
  { icon: Building, value: "80+", label: "Projects Completed" },
  { icon: Handshake, value: "15+", label: "Partner Organizations" },
  { icon: Heart, value: "Countless", label: "Smiles" },
];

const otherGroups = [
  { slug: "lac", abbr: "LAC", label: "Legal Aid Club", color: "#1a3270", bg: "#eef1fb", Icon: Scale },
  { slug: "hrds", abbr: "HRDS", label: "Human Resources Developmental Society", color: "#15803d", bg: "#edf7f1", Icon: Users },
  { slug: "fseds", abbr: "FSEDS", label: "Foundation for Socio-Economic Development Society", color: "#6d28d9", bg: "#f3f0ff", Icon: Globe },
  { slug: "cwg", abbr: "CWG", label: "Competitive World Group", color: "#0f766e", bg: "#e8f7f6", Icon: Trophy },
];

export default function WhgPage() {
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
            background: "radial-gradient(ellipse at 70% 40%, rgba(194,65,12,0.07) 0%, rgba(249,115,22,0.04) 45%, transparent 70%)",
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
            <span style={{ color: PRIMARY, fontWeight: 600 }}>Work for Humanity Group</span>
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
                    boxShadow: `0 4px 20px rgba(194,65,12,0.3)`,
                    flexShrink: 0,
                  }}
                >
                  <Heart size={30} color="#ffffff" strokeWidth={1.5} />
                </div>
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase" as const,
                    color: PRIMARY,
                  }}
                >
                  Work for Humanity Group
                </span>
              </motion.div>

              <motion.h1
                {...fade(0.1)}
                style={{
                  fontSize: "clamp(2rem, 4.5vw, 3rem)",
                  fontWeight: 800,
                  color: "#0f172a",
                  lineHeight: 1.15,
                  marginBottom: "0.4rem",
                  letterSpacing: "-0.01em",
                }}
              >
                Work for Humanity,
              </motion.h1>

              <motion.p
                {...fade(0.13)}
                style={{
                  fontFamily: "Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "clamp(1.4rem, 3.5vw, 2.2rem)",
                  color: PRIMARY,
                  marginBottom: "0.75rem",
                  fontWeight: 400,
                  lineHeight: 1.3,
                }}
              >
                Serve with Heart.
              </motion.p>

              <div
                style={{
                  width: "56px",
                  height: "3px",
                  background: PRIMARY,
                  borderRadius: "2px",
                  marginBottom: "1.25rem",
                }}
              />

              <motion.p
                {...fade(0.2)}
                style={{ fontSize: "0.95rem", color: "#475569", lineHeight: 1.75, marginBottom: "2rem", maxWidth: "420px" }}
              >
                We work for a world where kindness leads the way. We uplift
                lives, support communities, and create lasting change through
                service and compassion.
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
                    boxShadow: `0 4px 14px rgba(194,65,12,0.3)`,
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
                  background: "radial-gradient(ellipse at 50% 50%, rgba(194,65,12,0.1) 0%, transparent 70%)",
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
                  boxShadow: `0 20px 60px rgba(194,65,12,0.15)`,
                  background: `linear-gradient(145deg, ${PRIMARY} 0%, ${SECONDARY} 100%)`,
                  padding: "3rem 2.5rem",
                  minHeight: "320px",
                  display: "flex",
                  flexDirection: "column" as const,
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center" as const,
                }}
              >
                <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
                <div style={{ position: "absolute", bottom: "-40px", left: "-40px", width: "150px", height: "150px", borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
                <Heart size={80} color="rgba(255,255,255,0.2)" strokeWidth={1} style={{ marginBottom: "1rem", position: "relative" }} />
                <h2
                  style={{
                    fontFamily: "Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "1.5rem",
                    color: "#ffffff",
                    lineHeight: 1.4,
                    position: "relative",
                  }}
                >
                  "The best way to find yourself
                  <br />
                  is to lose yourself
                  <br />
                  in the service of others."
                </h2>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.82rem", marginTop: "0.75rem", position: "relative" }}>
                  – Mahatma Gandhi
                </p>
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
          {/* Left – visual */}
          <motion.div {...fade(0)}>
            <div
              style={{
                borderRadius: "1.5rem",
                background: `linear-gradient(145deg, ${PRIMARY} 0%, ${SECONDARY} 100%)`,
                padding: "2.5rem",
                minHeight: "280px",
                display: "flex",
                flexDirection: "column" as const,
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center" as const,
                position: "relative",
                overflow: "hidden",
                boxShadow: `0 16px 48px rgba(194,65,12,0.2)`,
              }}
            >
              <div style={{ position: "absolute", top: "-50px", right: "-50px", width: "180px", height: "180px", borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
              <Users size={64} color="rgba(255,255,255,0.25)" strokeWidth={1} style={{ marginBottom: "1rem" }} />
              <p
                style={{
                  fontFamily: "Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "1.1rem",
                  color: "#fff",
                  lineHeight: 1.6,
                  position: "relative",
                }}
              >
                "Every act of kindness creates ripples of change."
              </p>
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
              Empathy in Action.
              <br />
              Change in Motion.
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#475569", lineHeight: 1.8, marginBottom: "2rem" }}>
              We believe every act of kindness creates ripples of change. Our
              mission is to serve humanity by addressing real needs, spreading
              kindness, and empowering people to live with dignity and hope.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.85rem",
              }}
            >
              {missionValues.map(({ icon: Icon, label }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      background: LIGHT_BG,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={16} color={PRIMARY} strokeWidth={1.6} />
                  </div>
                  <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#0f172a" }}>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right – decorative */}
          <motion.div {...fade(0.2)}>
            <div
              style={{
                borderRadius: "1.5rem",
                background: LIGHT_BG,
                border: `1px solid rgba(194,65,12,0.12)`,
                padding: "2.5rem",
                minHeight: "280px",
                display: "flex",
                flexDirection: "column" as const,
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center" as const,
                gap: "1.25rem",
              }}
            >
              {[
                { value: "Service", sub: "above self" },
                { value: "Compassion", sub: "in every action" },
                { value: "Hope", sub: "for all communities" },
              ].map(({ value, sub }) => (
                <div key={value}>
                  <div style={{ fontSize: "1.1rem", fontWeight: 800, color: PRIMARY }}>{value}</div>
                  <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{sub}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── THREE COLUMN: WHAT WE DO / FOCUS AREAS / IMPACT ── */}
      <section style={{ background: "#f0f4ff".replace("f0f4ff", "fff8f4"), padding: "5rem 1.5rem" }}>
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
                    boxShadow: "0 2px 8px rgba(194,65,12,0.05)",
                    border: "1px solid #fde8da",
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
                    boxShadow: "0 2px 8px rgba(194,65,12,0.05)",
                    border: "1px solid #fde8da",
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
                    boxShadow: "0 2px 8px rgba(194,65,12,0.05)",
                    border: "1px solid #fde8da",
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
                    <Heart size={18} color={PRIMARY} strokeWidth={1.6} />
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

      {/* ── SMALL ACTIONS. BIG IMPACT. CTA ── */}
      <section
        id="get-involved"
        style={{
          background: "#ffffff",
          padding: "5rem 1.5rem",
          position: "relative",
          overflow: "hidden",
        }}
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
            border: `1px solid rgba(194,65,12,0.1)`,
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
              background: `rgba(194,65,12,0.06)`,
            }}
          />

          {/* Left decorative */}
          <motion.div
            {...fade(0)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "180px",
            }}
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
                boxShadow: `0 12px 32px rgba(194,65,12,0.25)`,
              }}
            >
              <Heart size={64} color="rgba(255,255,255,0.4)" strokeWidth={1} />
            </div>
          </motion.div>

          {/* Center text + buttons */}
          <motion.div {...fade(0.1)} style={{ position: "relative" }}>
            <h2
              style={{
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                fontWeight: 800,
                color: "#0f172a",
                marginBottom: "0.6rem",
              }}
            >
              Small Actions.
              <br />
              Big Impact.
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#64748b", lineHeight: 1.7, marginBottom: "1.75rem" }}>
              Together, we can build a kinder, stronger, and more compassionate
              world.
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
                  boxShadow: `0 4px 14px rgba(194,65,12,0.3)`,
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
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.75rem",
            }}
          >
            {ctaActions.map(({ icon: Icon, label }) => (
              <div
                key={label}
                style={{
                  background: "#ffffff",
                  borderRadius: "0.875rem",
                  padding: "1.1rem 0.75rem",
                  textAlign: "center" as const,
                  boxShadow: "0 2px 8px rgba(194,65,12,0.07)",
                  border: "1px solid #fde8da",
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
            {/* Current: WHG */}
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
                <Heart size={20} color="#fff" strokeWidth={1.6} />
              </div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: PRIMARY }}>Work for Humanity Group</span>
            </div>

            {otherGroups.map(({ slug, abbr, color, bg, Icon }) => (
              <Link
                key={slug}
                to={slug === "lac" ? "/lac" : slug === "hrds" ? "/hrds" : slug === "cwg" ? "/cwg" : slug === "fseds" ? "/fseds" : `/groups/${slug}`}
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
