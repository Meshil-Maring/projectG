import { motion } from "framer-motion";
import { Scale, Phone, Mail, MapPin, Shield, DollarSign, Globe, Wifi } from "lucide-react";
import { NAV_BLUE, fade } from "./lac.constants";
import { usePageSections } from "../../../context/PageContext";

const DEFAULT_CONTACT = {
  heading: "Need Legal Help?",
  description:
    "We're here to listen and help you take the first step towards your rights.",
  cardCaption: "Our commitment to every person we serve",
};

const contactDetails = [
  { Icon: Phone, text: "+91 87983 03158" },
  { Icon: Mail, text: "projectgmanipur@gmail.com" },
  { Icon: MapPin, text: "Sagolband Ingudam Leikai, Manipur, India - 795001" },
];

const contactFeatures = [
  { icon: Shield, title: "Confidential", desc: "Your privacy is our priority." },
  { icon: DollarSign, title: "Free of Cost", desc: "Our services are completely free." },
  { icon: Globe, title: "For Everyone", desc: "We serve all, without discrimination." },
  { icon: Wifi, title: "Easy to Access", desc: "Multiple ways to reach us anywhere, anytime." },
];

const badges = ["Free Services", "Confidential", "For Everyone"];

export default function LacContact() {
  const { getSectionData } = usePageSections();
  const contact = { ...DEFAULT_CONTACT, ...getSectionData("lac-contact") };

  return (
    <section
      id="contact-section"
      style={{
        background: NAV_BLUE,
        padding: "5rem 1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
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
        className="lac-contact-grid"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
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
            {contact.heading}
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "0.9rem",
              marginBottom: "2rem",
              lineHeight: 1.6,
            }}
          >
            {contact.description}
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column" as const,
              gap: "0.75rem",
              marginBottom: "2.5rem",
            }}
          >
            {contactDetails.map(({ Icon, text }) => (
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

          <div
            className="lac-contact-features"
            style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: "0.85rem" }}
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
                  <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.6)" }}>{desc}</div>
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
              aria-hidden="true"
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
              {contact.cardCaption}
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
              {badges.map((badge) => (
                <div
                  key={badge}
                  style={{
                    padding: "0.4rem 1.1rem",
                    background: "rgba(255,255,255,0.12)",
                    borderRadius: "999px",
                    color: "rgba(255,255,255,0.85)",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                  }}
                >
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .lac-contact-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
        @media (max-width: 420px) {
          .lac-contact-features {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
