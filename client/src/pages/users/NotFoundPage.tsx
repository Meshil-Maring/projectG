import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Navbar from "../../shared/components/Navbar";
import Footer from "../../shared/components/Footer";

export default function NotFoundPage() {
  return (
    <>
      <Navbar />
      <main
        style={{
          fontFamily: "'Poppins', sans-serif",
          minHeight: "calc(100vh - 68px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "4rem 1.5rem",
          backgroundColor: "#f8fafc",
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
          style={{ maxWidth: "520px", width: "100%" }}
        >
          {/* 404 number */}
          <div
            style={{
              fontSize: "clamp(6rem, 20vw, 10rem)",
              fontWeight: 800,
              lineHeight: 1,
              color: "#1a3270",
              letterSpacing: "-0.04em",
              marginBottom: "0.5rem",
              userSelect: "none",
            }}
          >
            404
          </div>

          {/* Divider accent */}
          <div
            style={{
              width: "60px",
              height: "4px",
              borderRadius: "2px",
              backgroundColor: "#1a3270",
              margin: "0 auto 1.5rem",
            }}
          />

          <h1
            style={{
              fontSize: "clamp(1.25rem, 4vw, 1.75rem)",
              fontWeight: 700,
              color: "#1e293b",
              marginBottom: "0.75rem",
            }}
          >
            Page Not Found
          </h1>

          <p
            style={{
              fontSize: "0.95rem",
              color: "#64748b",
              lineHeight: 1.7,
              marginBottom: "2.5rem",
            }}
          >
            Sorry, the page you're looking for doesn't exist or may have been
            moved. Let's get you back on track.
          </p>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => window.history.back()}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                backgroundColor: "transparent",
                color: "#1a3270",
                fontWeight: 600,
                fontSize: "0.85rem",
                padding: "0.6rem 1.4rem",
                borderRadius: "0.4rem",
                border: "2px solid #1a3270",
                cursor: "pointer",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              <ArrowLeft size={15} />
              Go Back
            </motion.button>

          </div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
