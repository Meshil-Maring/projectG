import { useState, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface Section {
  id: string;
  label: string;
}

interface SectionNavigatorProps {
  sections: Section[];
}

export default function SectionNavigator({ sections }: SectionNavigatorProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id ?? "");
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  if (isMobile) return null;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
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

  const arrowBtn = (onClick: () => void, enabled: boolean, children: React.ReactNode) => ({
    onClick,
    style: {
      background: enabled ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "50%",
      width: "28px",
      height: "28px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: enabled ? "pointer" : "default",
      color: enabled ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.2)",
      transition: "all 0.2s ease",
      flexShrink: 0,
    } as React.CSSProperties,
  });

  return (
    <div
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "fixed",
        right: "20px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      {/* Label panel — visible only on hover */}
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
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? "translateX(0) scale(1)" : "translateX(12px) scale(0.96)",
          transition: "opacity 0.22s ease, transform 0.22s cubic-bezier(0.34, 1.4, 0.64, 1)",
          pointerEvents: isHovered ? "auto" : "none",
          boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {sections.map(({ id, label }) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
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

      {/* Dash indicators + prev/next arrows — only this strip triggers the label panel */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          backgroundColor: isHovered ? "rgba(15, 23, 55, 0.75)" : "transparent",
          backdropFilter: isHovered ? "blur(10px)" : "none",
          WebkitBackdropFilter: isHovered ? "blur(10px)" : "none",
          borderRadius: "20px",
          padding: isHovered ? "10px 8px" : "4px 4px",
          border: isHovered ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
          transition: "all 0.25s ease",
          boxShadow: isHovered ? "0 4px 20px rgba(0,0,0,0.25)" : "none",
        }}
      >
        {/* Prev button */}
        <button
          {...arrowBtn(goPrev, canPrev && isHovered, null)}
          style={{
            ...arrowBtn(goPrev, canPrev && isHovered, null).style,
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? "scale(1)" : "scale(0.7)",
            transition: "opacity 0.2s ease, transform 0.2s ease, background 0.2s ease",
          }}
          onMouseEnter={(e) => {
            if (canPrev) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.2)";
          }}
          onMouseLeave={(e) => {
            if (canPrev) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.12)";
          }}
        >
          <ChevronUp size={14} />
        </button>

        {/* Dash dots */}
        {sections.map(({ id }) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              title={sections.find((s) => s.id === id)?.label}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "2px 0",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  display: "block",
                  width: isActive ? "28px" : "16px",
                  height: isActive ? "4px" : "3px",
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
          {...arrowBtn(goNext, canNext && isHovered, null)}
          style={{
            ...arrowBtn(goNext, canNext && isHovered, null).style,
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? "scale(1)" : "scale(0.7)",
            transition: "opacity 0.2s ease, transform 0.2s ease, background 0.2s ease",
          }}
          onMouseEnter={(e) => {
            if (canNext) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.2)";
          }}
          onMouseLeave={(e) => {
            if (canNext) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.12)";
          }}
        >
          <ChevronDown size={14} />
        </button>
      </div>
    </div>
  );
}
