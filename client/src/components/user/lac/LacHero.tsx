import { motion } from "framer-motion";
import {
  Scale,
  BookOpen,
  Users,
  Shield,
  Megaphone,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { NAV_BLUE, BRIGHT_BLUE, GOLD, fade } from "./lac.constants";

const heroFeatures = [
  { icon: Scale, title: "Know Your Rights", sub: "Legal awareness for all" },
  { icon: BookOpen, title: "Free Guidance", sub: "Accessible legal advice" },
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

const trustPoints = ["Free & confidential", "Open to everyone"];

export default function LacHero() {
  return (
    <section
      style={{
        background: "#ffffff",
        paddingTop: "5.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
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
      {/* Soft gold glow bottom-left */}
      <div
        style={{
          position: "absolute",
          bottom: "-120px",
          left: "-120px",
          width: "380px",
          height: "380px",
          background:
            "radial-gradient(circle, rgba(184,134,11,0.07) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "3rem",
            alignItems: "center",
            paddingBottom: "3.5rem",
          }}
        >
          {/* Left */}
          <div>
            {/* Eyebrow badge */}
            <motion.div
              {...fade(0.05)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                background: "#eef1fb",
                border: "1px solid rgba(26,50,112,0.12)",
                color: NAV_BLUE,
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase" as const,
                padding: "0.4rem 0.9rem",
                borderRadius: "999px",
                marginBottom: "1.1rem",
              }}
            >
              <Scale size={13} strokeWidth={2.2} />
              A Project Generation Initiative
            </motion.div>

            <motion.h1
              {...fade(0.1)}
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3rem)",
                fontWeight: 800,
                color: NAV_BLUE,
                lineHeight: 1.15,
                marginBottom: "0.85rem",
                letterSpacing: "-0.01em",
              }}
            >
              LEGAL AID CLUB
              <span
                style={{
                  display: "block",
                  width: "72px",
                  height: "4px",
                  marginTop: "0.8rem",
                  borderRadius: "999px",
                  background: `linear-gradient(90deg, ${GOLD} 0%, rgba(184,134,11,0.25) 100%)`,
                }}
              />
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

            <motion.div
              {...fade(0.25)}
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap" as const,
              }}
            >
              <motion.a
                href="#contact-section"
                whileHover={{ y: -2, boxShadow: "0 8px 22px rgba(26,50,112,0.38)" }}
                whileTap={{ scale: 0.98 }}
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
                <Scale size={16} />
                Get Legal Help
                <ChevronRight size={16} />
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ y: -2, backgroundColor: "#eef1fb" }}
                whileTap={{ scale: 0.98 }}
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
              </motion.a>
            </motion.div>

            {/* Trust line */}
            <motion.div
              {...fade(0.3)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.25rem",
                flexWrap: "wrap" as const,
                marginTop: "1.4rem",
              }}
            >
              {trustPoints.map((point) => (
                <span
                  key={point}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    fontSize: "0.78rem",
                    color: "#64748b",
                    fontWeight: 500,
                  }}
                >
                  <CheckCircle2 size={14} color="#16a34a" />
                  {point}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right – decorative visual */}
          <motion.div
            {...fade(0.15)}
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              padding: "1.5rem 0",
            }}
          >
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
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "460px",
                borderRadius: "1.5rem",
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(26,50,112,0.18)",
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
              {/* Large watermark scale */}
              <Scale
                size={260}
                color="rgba(255,255,255,0.05)"
                strokeWidth={0.75}
                style={{
                  position: "absolute",
                  right: "-50px",
                  bottom: "-50px",
                  transform: "rotate(-12deg)",
                  pointerEvents: "none",
                }}
              />
              <Scale
                size={64}
                color="rgba(255,255,255,0.28)"
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
              <span
                style={{
                  display: "block",
                  width: "42px",
                  height: "2px",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.35)",
                  margin: "0.9rem auto 0",
                  position: "relative",
                }}
              />
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

            {/* Floating chip — top left */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45, duration: 0.5, ease: "easeOut" as const }}
              style={{
                position: "absolute",
                top: "0.25rem",
                left: "0.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.55rem",
                background: "#ffffff",
                borderRadius: "0.85rem",
                padding: "0.6rem 0.9rem",
                boxShadow: "0 10px 30px rgba(15,23,42,0.12)",
                border: "1px solid #eef1fb",
              }}
            >
              <span
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "9px",
                  background: "#eef1fb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <BookOpen size={15} color={NAV_BLUE} />
              </span>
              <span>
                <span
                  style={{
                    display: "block",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "#0f172a",
                  }}
                >
                  Free Legal Guidance
                </span>
                <span style={{ fontSize: "0.65rem", color: "#94a3b8" }}>
                  Awareness camps & advice
                </span>
              </span>
            </motion.div>

            {/* Floating chip — bottom right */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55, duration: 0.5, ease: "easeOut" as const }}
              style={{
                position: "absolute",
                bottom: "0.25rem",
                right: "0.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.55rem",
                background: "#ffffff",
                borderRadius: "0.85rem",
                padding: "0.6rem 0.9rem",
                boxShadow: "0 10px 30px rgba(15,23,42,0.12)",
                border: "1px solid #eef1fb",
              }}
            >
              <span
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "9px",
                  background: "#fdf6e7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Shield size={15} color={GOLD} />
              </span>
              <span>
                <span
                  style={{
                    display: "block",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "#0f172a",
                  }}
                >
                  Rights Protected
                </span>
                <span style={{ fontSize: "0.65rem", color: "#94a3b8" }}>
                  Dignity & fairness for all
                </span>
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Hero features strip */}
        <div
          style={{
            borderTop: "1px solid #e2e8f0",
            paddingTop: "2rem",
            paddingBottom: "2.5rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "0.9rem",
          }}
        >
          {heroFeatures.map(({ icon: Icon, title, sub }, i) => (
            <motion.div
              key={title}
              {...fade(0.3 + i * 0.07)}
              whileHover={{
                y: -4,
                boxShadow: "0 12px 28px rgba(26,50,112,0.1)",
                borderColor: "rgba(37,99,235,0.35)",
              }}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.65rem",
                background: "#ffffff",
                border: "1px solid #e8edf5",
                borderRadius: "0.9rem",
                padding: "0.9rem 1rem",
                cursor: "default",
              }}
            >
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #eef1fb 0%, #e3ebfa 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon size={18} color={NAV_BLUE} strokeWidth={1.6} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: "#0f172a",
                  }}
                >
                  {title}
                </div>
                <div
                  style={{
                    fontSize: "0.72rem",
                    color: "#94a3b8",
                    lineHeight: 1.4,
                  }}
                >
                  {sub}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
