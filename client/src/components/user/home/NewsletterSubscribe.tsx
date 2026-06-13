import { useState } from "react";
import { motion } from "framer-motion";
import letterImg from "../../../assets/image/letter.png";

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
  }

  return (
    <section className="bg-linear-to-br from-primary/5 to-primary/10 py-12 px-6">
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: "2.5rem",
          flexWrap: "wrap",
        }}
      >
        {/* Envelope illustration */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ flexShrink: 0 }}
        >
          <img
            src={letterImg}
            alt="Newsletter envelope"
            style={{ width: "120px", height: "auto", objectFit: "contain" }}
          />
        </motion.div>

        {/* Text block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ flex: "1 1 200px", minWidth: "180px" }}
        >
          <h3 className="text-lg font-bold text-heading mb-1">
            Stay Connected
          </h3>
          <p className="text-sm text-body leading-relaxed m-0">
            Subscribe to our newsletter and get the latest updates on our programs and impact stories.
          </p>
        </motion.div>

        {/* Form block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ flex: "1 1 320px", minWidth: "260px" }}
        >
          {submitted ? (
            <p className="text-sm font-semibold text-primary">
              Thank you for subscribing!
            </p>
          ) : (
            <>
              <form
                onSubmit={handleSubmit}
                className="newsletter-form flex gap-0 rounded-md overflow-hidden shadow-sm"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  aria-label="Email address"
                  required
                  className="newsletter-input flex-1 min-w-0 px-4 py-3 text-sm border border-border border-r-0 rounded-l-md outline-none text-heading bg-white focus-visible:ring-2 focus-visible:ring-primary-light"
                />
                <motion.button
                  type="submit"
                  className="newsletter-button px-5 py-3 bg-primary text-white font-semibold text-sm border-none rounded-r-md cursor-pointer transition-colors duration-200 whitespace-nowrap shrink-0"
                  whileHover={{ backgroundColor: "var(--color-primary-dark)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  Subscribe
                </motion.button>
              </form>
              <style>{`
                @media (max-width: 480px) {
                  .newsletter-form {
                    flex-direction: column;
                  }
                  .newsletter-input {
                    border-right: 1.5px solid var(--color-border) !important;
                    border-radius: 6px 6px 0 0 !important;
                  }
                  .newsletter-button {
                    border-radius: 0 0 6px 6px !important;
                    width: 100%;
                  }
                }
              `}</style>
              <p className="text-xs text-muted mt-2 ml-0.5">
                No spam. Unsubscribe anytime.
              </p>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
