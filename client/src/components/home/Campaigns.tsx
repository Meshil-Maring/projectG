import { Leaf, BookOpen, HeartPulse, Utensils } from "lucide-react";
import { Link } from "react-router-dom";
import CampaignCard, {
  type CampaignCardData,
} from "../../shared/components/CampaignCard";

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
];

export default function Campaigns() {
  return (
    <section className="py-16 bg-[color:var(--color-surface)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[color:var(--color-secondary)] mb-2">
            Active Campaigns
          </p>
          <h2 className="text-3xl font-bold text-[color:var(--color-heading)]">
            Causes That Need Your Support
          </h2>
        </div>

        {/* Cards */}
        <div className="flex flex-wrap justify-center gap-6">
          {campaigns.map(({ id, ...card }) => (
            <CampaignCard key={id} {...card} />
          ))}
        </div>

        {/* View All */}
        <div className="mt-10 flex justify-center">
          <Link
            to="/causes"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full border-2 border-[color:var(--color-secondary)] text-[color:var(--color-secondary)] text-sm font-semibold hover:bg-[color:var(--color-secondary)] hover:text-white transition-colors duration-200"
          >
            View All Causes <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
