import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { fade } from "./cause.constants";

export interface CauseActivity {
  id: string | number;
  title: string;
  desc: string;
  imageUrl?: string | null;
}

interface Props {
  activities: CauseActivity[];
  primary: string;
  lightBg: string;
  borderColor: string;
  shadowRgb: string;
  eyebrow: string;
  heading: string;
  delay?: number;
}

export default function CauseActivitiesGallery({
  activities,
  primary,
  lightBg,
  borderColor,
  shadowRgb,
  eyebrow,
  heading,
  delay = 0.25,
}: Props) {
  if (activities.length === 0) return null;

  return (
    <motion.div {...fade(delay)}>
      <span
        style={{
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase" as const,
          color: primary,
          display: "block",
          marginBottom: "0.5rem",
        }}
      >
        {eyebrow}
      </span>
      <div style={{ width: "40px", height: "3px", background: primary, borderRadius: "2px", marginBottom: "1rem" }} />
      <h2 style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)", fontWeight: 800, color: "#0f172a", marginBottom: "2rem", lineHeight: 1.2 }}>
        {heading}
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
        {activities.map(({ id, title, desc, imageUrl }, i) => (
          <motion.div key={id} {...fade(i * 0.07)} style={{ background: "#ffffff", borderRadius: "1rem", overflow: "hidden", boxShadow: `0 2px 12px rgba(${shadowRgb},0.07)`, border: `1px solid ${borderColor}` }}>
            <div style={{ position: "relative" as const, paddingTop: "62%", background: lightBg }}>
              {imageUrl ? (
                <img src={imageUrl} alt={title} style={{ position: "absolute" as const, inset: 0, width: "100%", height: "100%", objectFit: "cover" as const }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              ) : (
                <div style={{ position: "absolute" as const, inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" as const, gap: "0.5rem" }}>
                  <Camera size={36} color={primary} strokeWidth={1.4} style={{ opacity: 0.3 }} />
                  <span style={{ fontSize: "0.68rem", color: primary, opacity: 0.4, letterSpacing: "0.05em" }}>Add Photo</span>
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
  );
}
