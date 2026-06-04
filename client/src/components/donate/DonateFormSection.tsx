import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShieldCheck, Star, Eye } from "lucide-react";
import DonateQRModal from "../home/DonateQRModal";

const PRESET_AMOUNTS = [
  { value: 500,  label: "₹500",   description: "Feeds a child for a week" },
  { value: 1000, label: "₹1,000", description: "Provides school supplies" },
  { value: 2500, label: "₹2,500", description: "Supports medical care" },
  { value: 5000, label: "₹5,000", description: "Empowers a family" },
];

const trustBadges = [
  { icon: ShieldCheck, label: "100% Secure" },
  { icon: Eye,         label: "Transparent" },
  { icon: Star,        label: "Trusted NGO" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

export default function DonateFormSection() {
  const [selected, setSelected] = useState<number | "other">(1000);
  const [otherValue, setOtherValue] = useState("");
  const [showQR, setShowQR] = useState(false);

  const resolvedAmount =
    selected === "other" ? Number(otherValue) || 0 : selected;

  return (
    <section id="donate-form" className="py-20 px-6 bg-white">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-widest text-[#1a3270] mb-2"
          >
            Donate
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="text-2xl xl:text-3xl font-extrabold text-[#1a1a4b] mb-3"
          >
            Choose Your Contribution
          </motion.h2>
          <div className="w-10 h-1 bg-[#1a3270] rounded mx-auto mb-4" />
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            className="text-sm text-[#64748b] leading-relaxed"
          >
            Select an amount below or enter a custom value. Every rupee counts.
          </motion.p>
        </div>

        {/* Card */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={3}
          className="bg-white rounded-3xl shadow-xl border border-[#e2e8f0] p-8"
        >
          {/* Preset amounts */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            {PRESET_AMOUNTS.map(({ value, label, description }) => (
              <button
                key={value}
                onClick={() => setSelected(value)}
                className={`flex flex-col items-center px-4 py-4 rounded-2xl border-2 text-center transition-all duration-200 cursor-pointer ${
                  selected === value
                    ? "border-[#1a3270] bg-[#eef1fb] shadow-[0_0_0_3px_rgba(26,50,112,0.12)]"
                    : "border-[#e2e8f0] hover:border-[#93b5f0] hover:bg-[#f8faff]"
                }`}
              >
                <span
                  className={`text-lg font-extrabold mb-0.5 ${
                    selected === value ? "text-[#1a3270]" : "text-[#1a1a4b]"
                  }`}
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {label}
                </span>
                <span className="text-xs text-[#94a3b8] leading-tight">
                  {description}
                </span>
              </button>
            ))}
          </div>

          {/* Custom amount */}
          <button
            onClick={() => setSelected("other")}
            className={`w-full flex items-center justify-center px-4 py-3.5 rounded-2xl border-2 transition-all duration-200 cursor-pointer mb-7 ${
              selected === "other"
                ? "border-[#1a3270] bg-[#eef1fb]"
                : "border-[#e2e8f0] hover:border-[#93b5f0]"
            }`}
          >
            {selected === "other" ? (
              <input
                autoFocus
                type="number"
                placeholder="Enter amount in ₹"
                value={otherValue}
                onChange={(e) => setOtherValue(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="text-center text-base font-bold text-[#1a3270] bg-transparent outline-none border-none w-full placeholder:text-[#93b5f0]"
              />
            ) : (
              <span className="text-sm font-semibold text-[#64748b]">
                Enter a custom amount
              </span>
            )}
          </button>

          {/* Donate button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => resolvedAmount > 0 && setShowQR(true)}
            disabled={resolvedAmount <= 0}
            className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl font-bold text-base text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            style={{
              background:
                resolvedAmount > 0
                  ? "linear-gradient(135deg, #1a3270, #2563eb)"
                  : "#94a3b8",
              boxShadow:
                resolvedAmount > 0
                  ? "0 8px 24px rgba(26,50,112,0.28)"
                  : "none",
            }}
          >
            {resolvedAmount > 0
              ? `Donate ₹${resolvedAmount.toLocaleString("en-IN")}`
              : "Select an amount"}
            <Heart size={17} fill="white" strokeWidth={0} />
          </motion.button>

          {/* Trust row */}
          <div className="flex items-center justify-center gap-5 mt-5">
            {trustBadges.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-1.5 text-xs text-[#94a3b8]"
              >
                <Icon size={13} className="text-[#1a3270]" />
                {label}
              </span>
            ))}
          </div>
        </motion.div>
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
