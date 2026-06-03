import { useState, useEffect, useRef } from "react";
import { Heart, Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/image/logo.jpeg";
import { groups } from "../../data/groups";

const navLinks = [
  { label: "Home", href: "/", route: "/" },
  { label: "About Us", href: "/about-us", route: "/about-us" },
  { label: "Our Groups", href: "#groups", route: null },
  { label: "Causes", href: "/causes", route: "/causes" },
  { label: "Impact", href: "/", route: null },
  { label: "Stories", href: "/stories", route: "/stories" },
  { label: "Notice", href: "/notice", route: "/notice" },
  { label: "Get Involved", href: "/", route: null },
  { label: "Contact", href: "/contact", route: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [groupsOpen, setGroupsOpen] = useState(false);
  const [mobileGroupsOpen, setMobileGroupsOpen] = useState(false);
  const groupsDropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (groupsDropdownRef.current && !groupsDropdownRef.current.contains(e.target as Node)) {
        setGroupsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleNavClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    link: (typeof navLinks)[0],
  ) {
    e.preventDefault();
    setMenuOpen(false);
    navigate(link.route ?? "/");
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
            const isActive = link.route
              ? location.pathname === link.route
              : false;

            if (link.label === "Our Groups") {
              return (
                <div
                  key={link.label}
                  ref={groupsDropdownRef}
                  style={{ position: "relative" }}
                  onMouseEnter={() => setGroupsOpen(true)}
                  onMouseLeave={() => setGroupsOpen(false)}
                >
                  <a
                    href={link.href}
                    onClick={(e) => e.preventDefault()}
                    style={{
                      position: "relative",
                      padding: "0.45rem 0.65rem",
                      fontSize: "0.78rem",
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? "#1a3270" : "#475569",
                      textDecoration: "none",
                      whiteSpace: "nowrap",
                      transition: "color 0.2s",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.2rem",
                    }}
                  >
                    {link.label}
                    <ChevronDown
                      size={13}
                      style={{
                        transition: "transform 0.2s",
                        transform: groupsOpen ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    />
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

                  <AnimatePresence>
                    {groupsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        style={{
                          position: "absolute",
                          top: "calc(100% + 4px)",
                          left: "50%",
                          transform: "translateX(-50%)",
                          backgroundColor: "#ffffff",
                          borderRadius: "0.6rem",
                          boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                          border: "1px solid #e2e8f0",
                          minWidth: "240px",
                          zIndex: 100,
                          overflow: "hidden",
                        }}
                      >
                        {groups.map((group) => {
                          const Icon = group.icon;
                          return (
                            <Link
                              key={group.id}
                              to={`/groups/${group.slug}`}
                              onClick={() => setGroupsOpen(false)}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.75rem",
                                padding: "0.65rem 1rem",
                                textDecoration: "none",
                                borderBottom: "1px solid #f1f5f9",
                                transition: "background 0.15s",
                              }}
                              onMouseEnter={(e) =>
                                ((e.currentTarget as HTMLElement).style.backgroundColor = "#f8fafc")
                              }
                              onMouseLeave={(e) =>
                                ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")
                              }
                            >
                              <span
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  width: "30px",
                                  height: "30px",
                                  borderRadius: "0.4rem",
                                  backgroundColor: group.lightColor,
                                  flexShrink: 0,
                                }}
                              >
                                <Icon size={15} color={group.color} />
                              </span>
                              <div>
                                <div
                                  style={{
                                    fontSize: "0.78rem",
                                    fontWeight: 600,
                                    color: "#1e293b",
                                    lineHeight: 1.3,
                                  }}
                                >
                                  {group.abbreviation}
                                </div>
                                <div
                                  style={{
                                    fontSize: "0.68rem",
                                    color: "#64748b",
                                    lineHeight: 1.3,
                                  }}
                                >
                                  {group.name}
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

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
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              navigate("/");
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
                const isActive = link.route
                  ? location.pathname === link.route
                  : false;

                if (link.label === "Our Groups") {
                  return (
                    <div key={link.label}>
                      <button
                        onClick={() => setMobileGroupsOpen((v) => !v)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                          padding: "0.6rem 0",
                          fontSize: "0.88rem",
                          fontWeight: isActive ? 600 : 500,
                          color: isActive ? "#1a3270" : "#475569",
                          background: "none",
                          border: "none",
                          borderBottom: "1px solid #f1f5f9",
                          cursor: "pointer",
                          textAlign: "left",
                        }}
                      >
                        {link.label}
                        <ChevronDown
                          size={15}
                          style={{
                            transition: "transform 0.2s",
                            transform: mobileGroupsOpen ? "rotate(180deg)" : "rotate(0deg)",
                          }}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileGroupsOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            style={{ overflow: "hidden" }}
                          >
                            {groups.map((group) => {
                              const Icon = group.icon;
                              return (
                                <Link
                                  key={group.id}
                                  to={`/groups/${group.slug}`}
                                  onClick={() => {
                                    setMenuOpen(false);
                                    setMobileGroupsOpen(false);
                                  }}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.7rem",
                                    padding: "0.5rem 0 0.5rem 0.75rem",
                                    textDecoration: "none",
                                    borderBottom: "1px solid #f8fafc",
                                  }}
                                >
                                  <span
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      width: "26px",
                                      height: "26px",
                                      borderRadius: "0.35rem",
                                      backgroundColor: group.lightColor,
                                      flexShrink: 0,
                                    }}
                                  >
                                    <Icon size={13} color={group.color} />
                                  </span>
                                  <div>
                                    <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "#1e293b" }}>
                                      {group.abbreviation}
                                    </div>
                                    <div style={{ fontSize: "0.68rem", color: "#64748b" }}>
                                      {group.name}
                                    </div>
                                  </div>
                                </Link>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

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
