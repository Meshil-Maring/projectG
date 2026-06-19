import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, MapPin, Target, X, Heart, IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SEO from "../../shared/components/SEO";
import Navbar from "../../shared/components/Navbar";
import Footer from "../../shared/components/Footer";
import SectionNavigator from "../../shared/components/SectionNavigator";
import { causes, categories, type Cause } from "../../data/causes";
import { PageProvider, usePageSections } from "../../context/PageContext";

const sections = [
  { id: "causes-hero", label: "Overview" },
  { id: "causes-grid", label: "All Causes" },
];

const DEFAULT_HERO = {
  eyebrow: "Active Campaigns",
  heading: "Causes That Need Your Support",
  description:
    "Every rupee you give goes directly to one of these causes. Browse our active campaigns and choose the change you want to be part of.",
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: "easeOut" as const },
  }),
};

export default function CausesPage() {
  return (
    <PageProvider slug="causes">
      <CausesPageContent />
    </PageProvider>
  );
}

function CausesPageContent() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selected, setSelected] = useState<Cause | null>(null);
  const { getSectionData } = usePageSections();
  const hero = { ...DEFAULT_HERO, ...getSectionData("causes-hero") };

  const filtered =
    activeCategory === "All"
      ? causes
      : causes.filter((c) => c.category === activeCategory);

  return (
    <>
      <SEO
        title="Our Causes"
        description="Support active campaigns by Project G Manipur. Browse our causes and help create positive change in communities across Manipur, India."
      />
      <Navbar />
      <SectionNavigator sections={sections} />

      {/* Hero */}
      <section id="causes-hero" className="relative overflow-hidden">
        <div
          className="relative"
          style={{ background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)" }}
        >
          {/* Decorative circles */}
          <div className="absolute -top-24 -right-20 w-72 h-72 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -bottom-28 -left-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-white/5 pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-28 sm:pt-20 sm:pb-32">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="text-xs font-bold uppercase tracking-widest text-white/80 mb-4 flex items-center gap-2"
            >
              <span className="inline-block w-6 h-0.5 bg-white/60" />
              {hero.eyebrow}
            </motion.p>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-5 max-w-2xl"
            >
              {hero.heading}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="text-sm sm:text-base text-white/75 leading-relaxed max-w-xl"
            >
              {hero.description}
            </motion.p>
          </div>
        </div>

        {/* Floating stat cards */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 -mt-14 sm:-mt-16 pb-16 sm:pb-20">
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { icon: Heart, label: "Active Causes", value: String(causes.length) },
              {
                icon: IndianRupee,
                label: "Total Raised",
                value:
                  "₹" +
                  new Intl.NumberFormat("en-IN").format(
                    causes.reduce((s, c) => s + c.amountRaised, 0)
                  ),
              },
              {
                icon: Users,
                label: "Beneficiaries",
                value: new Intl.NumberFormat("en-IN").format(
                  causes.reduce((s, c) => s + c.beneficiaries, 0)
                ),
              },
            ].map(({ icon: Icon, label, value }, i) => (
              <motion.div
                key={label}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={i + 3}
                className="bg-white rounded-2xl shadow-(--shadow-card) border border-(--color-border) p-6 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-heading">{value}</p>
                  <p className="text-xs text-muted mt-0.5">{label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section id="causes-grid" className="pt-4 pb-12 bg-surface min-h-[60vh]">
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
  const navigate = useNavigate();
  const formatted = new Intl.NumberFormat("en-IN").format(cause.amountRaised);
  const goalFormatted = new Intl.NumberFormat("en-IN").format(cause.goal);

  return (
    <div className="bg-white rounded-2xl shadow-[var(--shadow-card)] overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={cause.image}
          alt={cause.imageAlt}
          loading="lazy"
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
            onClick={() => navigate("/donate")}
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
  const navigate = useNavigate();
  const formatted = new Intl.NumberFormat("en-IN").format(cause.amountRaised);
  const goalFormatted = new Intl.NumberFormat("en-IN").format(cause.goal);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cause-modal-title"
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
          <h2 id="cause-modal-title" className="text-xl font-bold text-heading">
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
            onClick={() => navigate("/donate")}
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
