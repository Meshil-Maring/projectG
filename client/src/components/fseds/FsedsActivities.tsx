import { motion } from "framer-motion";
import {
  Globe,
  TrendingUp,
  Briefcase,
  Users,
  DollarSign,
  Handshake,
  Building,
  Heart,
  GraduationCap,
  BookOpen,
  Sprout,
  ShoppingBag,
  TreePine,
} from "lucide-react";
import { PRIMARY, LIGHT_BG, fade } from "./fseds.constants";

const whatWeDo = [
  {
    icon: TrendingUp,
    title: "Livelihood Development",
    desc: "Promoting sustainable income opportunities and decent livelihoods for families and individuals.",
  },
  {
    icon: Briefcase,
    title: "Entrepreneurship Support",
    desc: "Helping small businesses start, grow, and succeed with mentorship and resources.",
  },
  {
    icon: DollarSign,
    title: "Financial Inclusion",
    desc: "Improving access to financial services, banking, and credit resources for underserved communities.",
  },
  {
    icon: Handshake,
    title: "Market Linkages",
    desc: "Connecting producers to markets for better opportunities and fair returns.",
  },
  {
    icon: Building,
    title: "Community Infrastructure",
    desc: "Building essential infrastructure for sustainable community growth and well-being.",
  },
];

const focusAreas = [
  { icon: Sprout, title: "Agriculture & Agri-Business", desc: "Farming, allied sectors & rural enterprise" },
  { icon: ShoppingBag, title: "Small Enterprise Development", desc: "Micro & small business growth support" },
  { icon: Heart, title: "Women Economic Empowerment", desc: "Income, independence & leadership for women" },
  { icon: GraduationCap, title: "Youth Employment & Skills", desc: "Jobs, vocational training & career readiness" },
  { icon: BookOpen, title: "Financial Literacy & Inclusion", desc: "Savings, credit & financial know-how" },
  { icon: TreePine, title: "Sustainable Communities", desc: "Eco-friendly, resilient local systems" },
];

const impactStats = [
  { value: "8,500+", label: "Lives", sub: "Improved" },
  { value: "250+", label: "Small Businesses", sub: "Supported" },
  { value: "120+", label: "Communities", sub: "Reached" },
  { value: "500+", label: "Jobs & Livelihoods", sub: "Created" },
  { value: "100%", label: "Commitment to", sub: "Sustainable Growth" },
];

export default function FsedsActivities() {
  return (
    <section style={{ background: "#faf5ff", padding: "5rem 1.5rem" }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "2.5rem",
          alignItems: "start",
        }}
      >
        {/* What We Do */}
        <motion.div {...fade(0)}>
          <h3
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase" as const,
              color: PRIMARY,
              marginBottom: "1.25rem",
            }}
          >
            WHAT WE DO
          </h3>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.85rem" }}>
            {whatWeDo.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                  background: "#ffffff",
                  borderRadius: "0.875rem",
                  padding: "0.875rem 1rem",
                  boxShadow: "0 2px 8px rgba(109,40,217,0.05)",
                  border: "1px solid #e4d9ff",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "9px",
                    background: LIGHT_BG,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={17} color={PRIMARY} strokeWidth={1.6} />
                </div>
                <div>
                  <div
                    style={{ fontSize: "0.83rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.15rem" }}
                  >
                    {title}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#64748b", lineHeight: 1.5 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Focus Areas */}
        <motion.div {...fade(0.1)}>
          <h3
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase" as const,
              color: PRIMARY,
              marginBottom: "1.25rem",
            }}
          >
            FOCUS AREAS
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
            {focusAreas.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                style={{
                  background: "#ffffff",
                  borderRadius: "0.875rem",
                  padding: "1.25rem 1rem",
                  textAlign: "center" as const,
                  boxShadow: "0 2px 8px rgba(109,40,217,0.05)",
                  border: "1px solid #e4d9ff",
                }}
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    background: LIGHT_BG,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 0.6rem",
                  }}
                >
                  <Icon size={19} color={PRIMARY} strokeWidth={1.6} />
                </div>
                <div
                  style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.2rem" }}
                >
                  {title}
                </div>
                <div style={{ fontSize: "0.72rem", color: "#64748b", lineHeight: 1.45 }}>{desc}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Our Impact */}
        <motion.div {...fade(0.2)}>
          <h3
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase" as const,
              color: PRIMARY,
              marginBottom: "1.25rem",
            }}
          >
            OUR IMPACT
          </h3>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.75rem" }}>
            {impactStats.map(({ value, label, sub }) => (
              <div
                key={value}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  background: "#ffffff",
                  borderRadius: "0.875rem",
                  padding: "0.875rem 1.1rem",
                  boxShadow: "0 2px 8px rgba(109,40,217,0.05)",
                  border: "1px solid #e4d9ff",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: LIGHT_BG,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Globe size={18} color={PRIMARY} strokeWidth={1.6} />
                </div>
                <div>
                  <div style={{ fontSize: "1.3rem", fontWeight: 800, color: PRIMARY, lineHeight: 1 }}>
                    {value}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#475569", fontWeight: 600 }}>
                    {label}{" "}
                    <span style={{ color: "#94a3b8", fontWeight: 500 }}>{sub}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
