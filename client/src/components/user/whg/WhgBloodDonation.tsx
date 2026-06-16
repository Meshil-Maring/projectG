import { motion } from "framer-motion";
import { Heart, Calendar, MapPin, Users, Droplets, Award, Camera } from "lucide-react";
import { PRIMARY, SECONDARY, ACCENT, LIGHT_BG, fade } from "./whg.constants";
import { useGroupActivities } from "../../../context/GroupActivitiesContext";

const PLACEHOLDER_PHOTOS = [
  { title: "Campaign Banner", caption: "Official promotional banner for the blood donation drive." },
  { title: "Donation Drive", caption: "Volunteers actively participating at the donation camp." },
  { title: "Community Participation", caption: "Participants gathered at RIMS Transfusion Medicine dept." },
  { title: "NHM Manipur Support", caption: "Representatives from State Blood Cell – NHM Manipur." },
];

const highlights = [
  { icon: Droplets, title: "Voluntary Donation", desc: "Every drop given freely saves a life in need." },
  { icon: Heart, title: "State Support", desc: "Backed by STATE BLOOD CELL – NHM Manipur." },
  { icon: Users, title: "Community Drive", desc: "Volunteers from across the region came together." },
  { icon: Award, title: "Honouring Heroes", desc: "Dedicated to the heroes preserving Manipur's integrity." },
];

