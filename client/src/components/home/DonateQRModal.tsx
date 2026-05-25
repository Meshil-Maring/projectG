import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { X, Smartphone } from "lucide-react";

// ── Replace with your actual GPay / UPI ID ──────────────────────────────────
const UPI_ID = "yourupi@okaxis";
const PAYEE_NAME = "ProjectG Foundation";
// ────────────────────────────────────────────────────────────────────────────

interface Props {
  amount: number;
  onClose: () => void;
}

function buildUpiLink(amount: number) {
  const params = new URLSearchParams({
    pa: UPI_ID,
    pn: PAYEE_NAME,
    am: String(amount),
    cu: "INR",
    tn: "Donation",
  });
  return `upi://pay?${params.toString()}`;
}

export default function DonateQRModal({ amount, onClose }: Props) {
  const upiLink = buildUpiLink(amount);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      >
        {/* Card — stop clicks bubbling to backdrop */}
        <motion.div
          key="card"
          initial={{ opacity: 0, scale: 0.88, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 16 }}
          transition={{ type: "spring", stiffness: 340, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
          className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 flex flex-col items-center"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-[color:var(--color-muted)] hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>

          {/* GPay badge */}
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center">
              {/* GPay "G" coloured letter */}
              <svg viewBox="0 0 48 48" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
                <path fill="#4285F4" d="M24 9.5c3.5 0 6.6 1.2 9 3.2l6.7-6.7C35.7 2.3 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.3l7.8 6.1C12.3 13.1 17.7 9.5 24 9.5z"/>
                <path fill="#34A853" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.4 5.7c4.4-4 6.9-9.9 6.9-16.9z"/>
                <path fill="#FBBC05" d="M10.4 28.6A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.1.8-4.6l-7.8-6.1A23.9 23.9 0 0 0 0 24c0 3.9.9 7.5 2.6 10.7l7.8-6.1z"/>
                <path fill="#EA4335" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.4-5.7c-2.1 1.4-4.7 2.2-7.8 2.2-6.3 0-11.7-3.6-13.6-9.4l-7.8 6.1C6.5 42.6 14.6 48 24 48z"/>
              </svg>
            </div>
            <span className="text-sm font-semibold text-[color:var(--color-heading)]">Pay via GPay / UPI</span>
          </div>

          {/* Amount */}
          <p className="text-3xl font-bold text-[color:var(--color-purple)] mt-3 mb-5">
            ₹{amount.toLocaleString("en-IN")}
          </p>

          {/* QR Code */}
          <div className="p-3 bg-white rounded-2xl ring-2 ring-purple-100 shadow-md">
            <QRCodeSVG
              value={upiLink}
              size={200}
              bgColor="#ffffff"
              fgColor="#1e1b4b"
              level="M"
              marginSize={1}
            />
          </div>

          {/* Instructions */}
          <div className="mt-5 flex items-start gap-2 text-sm text-[color:var(--color-body)] bg-purple-50 rounded-xl px-4 py-3 w-full">
            <Smartphone size={16} className="mt-0.5 shrink-0 text-[color:var(--color-purple)]" />
            <span>
              Open <strong>Google Pay</strong> → tap the scan icon → point your camera at this QR code.
            </span>
          </div>

          {/* Deep-link button for mobile */}
          <a
            href={upiLink}
            className="mt-4 w-full text-center py-3 rounded-full border-2 border-[color:var(--color-purple)] text-[color:var(--color-purple)] font-semibold text-sm hover:bg-purple-50 transition-colors"
          >
            Open in GPay (mobile)
          </a>

          <p className="mt-4 text-xs text-[color:var(--color-muted)] text-center">
            100% Secure · Powered by UPI
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
