import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How is my donation used?",
    a: "100% of your donation goes directly to our programs — education, healthcare, community development, and welfare. We maintain full transparency with annual impact reports.",
  },
  {
    q: "Is my payment secure?",
    a: "Yes. Donations are processed via UPI/GPay, a secure RBI-regulated payment method. We never store your payment details.",
  },
  {
    q: "Will I receive a receipt?",
    a: "Yes. A digital receipt is generated automatically after every successful donation. Reach out to us via the contact page for any records queries.",
  },
  {
    q: "Can I make a recurring donation?",
    a: "Currently we accept one-time donations. For regular giving or larger contributions, please contact us directly and we'll set something up.",
  },
  {
    q: "Are donations tax-deductible?",
    a: "Donations to registered NGOs may be eligible under Section 80G of the Income Tax Act. Please contact us for an official certificate.",
  },
];

export default function DonateFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 px-6 bg-[#f8fafc]">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-[#f97316] mb-2">
            Questions
          </p>
          <h2
            className="text-2xl xl:text-3xl font-extrabold text-[#1a1a4b] mb-3"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Frequently Asked Questions
          </h2>
          <div className="w-10 h-1 bg-[#1a3270] rounded mx-auto" />
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map(({ q, a }, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer"
              >
                <span className="text-sm font-semibold text-[#1a1a4b] pr-4">
                  {q}
                </span>
                <motion.span
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0"
                >
                  <ChevronDown size={18} className="text-[#94a3b8]" />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <p className="px-6 pb-5 text-sm text-[#64748b] leading-relaxed border-t border-[#f1f5f9] pt-3">
                      {a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
