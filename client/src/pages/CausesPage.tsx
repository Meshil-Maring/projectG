import { useState } from "react";
import { ArrowLeft, Users, MapPin, Target, X } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../shared/components/Navbar";
import Footer from "../shared/components/Footer";
import { causes, categories, type Cause } from "../data/causes";

export default function CausesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selected, setSelected] = useState<Cause | null>(null);

  const filtered =
    activeCategory === "All"
      ? causes
      : causes.filter((c) => c.category === activeCategory);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-[color:var(--color-primary)] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={15} /> Back to Home
          </Link>
          <p className="text-xs font-bold uppercase tracking-widest text-[color:var(--color-secondary)] mb-3">
            Active Campaigns
          </p>
          <h1 className="text-4xl font-bold text-white mb-4">
            Causes That Need Your Support
          </h1>
          <p className="text-white/70 max-w-xl text-sm leading-relaxed">
            Every rupee you give goes directly to one of these causes. Browse
            our active campaigns and choose the change you want to be part of.
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-8 mt-10">
            {[
              { label: "Active Causes", value: causes.length },
              {
                label: "Total Raised",
                value:
                  "₹" +
                  new Intl.NumberFormat("en-IN").format(
                    causes.reduce((s, c) => s + c.amountRaised, 0)
                  ),
              },
              {
                label: "Beneficiaries",
                value: new Intl.NumberFormat("en-IN").format(
                  causes.reduce((s, c) => s + c.beneficiaries, 0)
                ),
              },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-2xl font-bold text-white">{value}</p>
                <p className="text-xs text-white/60 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-12 bg-[color:var(--color-surface)] min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                  activeCategory === cat
                    ? "bg-[color:var(--color-primary)] text-white border-[color:var(--color-primary)]"
                    : "bg-white text-[color:var(--color-body)] border-[color:var(--color-border)] hover:border-[color:var(--color-primary)] hover:text-[color:var(--color-primary)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((cause) => (
              <CauseCard
                key={cause.id}
                cause={cause}
                onOpen={() => setSelected(cause)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Detail modal */}
      {selected && (
        <CauseModal cause={selected} onClose={() => setSelected(null)} />
      )}

      <Footer />
    </>
  );
}

function CauseCard({
  cause,
  onOpen,
}: {
  cause: Cause;
  onOpen: () => void;
}) {
  const formatted = new Intl.NumberFormat("en-IN").format(cause.amountRaised);
  const goalFormatted = new Intl.NumberFormat("en-IN").format(cause.goal);

  return (
    <div className="bg-white rounded-2xl shadow-[var(--shadow-card)] overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={cause.image}
          alt={cause.imageAlt}
          className="w-full h-full object-cover"
        />
        <span
          className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wide"
          style={{ backgroundColor: cause.categoryColor }}
        >
          {cause.category}
        </span>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="text-base font-bold text-[color:var(--color-heading)] leading-snug">
          {cause.title}
        </h3>
        <p className="text-xs text-[color:var(--color-body)] leading-relaxed flex-1">
          {cause.description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-[color:var(--color-muted)]">
          <span className="flex items-center gap-1">
            <MapPin size={11} /> {cause.location}
          </span>
          <span className="flex items-center gap-1">
            <Users size={11} /> {new Intl.NumberFormat("en-IN").format(cause.beneficiaries)} helped
          </span>
        </div>

        {/* Progress */}
        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="font-semibold text-[color:var(--color-heading)]">
              ₹{formatted} raised
            </span>
            <span className="text-[color:var(--color-muted)]">
              Goal: ₹{goalFormatted}
            </span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[color:var(--color-track)] overflow-hidden">
            <div
              className="h-full rounded-full transition-[width] duration-500"
              style={{
                width: `${cause.percentage}%`,
                backgroundColor: cause.categoryColor,
              }}
            />
          </div>
          <p className="text-right text-xs text-[color:var(--color-muted)] mt-1">
            {cause.percentage}% funded
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-1">
          <button
            onClick={onOpen}
            className="flex-1 py-2 rounded-lg border border-[color:var(--color-border)] text-xs font-semibold text-[color:var(--color-heading)] hover:bg-gray-50 transition-colors"
          >
            Learn More
          </button>
          <button
            className="flex-1 py-2 rounded-lg text-xs font-semibold text-white transition-colors"
            style={{ backgroundColor: cause.categoryColor }}
          >
            Donate Now
          </button>
        </div>
      </div>
    </div>
  );
}

function CauseModal({
  cause,
  onClose,
}: {
  cause: Cause;
  onClose: () => void;
}) {
  const formatted = new Intl.NumberFormat("en-IN").format(cause.amountRaised);
  const goalFormatted = new Intl.NumberFormat("en-IN").format(cause.goal);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative h-52">
          <img
            src={cause.image}
            alt={cause.imageAlt}
            className="w-full h-full object-cover"
          />
          <span
            className="absolute top-3 left-4 px-2.5 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wide"
            style={{ backgroundColor: cause.categoryColor }}
          >
            {cause.category}
          </span>
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-[color:var(--color-heading)] hover:bg-white transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-4">
          <h2 className="text-xl font-bold text-[color:var(--color-heading)]">
            {cause.title}
          </h2>

          {/* Stats row */}
          <div className="flex gap-4">
            {[
              { icon: MapPin, label: cause.location },
              {
                icon: Users,
                label: `${new Intl.NumberFormat("en-IN").format(cause.beneficiaries)} beneficiaries`,
              },
              {
                icon: Target,
                label: `Goal: ₹${goalFormatted}`,
              },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-1 text-xs text-[color:var(--color-muted)]"
              >
                <Icon size={11} /> {label}
              </span>
            ))}
          </div>

          <p className="text-sm text-[color:var(--color-body)] leading-relaxed">
            {cause.fullDescription}
          </p>

          {/* Progress */}
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="font-semibold text-[color:var(--color-heading)]">
                ₹{formatted} raised
              </span>
              <span className="font-semibold" style={{ color: cause.categoryColor }}>
                {cause.percentage}%
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-[color:var(--color-track)] overflow-hidden">
              <div
                className="h-full rounded-full transition-[width] duration-500"
                style={{
                  width: `${cause.percentage}%`,
                  backgroundColor: cause.categoryColor,
                }}
              />
            </div>
          </div>

          <button
            className="w-full py-3 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: cause.categoryColor }}
          >
            Donate to This Cause
          </button>
        </div>
      </div>
    </div>
  );
}
