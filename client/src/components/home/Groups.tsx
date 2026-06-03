import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { groups } from "../../data/groups";

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function Groups() {
  return (
    <section
      id="groups"
      style={{
        backgroundColor: "#f8fafc",
        padding: "5rem 1.5rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span
            style={{
              display: "inline-block",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase" as const,
              color: "#f97316",
              marginBottom: "0.75rem",
            }}
          >
            Our Community
          </span>
          <h2
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(1.75rem, 4vw, 2.4rem)",
              fontWeight: 700,
              color: "#0f172a",
              marginBottom: "1rem",
              lineHeight: 1.2,
            }}
          >
            Club of Society
          </h2>
          <p
            style={{
              fontSize: "0.97rem",
              color: "#64748b",
              maxWidth: "500px",
              margin: "0 auto",
              lineHeight: 1.75,
            }}
          >
            Project Generation is powered by five dedicated groups, each focused
            on a unique dimension of social impact.
          </p>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(195px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {groups.map((group, i) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={group.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={cardVariants}
              >
                <Link
                  to={`/groups/${group.slug}`}
                  style={{
                    textDecoration: "none",
                    display: "block",
                    height: "100%",
                  }}
                >
                  <motion.div
                    whileHover={{
                      y: -6,
                      boxShadow: "0 18px 42px rgba(0,0,0,0.11)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    style={{
                      backgroundColor: "#ffffff",
                      borderRadius: "1rem",
                      overflow: "hidden",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                      border: "1px solid #f1f5f9",
                      cursor: "pointer",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* Top color bar */}
                    <div
                      style={{
                        height: "4px",
                        background: `linear-gradient(90deg, ${group.gradientFrom}, ${group.gradientTo})`,
                        flexShrink: 0,
                      }}
                    />

                    <div
                      style={{
                        padding: "1.5rem",
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {/* Icon */}
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "0.75rem",
                          backgroundColor: group.lightColor,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: "1rem",
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={22} color={group.color} strokeWidth={1.8} />
                      </div>

                      {/* Abbreviation badge */}
                      <span
                        style={{
                          display: "inline-block",
                          fontSize: "0.65rem",
                          fontWeight: 700,
                          letterSpacing: "0.09em",
                          color: group.color,
                          backgroundColor: group.lightColor,
                          padding: "0.22rem 0.65rem",
                          borderRadius: "999px",
                          marginBottom: "0.6rem",
                          width: "fit-content",
                        }}
                      >
                        {group.abbreviation}
                      </span>

                      {/* Group name */}
                      <h3
                        style={{
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: "0.93rem",
                          fontWeight: 700,
                          color: "#0f172a",
                          lineHeight: 1.45,
                          flex: 1,
                          marginBottom: "1.25rem",
                        }}
                      >
                        {group.name}
                      </h3>

                      {/* Explore CTA */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.3rem",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          color: group.color,
                          paddingTop: "1rem",
                          borderTop: "1px solid #f1f5f9",
                          flexShrink: 0,
                        }}
                      >
                        Explore Group
                        <ArrowRight size={13} />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
