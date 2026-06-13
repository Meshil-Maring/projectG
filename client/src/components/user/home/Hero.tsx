import { Heart, Users } from "lucide-react";
import { motion } from "framer-motion";
import heroBg from "../../../assets/image/herosection_small.png";
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
  const description = data.heroDescription || DEFAULT_HERO_DESCRIPTION;
  const customTitle = data.heroTitle.trim();

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: "clamp(420px, 56vw, 720px)" }}
    >
      {/* Background — subtle zoom-in on mount */}
      <motion.img
        src={bgSrc}
        alt=""
        aria-hidden="true"
        variants={fadeIn}
        initial="hidden"
        animate="show"
        className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
      />

      {/* Text content */}
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
              {/* "Together We Can" */}
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

              {/* "Change Lives" — SVG handwriting draw animation */}
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

          {/* Subtitle */}
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

          {/* CTA buttons */}
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

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/donate")}
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(0.78rem, 0.9vw, 0.875rem)",
                  backgroundColor: "var(--color-purple)",
                  color: "#ffffff",
                  padding: "0.6rem 1.4rem",
                  borderRadius: "0.375rem",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  boxShadow: "var(--shadow-donate)",
                }}
              >
                <Heart size={15} className="fill-white" />
                Donate Now
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
