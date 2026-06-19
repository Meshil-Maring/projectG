import { Users } from "lucide-react";
import { motion } from "framer-motion";
import heroBg from "../../../assets/image/herosection_small.png";
import mHeroBg from "../../../assets/image/m_hero_image.png";
import { INK_PATHS } from "./heroInkPaths";
import { useNavigate } from "react-router-dom";
import {
  useHomePageData,
  DEFAULT_HERO_DESCRIPTION,
} from "../../../context/HomePageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const, delay },
  }),
};

const fadeIn = {
  hidden: { opacity: 0, scale: 1.06 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.4, ease: "easeOut" as const },
  },
};

export default function Hero() {
  const navigate = useNavigate();
  const { data } = useHomePageData();
  const bgSrc = data.heroImageUrl || heroBg;
  const mobileBgSrc = data.heroImageUrl || mHeroBg;
  const description = data.heroDescription || DEFAULT_HERO_DESCRIPTION;
  const customTitle = data.heroTitle.trim();

  return (
    <>
      {/* ── Mobile Hero ─────────────────────────────────────────── */}
      <section
        className="sm:hidden relative w-full overflow-hidden flex flex-col"
        style={{ minHeight: "100svh" }}
      >
        <motion.img
          src={mobileBgSrc}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
          variants={fadeIn}
          initial="hidden"
          animate="show"
          className="absolute inset-0 w-full h-full object-cover object-top select-none pointer-events-none"
        />

        {/* Bottom gradient fade — softens the photo-to-next-section cut */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "200px",
            background: "linear-gradient(to top, rgba(255,255,255,0.95) 0%, transparent 100%)",
            pointerEvents: "none",
            zIndex: 5,
          }}
        />

        <div className="relative z-10 flex flex-col justify-start px-5 pt-14 pb-10 flex-1">
          {/* frosted glass card */}
          <motion.div
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            style={{
              background: "rgba(255,255,255,0.82)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderRadius: "1.5rem",
              border: "1px solid rgba(255,255,255,0.75)",
              boxShadow: "0 8px 40px 0 rgba(26,50,112,0.12), 0 2px 8px 0 rgba(26,50,112,0.06)",
              padding: "1.75rem 1.4rem 1.6rem",
            }}
          >
            {customTitle ? (
              <h1
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  color: "#1a3270",
                  fontSize: "2.3rem",
                }}
              >
                {customTitle}
              </h1>
            ) : (
              <>
                <h1
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 700,
                    lineHeight: 1.1,
                    color: "#1a3270",
                    fontSize: "2.3rem",
                  }}
                >
                  Together
                  <br />
                  We Can
                </h1>

                <svg
                  viewBox="0 0 1126 295"
                  aria-label="Change Lives"
                  style={{
                    height: "3.2rem",
                    width: "auto",
                    display: "block",
                    marginTop: "-0.1em",
                    overflow: "visible",
                  }}
                >
                  {INK_PATHS.map((p, i) => (
                    <motion.path
                      key={i}
                      d={p.d}
                      fillRule="evenodd"
                      fill="#2563eb"
                      stroke="#2563eb"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0, fillOpacity: 0 }}
                      animate={{ pathLength: 1, fillOpacity: 1 }}
                      transition={{
                        pathLength: {
                          delay: p.drawDelay,
                          duration: p.drawDuration,
                          ease: [0.55, 0.085, 0.4, 0.92] as const,
                        },
                        fillOpacity: {
                          delay: p.fillDelay,
                          duration: 0.12,
                          ease: "easeOut" as const,
                        },
                      }}
                    />
                  ))}
                </svg>
              </>
            )}

            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                color: "#374151",
                fontSize: "0.925rem",
                lineHeight: 1.75,
                marginTop: "1.5rem",
              }}
            >
              {description}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", marginTop: "1.75rem" }}>
              <motion.button
                custom={0.55}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/about-us")}
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  backgroundColor: "#1a3270",
                  color: "#ffffff",
                  padding: "0.8rem 1.4rem",
                  borderRadius: "0.6rem",
                  border: "none",
                  cursor: "pointer",
                  width: "100%",
                  maxWidth: "320px",
                  boxShadow: "0 4px 18px 0 rgba(26,50,112,0.45)",
                }}
              >
                About Us
              </motion.button>

              <motion.button
                custom={0.68}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/get-involved")}
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  backgroundColor: "rgba(255,255,255,0.45)",
                  color: "#1a3270",
                  padding: "0.8rem 1.2rem",
                  borderRadius: "0.6rem",
                  border: "2px solid rgba(26,50,112,0.45)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.45rem",
                  width: "100%",
                  maxWidth: "320px",
                }}
              >
                <Users size={16} />
                Get Involved
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Desktop Hero ─────────────────────────────────────────── */}
      <section
        className="hidden sm:block relative w-full overflow-hidden"
        style={{ minHeight: "clamp(420px, 56vw, 720px)" }}
      >
        <motion.img
          variants={fadeIn}
          initial="hidden"
          animate="show"
          src={bgSrc}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
        />

        <div className="relative z-10 flex items-center h-full min-h-[inherit]">
          <div
            style={{
              paddingLeft: "clamp(1.5rem, 18vw, 22rem)",
              paddingRight: "1.6rem",
            }}
            className="py-16 lg:py-24 max-w-[64%] sm:max-w-[52%]"
          >
            {customTitle ? (
              <motion.h1
                custom={0.2}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  color: "#1a3270",
                  fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                }}
              >
                {customTitle}
              </motion.h1>
            ) : (
              <>
                <motion.h1
                  custom={0.2}
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 700,
                    lineHeight: 1.1,
                    color: "#1a3270",
                    fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                  }}
                >
                  Together
                  <br />
                  We Can
                </motion.h1>

                <svg
                  viewBox="0 0 1126 295"
                  aria-label="Change Lives"
                  style={{
                    height: "clamp(2.6rem, 5vw, 4.2rem)",
                    width: "auto",
                    display: "block",
                    marginTop: "-0.2em",
                    overflow: "visible",
                  }}
                >
                  {INK_PATHS.map((p, i) => (
                    <motion.path
                      key={i}
                      d={p.d}
                      fillRule="evenodd"
                      fill="#2563eb"
                      stroke="#2563eb"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0, fillOpacity: 0 }}
                      animate={{ pathLength: 1, fillOpacity: 1 }}
                      transition={{
                        pathLength: {
                          delay: p.drawDelay,
                          duration: p.drawDuration,
                          ease: [0.55, 0.085, 0.4, 0.92] as const,
                        },
                        fillOpacity: {
                          delay: p.fillDelay,
                          duration: 0.12,
                          ease: "easeOut" as const,
                        },
                      }}
                    />
                  ))}
                </svg>
              </>
            )}

            <motion.p
              custom={0.6}
              className="mb-2"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                color: "#475569",
                fontSize: "clamp(0.78rem, 1.1vw, 0.95rem)",
                lineHeight: 1.65,
                marginTop: "1rem",
                maxWidth: "20rem",
              }}
            >
              {description}
            </motion.p>

            <motion.div
              custom={0.78}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              style={{ marginTop: "2rem" }}
              className="flex flex-col gap-3"
            >
              <div className="flex flex-wrap gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/about-us")}
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: "clamp(0.78rem, 0.9vw, 0.875rem)",
                    backgroundColor: "#1a3270",
                    color: "#ffffff",
                    padding: "0.6rem 1.4rem",
                    borderRadius: "0.375rem",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 4px 14px 0 rgba(26,50,112,0.35)",
                  }}
                >
                  About Us
                </motion.button>

                <motion.button
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(26,50,112,0.06)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/get-involved")}
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: "clamp(0.78rem, 0.9vw, 0.875rem)",
                    backgroundColor: "transparent",
                    color: "#1a3270",
                    padding: "0.6rem 1.2rem",
                    borderRadius: "0.375rem",
                    border: "2px solid rgba(26,50,112,0.55)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                >
                  <Users size={15} />
                  Get Involved
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
