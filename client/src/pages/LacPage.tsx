import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Scale,
  BookOpen,
  Users,
  FileText,
  Megaphone,
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  Shield,
  DollarSign,
  Globe,
  Wifi,
  ArrowRight,
  ChevronRight,
  Heart,
  Trophy,
} from "lucide-react";
import Navbar from "../shared/components/Navbar";
import Footer from "../shared/components/Footer";

const NAV_BLUE = "#1a3270";
const BRIGHT_BLUE = "#2563eb";
const GOLD = "#b8860b";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: "easeOut" as const },
});

const services = [
  {
    icon: BookOpen,
    title: "Legal Awareness",
    subtitle: "Legal Awareness Camps (Rights, Laws, Constitution)",
    desc: "Conducting sessions on fundamental rights, laws, and entitlements.",
    bullets: [
      "Workshops on Fundamental Rights, RTI, Cyber Law, Consumer Law",
      "Legal literacy programs in schools and colleges",
      "Awareness drives on women's rights, child rights, and senior citizen laws",
      "Street plays, debates, essay competitions on legal themes",
      "Legal aid referral support (in coordination with legal professionals)",
      "Observance of Constitution Day, Legal Services Day, Human Rights Day",
    ],
  },
  {
    icon: Scale,
    title: "Legal Assistance",
    subtitle: undefined,
    desc: "Offering free legal advice and guidance to those in need.",
    bullets: undefined,
  },
  {
    icon: FileText,
    title: "Documentation Support",
    subtitle: undefined,
    desc: "Helping with legal paperwork, applications, and petitions.",
    bullets: undefined,
  },
  {
    icon: Megaphone,
    title: "Community Advocacy",
    subtitle: undefined,
    desc: "Standing up for justice and supporting vulnerable communities.",
    bullets: undefined,
  },
  {
    icon: GraduationCap,
    title: "Capacity Building",
    subtitle: undefined,
    desc: "Training volunteers and students to become legal literacy champions.",
    bullets: undefined,
  },
];

const heroFeatures = [
  { icon: Scale, title: "Know Your Rights", sub: "Legal awareness for all" },
  {
    icon: BookOpen,
    title: "Free Guidance",
    sub: "Accessible legal advice",
  },
  {
    icon: Users,
    title: "Empower Communities",
    sub: "Building a just and equal society",
  },
  {
    icon: Shield,
    title: "Protect & Support",
    sub: "Upholding rights, dignity & fairness",
  },
  {
    icon: Megaphone,
    title: "Advocate for Change",
    sub: "Creating systemic impact",
  },
];

const stats = [
  { value: "3,200+", label: "People Provided", sub: "Legal Support" },
  { value: "150+", label: "Legal Awareness", sub: "Sessions Conducted" },
  { value: "800+", label: "Cases", sub: "Assisted" },
  { value: "50+", label: "Communities", sub: "Reached" },
  { value: "120+", label: "Active Student", sub: "Volunteers" },
];

const contactFeatures = [
  {
    icon: Shield,
    title: "Confidential",
    desc: "Your privacy is our priority.",
  },
  {
    icon: DollarSign,
    title: "Free of Cost",
    desc: "Our services are completely free.",
  },
  {
    icon: Globe,
    title: "For Everyone",
    desc: "We serve all, without discrimination.",
  },
  {
    icon: Wifi,
    title: "Easy to Access",
    desc: "Multiple ways to reach us anywhere, anytime.",
  },
];

const otherGroups = [
  {
    slug: "whg",
    abbr: "WHG",
    label: "Work for Humanity Group",
    color: "#c2410c",
    bg: "#fff4ec",
    Icon: Heart,
  },
  {
    slug: "hrds",
    abbr: "HRDS",
    label: "Human Resources Developmental Society",
    color: "#15803d",
    bg: "#edf7f1",
    Icon: Users,
  },
  {
    slug: "fseds",
    abbr: "FSEDS",
    label: "Foundation for Socio-Economic Development Society",
    color: "#6d28d9",
    bg: "#f3f0ff",
    Icon: Globe,
  },
  {
    slug: "cwg",
    abbr: "CWG",
    label: "Competitive World Group",
    color: "#0f766e",
    bg: "#e8f7f6",
    Icon: Trophy,
  },
];

