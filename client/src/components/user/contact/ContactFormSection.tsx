import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, User, Mail, MessageSquare, Tag } from "lucide-react";
import { SpinnerIcon } from "../../../assets/icons";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: "easeOut" as const },
  }),
};

const infoCards = [
  {
    icon: Mail,
    title: "Email Us",
    lines: ["projectgeneration@gmail.com", "We reply within 24 hours"],
  },
  {
    icon: MessageSquare,
    title: "Social Media",
    lines: ["@projectgeneration", "Facebook · Instagram"],
  },
  {
    icon: Tag,
    title: "Join Us",
    lines: ["Open to all students", "Groups available year-round"],
  },
];

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactFormSection() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  function validate(): boolean {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email.";
    if (!form.subject.trim()) next.subject = "Subject is required.";
    if (!form.message.trim()) next.message = "Message is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  }

  const inputBase: React.CSSProperties = {
    width: "100%",
    padding: "0.75rem 1rem",
    fontSize: "0.875rem",
    border: "1.5px solid #e2e8f0",
    borderRadius: "0.6rem",
    outline: "none",
    color: "#1e293b",
    backgroundColor: "#f8fafc",
    transition: "border-color 0.2s, box-shadow 0.2s",
    fontFamily: "'Poppins', sans-serif",
  };

  return (
    <section className="py-16 px-6 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-12">
          <motion.p
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-widest text-[#1a3270] mb-3 flex items-center justify-center gap-2"
          >
            <span className="inline-block w-6 h-0.5 bg-[#1a3270]" />
            Send a Message
            <span className="inline-block w-6 h-0.5 bg-[#1a3270]" />
          </motion.p>
          <motion.h2
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
            className="text-3xl xl:text-4xl font-extrabold text-[#1a1a4b] mb-4"
          >
            Let's Start a Conversation
          </motion.h2>
          <motion.p
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}
            className="text-sm text-[#64748b] max-w-md mx-auto"
          >
            Fill in the form below and we'll get back to you shortly.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">

          {/* Left — info cards */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {infoCards.map(({ icon: Icon, title, lines }, i) => (
              <motion.div
                key={title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="bg-white rounded-2xl p-6 shadow-sm border border-[#e2e8f0] flex items-start gap-4"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "#f0f4ff" }}
                >
                  <Icon size={18} color="#1a3270" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1a1a4b] mb-1">{title}</p>
                  {lines.map((line) => (
                    <p key={line} className="text-xs text-[#64748b]">{line}</p>
                  ))}
                </div>
              </motion.div>
            ))}

          </div>

          {/* Right — form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="lg:col-span-3 bg-white rounded-3xl shadow-sm border border-[#e2e8f0] p-8"
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
                  <CheckCircle size={34} className="text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-[#1a1a4b]">Message Sent!</h3>
                <p className="text-sm text-[#64748b] max-w-xs">
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  className="mt-2 text-sm font-semibold text-[#1a3270] underline underline-offset-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid sm:grid-cols-2 gap-5 mb-5">

                  {/* Name */}
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-[#475569] mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={handleChange}
                        aria-invalid={!!errors.name}
                        style={{ ...inputBase, paddingLeft: "2.25rem", borderColor: errors.name ? "#ef4444" : "#e2e8f0" }}
                        onFocus={(e) => { e.target.style.borderColor = "#1a3270"; e.target.style.boxShadow = "0 0 0 3px rgba(26,50,112,0.08)"; }}
                        onBlur={(e) => { e.target.style.borderColor = errors.name ? "#ef4444" : "#e2e8f0"; e.target.style.boxShadow = "none"; }}
                      />
                    </div>
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-[#475569] mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                        aria-invalid={!!errors.email}
                        style={{ ...inputBase, paddingLeft: "2.25rem", borderColor: errors.email ? "#ef4444" : "#e2e8f0" }}
                        onFocus={(e) => { e.target.style.borderColor = "#1a3270"; e.target.style.boxShadow = "0 0 0 3px rgba(26,50,112,0.08)"; }}
                        onBlur={(e) => { e.target.style.borderColor = errors.email ? "#ef4444" : "#e2e8f0"; e.target.style.boxShadow = "none"; }}
                      />
                    </div>
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Subject */}
                <div className="mb-5">
                  <label htmlFor="contact-subject" className="block text-xs font-semibold text-[#475569] mb-1.5">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="contact-subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    aria-invalid={!!errors.subject}
                    style={{ ...inputBase, borderColor: errors.subject ? "#ef4444" : "#e2e8f0" }}
                    onFocus={(e) => { e.target.style.borderColor = "#1a3270"; e.target.style.boxShadow = "0 0 0 3px rgba(26,50,112,0.08)"; }}
                    onBlur={(e) => { e.target.style.borderColor = errors.subject ? "#ef4444" : "#e2e8f0"; e.target.style.boxShadow = "none"; }}
                  >
                    <option value="">Select a subject…</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Volunteering">Volunteering</option>
                    <option value="Donation">Donation</option>
                    <option value="Partnership">Partnership / Collaboration</option>
                    <option value="Membership">Group Membership</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject}</p>}
                </div>

                {/* Message */}
                <div className="mb-7">
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-[#475569] mb-1.5">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    placeholder="Tell us how we can help you…"
                    value={form.message}
                    onChange={handleChange}
                    aria-invalid={!!errors.message}
                    style={{ ...inputBase, resize: "vertical", borderColor: errors.message ? "#ef4444" : "#e2e8f0" }}
                    onFocus={(e) => { e.target.style.borderColor = "#1a3270"; e.target.style.boxShadow = "0 0 0 3px rgba(26,50,112,0.08)"; }}
                    onBlur={(e) => { e.target.style.borderColor = errors.message ? "#ef4444" : "#e2e8f0"; e.target.style.boxShadow = "none"; }}
                  />
                  {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  style={{
                    width: "100%",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    backgroundColor: loading ? "#93a3c9" : "#1a3270",
                    color: "#ffffff",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    padding: "0.85rem 2rem",
                    borderRadius: "0.6rem",
                    border: "none",
                    cursor: loading ? "not-allowed" : "pointer",
                    fontFamily: "'Poppins', sans-serif",
                    boxShadow: loading ? "none" : "0 4px 14px 0 rgba(26,50,112,0.28)",
                    transition: "background-color 0.2s",
                  }}
                >
                  {loading ? (
                    <>
                      <SpinnerIcon className="animate-spin h-4 w-4 text-white" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message <Send size={15} />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
