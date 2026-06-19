import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Logo from "../../assets/image/logo.jpeg";
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeLogoIcon,
  WhatsappIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  HeartIcon,
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

const socialLinks: { name: string; icon: React.ReactNode; url: string }[] = [
  { name: "Facebook", icon: <FacebookIcon width={15} height={15} />, url: "https://www.facebook.com/share/17kjpAxLpJ/?mibextid=wwXIfr" },
  { name: "Instagram", icon: <InstagramIcon width={15} height={15} />, url: "https://www.instagram.com/project_g_manipur/" },
  { name: "YouTube", icon: <YoutubeLogoIcon width={15} height={15} />, url: "https://youtube.com/@projectgmanipur?si=_dMs0XzLLMtPd90n" },
  { name: "WhatsApp", icon: <WhatsappIcon width={15} height={15} />, url: "https://wa.me/918798303158" },
];

export default function Footer() {
  return (
    <footer className="footer-root">
      {/* Heart watermark — hidden on mobile */}
      <div className="footer-watermark">
        <HeartIcon width={280} height={280} fill="white" color="white" />
      </div>

      <div className="footer-container">
        {/* ── Brand ── */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo-row" style={{ textDecoration: "none", color: "inherit" }}>
            <img className="w-12 rounded-full" src={Logo} alt="Project Generation logo" />
            <aside>
              <p style={{ fontWeight: 900, fontFamily: "'Poppins', sans-serif" }}>Project Generation</p>
              <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.7)" }}>Learn Serve & Transform</p>
            </aside>
          </Link>
          <p className="footer-desc">
            Building a better future for children, families and communities through compassion and action.
          </p>
          <div className="footer-social">
            {socialLinks.filter((s) => s.url).map(({ name, icon, url }) => (
              <motion.a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} (opens in a new tab)`}
                whileHover={{ scale: 1.15, backgroundColor: "rgba(255,255,255,0.25)" }}
                className="footer-social-btn"
              >
                {icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Vertical divider — desktop only */}
        <div className="footer-vdivider" />

        {/*
          footer-link-cols-wrapper: transparent to the desktop grid (display:contents)
          but becomes a 2-column sub-grid on mobile.
        */}
        <div className="footer-link-cols-wrapper">
          <LinkColumn title="Quick Links" links={quickLinks} />
          <LinkColumn title="Get Involved" links={getInvolved} />
        </div>

        {/*
          footer-groups-wrapper: transparent on desktop, block on mobile.
          Inner list is a 2-col grid on mobile.
        */}
        <div className="footer-groups-wrapper">
          <LinkColumn title="Our Groups" links={ourGroups} groupStyle />
        </div>

        {/* ── Contact Us ── */}
        <div className="footer-contact">
          <p className="footer-col-title">Contact Us</p>
          <div className="footer-contact-items">
            <ContactItem icon={<PhoneIcon />} text="+91 87983 03158" href="tel:+918798303158" />
            <ContactItem icon={<MailIcon />} text="projectgmanipur@gmail.com" href="mailto:projectgmanipur@gmail.com" />
            <ContactItem icon={<MapPinIcon />} text="Sagolband Ingudam Leikai, Manipur, India - 795001" href="https://maps.google.com/?q=Sagolband+Ingudam+Leikai,Manipur,India" />
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Project Generation. All Rights Reserved.</p>
        <a href="mailto:projectgmanipur@gmail.com">projectgmanipur@gmail.com</a>
      </div>

      <style>{`
        .footer-root {
          background-color: var(--color-primary-dark);
          color: #ffffff;
          font-family: 'Poppins', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* ── Watermark ── */
        .footer-watermark {
          position: absolute;
          right: -20px;
          top: 50%;
          transform: translateY(-50%);
          opacity: 0.06;
          pointer-events: none;
        }

        /* ── Main grid ── */
        .footer-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 3rem 2rem 2rem;
          display: grid;
          grid-template-columns: 1.6fr 1px 1fr 1fr 1fr 1.2fr;
          gap: 0 2.5rem;
          align-items: start;
        }

        /*
          display:contents makes this wrapper transparent to the parent grid
          so its two children (Quick Links, Get Involved) each occupy a grid cell.
        */
        .footer-link-cols-wrapper {
          display: contents;
        }
        .footer-groups-wrapper {
          display: contents;
        }

        /* ── Brand ── */
        .footer-logo-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 0.75rem;
        }
        .footer-desc {
          font-size: 0.8rem;
          line-height: 1.7;
          color: rgba(255,255,255,0.78);
          margin-bottom: 1.4rem;
          max-width: 240px;
        }
        .footer-social {
          display: flex;
          gap: 0.6rem;
        }
        .footer-social-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.8);
          cursor: pointer;
          transition: background-color 0.2s;
          text-decoration: none;
        }

        /* ── Divider ── */
        .footer-vdivider {
          width: 1px;
          background: rgba(255,255,255,0.12);
          align-self: stretch;
        }

        /* ── Link columns ── */
        .footer-col-title {
          font-size: 0.88rem;
          font-weight: 600;
          color: #ffffff;
          letter-spacing: 0.01em;
          margin: 0 0 1rem 0;
        }
        .footer-col-links {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
        }
        .footer-col-links a {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.78);
          text-decoration: none;
          display: inline-block;
          transition: color 0.2s;
        }
        .footer-col-links a:hover { color: #ffffff; }

        /* ── Contact ── */
        .footer-contact-items {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .footer-contact-link:hover span {
          color: #ffffff !important;
        }

        /* ── Bottom bar ── */
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.1);
          max-width: 1280px;
          margin: 0 auto;
          padding: 1.1rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .footer-bottom p,
        .footer-bottom a {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.7);
          margin: 0;
          text-decoration: none;
        }

        /* ────────── Tablet ≤900px ────────── */
        @media (max-width: 900px) {
          .footer-container {
            grid-template-columns: 1fr 1fr !important;
            gap: 2rem !important;
          }
          .footer-vdivider { display: none; }
          /* Stop being transparent so wrappers occupy one grid cell each */
          .footer-link-cols-wrapper {
            display: grid !important;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem 1rem;
            grid-column: span 1;
          }
          .footer-groups-wrapper {
            display: block !important;
          }
        }

        /* ────────── Mobile ≤560px ────────── */
        @media (max-width: 560px) {
          .footer-watermark { display: none; }

          .footer-container {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
            padding: 2rem 1.25rem 1.5rem;
          }

          /* Brand — centered */
          .footer-brand {
            text-align: center;
            padding-bottom: 1.75rem;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            margin-bottom: 1.75rem;
          }
          .footer-logo-row { justify-content: center; }
          .footer-desc {
            margin-left: auto;
            margin-right: auto;
            max-width: 300px;
          }
          .footer-social {
            justify-content: center;
            gap: 0.75rem;
          }
          .footer-social-btn {
            width: 40px;
            height: 40px;
          }

          /* Quick Links + Get Involved — side by side */
          .footer-link-cols-wrapper {
            display: grid !important;
            grid-template-columns: 1fr 1fr;
            gap: 0 1.25rem;
            padding-bottom: 1.5rem;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            margin-bottom: 1.5rem;
          }

          /* Our Groups — 2-column list */
          .footer-groups-wrapper {
            display: block !important;
            padding-bottom: 1.5rem;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            margin-bottom: 1.5rem;
          }
          .footer-groups-wrapper .footer-col-links {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.45rem 0.5rem;
          }

          /* Contact */
          .footer-contact { margin-bottom: 0.25rem; }

          /* Bottom bar — centered stack */
          .footer-bottom {
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 1rem 1.25rem;
            gap: 0.25rem;
          }
        }
      `}</style>
    </footer>
  );
}

function LinkColumn({
  title,
  links,
  groupStyle,
}: {
  title: string;
  links: { label: string; href: string }[];
  groupStyle?: boolean;
}) {
  void groupStyle;
  return (
    <div>
      <p className="footer-col-title">{title}</p>
      <ul className="footer-col-links">
        {links.map((link) => (
          <li key={link.label}>
            <motion.div whileHover={{ x: 3 }} style={{ display: "inline-block" }}>
              <Link to={link.href}>{link.label}</Link>
            </motion.div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactItem({ icon, text, href }: { icon: React.ReactNode; text: string; href: string }) {
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", textDecoration: "none" }}
      className="footer-contact-link"
    >
      <span style={{ color: "rgba(255,255,255,0.78)", flexShrink: 0, marginTop: "1px" }}>{icon}</span>
      <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.78)", lineHeight: 1.5 }}>{text}</span>
    </a>
  );
}
