import { useState, useEffect, useRef } from "react";
import { Heart, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/image/logo.jpeg";

const navLinks = [
  { label: "Home", href: "#home", sectionId: "home", route: null },
  { label: "About Us", href: "/about-us", sectionId: "about", route: "/about-us" },
  { label: "Our Groups", href: "#groups", sectionId: "groups", route: null },
  { label: "Causes", href: "#causes", sectionId: "causes", route: null },
  { label: "Impact", href: "#impact", sectionId: "impact", route: null },
  { label: "Stories", href: "#stories", sectionId: "stories", route: null },
  { label: "Get Involved", href: "#get-involved", sectionId: "get-involved", route: null },
  { label: "Contact", href: "#contact", sectionId: "contact", route: null },
];

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const isNavigating = useRef(false);
  const navTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    if (!isHomePage) return;

    function updateActive() {
      if (isNavigating.current) return;
      const threshold = 68 + 24;
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const el = document.getElementById(navLinks[i].sectionId);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= threshold) {
          setActive(navLinks[i].label);
          return;
        }
      }
      setActive(navLinks[0].label);
    }

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    return () => window.removeEventListener("scroll", updateActive);
  }, [isHomePage]);

  function scrollToSection(sectionId: string) {
    const el = document.getElementById(sectionId);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 68;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  function handleNavClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    link: (typeof navLinks)[0],
  ) {
    e.preventDefault();
    setMenuOpen(false);

    if (link.route) {
      navigate(link.route);
      return;
    }

    if (!isHomePage) {
      navigate("/");
      // after navigation, scroll on next tick once sections mount
      setTimeout(() => scrollToSection(link.sectionId), 120);
      return;
    }

    setActive(link.label);
    isNavigating.current = true;
    if (navTimer.current) clearTimeout(navTimer.current);
    navTimer.current = setTimeout(() => {
      isNavigating.current = false;
    }, 800);
    scrollToSection(link.sectionId);
  }

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
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            flexShrink: 0,
            textDecoration: "none",
          }}
        >
          <div className="w-12 rounded-full bg-brown-800">
            <img className="rounded-full" src={Logo} alt="Project Generation" />
          </div>
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
            <p className="text-[12px]">Learn sharp and Transform</p>
          </div>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav
          style={{
            alignItems: "center",
            gap: "0.05rem",
            flex: 1,
            justifyContent: "center",
          }}
          className="hidden md:flex"
        >
          {navLinks.map((link) => {
            const isActive =
              (link.route && location.pathname === link.route) ||
              (!link.route && isHomePage && active === link.label);
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                style={{
                  position: "relative",
                  padding: "0.45rem 0.65rem",
                  fontSize: "0.78rem",
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
                      left: "0.65rem",
                      right: "0.65rem",
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
            href="#donate"
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              if (!isHomePage) {
                navigate("/");
                setTimeout(() => scrollToSection("donate"), 120);
                return;
              }
              scrollToSection("donate");
            }}
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
                const isActive =
                  (link.route && location.pathname === link.route) ||
                  (!link.route && isHomePage && active === link.label);
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link)}
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