export default function LacPage() {
  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", overflowX: "hidden" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section
        style={{
          background: "#ffffff",
          paddingTop: "5.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Watercolor blob background */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "55%",
            height: "100%",
            background:
              "radial-gradient(ellipse at 70% 40%, rgba(37,99,235,0.08) 0%, rgba(37,99,235,0.04) 45%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          {/* Breadcrumb */}
          <motion.div
            {...fade(0)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.78rem",
              color: "#64748b",
              marginBottom: "2.5rem",
            }}
          >
            <Link to="/" style={{ color: "#64748b", textDecoration: "none" }}>
              Home
            </Link>
            <ChevronRight size={13} />
            <span>Our Communities</span>
            <ChevronRight size={13} />
            <span style={{ color: NAV_BLUE, fontWeight: 600 }}>Legal Aid Club</span>
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
              {/* Badge */}
              <motion.div {...fade(0.05)} style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "12px",
                    background: `linear-gradient(135deg, ${NAV_BLUE} 0%, ${BRIGHT_BLUE} 100%)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 20px rgba(26,50,112,0.3)",
                    flexShrink: 0,
                  }}
                >
                  <Scale size={30} color="#ffffff" strokeWidth={1.5} />
                </div>
              </motion.div>

              <motion.h1
                {...fade(0.1)}
                style={{
                  fontSize: "clamp(2rem, 4.5vw, 3rem)",
                  fontWeight: 800,
                  color: NAV_BLUE,
                  lineHeight: 1.15,
                  marginBottom: "0.6rem",
                  letterSpacing: "-0.01em",
                }}
              >
                LEGAL AID CLUB
              </motion.h1>

              <motion.p
                {...fade(0.15)}
                style={{
                  fontFamily: "Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                  color: GOLD,
                  marginBottom: "1.25rem",
                  fontWeight: 400,
                  lineHeight: 1.4,
                }}
              >
                Justice for all, barriers for none
              </motion.p>

              <motion.p
                {...fade(0.2)}
                style={{
                  fontSize: "0.95rem",
                  color: "#475569",
                  lineHeight: 1.75,
                  marginBottom: "2rem",
                  maxWidth: "420px",
                }}
              >
                We believe everyone has the right to justice. The Legal Aid Club
                works to break down legal barriers and empower individuals and
                communities with knowledge, support, and advocacy.
              </motion.p>

              <motion.div {...fade(0.25)} style={{ display: "flex", gap: "1rem", flexWrap: "wrap" as const }}>
                <a
                  href="#contact-section"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    background: `linear-gradient(135deg, ${NAV_BLUE} 0%, ${BRIGHT_BLUE} 100%)`,
                    color: "#fff",
                    padding: "0.75rem 1.75rem",
                    borderRadius: "0.5rem",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    textDecoration: "none",
                    boxShadow: "0 4px 14px rgba(26,50,112,0.3)",
                  }}
                >
                  <Users size={16} />
                  Get Legal Help
                </a>
                <a
                  href="/#contact"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    border: `2px solid ${NAV_BLUE}`,
                    color: NAV_BLUE,
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

            {/* Right – decorative visual */}
            <motion.div
              {...fade(0.15)}
              style={{ position: "relative", display: "flex", justifyContent: "center" }}
            >
              {/* Ink/watercolor blob */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(ellipse at 50% 50%, rgba(37,99,235,0.12) 0%, transparent 70%)",
                  borderRadius: "50%",
                  transform: "scale(1.2)",
                }}
              />
              {/* Main card */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "460px",
                  borderRadius: "1.5rem",
                  overflow: "hidden",
                  boxShadow: "0 20px 60px rgba(26,50,112,0.15)",
                  background: `linear-gradient(145deg, ${NAV_BLUE} 0%, ${BRIGHT_BLUE} 100%)`,
                  padding: "3rem 2.5rem",
                  minHeight: "320px",
                  display: "flex",
                  flexDirection: "column" as const,
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center" as const,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-60px",
                    right: "-60px",
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.06)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "-40px",
                    left: "-40px",
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.05)",
                  }}
                />
                <Scale
                  size={80}
                  color="rgba(255,255,255,0.2)"
                  strokeWidth={1}
                  style={{ marginBottom: "1rem", position: "relative" }}
                />
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
                  "Justice for all,
                  <br />
                  barriers for none"
                </h2>
                <p
                  style={{
                    color: "rgba(255,255,255,0.65)",
                    fontSize: "0.82rem",
                    marginTop: "0.75rem",
                    position: "relative",
                  }}
                >
                  Legal Aid Club · Project Generation
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
              <div
                key={title}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.65rem",
                }}
              >
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "10px",
                    background: "#eef1fb",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={18} color={NAV_BLUE} strokeWidth={1.6} />
                </div>
                <div>
                  <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#0f172a" }}>
                    {title}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "#94a3b8", lineHeight: 1.4 }}>
                    {sub}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── WHAT WE DO ── */}
      <section style={{ background: "#f0f4ff", padding: "5rem 1.5rem" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "4rem",
            alignItems: "start",
          }}
        >
          {/* Left */}
          <motion.div {...fade(0)}>
            <span
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase" as const,
                color: BRIGHT_BLUE,
                display: "block",
                marginBottom: "0.75rem",
              }}
            >
              WHAT WE DO
            </span>
            <h2
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 800,
                color: NAV_BLUE,
                lineHeight: 1.25,
                marginBottom: "1.25rem",
              }}
            >
              Bridging the Gap Between Rights &amp; Access
            </h2>
            <div
              style={{
                width: "48px",
                height: "4px",
                background: GOLD,
                borderRadius: "2px",
                marginBottom: "1.25rem",
              }}
            />
            <p
              style={{
                fontSize: "0.9rem",
                color: "#475569",
                lineHeight: 1.8,
                marginBottom: "2rem",
              }}
            >
              The Legal Aid Club provides free legal support, awareness programs,
              and resources to help individuals navigate their rights and access
              justice with confidence.
            </p>

            {/* Decorative gavel illustration area */}
            <div
              style={{
                borderRadius: "1.25rem",
                background: `linear-gradient(145deg, ${NAV_BLUE} 0%, ${BRIGHT_BLUE} 100%)`,
                padding: "2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "160px",
                marginBottom: "1.75rem",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  bottom: "-30px",
                  right: "-30px",
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.06)",
                }}
              />
              <Scale size={72} color="rgba(255,255,255,0.25)" strokeWidth={1} />
            </div>

            <a
              href="#services"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: NAV_BLUE,
                color: "#fff",
                padding: "0.75rem 1.75rem",
                borderRadius: "0.5rem",
                fontWeight: 700,
                fontSize: "0.875rem",
                textDecoration: "none",
              }}
            >
              Explore Our Work
              <ArrowRight size={15} />
            </a>
          </motion.div>

          {/* Right – service cards */}
          <div
            id="services"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            {services.map(({ icon: Icon, title, subtitle, desc, bullets }, i) => (
              <motion.div
                key={title}
                {...fade(0.1 * i)}
                style={{
                  background: "#ffffff",
                  borderRadius: "1rem",
                  padding: "1.5rem",
                  boxShadow: "0 2px 12px rgba(26,50,112,0.06)",
                  border: "1px solid #e8edf8",
                  ...(i === 0 ? { gridColumn: "1 / -1" } : {}),
                  ...(i === 0 ? { display: "grid", gridTemplateColumns: "auto 1fr", gap: "1.25rem", alignItems: "start" } : {}),
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "#eef1fb",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    ...(i !== 0 ? { marginBottom: "1rem" } : {}),
                  }}
                >
                  <Icon size={22} color={NAV_BLUE} strokeWidth={1.6} />
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      color: "#0f172a",
                      marginBottom: subtitle ? "0.2rem" : "0.4rem",
                    }}
                  >
                    {title}
                  </h3>
                  {subtitle && (
                    <p
                      style={{
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        color: BRIGHT_BLUE,
                        marginBottom: "0.6rem",
                      }}
                    >
                      {subtitle}
                    </p>
                  )}
                  <p style={{ fontSize: "0.8rem", color: "#64748b", lineHeight: 1.65, marginBottom: bullets ? "0.75rem" : 0 }}>
                    {desc}
                  </p>
                  {bullets && (
                    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "0.45rem" }}>
                      {bullets.map((b) => (
                        <li key={b} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.8rem", color: "#475569", lineHeight: 1.55 }}>
                          <span style={{ color: BRIGHT_BLUE, fontWeight: 700, flexShrink: 0, marginTop: "0.1rem" }}>✔</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR IMPACT ── */}
      <section style={{ background: "#faf9f5", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 3fr",
              gap: "3rem",
              alignItems: "center",
            }}
          >
            <motion.div {...fade(0)}>
              <h2
                style={{
                  fontSize: "clamp(1.4rem, 2.8vw, 1.8rem)",
                  fontWeight: 800,
                  color: "#0f172a",
                  marginBottom: "0.75rem",
                }}
              >
                Our Impact
              </h2>
              <p style={{ fontSize: "0.875rem", color: "#64748b", lineHeight: 1.7 }}>
                Through legal knowledge and support, we are creating a fairer,
                more just society.
              </p>
            </motion.div>

            <motion.div
              {...fade(0.1)}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: "0.5rem",
              }}
            >
              {stats.map(({ value, label, sub }, i) => (
                <motion.div
                  key={value}
                  {...fade(0.05 * i)}
                  style={{
                    textAlign: "center" as const,
                    background: "#fff",
                    borderRadius: "1rem",
                    padding: "1.5rem 0.75rem",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                    border: "1px solid #f1f5f9",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "#eef1fb",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 0.75rem",
                    }}
                  >
                    <Scale size={18} color={NAV_BLUE} strokeWidth={1.6} />
                  </div>
                  <div
                    style={{
                      fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)",
                      fontWeight: 800,
                      color: NAV_BLUE,
                      lineHeight: 1,
                      marginBottom: "0.4rem",
                    }}
                  >
                    {value}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#475569", fontWeight: 600, lineHeight: 1.3 }}>
                    {label}
                    <br />
                    <span style={{ color: "#94a3b8", fontWeight: 500 }}>{sub}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── NEED LEGAL HELP ── */}
      <section
        id="contact-section"
        style={{ background: NAV_BLUE, padding: "5rem 1.5rem", position: "relative", overflow: "hidden" }}
      >
        {/* Decorative blobs */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.04)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            left: "30%",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.03)",
          }}
        />

        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
            position: "relative",
          }}
        >
          {/* Left */}
          <motion.div {...fade(0)}>
            <h2
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                fontWeight: 800,
                color: "#ffffff",
                marginBottom: "0.5rem",
              }}
            >
              Need Legal Help?
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "0.9rem",
                marginBottom: "2rem",
                lineHeight: 1.6,
              }}
            >
              We&apos;re here to listen and help you take the first step towards
              your rights.
            </p>

            {/* Contact info */}
            <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.75rem", marginBottom: "2.5rem" }}>
              {[
                { Icon: Phone, text: "+91 98765 43210" },
                { Icon: Mail, text: "legalaid@helpinghands.org" },
                { Icon: MapPin, text: "123, Helping Hands Center, New Delhi – 110001" },
              ].map(({ Icon, text }) => (
                <div
                  key={text}
                  style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}
                >
                  <div
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "8px",
                      background: "rgba(255,255,255,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={15} color="#ffffff" />
                  </div>
                  <span
                    style={{
                      color: "rgba(255,255,255,0.85)",
                      fontSize: "0.875rem",
                      paddingTop: "0.45rem",
                      lineHeight: 1.5,
                    }}
                  >
                    {text}
                  </span>
                </div>
              ))}
            </div>

            {/* Feature bullets */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.85rem",
              }}
            >
              {contactFeatures.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem" }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "8px",
                      background: "rgba(255,255,255,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={14} color="rgba(255,255,255,0.85)" />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "0.82rem",
                        fontWeight: 700,
                        color: "#ffffff",
                        marginBottom: "0.15rem",
                      }}
                    >
                      {title}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.6)" }}>
                      {desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right – visual card */}
          <motion.div {...fade(0.15)}>
            <div
              style={{
                borderRadius: "1.5rem",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                padding: "3rem 2rem",
                textAlign: "center" as const,
                position: "relative",
                overflow: "hidden",
                minHeight: "360px",
                display: "flex",
                flexDirection: "column" as const,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-40px",
                  left: "-40px",
                  width: "140px",
                  height: "140px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.05)",
                }}
              />
              <Scale
                size={64}
                color="rgba(255,255,255,0.3)"
                strokeWidth={1}
                style={{ marginBottom: "1.5rem", position: "relative" }}
              />
              <blockquote
                style={{
                  fontFamily: "Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "1.35rem",
                  color: "#ffffff",
                  lineHeight: 1.5,
                  margin: "0 0 1rem",
                  position: "relative",
                }}
              >
                "Justice for all,
                <br />
                barriers for none"
              </blockquote>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.8rem" }}>
                Our commitment to every person we serve
              </p>

              <div
                style={{
                  marginTop: "2rem",
                  display: "flex",
                  gap: "0.75rem",
                  justifyContent: "center",
                  flexWrap: "wrap" as const,
                }}
              >
                <div
                  style={{
                    padding: "0.4rem 1.1rem",
                    background: "rgba(255,255,255,0.12)",
                    borderRadius: "999px",
                    color: "rgba(255,255,255,0.85)",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                  }}
                >
                  Free Services
                </div>
                <div
                  style={{
                    padding: "0.4rem 1.1rem",
                    background: "rgba(255,255,255,0.12)",
                    borderRadius: "999px",
                    color: "rgba(255,255,255,0.85)",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                  }}
                >
                  Confidential
                </div>
                <div
                  style={{
                    padding: "0.4rem 1.1rem",
                    background: "rgba(255,255,255,0.12)",
                    borderRadius: "999px",
                    color: "rgba(255,255,255,0.85)",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                  }}
                >
                  For Everyone
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── BE THE VOICE CTA ── */}
      <section
        style={{
          background: "#ffffff",
          padding: "5.5rem 1.5rem",
          textAlign: "center" as const,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Left decorative */}
        <div
          style={{
            position: "absolute",
            left: "5%",
            top: "50%",
            transform: "translateY(-50%)",
            opacity: 0.07,
          }}
        >
          <Scale size={120} color={NAV_BLUE} strokeWidth={1} />
        </div>
        {/* Right decorative hands */}
        <div
          style={{
            position: "absolute",
            right: "5%",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            gap: "0.3rem",
            opacity: 0.07,
          }}
        >
          {[...Array(4)].map((_, i) => (
            <Users key={i} size={40 + i * 8} color={NAV_BLUE} strokeWidth={1} />
          ))}
        </div>

        <motion.div {...fade(0)} style={{ position: "relative" }}>
          <h2
            style={{
              fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
              fontWeight: 800,
              color: "#0f172a",
              marginBottom: "0.75rem",
            }}
          >
            Be the Voice of Justice
          </h2>
          <p
            style={{
              fontSize: "0.95rem",
              color: "#64748b",
              marginBottom: "2.5rem",
              maxWidth: "480px",
              margin: "0 auto 2.5rem",
              lineHeight: 1.7,
            }}
          >
            Join the Legal Aid Club and help us build a world where justice is
            not a privilege, but a right.
          </p>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap" as const,
            }}
          >
            <a
              href="/#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: `linear-gradient(135deg, ${NAV_BLUE} 0%, ${BRIGHT_BLUE} 100%)`,
                color: "#fff",
                padding: "0.8rem 2rem",
                borderRadius: "0.5rem",
                fontWeight: 700,
                fontSize: "0.9rem",
                textDecoration: "none",
                boxShadow: "0 4px 14px rgba(26,50,112,0.25)",
              }}
            >
              Join Now
              <ArrowRight size={15} />
            </a>
            <a
              href="/#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                border: `2px solid ${NAV_BLUE}`,
                color: NAV_BLUE,
                padding: "0.78rem 2rem",
                borderRadius: "0.5rem",
                fontWeight: 700,
                fontSize: "0.9rem",
                textDecoration: "none",
                background: "transparent",
              }}
            >
              <Users size={15} />
              Volunteer With Us
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── EXPLORE OTHER COMMUNITIES ── */}
      <section style={{ background: "#f8fafc", padding: "3rem 1.5rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" as const }}>
          <motion.h3
            {...fade(0)}
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              color: "#0f172a",
              marginBottom: "1.5rem",
              letterSpacing: "0.02em",
            }}
          >
            Explore Our Five Communities
          </motion.h3>
          <motion.div
            {...fade(0.1)}
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              flexWrap: "wrap" as const,
            }}
          >
            {/* Current: LAC */}
            <div
              style={{
                display: "flex",
                flexDirection: "column" as const,
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.25rem",
                borderRadius: "1rem",
                background: "#eef1fb",
                border: `2px solid ${NAV_BLUE}`,
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: NAV_BLUE,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Scale size={20} color="#fff" strokeWidth={1.6} />
              </div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: NAV_BLUE }}>
                Legal Aid Club
              </span>
            </div>

            {otherGroups.map(({ slug, abbr, label, color, bg, Icon }) => (
              <Link
                key={slug}
                to={`/groups/${slug}`}
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
