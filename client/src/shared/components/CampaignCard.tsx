import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export interface CampaignCardData {
  id: string | number;
  image: string;
  imageAlt?: string;
  categoryIcon: ReactNode;
  categoryColor?: string;
  title: string;
  description: string;
  amountRaised: number;
  percentage: number;
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
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      className="bg-white rounded-2xl shadow-(--shadow-card) overflow-hidden w-64 shrink-0"
    >
      {/* ── Image ── */}
      <div className="relative overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.4, ease: "easeOut" as const }}
          src={image}
          alt={imageAlt}
          className="w-full h-40 object-cover"
        />
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
        <h3 className="text-heading font-bold text-base leading-snug">
          {title}
        </h3>
        <p className="text-body text-xs leading-relaxed">
          {description}
        </p>

        <div className="flex items-center justify-between mt-1">
          <span className="text-heading font-semibold text-sm">
            ₹{formatted} raised
          </span>
          <span className="text-body text-sm font-medium">
            {clamped}%
          </span>
        </div>

        <div className="w-full h-1.5 rounded-full bg-(--color-track) overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${clamped}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" as const, delay: 0.2 }}
            className="h-full rounded-full"
            style={{ backgroundColor: categoryColor }}
          />
        </div>

        <Link
          to="/donate"
          className="mt-2 inline-flex items-center gap-1 text-xs font-semibold hover:underline"
          style={{ color: categoryColor }}
        >
          Support this cause <span aria-hidden>→</span>
        </Link>
      </div>
    </motion.div>
  );
}
