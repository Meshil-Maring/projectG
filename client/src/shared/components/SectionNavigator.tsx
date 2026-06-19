import { useState, useEffect, useRef } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface Section {
  id: string;
  label: string;
  scrollId?: string;
}

interface SectionNavigatorProps {
  sections: Section[];
}

export default function SectionNavigator({ sections }: SectionNavigatorProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id ?? "");
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close mobile panel when tapping outside
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: MouseEvent | TouchEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollMid = window.scrollY + window.innerHeight * 0.45;
      let current = sections[0]?.id ?? "";
      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (top <= scrollMid) current = id;
        }
      }
      setActiveSection(current);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollTo = (id: string) => {
    const section = sections.find((s) => s.id === id);
    const el = document.getElementById(section?.scrollId ?? id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const activeIndex = sections.findIndex((s) => s.id === activeSection);

  const goNext = () => {
    if (activeIndex < sections.length - 1) scrollTo(sections[activeIndex + 1].id);
  };

  const goPrev = () => {
    if (activeIndex > 0) scrollTo(sections[activeIndex - 1].id);
  };

  const canPrev = activeIndex > 0;
  const canNext = activeIndex < sections.length - 1;

  const btnSize = isMobile ? "20px" : "28px";
  const arrowBtn = (onClick: () => void, enabled: boolean) => ({
    onClick,
    style: {
      background: enabled ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "50%",
      width: btnSize,
      height: btnSize,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: enabled ? "pointer" : "default",
      color: enabled ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.2)",
      transition: "all 0.2s ease",
      flexShrink: 0,
    } as React.CSSProperties,
  });

  const showPanel = isMobile ? mobileOpen : isHovered;

  return (
    <div
      ref={rootRef}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      style={{
        position: "fixed",
        right: isMobile ? "8px" : "20px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      {/* Label panel — hover on desktop, tap-toggle on mobile */}
      <div
        style={{
          backgroundColor: "rgba(15, 23, 55, 0.88)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderRadius: "16px",
          padding: "10px 6px",
          display: "flex",
          flexDirection: "column",
          gap: "2px",
          opacity: showPanel ? 1 : 0,
          transform: showPanel ? "translateX(0) scale(1)" : "translateX(12px) scale(0.96)",
          transition: "opacity 0.22s ease, transform 0.22s cubic-bezier(0.34, 1.4, 0.64, 1)",
          pointerEvents: showPanel ? "auto" : "none",
          boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {sections.map(({ id, label }) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => { scrollTo(id); if (isMobile) setMobileOpen(false); }}
              style={{
                background: isActive ? "rgba(255,255,255,0.12)" : "transparent",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                padding: "7px 14px 7px 10px",
                borderRadius: "10px",
                color: isActive ? "#ffffff" : "rgba(255,255,255,0.5)",
                fontSize: "0.76rem",
                fontWeight: isActive ? 700 : 500,
                fontFamily: "'Poppins', sans-serif",
                transition: "all 0.15s ease",
                display: "flex",
                alignItems: "center",
                gap: "9px",
                whiteSpace: "nowrap",
                letterSpacing: "0.01em",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.85)";
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.07)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.5)";
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                }
              }}
            >
              <span
                style={{
                  display: "block",
                  width: isActive ? "18px" : "10px",
                  height: "2.5px",
                  backgroundColor: isActive ? "#60a5fa" : "rgba(255,255,255,0.3)",
                  borderRadius: "3px",
                  flexShrink: 0,
                  transition: "all 0.25s ease",
                }}
              />
              {label}
            </button>
          );
        })}
      </div>

      {/* Dash indicators + prev/next arrows */}
      <div
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onClick={() => isMobile && setMobileOpen((o) => !o)}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: isMobile ? "5px" : "8px",
          backgroundColor: (showPanel || isMobile) ? "rgba(15, 23, 55, 0.75)" : "transparent",
          backdropFilter: (showPanel || isMobile) ? "blur(10px)" : "none",
          WebkitBackdropFilter: (showPanel || isMobile) ? "blur(10px)" : "none",
          borderRadius: "20px",
          padding: isMobile ? "6px 5px" : (showPanel ? "10px 8px" : "4px 4px"),
          border: (showPanel || isMobile) ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
          transition: "all 0.25s ease",
          boxShadow: (showPanel || isMobile) ? "0 4px 20px rgba(0,0,0,0.25)" : "none",
          cursor: isMobile ? "pointer" : "default",
        }}
      >
        {/* Prev button */}
        <button
          {...arrowBtn(goPrev, canPrev && (showPanel || isMobile))}
          aria-label="Previous section"
          style={{
            ...arrowBtn(goPrev, canPrev && (showPanel || isMobile)).style,
            opacity: (showPanel || isMobile) ? 1 : 0,
            transform: (showPanel || isMobile) ? "scale(1)" : "scale(0.7)",
            transition: "opacity 0.2s ease, transform 0.2s ease, background 0.2s ease",
          }}
          onMouseEnter={(e) => {
            if (canPrev) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.2)";
          }}
          onMouseLeave={(e) => {
            if (canPrev) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.12)";
          }}
        >
          <ChevronUp size={isMobile ? 10 : 14} />
        </button>

        {/* Dash dots */}
        {sections.map(({ id }) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              title={sections.find((s) => s.id === id)?.label}
              aria-label={`Go to ${sections.find((s) => s.id === id)?.label ?? id} section`}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: isMobile ? "1px 0" : "2px 0",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  display: "block",
                  width: isActive ? (isMobile ? "18px" : "28px") : (isMobile ? "10px" : "16px"),
                  height: isActive ? (isMobile ? "3px" : "4px") : (isMobile ? "2px" : "3px"),
                  backgroundColor: isActive ? "#1a3270" : "rgba(148,163,184,0.55)",
                  borderRadius: "4px",
                  transition: "all 0.3s cubic-bezier(0.34, 1.3, 0.64, 1)",
                  boxShadow: isActive
                    ? "0 0 0 1.5px rgba(255,255,255,0.6), 0 2px 8px rgba(26,50,112,0.4)"
                    : "0 0 0 1px rgba(255,255,255,0.25)",
                }}
              />
            </button>
          );
        })}

        {/* Next button */}
        <button
          {...arrowBtn(goNext, canNext && (showPanel || isMobile))}
          aria-label="Next section"
          style={{
            ...arrowBtn(goNext, canNext && (showPanel || isMobile)).style,
            opacity: (showPanel || isMobile) ? 1 : 0,
            transform: (showPanel || isMobile) ? "scale(1)" : "scale(0.7)",
            transition: "opacity 0.2s ease, transform 0.2s ease, background 0.2s ease",
          }}
          onMouseEnter={(e) => {
            if (canNext) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.2)";
          }}
          onMouseLeave={(e) => {
            if (canNext) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.12)";
          }}
        >
          <ChevronDown size={isMobile ? 10 : 14} />
        </button>
      </div>
    </div>
  );
}
