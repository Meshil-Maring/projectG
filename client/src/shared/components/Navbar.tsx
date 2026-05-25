import { useState } from "react";
import { Heart, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#" },
  { label: "Causes", href: "#" },
  { label: "Impact", href: "#" },
  { label: "Stories", href: "#" },
  { label: "Get Involved", href: "#" },
  { label: "Contact", href: "#" },
];

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: "#ffffff",
        boxShadow: "0 1px 10px 0 rgba(0,0,0,0.07)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 1.5rem",
          height: "68px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        {/* ── Logo ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            flexShrink: 0,
          }}
        >
          {/* Icon circle */}
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#1a3270",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 21C12 21 3 14.5 3 8.5C3 6 5 4 7.5 4C9.2 4 10.7 4.9 11.5 6.2C12.3 4.9 13.8 4 15.5 4C18 4 20 6 20 8.5C20 14.5 12 21 12 21Z"
                fill="white"
                opacity="0.9"
              />
              <path
                d="M8 11C8 11 9 13 12 15C15 13 16 11 16 11"
                stroke="white"
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
                opacity="0.6"
              />
            </svg>
          </div>

          {/* Brand text */}
          <div style={{ lineHeight: 1.2 }}>
            <div
              style={{
                fontWeight: 700,
                fontSize: "0.95rem",
                color: "#1a3270",
                letterSpacing: "-0.01em",
              }}
            >
              Project Generation
            </div>
          </div>
        </div>

        {/* ── Desktop Nav ── */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.15rem",
            flex: 1,
            justifyContent: "center",
          }}
          className="hidden md:flex"
        >
          {navLinks.map((link) => {
            const isActive = active === link.label;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setActive(link.label)}
                style={{
                  position: "relative",
                  padding: "0.45rem 0.75rem",
                  fontSize: "0.82rem",
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? "#1a3270" : "#475569",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  transition: "color 0.2s",
                }}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    style={{
                      position: "absolute",
                      bottom: "-2px",
                      left: "0.75rem",
                      right: "0.75rem",
                      height: "2.5px",
                      borderRadius: "2px",
                      backgroundColor: "#1a3270",
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* ── Donate button + mobile toggle ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            flexShrink: 0,
          }}
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              backgroundColor: "#1a3270",
              color: "#ffffff",
              fontWeight: 600,
              fontSize: "0.82rem",
              padding: "0.55rem 1.2rem",
              borderRadius: "0.4rem",
              textDecoration: "none",
              boxShadow: "0 4px 14px 0 rgba(26,50,112,0.28)",
              whiteSpace: "nowrap",
            }}
          >
            Donate Now
            <Heart size={14} fill="white" strokeWidth={0} />
          </motion.a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#1a3270",
              padding: "0.25rem",
            }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{
              overflow: "hidden",
              borderTop: "1px solid #e2e8f0",
              backgroundColor: "#ffffff",
            }}
          >
            <div style={{ padding: "0.75rem 1.5rem 1rem" }}>
              {navLinks.map((link) => {
                const isActive = active === link.label;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => {
                      setActive(link.label);
                      setMenuOpen(false);
                    }}
                    style={{
                      display: "block",
                      padding: "0.6rem 0",
                      fontSize: "0.88rem",
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? "#1a3270" : "#475569",
                      textDecoration: "none",
                      borderBottom: "1px solid #f1f5f9",
                    }}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
