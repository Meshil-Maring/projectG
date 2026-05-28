import { useState } from "react";
import { Heart, ShieldCheck, Eye, Star } from "lucide-react";
import donateImg from "../../assets/image/donate.png";
import DonateQRModal from "./DonateQRModal";

const PRESET_AMOUNTS = [
  { value: 500, label: "₹500", description: "Feeds a child for a week" },
  { value: 1000, label: "₹1000", description: "Provides school supplies" },
  { value: 2500, label: "₹2500", description: "Supports medical care" },
  { value: 5000, label: "₹5000", description: "Empowers a family" },
];

export default function Donate() {
  const [selected, setSelected] = useState<number | "other">(500);
  const [otherValue, setOtherValue] = useState("");
  const [showQR, setShowQR] = useState(false);

  const resolvedAmount =
    selected === "other" ? Number(otherValue) || 0 : selected;

  function handleDonateClick() {
    if (resolvedAmount <= 0) return;
    setShowQR(true);
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* ── Left: Image ── */}
          <div className="flex-shrink-0 w-full lg:w-[420px] flex justify-center">
            <img
              src={donateImg}
              alt="Donate and make a difference"
              className="w-full max-w-[400px] lg:max-w-none object-contain"
            />
          </div>

          {/* ── Right: Content ── */}
          <div className="flex-1 min-w-0">
            {/* Label */}
            <p className="text-sm font-semibold uppercase tracking-widest text-[color:var(--color-purple)] mb-3">
              Make a Difference
            </p>

            {/* Heading */}
            <h2 className="text-3xl lg:text-4xl font-bold text-[color:var(--color-heading)] leading-tight mb-4">
              Your Support Can <br className="hidden sm:block" />
              Change Someone's Life
            </h2>

            {/* Sub-text */}
            <p className="text-[color:var(--color-body)] text-base leading-relaxed mb-8 max-w-md">
              Every contribution, no matter how small, brings hope and creates a
              lasting impact.
            </p>

            {/* Amount Selector */}
            <div className="flex flex-wrap gap-3 mb-7">
              {PRESET_AMOUNTS.map(({ value, label, description }) => (
                <button
                  key={value}
                  onClick={() => setSelected(value)}
                  className={`flex flex-col items-center px-5 py-3 rounded-xl border-2 text-center transition-all duration-200 min-w-[90px] cursor-pointer ${
                    selected === value
                      ? "border-[color:var(--color-purple)] bg-purple-50 shadow-[0_0_0_3px_rgba(124,58,237,0.15)]"
                      : "border-[color:var(--color-border)] hover:border-purple-300 hover:bg-purple-50/40"
                  }`}
                >
                  <span
                    className={`text-base font-bold ${selected === value ? "text-[color:var(--color-purple)]" : "text-[color:var(--color-heading)]"}`}
                  >
                    {label}
                  </span>
                  <span className="text-xs text-[color:var(--color-muted)] mt-0.5 leading-tight">
                    {description}
                  </span>
                </button>
              ))}

              {/* Other Amount */}
              <button
                onClick={() => setSelected("other")}
                className={`flex flex-col items-center justify-center px-5 py-3 rounded-xl border-2 text-center transition-all duration-200 min-w-[90px] cursor-pointer ${
                  selected === "other"
                    ? "border-[color:var(--color-purple)] bg-purple-50 shadow-[0_0_0_3px_rgba(124,58,237,0.15)]"
                    : "border-[color:var(--color-border)] hover:border-purple-300 hover:bg-purple-50/40"
                }`}
              >
                {selected === "other" ? (
                  <input
                    autoFocus
                    type="number"
                    placeholder="Enter ₹"
                    value={otherValue}
                    onChange={(e) => setOtherValue(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className="w-20 text-center text-sm font-semibold text-[color:var(--color-purple)] bg-transparent outline-none border-none placeholder:text-purple-300"
                  />
                ) : (
                  <span className="text-sm font-semibold text-[color:var(--color-purple)]">
                    Other
                    <br />
                    Amount
                  </span>
                )}
              </button>
            </div>

            {/* Donate Button */}
            <button
              onClick={handleDonateClick}
              disabled={resolvedAmount <= 0}
              className="flex items-center gap-2.5 px-8 py-4 rounded-full bg-purple text-white font-semibold text-base hover:bg-purple-700 active:scale-95 transition-all duration-200 shadow-(--shadow-donate) cursor-pointer mb-5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Donate Now
              <Heart size={18} className="fill-white" />
            </button>

            {/* Trust Badges */}
            <div className="flex items-center gap-5 text-sm text-[color:var(--color-muted)]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck
                  size={15}
                  className="text-[color:var(--color-purple)]"
                />
                100% Secure
              </span>
              <span className="text-black/50">•</span>
              <span className="flex items-center gap-1.5">Transparent</span>
              <span className="text-black/50">•</span>
              <span className="flex items-center gap-1.5">Trusted</span>
            </div>
          </div>
        </div>
      </div>

      {showQR && (
        <DonateQRModal
          amount={resolvedAmount}
          onClose={() => setShowQR(false)}
        />
      )}
    </section>
  );
}
