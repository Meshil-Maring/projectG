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
        <div className="shrink-0 w-64 h-64 xl:w-80 xl:h-80">
          <img
            src={earthImg}
            alt="Watercolor earth globe"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Content */}
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-widest text-[#0d9488] mb-2">
            Our Impact
          </p>
          <h2 className="text-2xl xl:text-3xl font-bold text-[#1e293b] leading-snug mb-10">
            Numbers That Show The Change We Create
          </h2>

          {/* Stat cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map(({ id, iconKey, value, label }) => {
              const Icon = ICON_MAP[iconKey] ?? Users;
              return (
              <div
                key={id}
                className="flex flex-col items-center gap-3 bg-[#f0fdf9] border border-[#ccfbf1] rounded-2xl py-6 px-4 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center">
                  <Icon size={22} className="text-[#0d9488]" />
                </div>
                <span className="text-2xl font-bold text-[#1e293b]">
                  {value}
                </span>
                <span className="text-xs text-[#475569] leading-tight whitespace-pre-line font-medium">
                  {label}
                </span>
              </div>
              );
            })}
          </div>

          <div className="mt-8">
            <Link
              to="/impact"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#0d9488] text-white text-sm font-semibold hover:bg-[#0b7a70] transition-colors duration-200"
            >
              See Our Full Impact <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
