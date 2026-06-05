import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Globe,
  TrendingUp,
  Briefcase,
  Users,
  Leaf,
  DollarSign,
  Handshake,
  Building,
  GraduationCap,
  BookOpen,
  Home,
  Heart,
  Star,
  Award,
  ArrowRight,
  ChevronRight,
  Scale,
  Trophy,
  Clock,
  MapPin,
  Sprout,
  ShoppingBag,
  TreePine,
  BarChart3,
  Lightbulb,
} from "lucide-react";
import Navbar from "../shared/components/Navbar";
import Footer from "../shared/components/Footer";

const PRIMARY = "#6d28d9";
const SECONDARY = "#7c3aed";
const LIGHT_BG = "#f3f0ff";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: "easeOut" as const },
});

const heroFeatures = [
  { icon: Users, title: "Empower Communities", sub: "Inclusive growth for all" },
  { icon: TrendingUp, title: "Promote Livelihoods", sub: "Sustainable income pathways" },
  { icon: Briefcase, title: "Support Entrepreneurship", sub: "Helping businesses thrive" },
  { icon: Building, title: "Strengthen Local Economies", sub: "Grassroots economic resilience" },
  { icon: Leaf, title: "Drive Sustainable Development", sub: "Progress with purpose" },
];

const missionPillars = [
  { icon: BarChart3, label: "Economic Empowerment" },
  { icon: GraduationCap, label: "Skills & Capacity Building" },
  { icon: TrendingUp, label: "Inclusive Growth" },
  { icon: Briefcase, label: "Sustainable Livelihoods" },
  { icon: Users, label: "Community Prosperity" },
];

const whatWeDo = [
  { icon: TrendingUp, title: "Livelihood Development", desc: "Promoting sustainable income opportunities and decent livelihoods for families and individuals." },
  { icon: Briefcase, title: "Entrepreneurship Support", desc: "Helping small businesses start, grow, and succeed with mentorship and resources." },
  { icon: DollarSign, title: "Financial Inclusion", desc: "Improving access to financial services, banking, and credit resources for underserved communities." },
  { icon: Handshake, title: "Market Linkages", desc: "Connecting producers to markets for better opportunities and fair returns." },
  { icon: Building, title: "Community Infrastructure", desc: "Building essential infrastructure for sustainable community growth and well-being." },
];

const focusAreas = [
  { icon: Sprout, title: "Agriculture & Agri-Business", desc: "Farming, allied sectors & rural enterprise" },
  { icon: ShoppingBag, title: "Small Enterprise Development", desc: "Micro & small business growth support" },
  { icon: Heart, title: "Women Economic Empowerment", desc: "Income, independence & leadership for women" },
  { icon: GraduationCap, title: "Youth Employment & Skills", desc: "Jobs, vocational training & career readiness" },
  { icon: BookOpen, title: "Financial Literacy & Inclusion", desc: "Savings, credit & financial know-how" },
  { icon: TreePine, title: "Sustainable Communities", desc: "Eco-friendly, resilient local systems" },
];

const impactStats = [
  { value: "8,500+", label: "Lives", sub: "Improved" },
  { value: "250+", label: "Small Businesses", sub: "Supported" },
  { value: "120+", label: "Communities", sub: "Reached" },
  { value: "500+", label: "Jobs & Livelihoods", sub: "Created" },
  { value: "100%", label: "Commitment to", sub: "Sustainable Growth" },
];

const ctaActions = [
  { icon: Clock, label: "Volunteer Your Time" },
  { icon: TrendingUp, label: "Support Local Initiatives" },
  { icon: Lightbulb, label: "Share Resources" },
  { icon: Star, label: "Be the Change" },
];

const bottomStats = [
  { icon: Award, value: "8+", label: "Years of Impact" },
  { icon: Users, value: "50+", label: "Active Volunteers" },
  { icon: Briefcase, value: "80+", label: "Projects Implemented" },
  { icon: Handshake, value: "15+", label: "Partner Organizations" },
  { icon: Home, value: "Countless", label: "Communities Transformed" },
];

const otherGroups = [
  { slug: "lac", abbr: "LAC", label: "Legal Aid Club", color: "#1a3270", bg: "#eef1fb", Icon: Scale },
  { slug: "whg", abbr: "WHG", label: "Work for Humanity Group", color: "#c2410c", bg: "#fff4ec", Icon: Heart },
  { slug: "hrds", abbr: "HRDS", label: "Human Resources Developmental Society", color: "#15803d", bg: "#edf7f1", Icon: Users },
  { slug: "cwg", abbr: "CWG", label: "Competitive World Group", color: "#0f766e", bg: "#e8f7f6", Icon: Trophy },
];

