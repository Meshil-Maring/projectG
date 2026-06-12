import { motion } from "framer-motion";
import {
  Users,
  HandHeart,
  BookOpen,
  Leaf,
  Heart,
  Baby,
  PersonStanding,
  Stethoscope,
  TreePine,
  AlertTriangle,
  Camera,
} from "lucide-react";
import { PRIMARY, SECONDARY, ACCENT, LIGHT_BG, fade } from "./whg.constants";
import { useGroupActivities } from "../../../context/GroupActivitiesContext";
import { usePageSections } from "../../../context/PageContext";

const DEFAULT_ACTIVITIES = {
  doEyebrow: "What We Do",
  doHeading: "How We Serve",
  focusEyebrow: "Our Focus Areas",
  focusHeading: "Where We Make a Difference",
  impactEyebrow: "Our Impact",
  galleryEyebrow: "Our Activities",
  galleryHeading: "What We've Been Doing",
};

const whatWeDo = [
  { icon: Users, title: "Community Service", desc: "Organizing drives and activities to support those in need." },
  { icon: HandHeart, title: "Support & Relief", desc: "Providing essentials, care, and comfort during difficult times." },
  { icon: BookOpen, title: "Education & Awareness", desc: "Spreading knowledge and life skills for a better tomorrow." },
  { icon: Leaf, title: "Environment Care", desc: "Working for a cleaner, greener, healthier planet." },
  { icon: Heart, title: "Inclusive Outreach", desc: "Reaching out to all, leaving no one behind." },
];

const focusAreas = [
  { icon: Baby, title: "Children", desc: "Education, nutrition, and child welfare" },
  { icon: PersonStanding, title: "Elderly", desc: "Care, support, and companionship" },
  { icon: Stethoscope, title: "Health", desc: "Health camps and wellness support" },
  { icon: TreePine, title: "Environment", desc: "Tree plantation, cleanliness drives" },
  { icon: AlertTriangle, title: "Disaster Relief", desc: "Immediate help and rehabilitation for affected families" },
];

const impactStats = [
  { value: "5,000+", label: "Lives", sub: "Touched" },
  { value: "120+", label: "Community", sub: "Programs" },
  { value: "300+", label: "Volunteers", sub: "Involved" },
  { value: "25+", label: "Cities", sub: "Reached" },
  { value: "100%", label: "Commitment", sub: "to Humanity" },
];

export default function WhgActivities() {
  const { data } = useGroupActivities();
  const activities = data.whg;
  const { getSectionData } = usePageSections();
  const content = { ...DEFAULT_ACTIVITIES, ...getSectionData("whg-activities") };

  return (
    <section style={{ background: "#fff8f4", padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* ── What We Do ── */}
        <motion.div {...fade(0)} style={{ marginBottom: "4.5rem" }}>
          <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: PRIMARY, display: "block", marginBottom: "0.5rem" }}>
            {content.doEyebrow}
          </span>
          <div style={{ width: "40px", height: "3px", background: PRIMARY, borderRadius: "2px", marginBottom: "1rem" }} />
          <h2 style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)", fontWeight: 800, color: "#0f172a", marginBottom: "2rem", lineHeight: 1.2 }}>
            {content.doHeading}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            {whatWeDo.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                {...fade(0.05 + i * 0.06)}
                whileHover={{ y: -4, boxShadow: "0 12px 28px rgba(194,65,12,0.12)" }}
                style={{ background: "#ffffff", borderRadius: "1rem", padding: "1.4rem 1.25rem", border: "1px solid #fde8da", boxShadow: "0 2px 8px rgba(194,65,12,0.05)" }}
              >
                <div style={{ width: "42px", height: "42px", borderRadius: "11px", background: LIGHT_BG, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.9rem" }}>
                  <Icon size={19} color={PRIMARY} strokeWidth={1.6} />
                </div>
                <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.35rem" }}>{title}</div>
                <div style={{ fontSize: "0.76rem", color: "#64748b", lineHeight: 1.6 }}>{desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Our Focus Areas ── */}
        <motion.div {...fade(0)} style={{ marginBottom: "4.5rem" }}>
          <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: PRIMARY, display: "block", marginBottom: "0.5rem" }}>
            {content.focusEyebrow}
          </span>
          <div style={{ width: "40px", height: "3px", background: PRIMARY, borderRadius: "2px", marginBottom: "1rem" }} />
          <h2 style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)", fontWeight: 800, color: "#0f172a", marginBottom: "2rem", lineHeight: 1.2 }}>
            {content.focusHeading}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" }}>
            {focusAreas.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                {...fade(0.05 + i * 0.06)}
                whileHover={{ y: -4, boxShadow: "0 12px 28px rgba(194,65,12,0.12)" }}
                style={{ background: "#ffffff", borderRadius: "1rem", padding: "1.5rem 1rem", textAlign: "center" as const, border: "1px solid #fde8da", boxShadow: "0 2px 8px rgba(194,65,12,0.05)" }}
              >
                <div style={{ width: "46px", height: "46px", borderRadius: "50%", background: LIGHT_BG, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.7rem" }}>
                  <Icon size={20} color={PRIMARY} strokeWidth={1.6} />
                </div>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.25rem" }}>{title}</div>
                <div style={{ fontSize: "0.73rem", color: "#64748b", lineHeight: 1.5 }}>{desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Our Impact band ── */}
        <motion.div
          {...fade(0.1)}
          style={{
            position: "relative",
            overflow: "hidden",
            background: `linear-gradient(120deg, ${ACCENT} 0%, ${PRIMARY} 55%, ${SECONDARY} 120%)`,
            borderRadius: "1.25rem",
            padding: "2.5rem 2rem",
            marginBottom: "5rem",
            boxShadow: "0 18px 44px rgba(194,65,12,0.22)",
          }}
        >
          <div style={{ position: "absolute", top: "-70px", right: "-70px", width: "220px", height: "220px", borderRadius: "50%", background: "rgba(255,255,255,0.07)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "-50px", left: "-50px", width: "170px", height: "170px", borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.75rem", position: "relative" }}>
            <Heart size={15} color="rgba(255,255,255,0.85)" fill="rgba(255,255,255,0.85)" />
            <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.85)" }}>
              {content.impactEyebrow}
            </span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "1.5rem 1rem",
              position: "relative",
            }}
          >
            {impactStats.map(({ value, label, sub }, i) => (
              <motion.div key={value} {...fade(0.15 + i * 0.07)} style={{ textAlign: "center" as const }}>
                <div style={{ fontSize: "clamp(1.6rem, 3vw, 2.1rem)", fontWeight: 800, color: "#ffffff", lineHeight: 1.1, marginBottom: "0.3rem" }}>{value}</div>
                <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>
                  {label} <span style={{ color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>{sub}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

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
                <motion.div key={id} {...fade(i * 0.07)} style={{ background: "#ffffff", borderRadius: "1rem", overflow: "hidden", boxShadow: "0 2px 12px rgba(194,65,12,0.07)", border: "1px solid #fde8da" }}>
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
