import { motion } from "framer-motion";
import {
  Scale,
  BookOpen,
  FileText,
  Megaphone,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Users,
  Shield,
} from "lucide-react";
import { NAV_BLUE, BRIGHT_BLUE, GOLD, fade } from "./lac.constants";
import { usePageSections } from "../../../context/PageContext";

const DEFAULT_MISSION = {
  eyebrow: "WHAT WE DO",
  description:
    "The Legal Aid Club provides free legal support, awareness programs, and resources to help individuals navigate their rights and access justice with confidence.",
};

const services = [
  {
    icon: Scale,
    title: "Legal Assistance",
    desc: "Offering free legal advice and guidance to those in need.",
    color: "#2563eb",
    bg: "#eff6ff",
  },
  {
    icon: FileText,
    title: "Documentation Support",
    desc: "Helping with legal paperwork, applications, and petitions.",
    color: "#7c3aed",
    bg: "#f5f3ff",
  },
  {
    icon: Megaphone,
    title: "Community Advocacy",
    desc: "Standing up for justice and supporting vulnerable communities.",
    color: "#0891b2",
    bg: "#ecfeff",
  },
  {
    icon: GraduationCap,
    title: "Capacity Building",
    desc: "Training volunteers and students to become legal literacy champions.",
    color: "#059669",
    bg: "#ecfdf5",
  },
];

const bullets = [
  "Workshops on Fundamental Rights, RTI, Cyber Law, Consumer Law",
  "Legal literacy programs in schools and colleges",
  "Awareness drives on women's rights, child rights, and senior citizen laws",
  "Street plays, debates, essay competitions on legal themes",
  "Legal aid referral support (in coordination with legal professionals)",
  "Observance of Constitution Day, Legal Services Day, Human Rights Day",
];

const stats = [
  { icon: Users, value: "5+", label: "Core Programs" },
  { icon: Shield, value: "Free", label: "Legal Support" },
  { icon: Scale, value: "100%", label: "Confidential" },
];

