import { motion } from "framer-motion";
import {
  Globe,
  TrendingUp,
  Briefcase,
  DollarSign,
  Handshake,
  Building,
  Heart,
  GraduationCap,
  BookOpen,
  Sprout,
  ShoppingBag,
  TreePine,
  Camera,
} from "lucide-react";
import { PRIMARY, LIGHT_BG, fade } from "./fseds.constants";
import { useGroupActivities } from "../../../context/GroupActivitiesContext";
import { usePageSections } from "../../../context/PageContext";

const DEFAULT_ACTIVITIES = {
  doEyebrow: "WHAT WE DO",
  focusEyebrow: "FOCUS AREAS",
  impactEyebrow: "OUR IMPACT",
  galleryEyebrow: "Our Activities",
  galleryHeading: "What We've Been Doing",
};

const whatWeDo = [
  { icon: TrendingUp, title: "Livelihood Development", desc: "Promoting sustainable income opportunities and decent livelihoods for families and individuals." },
  { icon: Briefcase, title: "Entrepreneurship Support", desc: "Helping small businesses start, grow, and succeed with mentorship and resources." },
  { icon: DollarSign, title: "Financial Inclusion", desc: "Improving access to financial services, banking, and credit resources for underserved communities." },
  { icon: Handshake, title: "Market Linkages", desc: "Connecting producers to markets for better opportunities and fair returns." },
  { icon: Building, title: "Community Infrastructure", desc: "Building essential infrastructure for sustainable community growth and well-being." },
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
  const { data } = useGroupActivities();
  const activities = data.fseds;
  const { getSectionData } = usePageSections();
  const content = { ...DEFAULT_ACTIVITIES, ...getSectionData("fseds-activities") };

  return (
    <section style={{ background: "#faf5ff", padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* What We Do / Focus Areas / Impact */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2.5rem", alignItems: "start", marginBottom: "5rem" }}>
          <motion.div {...fade(0)}>
            <h3 style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: PRIMARY, marginBottom: "1.25rem" }}>
              {content.doEyebrow}
            </h3>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.85rem" }}>
              {whatWeDo.map(({ icon: Icon, title, desc }) => (
                <div key={title} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", background: "#ffffff", borderRadius: "0.875rem", padding: "0.875rem 1rem", boxShadow: "0 2px 8px rgba(109,40,217,0.05)", border: "1px solid #e4d9ff" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "9px", background: LIGHT_BG, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={17} color={PRIMARY} strokeWidth={1.6} />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.83rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.15rem" }}>{title}</div>
                    <div style={{ fontSize: "0.75rem", color: "#64748b", lineHeight: 1.5 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fade(0.1)}>
            <h3 style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: PRIMARY, marginBottom: "1.25rem" }}>
              {content.focusEyebrow}
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
              {focusAreas.map(({ icon: Icon, title, desc }) => (
                <div key={title} style={{ background: "#ffffff", borderRadius: "0.875rem", padding: "1.25rem 1rem", textAlign: "center" as const, boxShadow: "0 2px 8px rgba(109,40,217,0.05)", border: "1px solid #e4d9ff" }}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: LIGHT_BG, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.6rem" }}>
                    <Icon size={19} color={PRIMARY} strokeWidth={1.6} />
                  </div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.2rem" }}>{title}</div>
                  <div style={{ fontSize: "0.72rem", color: "#64748b", lineHeight: 1.45 }}>{desc}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fade(0.2)}>
            <h3 style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: PRIMARY, marginBottom: "1.25rem" }}>
              {content.impactEyebrow}
            </h3>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.75rem" }}>
              {impactStats.map(({ value, label, sub }) => (
                <div key={value} style={{ display: "flex", alignItems: "center", gap: "1rem", background: "#ffffff", borderRadius: "0.875rem", padding: "0.875rem 1.1rem", boxShadow: "0 2px 8px rgba(109,40,217,0.05)", border: "1px solid #e4d9ff" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: LIGHT_BG, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Globe size={18} color={PRIMARY} strokeWidth={1.6} />
                  </div>
                  <div>
                    <div style={{ fontSize: "1.3rem", fontWeight: 800, color: PRIMARY, lineHeight: 1 }}>{value}</div>
                    <div style={{ fontSize: "0.75rem", color: "#475569", fontWeight: 600 }}>
                      {label} <span style={{ color: "#94a3b8", fontWeight: 500 }}>{sub}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Activities Gallery */}
        {activities.length > 0 && (
          <motion.div {...fade(0.25)}>
            <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: PRIMARY, display: "block", marginBottom: "0.5rem" }}>
              {content.galleryEyebrow}
            </span>
            <div style={{ width: "40px", height: "3px", background: PRIMARY, borderRadius: "2px", marginBottom: "1rem" }} />
            <h2 style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)", fontWeight: 800, color: "#0f172a", marginBottom: "2rem", lineHeight: 1.2 }}>
              {content.galleryHeading}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
              {activities.map(({ id, title, desc, imageUrl }, i) => (
                <motion.div key={id} {...fade(i * 0.07)} style={{ background: "#ffffff", borderRadius: "1rem", overflow: "hidden", boxShadow: "0 2px 12px rgba(109,40,217,0.07)", border: "1px solid #e4d9ff" }}>
                  <div style={{ position: "relative" as const, paddingTop: "62%", background: LIGHT_BG }}>
                    {imageUrl ? (
                      <img src={imageUrl} alt={title} style={{ position: "absolute" as const, inset: 0, width: "100%", height: "100%", objectFit: "cover" as const }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    ) : (
                      <div style={{ position: "absolute" as const, inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" as const, gap: "0.5rem" }}>
                        <Camera size={36} color={PRIMARY} strokeWidth={1.4} style={{ opacity: 0.3 }} />
                        <span style={{ fontSize: "0.68rem", color: PRIMARY, opacity: 0.4, letterSpacing: "0.05em" }}>Add Photo</span>
                      </div>
                    )}
                  </div>
                  <div style={{ padding: "1rem 1.25rem 1.25rem" }}>
                    <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.4rem" }}>{title}</div>
                    <div style={{ fontSize: "0.78rem", color: "#64748b", lineHeight: 1.65 }}>{desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}
