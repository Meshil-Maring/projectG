import { Leaf, BookOpen, HeartPulse, Utensils, Scale, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CampaignCard, {
  type CampaignCardData,
} from "../../../shared/components/CampaignCard";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.09, duration: 0.55, ease: "easeOut" },
  }),
};

/**
 * Replace this static array with a real API/TanStack Query fetch.
 * Shape each response item to match CampaignCardData — only
 * amountRaised and percentage need to be kept fresh from the backend.
 */
const campaigns: CampaignCardData[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&q=80",
    imageAlt: "Environment Protection",
    categoryIcon: <Leaf size={18} className="text-white" />,
    categoryColor: "#16a34a",
    title: "Environment Protection",
    description: "Protect our planet and preserve natural resources.",
    amountRaised: 420000,  // from backend
    percentage: 70,         // from backend
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&q=80",
    imageAlt: "Education for All",
    categoryIcon: <BookOpen size={18} className="text-white" />,
    categoryColor: "#2563eb",
    title: "Education for All",
    description: "Help every child access quality education.",
    amountRaised: 185000,
    percentage: 45,
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80",
    imageAlt: "Health & Wellness",
    categoryIcon: <HeartPulse size={18} className="text-white" />,
    categoryColor: "#ec4899",
    title: "Health & Wellness",
    description: "Provide medical care to those who need it most.",
    amountRaised: 310000,
    percentage: 62,
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80",
    imageAlt: "Hunger & Food",
    categoryIcon: <Utensils size={18} className="text-white" />,
    categoryColor: "#f97316",
    title: "Hunger & Food",
    description: "Feed families and end food insecurity.",
    amountRaised: 95000,
    percentage: 30,
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&q=80",
    imageAlt: "Legal Service & Awareness",
    categoryIcon: <Scale size={18} className="text-white" />,
    categoryColor: "#7c3aed",
    title: "Legal Service & Awareness",
    description: "Empower communities with free legal aid and rights education.",
    amountRaised: 138000,
    percentage: 52,
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=400&q=80",
    imageAlt: "Youth Explore",
    categoryIcon: <Compass size={18} className="text-white" />,
    categoryColor: "#0ea5e9",
    title: "Youth Explore",
    description: "Open doors for young minds through adventure, skills, and discovery.",
    amountRaised: 72000,
    percentage: 38,
  },
];

export default function Campaigns() {
  return (
    <section className="py-16 bg-[color:var(--color-surface)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10 text-center">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-sm font-semibold uppercase tracking-widest text-(--color-secondary) mb-2"
          >
            Active Campaigns
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="text-3xl font-bold text-heading"
          >
            Causes That Need Your Support
          </motion.h2>
        </div>

        {/* Cards */}
        <div className="flex flex-wrap justify-center gap-6">
          {campaigns.map(({ id, ...card }, i) => (
            <motion.div
              key={id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              custom={i}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            >
              <CampaignCard {...card} />
            </motion.div>
          ))}
        </div>

        {/* View All */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="mt-10 flex justify-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/causes"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full border-2 border-(--color-secondary) text-(--color-secondary) text-sm font-semibold hover:bg-(--color-secondary) hover:text-white transition-colors duration-200"
            >
              View All Causes <span aria-hidden>→</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