export default function FsedsPage() {
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
            background: "radial-gradient(ellipse at 70% 40%, rgba(109,40,217,0.07) 0%, rgba(124,58,237,0.04) 45%, transparent 70%)",
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
            <span style={{ color: PRIMARY, fontWeight: 600 }}>Foundation for Socio-Economic Development Society</span>
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
                    boxShadow: `0 4px 20px rgba(109,40,217,0.3)`,
                    flexShrink: 0,
                  }}
                >
                  <Globe size={30} color="#ffffff" strokeWidth={1.5} />
                </div>
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase" as const,
                    color: PRIMARY,
                    lineHeight: 1.4,
                    maxWidth: "200px",
                  }}
                >
                  Foundation for Socio-Economic Development Society
                </span>
              </motion.div>

              {/* Multi-line heading matching screenshot */}
              <motion.h1
                {...fade(0.1)}
                style={{
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  fontWeight: 800,
                  color: "#0f172a",
                  lineHeight: 1.1,
                  marginBottom: "0",
                  letterSpacing: "-0.01em",
                }}
              >
                Foundation for
              </motion.h1>
              <motion.h1
                {...fade(0.12)}
                style={{
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  fontWeight: 800,
                  color: PRIMARY,
                  lineHeight: 1.1,
                  marginBottom: "0",
                  letterSpacing: "-0.01em",
                }}
              >
                Socio-Economic
              </motion.h1>
              <motion.h1
                {...fade(0.14)}
                style={{
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  fontWeight: 800,
                  color: "#0f172a",
                  lineHeight: 1.1,
                  marginBottom: "0.5rem",
                  letterSpacing: "-0.01em",
                }}
              >
                Development Society
              </motion.h1>

              <motion.p
                {...fade(0.16)}
                style={{
                  fontFamily: "Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
                  color: PRIMARY,
                  marginBottom: "0.5rem",
                  fontWeight: 400,
                  lineHeight: 1.35,
                }}
              >
                Building communities through
                <br />
                economic empowerment
              </motion.p>

              <div style={{ width: "56px", height: "3px", background: PRIMARY, borderRadius: "2px", marginBottom: "1.25rem" }} />

              <motion.p
                {...fade(0.2)}
                style={{ fontSize: "0.95rem", color: "#475569", lineHeight: 1.75, marginBottom: "2rem", maxWidth: "420px" }}
              >
                We work to create sustainable livelihoods, promote entrepreneurship,
                and strengthen local economies so communities can thrive with
                dignity and self-reliance.
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
                    boxShadow: `0 4px 14px rgba(109,40,217,0.3)`,
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

            {/* Right – Quote card */}
            <motion.div {...fade(0.15)} style={{ position: "relative", display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "radial-gradient(ellipse at 50% 50%, rgba(109,40,217,0.1) 0%, transparent 70%)",
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
                  boxShadow: `0 20px 60px rgba(109,40,217,0.15)`,
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

                {/* Large quote mark */}
                <div
                  style={{
                    fontSize: "5rem",
                    color: "rgba(255,255,255,0.25)",
                    lineHeight: 1,
                    fontFamily: "Georgia, serif",
                    marginBottom: "0.5rem",
                    position: "relative",
                  }}
                >
                  "
                </div>
                <p
                  style={{
                    fontFamily: "Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "1.15rem",
                    color: "#ffffff",
                    lineHeight: 1.65,
                    position: "relative",
                    marginBottom: "1.5rem",
                  }}
                >
                  Strong economies build strong communities. Empowered people build a brighter future for all.
                </p>

                {/* Mini chart decoration */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "0.4rem",
                    position: "relative",
                  }}
                >
                  {[40, 60, 50, 75, 65, 90].map((h, i) => (
                    <div
                      key={i}
                      style={{
                        width: "14px",
                        height: `${h * 0.5}px`,
                        borderRadius: "3px 3px 0 0",
                        background: i === 5 ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
                      }}
                    />
                  ))}
                  <TrendingUp size={18} color="rgba(255,255,255,0.7)" style={{ marginLeft: "0.25rem", marginBottom: "0.2rem" }} />
                </div>
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
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
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
          {/* Left – Empower Educate Elevate visual */}
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
                boxShadow: `0 16px 48px rgba(109,40,217,0.2)`,
              }}
            >
              <div style={{ position: "absolute", top: "-50px", right: "-50px", width: "180px", height: "180px", borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
              <div style={{ position: "absolute", bottom: "-30px", left: "-30px", width: "120px", height: "120px", borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
              <Globe size={52} color="rgba(255,255,255,0.2)" strokeWidth={1} style={{ marginBottom: "1.5rem", position: "relative" }} />
              {["EMPOWER", "EDUCATE", "ELEVATE"].map((word, i) => (
                <div
                  key={word}
                  style={{
                    fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)",
                    fontWeight: 800,
                    color: i === 1 ? "rgba(255,255,255,0.55)" : "#ffffff",
                    letterSpacing: "0.04em",
                    lineHeight: 1.3,
                    position: "relative",
                  }}
                >
                  {word}
                </div>
              ))}
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
              Our mission is to foster inclusive economic growth by providing
              resources, skills, and opportunities that enable individuals and
              communities to achieve lasting prosperity.
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
                    boxShadow: "0 2px 8px rgba(109,40,217,0.06)",
                    border: "1px solid #e4d9ff",
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

          {/* Right – community visual */}
          <motion.div {...fade(0.2)}>
            <div
              style={{
                borderRadius: "1.5rem",
                background: LIGHT_BG,
                border: `1px solid rgba(109,40,217,0.12)`,
                padding: "2.5rem",
                minHeight: "300px",
                display: "flex",
                flexDirection: "column" as const,
                justifyContent: "center",
                gap: "1.25rem",
              }}
            >
              {[
                { label: "Grow", sub: "Build skills and capabilities" },
                { label: "Earn", sub: "Create sustainable livelihoods" },
                { label: "Prosper", sub: "Strengthen local economies" },
                { label: "Transform", sub: "Change lives, build communities" },
              ].map(({ label, sub }, i) => (
                <div
                  key={label}
                  style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}
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
      <section style={{ background: "#faf5ff", padding: "5rem 1.5rem" }}>
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
                    boxShadow: "0 2px 8px rgba(109,40,217,0.05)",
                    border: "1px solid #e4d9ff",
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
                    boxShadow: "0 2px 8px rgba(109,40,217,0.05)",
                    border: "1px solid #e4d9ff",
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
                    boxShadow: "0 2px 8px rgba(109,40,217,0.05)",
                    border: "1px solid #e4d9ff",
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
                    <Globe size={18} color={PRIMARY} strokeWidth={1.6} />
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

      {/* ── EMPOWERED COMMUNITIES CTA ── */}
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
            border: `1px solid rgba(109,40,217,0.1)`,
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
              background: `rgba(109,40,217,0.06)`,
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
                boxShadow: `0 12px 32px rgba(109,40,217,0.25)`,
                position: "relative",
              }}
            >
              {/* Decorative bar chart inside */}
              <div style={{ display: "flex", alignItems: "flex-end", gap: "5px" }}>
                {[28, 44, 36, 56, 48, 64].map((h, i) => (
                  <div
                    key={i}
                    style={{
                      width: "10px",
                      height: `${h * 0.6}px`,
                      borderRadius: "2px 2px 0 0",
                      background: i === 5 ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.35)",
                    }}
                  />
                ))}
              </div>
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
              TOGETHER WE RISE
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
              Your support creates ripples of economic change. Join us in
              shaping thriving, self-reliant communities.
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
                  boxShadow: `0 4px 14px rgba(109,40,217,0.3)`,
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
                  boxShadow: "0 2px 8px rgba(109,40,217,0.07)",
                  border: "1px solid #e4d9ff",
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
            {/* Current: FSEDS */}
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
                <Globe size={20} color="#fff" strokeWidth={1.6} />
              </div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: PRIMARY, maxWidth: "90px", textAlign: "center" as const }}>
                FSEDS
              </span>
            </div>

            {otherGroups.map(({ slug, abbr, color, bg, Icon }) => (
              <Link
                key={slug}
                to={slug === "lac" ? "/lac" : slug === "whg" ? "/whg" : slug === "hrds" ? "/hrds" : slug === "cwg" ? "/cwg" : `/groups/${slug}`}
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
