import { motion } from "framer-motion";
import Logo from "../../assets/image/logo.jpeg";

const quickLinks = [
  "About Us",
  "Our Causes",
  "Our Impact",
  "Stories",
  "Contact Us",
];
const getInvolved = ["Donate", "Volunteer", "Fundraise", "Partner With Us"];
const programs = [
  "Education",
  "Healthcare",
  "Environment",
  "Women Empowerment",
  "Child Protection",
];

const socialIcons = {
  facebook: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  instagram: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  twitter: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
    </svg>
  ),
  linkedin: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  youtube: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  ),
};

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#0f2057",
        color: "#ffffff",
        fontFamily: "'Poppins', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Watermark */}
      <div
        style={{
          position: "absolute",
          right: "-20px",
          top: "50%",
          transform: "translateY(-50%)",
          opacity: 0.06,
          pointerEvents: "none",
        }}
      >
        <svg width="280" height="280" viewBox="0 0 24 24" fill="white">
          <path d="M12 21C12 21 3 14.5 3 8.5C3 6 5 4 7.5 4C9.2 4 10.7 4.9 11.5 6.2C12.3 4.9 13.8 4 15.5 4C18 4 20 6 20 8.5C20 14.5 12 21 12 21Z" />
          <path
            d="M7 12 Q9 16 12 18 Q15 16 17 12"
            stroke="white"
            strokeWidth="0.5"
            fill="none"
          />
        </svg>
      </div>

      {/* Main content */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "3rem 2rem 2rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.6fr 1px 1fr 1fr 1fr 1.2fr",
            gap: "0 2.5rem",
            alignItems: "start",
          }}
          className="footer-grid"
        >
          {/* ── Brand column ── */}
          <div style={{ paddingRight: "1rem" }}>
            {/* Logo */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                marginBottom: "0.75rem",
              }}
            >
              <img className="w-12 rounded-full" src={Logo} />
              <p>Project Generation</p>
            </div>

            <p
              style={{
                fontSize: "0.8rem",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.65)",
                marginBottom: "1.5rem",
                maxWidth: "240px",
              }}
            >
              Building a better future for children, families and communities
              through compassion and action.
            </p>

            {/* Social icons */}
            <div style={{ display: "flex", gap: "0.6rem" }}>
              {Object.entries(socialIcons).map(([name, icon]) => (
                <motion.a
                  key={name}
                  href="#"
                  whileHover={{
                    scale: 1.15,
                    backgroundColor: "rgba(255,255,255,0.25)",
                  }}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,0.8)",
                    cursor: "pointer",
                    transition: "background-color 0.2s",
                  }}
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              width: "1px",
              background: "rgba(255,255,255,0.12)",
              alignSelf: "stretch",
            }}
          />

          {/* ── Quick Links ── */}
          <FooterColumn title="Quick Links" links={quickLinks} />

          {/* ── Get Involved ── */}
          <FooterColumn title="Get Involved" links={getInvolved} />

          {/* ── Our Programs ── */}
          <FooterColumn title="Our Programs" links={programs} />

          {/* ── Contact Us ── */}
          <div>
            <h4
              style={{
                fontSize: "0.88rem",
                fontWeight: 600,
                color: "#ffffff",
                marginBottom: "1rem",
                letterSpacing: "0.01em",
              }}
            >
              Contact Us
            </h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <ContactItem
                icon={
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.61 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 5.49 5.49l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                }
                text="+91 98765 43210"
              />
              <ContactItem
                icon={
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                }
                text="info@helpinghands.org"
              />
              <ContactItem
                icon={
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                }
                text="123, Hope Street, New Delhi, India - 110001"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "1.1rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <p
          style={{
            fontSize: "0.75rem",
            color: "rgba(255,255,255,0.5)",
            margin: 0,
          }}
        >
          © 2024 Helping Hands. All Rights Reserved.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <a
            href="#"
            style={{
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.5)",
              textDecoration: "none",
            }}
          >
            Privacy Policy
          </a>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem" }}>
            |
          </span>
          <a
            href="#"
            style={{
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.5)",
              textDecoration: "none",
            }}
          >
            Terms & Conditions
          </a>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 2rem !important;
          }
          .footer-grid > div:nth-child(2) {
            display: none;
          }
        }
        @media (max-width: 560px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4
        style={{
          fontSize: "0.88rem",
          fontWeight: 600,
          color: "#ffffff",
          marginBottom: "1rem",
          letterSpacing: "0.01em",
        }}
      >
        {title}
      </h4>
      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          gap: "0.55rem",
        }}
      >
        {links.map((link) => (
          <li key={link}>
            <motion.a
              href="#"
              whileHover={{ x: 3, color: "#ffffff" }}
              style={{
                fontSize: "0.8rem",
                color: "rgba(255,255,255,0.6)",
                textDecoration: "none",
                display: "inline-block",
                transition: "color 0.2s",
              }}
            >
              {link}
            </motion.a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
      <span
        style={{
          color: "rgba(255,255,255,0.6)",
          flexShrink: 0,
          marginTop: "1px",
        }}
      >
        {icon}
      </span>
      <span
        style={{
          fontSize: "0.78rem",
          color: "rgba(255,255,255,0.65)",
          lineHeight: 1.5,
        }}
      >
        {text}
      </span>
    </div>
  );
}
