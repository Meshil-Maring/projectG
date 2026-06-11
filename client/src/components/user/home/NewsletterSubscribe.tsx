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
    <section
      style={{
        background: "linear-gradient(135deg, #eef0fb 0%, #dde1f7 100%)",
        fontFamily: "'Poppins', sans-serif",
        padding: "3rem 1.5rem",
      }}
    >
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
          <h3
            style={{
              fontSize: "1.15rem",
              fontWeight: 700,
              color: "#1a1a4b",
              marginBottom: "0.4rem",
            }}
          >
            Stay Connected
          </h3>
          <p style={{ fontSize: "0.82rem", color: "#4a5080", lineHeight: 1.65, margin: 0 }}>
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
            <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "#3a47c5" }}>
              Thank you for subscribing!
            </p>
          ) : (
            <>
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", gap: "0", borderRadius: "6px", overflow: "hidden", boxShadow: "0 2px 12px rgba(58,71,197,0.1)" }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  aria-label="Email address"
                  required
                  style={{
                    flex: 1,
                    padding: "0.75rem 1rem",
                    fontSize: "0.82rem",
                    border: "1.5px solid #d0d4f0",
                    borderRight: "none",
                    borderRadius: "6px 0 0 6px",
                    outline: "none",
                    color: "#1a1a4b",
                    backgroundColor: "#ffffff",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                />
                <motion.button
                  type="submit"
                  whileHover={{ backgroundColor: "#2d3bae" }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    padding: "0.75rem 1.4rem",
                    backgroundColor: "#3a47c5",
                    color: "#ffffff",
                    fontWeight: 600,
                    fontSize: "0.82rem",
                    border: "none",
                    borderRadius: "0 6px 6px 0",
                    cursor: "pointer",
                    fontFamily: "'Poppins', sans-serif",
                    transition: "background-color 0.2s",
                    whiteSpace: "nowrap",
                  }}
                >
                  Subscribe
                </motion.button>
              </form>
              <p style={{ fontSize: "0.72rem", color: "#8890b8", marginTop: "0.45rem", marginLeft: "0.1rem" }}>
                No spam. Unsubscribe anytime.
              </p>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
