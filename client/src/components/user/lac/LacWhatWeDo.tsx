import { motion } from "framer-motion";
import {
  Scale,
  BookOpen,
  FileText,
  Megaphone,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import { NAV_BLUE, BRIGHT_BLUE, GOLD, fade } from "./lac.constants";

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

export default function LacWhatWeDo() {
  return (
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
            The Legal Aid Club provides free legal support, awareness programs, and resources to
            help individuals navigate their rights and access justice with confidence.
          </p>

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
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
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
                ...(i === 0
                  ? {
                      display: "grid",
                      gridTemplateColumns: "auto 1fr",
                      gap: "1.25rem",
                      alignItems: "start",
                    }
                  : {}),
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
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "#64748b",
                    lineHeight: 1.65,
                    marginBottom: bullets ? "0.75rem" : 0,
                  }}
                >
                  {desc}
                </p>
                {bullets && (
                  <ul
                    style={{
                      margin: 0,
                      padding: 0,
                      listStyle: "none",
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                      gap: "0.45rem",
                    }}
                  >
                    {bullets.map((b) => (
                      <li
                        key={b}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.5rem",
                          fontSize: "0.8rem",
                          color: "#475569",
                          lineHeight: 1.55,
                        }}
                      >
                        <span
                          style={{
                            color: BRIGHT_BLUE,
                            fontWeight: 700,
                            flexShrink: 0,
                            marginTop: "0.1rem",
                          }}
                        >
                          ✔
                        </span>
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
  );
}
