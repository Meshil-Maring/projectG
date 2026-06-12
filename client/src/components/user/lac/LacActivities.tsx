import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { NAV_BLUE, BRIGHT_BLUE, GOLD, fade } from "./lac.constants";
import { useGroupActivities } from "../../../context/GroupActivitiesContext";
import { usePageSections } from "../../../context/PageContext";

const DEFAULT_ACTIVITIES = {
  galleryEyebrow: "Our Activities",
  galleryHeading: "What We've Been Doing",
};

export default function LacActivities() {
  const { data } = useGroupActivities();
  const activities = data.lac;
  const { getSectionData } = usePageSections();
  const content = { ...DEFAULT_ACTIVITIES, ...getSectionData("lac-activities") };

  if (activities.length === 0) return null;

  return (
    <section style={{ background: "#f0f4ff", padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        <motion.div {...fade(0)}>
          <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: BRIGHT_BLUE, display: "block", marginBottom: "0.5rem" }}>
            {content.galleryEyebrow}
          </span>
          <div style={{ width: "40px", height: "3px", background: GOLD, borderRadius: "2px", marginBottom: "1rem" }} />
          <h2 style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)", fontWeight: 800, color: NAV_BLUE, marginBottom: "2rem", lineHeight: 1.2 }}>
            {content.galleryHeading}
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {activities.map(({ id, title, desc, imageUrl }, i) => (
            <motion.div key={id} {...fade(i * 0.07)} style={{ background: "#ffffff", borderRadius: "1rem", overflow: "hidden", boxShadow: "0 2px 12px rgba(26,50,112,0.07)", border: "1px solid #e8edf8" }}>
              <div style={{ position: "relative" as const, paddingTop: "62%", background: "#eef1fb" }}>
                {imageUrl ? (
                  <img src={imageUrl} alt={title} style={{ position: "absolute" as const, inset: 0, width: "100%", height: "100%", objectFit: "cover" as const }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                ) : (
                  <div style={{ position: "absolute" as const, inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" as const, gap: "0.5rem" }}>
                    <Camera size={36} color={NAV_BLUE} strokeWidth={1.4} style={{ opacity: 0.3 }} />
                    <span style={{ fontSize: "0.68rem", color: NAV_BLUE, opacity: 0.4, letterSpacing: "0.05em" }}>Add Photo</span>
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

      </div>
    </section>
  );
}