export default function LacWhatWeDo() {
  const { getSectionData } = usePageSections();
  const mission = { ...DEFAULT_MISSION, ...getSectionData("lac-mission") };

  return (
    <section
      style={{
        background: "linear-gradient(160deg, #f8faff 0%, #eef2ff 100%)",
        padding: "5rem 1.5rem",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Decorative bg blobs */}
      <div
        style={{
          position: "absolute",
          top: "-80px",
          right: "-80px",
          width: "380px",
          height: "380px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-60px",
          left: "-60px",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(26,50,112,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* ─── Top: label + title ─── */}
        <motion.div
          {...fade(0)}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <span
            style={{
              display: "inline-block",
              background: `linear-gradient(135deg, ${BRIGHT_BLUE}, #7c3aed)`,
              color: "#fff",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase" as const,
              padding: "0.35rem 1rem",
              borderRadius: "100px",
              marginBottom: "1.25rem",
            }}
          >
            {mission.eyebrow}
          </span>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.6rem)",
              fontWeight: 900,
              color: NAV_BLUE,
              lineHeight: 1.2,
              marginBottom: "0.75rem",
            }}
          >
            Bridging the Gap Between{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${BRIGHT_BLUE}, #7c3aed)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Rights &amp; Access
            </span>
          </h2>
          <div
            style={{
              width: "56px",
              height: "4px",
              background: `linear-gradient(90deg, ${GOLD}, ${BRIGHT_BLUE})`,
              borderRadius: "2px",
              margin: "0 auto 1.25rem",
            }}
          />
          <p
            style={{
              fontSize: "1rem",
              color: "#64748b",
              lineHeight: 1.8,
              maxWidth: "560px",
              margin: "0 auto",
            }}
          >
            {mission.description}
          </p>
        </motion.div>

        {/* ─── Main two-column layout ─── */}
        <div
          className="lac-whatwedo-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.6fr)",
            gap: "2rem",
            alignItems: "start",
          }}
        >
          {/* ── Left: dark hero panel ── */}
          <motion.div
            {...fade(0.1)}
            style={{
              borderRadius: "1.5rem",
              background: `linear-gradient(150deg, ${NAV_BLUE} 0%, #0f2258 60%, #1e1b4b 100%)`,
              padding: "2.5rem 2rem",
              color: "#fff",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            {/* Decorative circles */}
            <div
              style={{
                position: "absolute",
                top: "-50px",
                right: "-50px",
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.04)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-30px",
                left: "-30px",
                width: "140px",
                height: "140px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.03)",
              }}
            />

            {/* Icon */}
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "1.25rem",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Scale size={36} color="rgba(255,255,255,0.85)" strokeWidth={1.5} />
            </div>

            <div>
              <h3
                style={{
                  fontSize: "1.35rem",
                  fontWeight: 800,
                  lineHeight: 1.3,
                  marginBottom: "0.75rem",
                  color: "#fff",
                }}
              >
                Justice for Every Individual
              </h3>
              <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.75 }}>
                We believe legal rights should never be a privilege. Our club works tirelessly to
                break down barriers and deliver free legal empowerment to all.
              </p>
            </div>

            {/* Stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1rem",
              }}
            >
              {stats.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  style={{
                    textAlign: "center",
                    padding: "1rem 0.5rem",
                    borderRadius: "1rem",
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <Icon
                    size={18}
                    color={GOLD}
                    strokeWidth={1.8}
                    style={{ marginBottom: "0.4rem" }}
                  />
                  <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff" }}>{value}</div>
                  <div style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#services"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: `linear-gradient(135deg, ${BRIGHT_BLUE}, #6d28d9)`,
                color: "#fff",
                padding: "0.875rem 1.75rem",
                borderRadius: "0.75rem",
                fontWeight: 700,
                fontSize: "0.875rem",
                textDecoration: "none",
                alignSelf: "flex-start",
                boxShadow: "0 4px 20px rgba(37,99,235,0.35)",
              }}
            >
              Explore Our Work
              <ArrowRight size={15} />
            </a>
          </motion.div>

          {/* ── Right: cards ── */}
          <div id="services" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* Featured: Legal Awareness */}
            <motion.div
              {...fade(0.15)}
              style={{
                borderRadius: "1.25rem",
                overflow: "hidden",
                boxShadow: "0 4px 24px rgba(26,50,112,0.1)",
                border: "1px solid rgba(37,99,235,0.12)",
              }}
            >
              {/* Gradient header strip */}
              <div
                style={{
                  background: `linear-gradient(135deg, ${NAV_BLUE}, ${BRIGHT_BLUE})`,
                  padding: "1.25rem 1.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    background: "rgba(255,255,255,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <BookOpen size={22} color="#fff" strokeWidth={1.6} />
                </div>
                <div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#fff", margin: 0 }}>
                    Legal Awareness
                  </h3>
                  <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.75)", margin: 0 }}>
                    Legal Awareness Camps (Rights, Laws, Constitution)
                  </p>
                </div>
              </div>

              {/* Body */}
              <div style={{ background: "#fff", padding: "1.5rem" }}>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "#475569",
                    lineHeight: 1.7,
                    marginBottom: "1.25rem",
                  }}
                >
                  Conducting sessions on fundamental rights, laws, and entitlements.
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))",
                    gap: "0.6rem",
                  }}
                >
                  {bullets.map((b, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.6rem",
                        fontSize: "0.8rem",
                        color: "#374151",
                        lineHeight: 1.55,
                      }}
                    >
                      <CheckCircle2
                        size={15}
                        color={BRIGHT_BLUE}
                        strokeWidth={2}
                        style={{ flexShrink: 0, marginTop: "0.15rem" }}
                      />
                      {b}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Small service cards grid */}
            <div
              className="lac-whatwedo-cards"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: "1.25rem",
              }}
            >
              {services.map(({ icon: Icon, title, desc, color, bg }, i) => (
                <motion.div
                  key={title}
                  {...fade(0.2 + 0.08 * i)}
                  style={{
                    background: "#fff",
                    borderRadius: "1.25rem",
                    padding: "1.5rem",
                    boxShadow: "0 2px 16px rgba(26,50,112,0.06)",
                    border: "1px solid #e8edf8",
                    borderLeft: `4px solid ${color}`,
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    cursor: "default",
                  }}
                  whileHover={{ y: -4, boxShadow: "0 8px 32px rgba(26,50,112,0.13)" }}
                >
                  <div
                    style={{
                      width: "46px",
                      height: "46px",
                      borderRadius: "12px",
                      background: bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    <Icon size={22} color={color} strokeWidth={1.7} />
                  </div>
                  <h3
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      color: "#0f172a",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {title}
                  </h3>
                  <p style={{ fontSize: "0.8rem", color: "#64748b", lineHeight: 1.65, margin: 0 }}>
                    {desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .lac-whatwedo-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 520px) {
          .lac-whatwedo-cards {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
