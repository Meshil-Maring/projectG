import { motion } from "framer-motion";
import {
  Users,
  BookOpen,
  Briefcase,
  TrendingUp,
  Heart,
  Star,
  Lightbulb,
  UserCheck,
  Camera,
} from "lucide-react";
import { PRIMARY, LIGHT_BG, fade } from "./hrds.constants";
import { useGroupActivities } from "../../../context/GroupActivitiesContext";

const whatWeDo = [
  { icon: TrendingUp, title: "Capacity Building", desc: "Enhancing skills and knowledge to help individuals excel in life." },
  { icon: BookOpen, title: "Training & Workshops", desc: "Providing practical training and workshops for personal and professional growth." },
  { icon: Briefcase, title: "Career Development", desc: "Guiding individuals to discover opportunities and achieve their career goals." },
  { icon: UserCheck, title: "Mentorship Programs", desc: "Connecting with mentors to inspire, guide, and support growth." },
  { icon: Heart, title: "Community Engagement", desc: "Working together to create a supportive and empowered society." },
];

const focusAreas = [
  { icon: Users, title: "Youth Empowerment", desc: "Building confidence, skills & vision" },
  { icon: Star, title: "Women Development", desc: "Promoting leadership & independence" },
  { icon: BookOpen, title: "Education & Literacy", desc: "Supporting access to quality education" },
  { icon: Briefcase, title: "Employability Skills", desc: "Preparing for future job opportunities" },
  { icon: Lightbulb, title: "Personal Growth", desc: "Encouraging mindset, communication and life skills" },
];

const impactStats = [
  { value: "3,200+", label: "Individuals", sub: "Trained" },
  { value: "150+", label: "Workshops", sub: "Conducted" },
  { value: "1,000+", label: "Youth", sub: "Empowered" },
  { value: "80+", label: "Partner", sub: "Organizations" },
  { value: "100%", label: "Commitment", sub: "to Growth" },
];

export default function HrdsActivities() {
  const { data } = useGroupActivities();
  const activities = data.hrds;

  return (
    <section style={{ background: "#f0fdf4", padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* What We Do */}
        <motion.div {...fade(0)} style={{ marginBottom: "4rem" }}>
          <h3 style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: PRIMARY, marginBottom: "0.5rem" }}>
            WHAT WE DO
          </h3>
          <div style={{ width: "36px", height: "3px", background: PRIMARY, borderRadius: "2px", marginBottom: "1.75rem" }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.25rem" }}>
            {whatWeDo.map(({ icon: Icon, title, desc }) => (
              <div key={title} style={{ display: "flex", flexDirection: "column" as const, gap: "0.75rem", background: "#ffffff", borderRadius: "1rem", padding: "1.5rem", boxShadow: "0 2px 10px rgba(21,128,61,0.06)", border: "1px solid #d1fae5" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: LIGHT_BG, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={20} color={PRIMARY} strokeWidth={1.6} />
                </div>
                <div>
                  <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.35rem" }}>{title}</div>
                  <div style={{ fontSize: "0.78rem", color: "#64748b", lineHeight: 1.6 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Focus Areas + Impact */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", marginBottom: "4rem", alignItems: "start" }}>

          {/* Our Focus Areas */}
          <motion.div {...fade(0.1)}>
            <h3 style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: PRIMARY, marginBottom: "0.5rem" }}>
              OUR FOCUS AREAS
            </h3>
            <div style={{ width: "36px", height: "3px", background: PRIMARY, borderRadius: "2px", marginBottom: "1.75rem" }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.1rem" }}>
              {focusAreas.map(({ icon: Icon, title, desc }, i) => (
                <div key={title} style={{ background: "#ffffff", borderRadius: "1rem", padding: "1.5rem 1.25rem", textAlign: "center" as const, boxShadow: "0 2px 10px rgba(21,128,61,0.06)", border: "1px solid #d1fae5", ...(i === 4 ? { gridColumn: "1 / -1" } : {}) }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: LIGHT_BG, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.75rem" }}>
                    <Icon size={22} color={PRIMARY} strokeWidth={1.6} />
                  </div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.3rem" }}>{title}</div>
                  <div style={{ fontSize: "0.75rem", color: "#64748b", lineHeight: 1.5 }}>{desc}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Our Impact */}
          <motion.div {...fade(0.2)}>
            <h3 style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: PRIMARY, marginBottom: "0.5rem" }}>
              OUR IMPACT
            </h3>
            <div style={{ width: "36px", height: "3px", background: PRIMARY, borderRadius: "2px", marginBottom: "1.75rem" }} />
            <div style={{ display: "flex", flexDirection: "column" as const, gap: "1rem" }}>
              {impactStats.map(({ value, label, sub }) => (
                <div key={value} style={{ display: "flex", alignItems: "center", gap: "1.25rem", background: "#ffffff", borderRadius: "1rem", padding: "1.25rem 1.5rem", boxShadow: "0 2px 10px rgba(21,128,61,0.06)", border: "1px solid #d1fae5" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: LIGHT_BG, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <TrendingUp size={20} color={PRIMARY} strokeWidth={1.6} />
                  </div>
                  <div>
                    <div style={{ fontSize: "1.6rem", fontWeight: 800, color: PRIMARY, lineHeight: 1 }}>{value}</div>
                    <div style={{ fontSize: "0.8rem", color: "#475569", fontWeight: 600, marginTop: "0.2rem" }}>
                      {label} <span style={{ color: "#94a3b8", fontWeight: 400 }}>{sub}</span>
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
              Our Activities
            </span>
            <div style={{ width: "40px", height: "3px", background: PRIMARY, borderRadius: "2px", marginBottom: "1rem" }} />
            <h2 style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)", fontWeight: 800, color: "#0f172a", marginBottom: "2rem", lineHeight: 1.2 }}>
              What We've Been Doing
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
              {activities.map(({ id, title, desc, imageUrl }, i) => (
                <motion.div key={id} {...fade(i * 0.07)} style={{ background: "#ffffff", borderRadius: "1rem", overflow: "hidden", boxShadow: "0 2px 12px rgba(21,128,61,0.07)", border: "1px solid #d1fae5" }}>
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