export default function WhgBloodDonation() {
  const { data } = useGroupActivities();
  const uploaded = data["whg-blood-donation"];
  const photos = uploaded.length > 0
    ? uploaded.map((a) => ({ title: a.title, caption: a.desc, imageUrl: a.imageUrl || undefined }))
    : PLACEHOLDER_PHOTOS.map((p) => ({ ...p, imageUrl: undefined }));

  return (
    <section style={{ background: "#fff8f4", padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* Section header */}
        <motion.div {...fade(0)} style={{ marginBottom: "3rem" }}>
          <span style={{
            fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em",
            textTransform: "uppercase" as const, color: PRIMARY,
            display: "block", marginBottom: "0.5rem",
          }}>
            Campaigns &amp; Events
          </span>
          <div style={{ width: "40px", height: "3px", background: PRIMARY, borderRadius: "2px", marginBottom: "1rem" }} />
          <h2 style={{
            fontSize: "clamp(1.4rem, 2.8vw, 2rem)", fontWeight: 800,
            color: "#0f172a", lineHeight: 1.2, marginBottom: "0.75rem",
          }}>
            Voluntary Blood Donation Camp &amp; Campaign
          </h2>
          <p style={{ fontSize: "0.93rem", color: "#475569", maxWidth: "600px", lineHeight: 1.75 }}>
            Project "G" organised a voluntary blood donation drive at the Department of Transfusion
            Medicine, RIMS — bringing the community together in solidarity and service.
          </p>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
          marginBottom: "3.5rem",
        }}>

          {/* Event Details Card */}
          <motion.div
            {...fade(0.08)}
            style={{
              background: "#ffffff",
              borderRadius: "1.25rem",
              border: "1px solid #fde8da",
              boxShadow: "0 4px 20px rgba(194,65,12,0.08)",
              overflow: "hidden",
            }}
          >
            {/* Card header band */}
            <div style={{
              background: `linear-gradient(120deg, ${ACCENT} 0%, ${PRIMARY} 60%, ${SECONDARY} 120%)`,
              padding: "1.75rem 1.75rem 1.5rem",
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", top: "-50px", right: "-50px",
                width: "160px", height: "160px", borderRadius: "50%",
                background: "rgba(255,255,255,0.07)", pointerEvents: "none",
              }} />
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem" }}>
                <Heart size={18} color="#fff" fill="rgba(255,255,255,0.85)" />
                <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.85)" }}>
                  Event Spotlight
                </span>
              </div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#ffffff", lineHeight: 1.3, position: "relative" }}>
                Voluntary Blood Donation<br />Camp &amp; Campaign
              </h3>
            </div>

            {/* Card body */}
            <div style={{ padding: "1.5rem 1.75rem" }}>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: "1rem" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <div style={{
                    width: "36px", height: "36px", borderRadius: "9px",
                    background: LIGHT_BG, display: "flex", alignItems: "center",
                    justifyContent: "center", flexShrink: 0,
                  }}>
                    <Calendar size={16} color={PRIMARY} strokeWidth={1.7} />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "#94a3b8", textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: "0.15rem" }}>Date</div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0f172a" }}>28th February, 2024 — Wednesday</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <div style={{
                    width: "36px", height: "36px", borderRadius: "9px",
                    background: LIGHT_BG, display: "flex", alignItems: "center",
                    justifyContent: "center", flexShrink: 0,
                  }}>
                    <MapPin size={16} color={PRIMARY} strokeWidth={1.7} />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "#94a3b8", textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: "0.15rem" }}>Venue</div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0f172a" }}>Department of Transfusion Medicine, RIMS</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <div style={{
                    width: "36px", height: "36px", borderRadius: "9px",
                    background: LIGHT_BG, display: "flex", alignItems: "center",
                    justifyContent: "center", flexShrink: 0,
                  }}>
                    <Users size={16} color={PRIMARY} strokeWidth={1.7} />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "#94a3b8", textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: "0.15rem" }}>Supported By</div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0f172a" }}>State Blood Cell – NHM Manipur</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Theme Quote Card */}
          <motion.div
            {...fade(0.12)}
            style={{
              background: "#ffffff",
              borderRadius: "1.25rem",
              border: "1px solid #fde8da",
              boxShadow: "0 4px 20px rgba(194,65,12,0.08)",
              padding: "2rem 1.75rem",
              display: "flex",
              flexDirection: "column" as const,
              justifyContent: "center",
            }}
          >
            <span style={{
              fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em",
              textTransform: "uppercase" as const, color: PRIMARY, marginBottom: "1rem", display: "block",
            }}>
              Theme
            </span>
            <div style={{
              borderLeft: `3px solid ${PRIMARY}`,
              paddingLeft: "1.25rem",
              marginBottom: "1.5rem",
            }}>
              <p style={{
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)",
                color: "#1e293b",
                lineHeight: 1.7,
                fontWeight: 400,
              }}>
                "Honouring the heroes of Manipur who are trying to save our state integrity."
              </p>
            </div>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: LIGHT_BG,
              borderRadius: "0.5rem",
              padding: "0.6rem 1rem",
            }}>
              <Heart size={13} color={PRIMARY} fill={PRIMARY} />
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: PRIMARY }}>
                Organised by WHG · Project "G"
              </span>
            </div>
            <p style={{ fontSize: "0.74rem", color: "#94a3b8", marginTop: "0.65rem", fontStyle: "italic" }}>
              Motto: Learn Serve &amp; Transform
            </p>
          </motion.div>
        </div>

        {/* Highlights grid */}
        <motion.div {...fade(0.05)} style={{ marginBottom: "0.5rem" }}>
          <span style={{
            fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em",
            textTransform: "uppercase" as const, color: PRIMARY, display: "block", marginBottom: "0.5rem",
          }}>
            Why It Matters
          </span>
          <div style={{ width: "40px", height: "3px", background: PRIMARY, borderRadius: "2px", marginBottom: "1.5rem" }} />
        </motion.div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "4.5rem" }}>
          {highlights.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              {...fade(0.08 + i * 0.06)}
              whileHover={{ y: -4, boxShadow: "0 12px 28px rgba(194,65,12,0.13)" }}
              style={{
                background: "#ffffff",
                borderRadius: "1rem",
                padding: "1.4rem 1.25rem",
                border: "1px solid #fde8da",
                boxShadow: "0 2px 8px rgba(194,65,12,0.05)",
              }}
            >
              <div style={{
                width: "42px", height: "42px", borderRadius: "11px",
                background: LIGHT_BG, display: "flex", alignItems: "center",
                justifyContent: "center", marginBottom: "0.9rem",
              }}>
                <Icon size={19} color={PRIMARY} strokeWidth={1.6} />
              </div>
              <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.35rem" }}>{title}</div>
              <div style={{ fontSize: "0.76rem", color: "#64748b", lineHeight: 1.6 }}>{desc}</div>
            </motion.div>
          ))}
        </div>

        {/* ── Event Photo Gallery ── */}
        <motion.div {...fade(0.1)}>
          <span style={{
            fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em",
            textTransform: "uppercase" as const, color: PRIMARY, display: "block", marginBottom: "0.5rem",
          }}>
            Event Gallery
          </span>
          <div style={{ width: "40px", height: "3px", background: PRIMARY, borderRadius: "2px", marginBottom: "1rem" }} />
          <h2 style={{
            fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)", fontWeight: 800,
            color: "#0f172a", marginBottom: "2rem", lineHeight: 1.2,
          }}>
            Campaign Photos
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "1.5rem",
          }}>
            {photos.map(({ title, caption, imageUrl }, i) => (
              <motion.div
                key={title}
                {...fade(0.12 + i * 0.07)}
                whileHover={{ y: -4, boxShadow: "0 12px 28px rgba(194,65,12,0.12)" }}
                style={{
                  background: "#ffffff",
                  borderRadius: "1rem",
                  overflow: "hidden",
                  border: "1px solid #fde8da",
                  boxShadow: "0 2px 12px rgba(194,65,12,0.07)",
                }}
              >
                {/* Image slot */}
                <div style={{ position: "relative" as const, paddingTop: "62%", background: LIGHT_BG }}>
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={title}
                      style={{
                        position: "absolute" as const, inset: 0,
                        width: "100%", height: "100%", objectFit: "cover" as const,
                      }}
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                  ) : (
                    <div style={{
                      position: "absolute" as const, inset: 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexDirection: "column" as const, gap: "0.5rem",
                    }}>
                      <Camera size={36} color={PRIMARY} strokeWidth={1.4} style={{ opacity: 0.3 }} />
                      <span style={{ fontSize: "0.68rem", color: PRIMARY, opacity: 0.45, letterSpacing: "0.05em" }}>
                        Add Photo
                      </span>
                    </div>
                  )}
                </div>
                {/* Caption */}
                <div style={{ padding: "1rem 1.25rem 1.25rem" }}>
                  <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.4rem" }}>{title}</div>
                  <div style={{ fontSize: "0.76rem", color: "#64748b", lineHeight: 1.65 }}>{caption}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
