import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Heart, BookOpen, Users, Handshake } from "lucide-react";

const interests = [
  { icon: Heart, label: "Make Impact" },
  { icon: BookOpen, label: "Learn & Grow" },
  { icon: Users, label: "Inspire Others" },
  { icon: Handshake, label: "Build Strong Communities" },
];

interface Props {
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  areas: string[];
  message: string;
}

const emptyForm: FormData = { name: "", email: "", phone: "", areas: [], message: "" };

export default function VolunteerModal({ onClose }: Props) {
  const [form, setForm] = useState<FormData>(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  function toggleArea(label: string) {
    setForm((prev) => ({
      ...prev,
      areas: prev.areas.includes(label)
        ? prev.areas.filter((a) => a !== label)
        : [...prev.areas, label],
    }));
    setErrors((prev) => ({ ...prev, areas: undefined }));
  }

  function validate(): boolean {
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email.";
    if (form.areas.length === 0) next.areas = "Select at least one area.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  }

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-8"
      >
        <motion.div
          key="card"
          initial={{ opacity: 0, scale: 0.88, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 16 }}
          transition={{ type: "spring", stiffness: 340, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
          className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-8"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>

          {submitted ? (
            <div className="flex flex-col items-center text-center py-6 gap-4">
              <CheckCircle2 size={56} className="text-[#e63975]" strokeWidth={1.5} />
              <h3 className="text-2xl font-extrabold text-[#1a1a4b]">You're In!</h3>
              <p className="text-sm text-[#64748b] leading-relaxed max-w-xs">
                Thank you, <strong>{form.name}</strong>! We've received your request and our team
                will reach out to you soon.
              </p>
              <button
                onClick={onClose}
                className="mt-2 bg-[#e63975] hover:bg-[#c72d60] text-white text-sm font-semibold px-8 py-3 rounded-full transition-colors duration-200"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <p className="text-xs font-bold uppercase tracking-widest text-[#e63975] mb-1">
                Join Our Mission
              </p>
              <h3 className="text-2xl font-extrabold text-[#1a1a4b] mb-1">Volunteer Sign-Up</h3>
              <p className="text-sm text-[#64748b] mb-6">
                Fill in your details and we'll get back to you shortly.
              </p>

              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-[#1a1a4b] mb-1">
                    Full Name <span className="text-[#e63975]">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => {
                      setForm((p) => ({ ...p, name: e.target.value }));
                      setErrors((p) => ({ ...p, name: undefined }));
                    }}
                    placeholder="Your name"
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#e63975]/40 transition ${
                      errors.name ? "border-red-400" : "border-gray-200"
                    }`}
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-[#1a1a4b] mb-1">
                    Email <span className="text-[#e63975]">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => {
                      setForm((p) => ({ ...p, email: e.target.value }));
                      setErrors((p) => ({ ...p, email: undefined }));
                    }}
                    placeholder="you@example.com"
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#e63975]/40 transition ${
                      errors.email ? "border-red-400" : "border-gray-200"
                    }`}
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-[#1a1a4b] mb-1">
                    Phone <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                    placeholder="+91 98765 43210"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#e63975]/40 transition"
                  />
                </div>

                {/* Areas of interest */}
                <div>
                  <label className="block text-xs font-semibold text-[#1a1a4b] mb-2">
                    Area of Interest <span className="text-[#e63975]">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {interests.map(({ icon: Icon, label }) => {
                      const selected = form.areas.includes(label);
                      return (
                        <button
                          key={label}
                          type="button"
                          onClick={() => toggleArea(label)}
                          className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-semibold transition-colors duration-150 cursor-pointer ${
                            selected
                              ? "bg-[#fce7ef] border-[#e63975] text-[#e63975]"
                              : "border-gray-200 text-[#64748b] hover:border-[#e63975]/50"
                          }`}
                        >
                          <Icon size={14} strokeWidth={2} />
                          {label}
                        </button>
                      );
                    })}
                  </div>
                  {errors.areas && <p className="text-xs text-red-500 mt-1">{errors.areas}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-[#1a1a4b] mb-1">
                    Why do you want to volunteer?{" "}
                    <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    placeholder="Tell us a little about yourself..."
                    rows={3}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#e63975]/40 transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-1 bg-[#e63975] hover:bg-[#c72d60] text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors duration-200"
                >
                  Join Us Today →
                </button>
              </form>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
