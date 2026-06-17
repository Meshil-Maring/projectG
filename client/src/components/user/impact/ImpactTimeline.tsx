import { motion } from "framer-motion";
import { usePageSections } from "../../../context/PageContext";

const DEFAULT_TIMELINE = {
  eyebrow: "Our Journey",
  heading: "A Decade of Impact",
};

const MILESTONE_COLORS = ["#1a3270", "#2563eb", "#16a34a", "#f97316", "#7c3aed", "#0d9488"];
const MILESTONE_DEFAULTS = [
  { year: "2013", title: "Project Generation Founded", description: "A small group of students came together with a vision to serve their community through organized, sustained action." },
  { year: "2015", title: "First 1,000 Lives Impacted", description: "Our early programs in education and health reached the milestone of touching 1,000 lives across local communities." },
  { year: "2017", title: "Five Societies Launched", description: "Expanded reach by forming five specialized societies, each focusing on a distinct area of community development." },
  { year: "2019", title: "10,000 Children Educated", description: "Our education programs surpassed 10,000 children supported through scholarships, school kits, and mobile learning centers." },
  { year: "2021", title: "500+ Active Volunteers", description: "Our volunteer community grew to over 500 dedicated individuals contributing their time and skills every month." },
  { year: "2023", title: "25,000+ Lives Impacted", description: "Reached the landmark of 25,000 lives touched across 150+ communities — a testament to collective action." },
];

export default function ImpactTimeline() {
  const { getSectionData } = usePageSections();
  const data = getSectionData("impact-timeline") ?? {};
  const content = { ...DEFAULT_TIMELINE, ...data };

  const milestones = MILESTONE_DEFAULTS.map((defaults, i) => ({
    color: MILESTONE_COLORS[i],
    year: data[`milestone${i}Year`] || defaults.year,
    title: data[`milestone${i}Title`] || defaults.title,
    description: data[`milestone${i}Description`] || defaults.description,
  }));

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold uppercase tracking-widest text-primary mb-2"
          >
            {content.eyebrow}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl xl:text-4xl font-extrabold text-heading"
          >
            {content.heading}
          </motion.h2>
        </div>

        <div className="relative pl-8 border-l-2 border-[#e2e8f0] flex flex-col gap-10">
          {milestones.map(({ year, title, description, color }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }}
              className="relative"
            >
              <div
                className="absolute -left-10 top-1.5 w-4 h-4 rounded-full border-2 border-white shadow"
                style={{ backgroundColor: color }}
              />
              <span
                className="text-xs font-extrabold uppercase tracking-widest mb-1 block"
                style={{ color }}
              >
                {year}
              </span>
              <h3 className="text-base font-bold text-heading mb-1">{title}</h3>
              <p className="text-sm text-body leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
