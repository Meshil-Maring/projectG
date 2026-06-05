import { motion } from "framer-motion";
import { ArrowLeft, Users, Mail, ChevronRight } from "lucide-react";
import { Link, useParams, Navigate } from "react-router-dom";
import { groups } from "../../../data/groups";
import Footer from "../../../shared/components/Footer";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: "easeOut" as const },
});

export default function GroupPage() {
  const { slug } = useParams<{ slug: string }>();
  const group = groups.find((g) => g.slug === slug);

  if (!group) return <Navigate to="/" replace />;

  const Icon = group.icon;

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      {/* ── Hero Banner ── */}
      <section
        style={{
          background: `linear-gradient(135deg, ${group.gradientFrom} 0%, ${group.gradientTo} 100%)`,
          padding: "3.5rem 1.5rem 4rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "340px",
            height: "340px",
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.07)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-70px",
            left: "-70px",
            width: "240px",
            height: "240px",
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.06)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: "860px",
            margin: "0 auto",
            position: "relative",
          }}
        >
          {/* Back link */}
          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              color: "rgba(255,255,255,0.75)",
              textDecoration: "none",
              fontSize: "0.83rem",
              fontWeight: 500,
              marginBottom: "2.5rem",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,1)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.75)")
            }
          >
            <ArrowLeft size={15} />
            Back to Home
          </Link>

          <motion.div {...fadeUp(0)}>
            {/* Icon + abbreviation row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1.75rem",
                flexWrap: "wrap" as const,
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "0.875rem",
                  backgroundColor: "rgba(255,255,255,0.18)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon size={28} color="#ffffff" strokeWidth={1.6} />
              </div>

              <span
                style={{
                  display: "inline-block",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase" as const,
                  color: "rgba(255,255,255,0.9)",
                  backgroundColor: "rgba(255,255,255,0.18)",
                  padding: "0.35rem 1.1rem",
                  borderRadius: "999px",
                }}
              >
                {group.abbreviation}
              </span>

              <span
                style={{
                  fontSize: "0.78rem",
                  color: "rgba(255,255,255,0.65)",
                  fontWeight: 500,
                }}
              >
                Part of Project Generation
              </span>
            </div>

            <h1
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
                fontWeight: 800,
                color: "#ffffff",
                lineHeight: 1.2,
                marginBottom: "1rem",
              }}
            >
              {group.name}
            </h1>

            <p
              style={{
                fontSize: "1rem",
                color: "rgba(255,255,255,0.8)",
                fontStyle: "italic",
                lineHeight: 1.65,
                maxWidth: "520px",
              }}
            >
              "{group.tagline}"
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <main
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          padding: "3.5rem 1.5rem 5rem",
        }}
      >
        {/* Info cards row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.25rem",
            marginBottom: "2rem",
          }}
        >
          {[
            {
              title: "About Us",
              body: `${group.name} is a dedicated branch of Project Generation committed to creating meaningful change in our community. Our members work collaboratively toward our shared goals.`,
              delay: 0.1,
            },
            {
              title: "What We Do",
              body: "We run programs, events, and initiatives that directly address our focus area. Each activity is designed to maximize impact and engage community members meaningfully.",
              delay: 0.2,
            },
            {
              title: "How to Join",
              body: "Membership is open to all who share our values. Reach out via the contact section on the home page or speak with any current member to get started.",
              delay: 0.3,
            },
          ].map(({ title, body, delay }) => (
            <motion.div
              key={title}
              {...fadeUp(delay)}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "1rem",
                padding: "1.75rem",
                boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                borderTop: `4px solid ${group.color}`,
              }}
            >
              <h2
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "#0f172a",
                  marginBottom: "0.65rem",
                }}
              >
                {title}
              </h2>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "#64748b",
                  lineHeight: 1.75,
                }}
              >
                {body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats strip */}
        <motion.div
          {...fadeUp(0.35)}
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "1rem",
            padding: "1.75rem 2rem",
            boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
            marginBottom: "2rem",
            display: "flex",
            flexWrap: "wrap" as const,
            gap: "2rem",
            justifyContent: "space-around",
          }}
        >
          {[
            { label: "Active Members", value: "—" },
            { label: "Projects Completed", value: "—" },
            { label: "Lives Impacted", value: "—" },
          ].map(({ label, value }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "1.6rem",
                  fontWeight: 800,
                  color: group.color,
                  lineHeight: 1,
                  marginBottom: "0.3rem",
                }}
              >
                {value}
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "#94a3b8",
                  fontWeight: 500,
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Other groups */}
        <motion.div {...fadeUp(0.4)} style={{ marginBottom: "2rem" }}>
          <h3
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "1rem",
              fontWeight: 700,
              color: "#0f172a",
              marginBottom: "0.75rem",
            }}
          >
            Explore Other Groups
          </h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap" as const,
              gap: "0.6rem",
            }}
          >
            {groups
              .filter((g) => g.id !== group.id)
              .map((g) => {
                const GIcon = g.icon;
                return (
                  <Link
                    key={g.id}
                    to={`/groups/${g.slug}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.45rem",
                      padding: "0.45rem 0.9rem",
                      borderRadius: "999px",
                      backgroundColor: g.lightColor,
                      color: g.color,
                      textDecoration: "none",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      transition: "opacity 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.opacity = "0.8")
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    <GIcon size={13} strokeWidth={2} />
                    {g.abbreviation}
                    <ChevronRight size={12} />
                  </Link>
                );
              })}
          </div>
        </motion.div>

        {/* CTA card */}
        <motion.div
          {...fadeUp(0.45)}
          style={{
            background: `linear-gradient(135deg, ${group.gradientFrom} 0%, ${group.gradientTo} 100%)`,
            borderRadius: "1.25rem",
            padding: "2.5rem 2rem",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-50px",
              right: "-50px",
              width: "160px",
              height: "160px",
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.08)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem",
            }}
          >
            <Users size={22} color="#ffffff" strokeWidth={1.8} />
          </div>

          <h3
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "1.25rem",
              fontWeight: 700,
              color: "#ffffff",
              marginBottom: "0.6rem",
            }}
          >
            Join {group.abbreviation} Today
          </h3>
          <p
            style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "0.88rem",
              marginBottom: "1.5rem",
              maxWidth: "380px",
              margin: "0 auto 1.5rem",
            }}
          >
            Become part of {group.name} and contribute to something bigger than
            yourself.
          </p>

          <Link
            to="/#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "#ffffff",
              color: group.color,
              fontWeight: 700,
              fontSize: "0.875rem",
              padding: "0.75rem 2rem",
              borderRadius: "0.5rem",
              textDecoration: "none",
              boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
            }}
          >
            <Mail size={15} />
            Get in Touch
          </Link>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
