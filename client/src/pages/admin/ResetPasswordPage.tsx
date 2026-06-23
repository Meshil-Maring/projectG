import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Eye, EyeOff, Lock, AlertCircle, CheckCircle, Shield } from "lucide-react";
import Logo from "../../assets/image/logo.jpeg";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      setMessage("Passwords do not match.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data?.error?.message ?? "Something went wrong. Please try again.");
        setStatus("error");
      } else {
        setStatus("success");
      }
    } catch {
      setMessage("Unable to reach the server. Please try again.");
      setStatus("error");
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f1e4a 0%, #1a3270 50%, #1e3d8a 100%)",
        fontFamily: "'Poppins', sans-serif",
        padding: "2rem",
      }}
    >
      <div style={{ width: "100%", maxWidth: "420px" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
          <img
            src={Logo}
            alt="Project Generation"
            style={{ width: "64px", height: "64px", borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(255,255,255,0.3)" }}
          />
        </div>

        <div
          style={{
            background: "#ffffff",
            borderRadius: "1rem",
            boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
            padding: "2.5rem",
          }}
        >
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
              Admin Access
            </div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#0f1e4a", marginBottom: "0.4rem" }}>
              Set New Password
            </h2>
            <p style={{ fontSize: "0.82rem", color: "#64748b" }}>
              Choose a strong password for your admin account.
            </p>
          </div>

          {!token ? (
            <div style={{ textAlign: "center", padding: "1rem 0" }}>
              <AlertCircle size={40} color="#b91c1c" style={{ marginBottom: "1rem" }} />
              <p style={{ fontSize: "0.9rem", color: "#b91c1c" }}>Invalid or missing reset token.</p>
              <Link to="/projectG-admin/forgot-password" style={{ color: "#1a3270", fontWeight: 600, fontSize: "0.82rem" }}>
                Request a new link
              </Link>
            </div>
          ) : status === "success" ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", padding: "1.5rem 0", textAlign: "center" }}>
              <CheckCircle size={48} color="#16a34a" />
              <p style={{ fontSize: "0.9rem", color: "#15803d", fontWeight: 600 }}>Password reset successfully!</p>
              <Link
                to="/projectG-admin"
                style={{
                  display: "inline-block",
                  backgroundColor: "#1a3270",
                  color: "#fff",
                  padding: "0.7rem 1.5rem",
                  borderRadius: "0.5rem",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                }}
              >
                Go to Login
              </Link>
            </div>
          ) : (
            <>
              {status === "error" && (
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
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div>
                  <label
                    htmlFor="new-password"
                    style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#374151", marginBottom: "0.45rem" }}
                  >
                    New Password
                  </label>
                  <div style={{ position: "relative" }}>
                    <Lock size={16} style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                    <input
                      id="new-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min. 8 characters"
                      required
                      minLength={8}
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
                        boxSizing: "border-box",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#1a3270")}
                      onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      style={{ position: "absolute", right: "0.85rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94a3b8", padding: "0.2rem", display: "flex", alignItems: "center" }}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirm-password"
                    style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#374151", marginBottom: "0.45rem" }}
                  >
                    Confirm Password
                  </label>
                  <div style={{ position: "relative" }}>
                    <Lock size={16} style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                    <input
                      id="confirm-password"
                      type={showPassword ? "text" : "password"}
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      placeholder="Repeat your password"
                      required
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
                        boxSizing: "border-box",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#1a3270")}
                      onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  style={{
                    width: "100%",
                    padding: "0.85rem",
                    backgroundColor: status === "loading" ? "#93a8d4" : "#1a3270",
                    color: "#ffffff",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    border: "none",
                    borderRadius: "0.5rem",
                    cursor: status === "loading" ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    boxShadow: status === "loading" ? "none" : "0 4px 14px rgba(26,50,112,0.3)",
                  }}
                >
                  {status === "loading" ? (
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
                      Saving...
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </form>
            </>
          )}

          <p style={{ textAlign: "center", fontSize: "0.78rem", color: "#94a3b8", marginTop: "1.75rem" }}>
            <Link to="/projectG-admin" style={{ color: "#1a3270", textDecoration: "none", fontWeight: 600 }}>
              ← Back to Login
            </Link>
          </p>
        </div>

        <p style={{ textAlign: "center", fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", marginTop: "1.5rem" }}>
          © {new Date().getFullYear()} Project Generation. All rights reserved.
        </p>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
