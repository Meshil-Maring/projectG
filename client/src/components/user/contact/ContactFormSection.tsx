import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, User, Mail, MessageSquare, Clock, Users } from "lucide-react";
import { SpinnerIcon, FacebookIcon, InstagramIcon, YoutubeIcon } from "../../../assets/icons";
import { usePageSections } from "../../../context/PageContext";
import { api } from "../../../lib/api";

const DEFAULT_FORM = {
  eyebrow: "Send a Message",
  heading: "Let's Start a Conversation",
  description: "Fill in the form below and we'll get back to you shortly.",
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: "easeOut" as const },
  }),
};

const sidePoints = [
  { icon: Clock, title: "Quick Response", text: "We reply within 24 hours" },
  { icon: Users, title: "Open to Everyone", text: "Students, volunteers and groups welcome" },
];

const socialLinks = [
  { name: "Facebook", icon: FacebookIcon, url: "https://www.facebook.com/share/17kjpAxLpJ/?mibextid=wwXIfr" },
  { name: "Instagram", icon: InstagramIcon, url: "https://www.instagram.com/project_g_manipur/" },
  { name: "YouTube", icon: YoutubeIcon, url: "https://youtube.com/@projectgmanipur?si=_dMs0XzLLMtPd90n" },
];

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactFormSection() {
  const { getSectionData } = usePageSections();
  const content = { ...DEFAULT_FORM, ...getSectionData("contact-form") };
  const [form, setForm] = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [customSubject, setCustomSubject] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<FormState & { customSubject: string }>>({});
  const [submitError, setSubmitError] = useState("");

  const isOther = form.subject === "Other";

  function validate(): boolean {
    const next: Partial<FormState & { customSubject: string }> = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email.";
    if (!form.subject.trim()) next.subject = "Subject is required.";
    if (isOther && !customSubject.trim()) next.customSubject = "Please describe your subject.";
    if (!form.message.trim()) next.message = "Message is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "subject" && value !== "Other") setCustomSubject("");
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setSubmitError("");
    const payload = { ...form, subject: isOther ? customSubject.trim() : form.subject };
    try {
      await api.post("/contact/message", payload);
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputBase: React.CSSProperties = {
    width: "100%",
    padding: "0.75rem 1rem",
    fontSize: "0.875rem",
    borderRadius: "0.6rem",
    outline: "none",
    color: "var(--color-heading)",
    backgroundColor: "var(--color-surface)",
    fontFamily: "'Poppins', sans-serif",
  };

  const fieldClass = (hasError?: boolean) =>
    `border-[1.5px] ${hasError ? "border-red-500" : "border-border"} focus:border-primary focus:ring-3 focus:ring-primary/10 focus:outline-none transition-colors duration-200`;

  return (
    <section className="py-16 px-6 bg-surface">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-5 rounded-3xl shadow-card overflow-hidden border border-border"
        >
          {/* Left — info panel */}
          <div
            className="lg:col-span-2 p-8 sm:p-10 text-white relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)" }}
          >
            <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
            <div className="absolute top-10 -left-10 w-28 h-28 rounded-full bg-white/5 pointer-events-none" />

            <div className="relative z-10">
              <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-3 flex items-center gap-2">
                <span className="inline-block w-6 h-0.5 bg-white/50" />
                {content.eyebrow}
              </p>
              <h2 className="text-2xl xl:text-3xl font-extrabold mb-3 leading-tight">{content.heading}</h2>
              <p className="text-sm text-white/75 leading-relaxed mb-10">{content.description}</p>

              <div className="space-y-6">
                {sidePoints.map(({ icon: Icon, title, text }) => (
                  <div key={title} className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold mb-0.5">{title}</p>
                      <p className="text-xs text-white/70 leading-relaxed">{text}</p>
                    </div>
                  </div>
                ))}

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                    <MessageSquare size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold mb-1.5">Social Media</p>
                    <div className="flex items-center gap-2">
                      {socialLinks.map(({ name, icon: Icon, url }) => (
                        <a
                          key={name}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${name} (opens in a new tab)`}
                          className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors duration-200"
                        >
                          <Icon />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3 bg-white p-8 sm:p-10">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
                  <CheckCircle size={34} className="text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-heading">Message Sent!</h3>
                <p className="text-sm text-muted max-w-xs">
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); setCustomSubject(""); }}
                  className="mt-2 text-sm font-semibold text-primary underline underline-offset-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid sm:grid-cols-2 gap-5 mb-5">

                  {/* Name */}
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-body mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={handleChange}
                        aria-invalid={!!errors.name}
                        style={{ ...inputBase, paddingLeft: "2.25rem" }}
                        className={fieldClass(!!errors.name)}
                      />
                    </div>
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-body mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                        aria-invalid={!!errors.email}
                        style={{ ...inputBase, paddingLeft: "2.25rem" }}
                        className={fieldClass(!!errors.email)}
                      />
                    </div>
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Subject */}
                <div className="mb-5">
                  <label htmlFor="contact-subject" className="block text-xs font-semibold text-body mb-1.5">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="contact-subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    aria-invalid={!!errors.subject}
                    style={inputBase}
                    className={fieldClass(!!errors.subject)}
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

                  {isOther && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-3"
                    >
                      <label htmlFor="contact-custom-subject" className="block text-xs font-semibold text-body mb-1.5">
                        Please specify <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-custom-subject"
                        type="text"
                        placeholder="Describe your subject…"
                        value={customSubject}
                        onChange={(e) => {
                          setCustomSubject(e.target.value);
                          if (errors.customSubject) setErrors((prev) => ({ ...prev, customSubject: undefined }));
                        }}
                        aria-invalid={!!errors.customSubject}
                        style={inputBase}
                        className={fieldClass(!!errors.customSubject)}
                      />
                      {errors.customSubject && <p className="text-xs text-red-500 mt-1">{errors.customSubject}</p>}
                    </motion.div>
                  )}
                </div>

                {/* Message */}
                <div className="mb-7">
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-body mb-1.5">
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
                    style={{ ...inputBase, resize: "vertical" }}
                    className={fieldClass(!!errors.message)}
                  />
                  {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                </div>

                {submitError && (
                  <p className="text-xs text-red-500 text-center mb-3">{submitError}</p>
                )}

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
                    backgroundColor: loading ? "#93a3c9" : "var(--color-primary)",
                    color: "#ffffff",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    padding: "0.85rem 2rem",
                    borderRadius: "0.6rem",
                    border: "none",
                    cursor: loading ? "not-allowed" : "pointer",
                    fontFamily: "'Poppins', sans-serif",
                    boxShadow: loading ? "none" : "var(--shadow-button)",
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
