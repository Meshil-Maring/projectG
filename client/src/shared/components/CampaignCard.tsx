import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export interface CampaignCardData {
  id: string | number;
  image: string;
  imageAlt?: string;
  categoryIcon: ReactNode;
  categoryColor?: string;
  title: string;
  description: string;
  amountRaised: number;
  percentage: number; // 0–100, sourced from backend
}

type Props = Omit<CampaignCardData, "id">;

export default function CampaignCard({
  image,
  imageAlt = "Campaign image",
  categoryIcon,
  categoryColor = "#16a34a",
  title,
  description,
  amountRaised,
  percentage,
}: Props) {
  const clamped = Math.min(100, Math.max(0, percentage));
  const formatted = new Intl.NumberFormat("en-IN").format(amountRaised);

  return (
    <div className="bg-white rounded-2xl shadow-[var(--shadow-card)] overflow-hidden w-64 shrink-0">
      {/* ── Image ── */}
      <div className="relative">
        <img
          src={image}
          alt={imageAlt}
          className="w-full h-40 object-cover"
        />
        {/* Category icon badge — sits half over the image */}
        <span
          className="absolute bottom-0 left-4 translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-md"
          style={{ backgroundColor: categoryColor }}
          aria-hidden="true"
        >
          {categoryIcon}
        </span>
      </div>

      {/* ── Body ── */}
      <div className="px-4 pt-8 pb-4 flex flex-col gap-2">
        <h3 className="text-[color:var(--color-heading)] font-bold text-base leading-snug">
          {title}
        </h3>
        <p className="text-[color:var(--color-body)] text-xs leading-relaxed">
          {description}
        </p>

        {/* Amount + percentage */}
        <div className="flex items-center justify-between mt-1">
          <span className="text-[color:var(--color-heading)] font-semibold text-sm">
            ₹{formatted} raised
          </span>
          <span className="text-[color:var(--color-body)] text-sm font-medium">
            {clamped}%
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 rounded-full bg-[color:var(--color-track)] overflow-hidden">
          <div
            className="h-full rounded-full transition-[width] duration-500 ease-out"
            style={{ width: `${clamped}%`, backgroundColor: categoryColor }}
          />
        </div>

        {/* Donate button */}
        <Link
          to="/donate"
          className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-90"
          style={{ backgroundColor: categoryColor }}
        >
          Donate Now
        </Link>
      </div>
    </div>
  );
}
