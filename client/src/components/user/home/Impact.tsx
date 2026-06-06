import { motion } from "framer-motion";
import earthImg from "../../../assets/image/earth.png";
import {
  Users,
  GraduationCap,
  Leaf,
  HandHeart,
  Heart,
  Star,
  Globe,
  BookOpen,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useHomePageData, type IconKey } from "../../../context/HomePageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: "easeOut" },
  }),
};

const ICON_MAP: Record<IconKey, React.ElementType> = {
  Users,
  GraduationCap,
  Leaf,
  HandHeart,
  Heart,
  Star,
  Globe,
  BookOpen,
};

export default function Impact() {
  const { data } = useHomePageData();
  const stats = data.stats;

  return (
    <section className="py-16 px-8 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">
        {/* Earth illustration */}
        <motion.div
          initial={{ opacity: 0, x: -40, rotate: -6 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="shrink-0 w-64 h-64 xl:w-80 xl:h-80"
        >
          <img
            src={earthImg}
            alt="Watercolor earth globe"
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* Content */}
        <div className="flex-1">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-xs font-bold uppercase tracking-widest text-teal mb-2"
          >
            Our Impact
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="text-2xl xl:text-3xl font-bold text-heading leading-snug mb-10"
          >
            Numbers That Show The Change We Create
          </motion.h2>

          {/* Stat cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map(({ id, iconKey, value, label }, i) => {
              const Icon = ICON_MAP[iconKey] ?? Users;
              return (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, scale: 0.85, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                  whileHover={{ y: -4, scale: 1.04 }}
                  className="flex flex-col items-center gap-3 bg-[#f0fdf9] border border-[#ccfbf1] rounded-2xl py-6 px-4 text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center">
                    <Icon size={22} className="text-teal" />
                  </div>
                  <span className="text-2xl font-bold text-heading">
                    {value}
                  </span>
                  <span className="text-xs text-body leading-tight whitespace-pre-line font-medium">
                    {label}
                  </span>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            className="mt-8"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="inline-block">
              <Link
                to="/impact"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-teal text-white text-sm font-semibold hover:bg-[#0b7a70] transition-colors duration-200"
              >
                See Our Full Impact <span aria-hidden>→</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
