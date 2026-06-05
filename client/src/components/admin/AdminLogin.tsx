import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Shield, Lock, Mail, AlertCircle } from "lucide-react";
import Logo from "../../assets/image/logo.jpeg";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    // TODO: replace with actual auth call
    setTimeout(() => {
      setLoading(false);
      setError("Invalid credentials. Please try again.");
    }, 1000);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        fontFamily: "'Poppins', sans-serif",
        background: "linear-gradient(135deg, #0f1e4a 0%, #1a3270 50%, #1e3d8a 100%)",
      }}
    >
      {/* Left panel — branding */}
      <div
        className="hidden lg:flex"
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "3rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background circles */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            left: "-80px",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.04)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-120px",
            right: "-60px",
            width: "480px",
            height: "480px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.03)",
          }}
        />

        <div style={{ position: "relative", zIndex: 1, textAlign: "center", color: "#fff" }}>
          <img
            src={Logo}
            alt="Project Generation"
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              objectFit: "cover",
              marginBottom: "1.5rem",
              border: "3px solid rgba(255,255,255,0.25)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}
          />
          <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.75rem", lineHeight: 1.2 }}>
            Project Generation
          </h1>
          <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.65)", maxWidth: "280px", lineHeight: 1.7 }}>
            Admin portal — manage content, members, and activities across all groups.
          </p>

          <div
            style={{
              marginTop: "3rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              textAlign: "left",
            }}
          >
            {[
              "Manage group activities",
              "Review and publish notices",
              "Oversee campaigns & donations",
              "Monitor member engagement",
            ].map((item) => (
              <div
                key={item}
                style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "#60a5fa",
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.75)" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — login form */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          background: "#f8fafc",
        }}
      >
        <div style={{ width: "100%", maxWidth: "420px" }}>
          {/* Mobile logo */}
          <div className="flex lg:hidden" style={{ justifyContent: "center", marginBottom: "2rem" }}>
            <img
              src={Logo}
              alt="Project Generation"
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #1a3270",
              }}
            />
          </div>

          {/* Card */}
          <div
            style={{
              background: "#ffffff",
              borderRadius: "1rem",
              boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
              padding: "2.5rem",
            }}
          >
            {/* Header */}
            <div style={{ marginBottom: "2rem" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  backgroundColor: "#eff6ff",
                  color: "#1a3270",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "0.35rem 0.75rem",
                  borderRadius: "999px",
                  marginBottom: "1rem",
                }}
              >
                <Shield size={12} />
                Secure Admin Access
              </div>
              <h2
                style={{
                  fontSize: "1.6rem",
                  fontWeight: 700,
                  color: "#0f1e4a",
                  marginBottom: "0.4rem",
                  lineHeight: 1.2,
                }}
              >
                Admin Login
              </h2>
              <p style={{ fontSize: "0.82rem", color: "#64748b" }}>
                Sign in to access the admin dashboard.
              </p>
            </div>

            {/* Error message */}
            {error && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  backgroundColor: "#fef2f2",
                  border: "1px solid #fecaca",
                  color: "#b91c1c",
                  borderRadius: "0.5rem",
                  padding: "0.75rem 1rem",
                  fontSize: "0.8rem",
                  marginBottom: "1.25rem",
                }}
              >
                <AlertCircle size={15} style={{ flexShrink: 0 }} />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {/* Email */}
              <div>
                <label
                  htmlFor="admin-email"
                  style={{
                    display: "block",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    color: "#374151",
                    marginBottom: "0.45rem",
                  }}
                >
                  Email Address
                </label>
                <div style={{ position: "relative" }}>
                  <Mail
                    size={16}
                    style={{
                      position: "absolute",
                      left: "0.85rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#94a3b8",
                    }}
                  />
                  <input
                    id="admin-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@projectgeneration.org"
                    autoComplete="email"
                    style={{
                      width: "100%",
                      paddingLeft: "2.5rem",
                      paddingRight: "1rem",
                      paddingTop: "0.7rem",
                      paddingBottom: "0.7rem",
                      fontSize: "0.85rem",
                      border: "1.5px solid #e2e8f0",
                      borderRadius: "0.5rem",
                      outline: "none",
                      color: "#1e293b",
                      backgroundColor: "#f8fafc",
                      transition: "border-color 0.2s",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#1a3270")}
                    onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="admin-password"
                  style={{
                    display: "block",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    color: "#374151",
                    marginBottom: "0.45rem",
                  }}
                >
                  Password
                </label>
                <div style={{ position: "relative" }}>
                  <Lock
                    size={16}
                    style={{
                      position: "absolute",
                      left: "0.85rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#94a3b8",
                    }}
                  />
                  <input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    style={{
                      width: "100%",
                      paddingLeft: "2.5rem",
                      paddingRight: "3rem",
                      paddingTop: "0.7rem",
                      paddingBottom: "0.7rem",
                      fontSize: "0.85rem",
                      border: "1.5px solid #e2e8f0",
                      borderRadius: "0.5rem",
                      outline: "none",
                      color: "#1e293b",
                      backgroundColor: "#f8fafc",
                      transition: "border-color 0.2s",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#1a3270")}
                    onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    style={{
                      position: "absolute",
                      right: "0.85rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#94a3b8",
                      padding: "0.2rem",
                      display: "flex",
                      alignItems: "center",
                    }}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "0.85rem",
                  backgroundColor: loading ? "#93a8d4" : "#1a3270",
                  color: "#ffffff",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  border: "none",
                  borderRadius: "0.5rem",
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "background-color 0.2s, transform 0.1s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  marginTop: "0.25rem",
                  boxShadow: loading ? "none" : "0 4px 14px rgba(26,50,112,0.3)",
                }}
                onMouseEnter={(e) => {
                  if (!loading) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#0f1e4a";
                }}
                onMouseLeave={(e) => {
                  if (!loading) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1a3270";
                }}
              >
                {loading ? (
                  <>
                    <span
                      style={{
                        width: "16px",
                        height: "16px",
                        border: "2px solid rgba(255,255,255,0.4)",
                        borderTopColor: "#fff",
                        borderRadius: "50%",
                        animation: "spin 0.7s linear infinite",
                        display: "inline-block",
                      }}
                    />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Footer note */}
            <p
              style={{
                textAlign: "center",
                fontSize: "0.72rem",
                color: "#94a3b8",
                marginTop: "1.75rem",
                lineHeight: 1.6,
              }}
            >
              Restricted area. Authorized personnel only.
              <br />
              <a
                href="/"
                style={{ color: "#1a3270", textDecoration: "none", fontWeight: 600 }}
                onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.textDecoration = "underline")}
                onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.textDecoration = "none")}
              >
                ← Back to main site
              </a>
            </p>
          </div>

          <p style={{ textAlign: "center", fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", marginTop: "1.5rem" }}>
            © {new Date().getFullYear()} Project Generation. All rights reserved.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
