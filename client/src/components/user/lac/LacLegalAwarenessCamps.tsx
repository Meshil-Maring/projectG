import { motion } from "framer-motion";
import { Scale, GraduationCap, Users, Megaphone, Phone, Calendar } from "lucide-react";
import { NAV_BLUE, BRIGHT_BLUE, GOLD, fade } from "./lac.constants";
import { usePageSections } from "../../../context/PageContext";

const DEFAULT_CAMPS = {
  eyebrow: "Our Programs",
  heading: "Legal Awareness Camps",
  tagline: "Rights · Laws · Constitution",
  description:
    "We bring legal knowledge directly to communities through hands-on programs, making rights accessible to everyone — regardless of background or education.",
  bannerHeading: "Want us to organize a camp in your area?",
  bannerDescription:
    "Reach out and we'll work with your school, college, or community organization.",
};

const programs = [
  {
    icon: Scale,
    title: "Workshops on Rights & Laws",
    desc: "In-depth sessions on Fundamental Rights, RTI, Cyber Law, and Consumer Law to empower citizens with legal knowledge.",
  },
  {
    icon: GraduationCap,
    title: "Legal Literacy in Education",
    desc: "Structured legal literacy programs conducted in schools and colleges to build awareness from the ground up.",
  },
  {
    icon: Users,
    title: "Rights Awareness Drives",
    desc: "Targeted campaigns covering women's rights, child rights, and senior citizen laws across communities.",
  },
  {
    icon: Megaphone,
    title: "Street Plays & Competitions",
    desc: "Engaging street plays, debates, and essay competitions that bring legal themes to life for wider audiences.",
  },
  {
    icon: Phone,
    title: "Legal Aid Referral Support",
    desc: "Connecting individuals with legal professionals for guidance, ensuring no one faces legal challenges alone.",
  },
  {
    icon: Calendar,
    title: "Legal Observance Days",
    desc: "Marking Constitution Day, Legal Services Day, and Human Rights Day with events that inspire civic pride.",
  },
];

export default function LacLegalAwarenessCamps() {
  const { getSectionData } = usePageSections();
  const camps = { ...DEFAULT_CAMPS, ...getSectionData("lac-camps") };

  return (
    <section style={{ background: "#ffffff", padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* Header */}
        <motion.div {...fade(0)} style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 3.5rem" }}>
          <span style={{
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase" as const,
            color: BRIGHT_BLUE,
            display: "block",
            marginBottom: "0.6rem",
          }}>
            {camps.eyebrow}
          </span>
          <h2 style={{
            fontSize: "clamp(1.5rem, 3vw, 2.1rem)",
            fontWeight: 800,
            color: NAV_BLUE,
            lineHeight: 1.2,
            marginBottom: "0.75rem",
          }}>
            {camps.heading}
          </h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <div style={{ height: "3px", width: "32px", background: GOLD, borderRadius: "2px" }} />
            <span style={{ fontSize: "0.78rem", fontWeight: 600, color: BRIGHT_BLUE, letterSpacing: "0.06em" }}>
              {camps.tagline}
            </span>
            <div style={{ height: "3px", width: "32px", background: GOLD, borderRadius: "2px" }} />
          </div>
          <p style={{ fontSize: "0.9rem", color: "#475569", lineHeight: 1.8 }}>
            {camps.description}
          </p>
        </motion.div>

        {/* Program Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1.5rem",
        }}>
          {programs.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              {...fade(0.08 * i)}
              style={{
                background: "#f8faff",
                borderRadius: "1.25rem",
                padding: "1.75rem",
                border: "1px solid #e2e8f8",
                boxShadow: "0 2px 14px rgba(26,50,112,0.05)",
                display: "flex",
                flexDirection: "column" as const,
                gap: "1rem",
              }}
            >
              <div style={{
                width: "52px",
                height: "52px",
                borderRadius: "14px",
                background: `linear-gradient(135deg, ${NAV_BLUE} 0%, ${BRIGHT_BLUE} 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}>
                <Icon size={24} color="#ffffff" strokeWidth={1.6} />
              </div>
              <div>
                <h3 style={{
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: "#0f172a",
                  marginBottom: "0.5rem",
                  lineHeight: 1.35,
                }}>
                  {title}
                </h3>
                <p style={{
                  fontSize: "0.82rem",
                  color: "#64748b",
                  lineHeight: 1.7,
                  margin: 0,
                }}>
                  {desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom accent banner */}
        <motion.div
          {...fade(0.55)}
          style={{
            marginTop: "3rem",
            borderRadius: "1.25rem",
            background: `linear-gradient(135deg, ${NAV_BLUE} 0%, ${BRIGHT_BLUE} 100%)`,
            padding: "2rem 2.5rem",
            display: "flex",
            flexWrap: "wrap" as const,
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.5rem",
          }}
        >
          <div>
            <p style={{ fontSize: "1rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.35rem" }}>
              {camps.bannerHeading}
            </p>
            <p style={{ fontSize: "0.83rem", color: "rgba(255,255,255,0.75)", margin: 0 }}>
              {camps.bannerDescription}
            </p>
          </div>
          <a
            href="#contact-section"
            style={{
              background: GOLD,
              color: "#fff",
              padding: "0.7rem 1.75rem",
              borderRadius: "0.5rem",
              fontWeight: 700,
              fontSize: "0.875rem",
              textDecoration: "none",
              whiteSpace: "nowrap" as const,
              flexShrink: 0,
            }}
          >
            Contact Us
          </a>
        </motion.div>

      </div>
    </section>
  );
}
