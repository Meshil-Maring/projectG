import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Logo from "../../assets/image/logo.jpeg";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  HeartIcon,
  ChevronRightIcon,
} from "../../assets/icons";

const quickLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "Our Causes", href: "/causes" },
  { label: "Our Impact", href: "/impact" },
  { label: "Stories", href: "/stories" },
  { label: "Contact Us", href: "/contact" },
];
const getInvolved = [
  { label: "Donate", href: "/donate" },
  { label: "Volunteer", href: "/get-involved" },
  { label: "Fundraise", href: "/get-involved" },
  { label: "Partner With Us", href: "/contact" },
];
const ourGroups = [
  { label: "Legal Aid Club", href: "/groups/lac" },
  { label: "Work for Humanity", href: "/groups/whg" },
  { label: "HR Development Society", href: "/groups/hrds" },
  { label: "Socio-Economic Development", href: "/groups/fseds" },
  { label: "Competitive World Group", href: "/groups/cwg" },
];

// Social profile URLs — leave empty until the real profile exists; empty
// entries are not rendered so the footer never ships dead links.
const socialLinks: { name: string; icon: React.ReactNode; url: string }[] = [
  { name: "Facebook", icon: <FacebookIcon />, url: "https://www.facebook.com/share/17kjpAxLpJ/?mibextid=wwXIfr" },
  { name: "Instagram", icon: <InstagramIcon />, url: "https://www.instagram.com/project_g_manipur/" },
  { name: "Twitter", icon: <TwitterIcon />, url: "" },
  { name: "YouTube", icon: <YoutubeIcon />, url: "https://youtube.com/@projectgmanipur?si=_dMs0XzLLMtPd90n" },
];

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--color-primary-dark)",
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
        <HeartIcon width={280} height={280} fill="white" color="white" />
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
              <img className="w-12 rounded-full" src={Logo} alt="Project Generation logo" />
              <aside>
                <p className="font-black">Project Generation</p>
                <p className="text-[12px]">Learn Serve & Transform</p>
              </aside>
            </div>

            <p
              style={{
                fontSize: "0.8rem",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.78)",
                marginBottom: "1.5rem",
                maxWidth: "240px",
              }}
            >
              Building a better future for children, families and communities
              through compassion and action.
            </p>

            {/* Social icons */}
            <div style={{ display: "flex", gap: "0.6rem" }}>
              {socialLinks.filter((s) => s.url).map(({ name, icon, url }) => (
                <motion.a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${name} (opens in a new tab)`}
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

          {/* ── Our Groups ── */}
          <FooterColumn title="Our Groups" links={ourGroups} />

          {/* ── Contact Us ── */}
          <FooterSection title="Contact Us">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <ContactItem icon={<PhoneIcon />} text="+91 87983 03158" />
              <ContactItem
                icon={<MailIcon />}
                text="projectgmanipur@gmail.com"
              />
              <ContactItem
                icon={<MapPinIcon />}
                text="Sagolband Ingudam Leikai, Manipur, India - 795001"
              />
            </div>
          </FooterSection>
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
            color: "rgba(255,255,255,0.7)",
            margin: 0,
          }}
        >
          © {new Date().getFullYear()} Project Generation. All Rights Reserved.
        </p>
        <a
          href="mailto:projectgmanipur@gmail.com"
          style={{
            fontSize: "0.75rem",
            color: "rgba(255,255,255,0.7)",
            textDecoration: "none",
          }}
        >
          projectgmanipur@gmail.com
        </a>
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
          .footer-section-toggle {
            cursor: pointer;
          }
          .footer-toggle-icon {
            display: inline-block !important;
          }
          .footer-section-content {
            display: none;
          }
          .footer-section-content.open {
            display: block;
          }
        }
      `}</style>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <FooterSection title={title}>
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
          <li key={link.label}>
            <motion.div whileHover={{ x: 3 }} style={{ display: "inline-block" }}>
              <Link
                to={link.href}
                style={{
                  fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.78)",
                  textDecoration: "none",
                  display: "inline-block",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#ffffff")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.78)")
                }
              >
                {link.label}
              </Link>
            </motion.div>
          </li>
        ))}
      </ul>
    </FooterSection>
  );
}

function FooterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="footer-section-toggle"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          background: "none",
          border: "none",
          padding: 0,
          marginBottom: "1rem",
          fontFamily: "inherit",
          fontSize: "0.88rem",
          fontWeight: 600,
          color: "#ffffff",
          letterSpacing: "0.01em",
          textAlign: "left",
        }}
      >
        {title}
        <ChevronRightIcon
          className="footer-toggle-icon"
          width={14}
          height={14}
          style={{
            display: "none",
            transform: open ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
            flexShrink: 0,
          }}
        />
      </button>
      <div className={`footer-section-content${open ? " open" : ""}`}>
        {children}
      </div>
    </div>
  );
}

function ContactItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
      <span
        style={{
          color: "rgba(255,255,255,0.78)",
          flexShrink: 0,
          marginTop: "1px",
        }}
      >
        {icon}
      </span>
      <span
        style={{
          fontSize: "0.78rem",
          color: "rgba(255,255,255,0.78)",
          lineHeight: 1.5,
        }}
      >
        {text}
      </span>
    </div>
  );
}
