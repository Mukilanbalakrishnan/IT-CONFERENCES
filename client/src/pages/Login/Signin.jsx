import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";

// --- SVG Icons for Social Buttons ---
const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const AppleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.22 5.42c-1.3-.01-2.43.76-3.17 1.83-.8-.96-1.96-1.8-3.23-1.82-1.53.04-3.17.9-3.95 2.37-.98 1.8-1.07 4.91.48 7.42 1.02 1.69 2.18 3.51 3.73 3.51 1.55 0 2.1-1.03 3.82-1.03s2.21 1.09 3.8 1.09c1.61 0 2.68-1.85 3.7-3.53 1.25-2.03 1.3-4.88.22-6.5-.85-1.31-2.11-2.19-3.4-2.21z"/>
  </svg>
);

const MicrosoftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path fill="#F25022" d="M0 0h7.5v7.5H0z"/>
    <path fill="#7FBA00" d="M8.5 0H16v7.5H8.5z"/>
    <path fill="#00A4EF" d="M0 8.5h7.5V16H0z"/>
    <path fill="#FFB900" d="M8.5 8.5H16V16H8.5z"/>
  </svg>
);

const styles = {
  card: {
    width: "440px",
    maxWidth: "95%",
    margin: "0 auto",
    background: "var(--white)",
    borderRadius: "var(--radius)",
    boxShadow: "var(--shadow-soft)",
    padding: "42px 36px",
    fontFamily: "'Poppins','Segoe UI',Roboto,Arial,sans-serif",
    position: "relative",
  },
  title: {
    fontSize: "1.75rem",
    fontWeight: 700,
    color: "var(--brand-blue-dark)",
    margin: "6px 0 22px",
  },
  inputGroup: { marginBottom: "16px" },
  inputLabel: {
    display: "block",
    fontSize: "0.85rem",
    color: "var(--text-secondary)",
    marginBottom: "6px",
    fontWeight: 600,
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid var(--surface-dark)",
    outline: "none",
    fontSize: "0.95rem",
    color: "var(--text-primary)",
    background: "var(--white)",
    boxSizing: "border-box",
  },
  passwordWrapper: { position: "relative" },
  toggleBtn: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    color: "var(--text-secondary)",
    padding: "6px",
    fontSize: "0.8rem",
    fontWeight: 600,
  },
  primaryBtn: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "10px",
    border: "none",
    background: "var(--brand-orange)",
    color: "var(--white)",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: "0.95rem",
    marginTop: "10px",
    boxShadow: "0 6px 18px rgba(245, 124, 0, 0.25)",
    transition: "all 0.2s ease",
    textTransform: "uppercase",
  },
  orRow: { display: "flex", alignItems: "center", margin: "22px 0", color: "var(--text-secondary)", fontSize: "0.85rem" },
  orLine: { height: "1px", background: "var(--surface-dark)", flex: 1 },
  socialRow: { display: "flex", gap: "12px", justifyContent: "center" },
  socialBtn: {
    width: "44px",
    height: "44px",
    borderRadius: "10px",
    border: "1px solid var(--surface-dark)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    background: "var(--white)",
  },
  link: {
    color: "var(--brand-orange)",
    textDecoration: "none",
    fontWeight: 600,
    cursor: "pointer",
  },
};
function SignInForm({ onSwitch, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/signin",
        { login: email, password },
        { withCredentials: true } // allows CORS cookies if backend supports it
      );

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));

      toast.success("Signed in successfully 🎉");
      setTimeout(() => {
        onClose?.();
        navigate("/register");
      }, 1500);

    } catch (err) {
      const msg = err.response?.data?.message || "Sign in failed";
      setError(msg);
      toast.error(msg + " ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.card}>
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "12px",
          right: "16px",
          background: "none",
          border: "none",
          fontSize: "28px",
          fontWeight: "bold",
          color: "var(--text-secondary)",
          cursor: "pointer",
          lineHeight: "1",
        }}
      >
        &times;
      </button>

      <h2 style={styles.title}>Sign In</h2>

      <form onSubmit={handleSubmit}>
        <div style={styles.inputGroup}>
          <label style={styles.inputLabel} htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            placeholder="Email address"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.inputLabel} htmlFor="password">Password</label>
          <div style={styles.passwordWrapper}>
            <input
              id="password"
              type={showPwd ? "text" : "password"}
              placeholder="Password"
              style={{ ...styles.input, paddingRight: "55px" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              style={styles.toggleBtn}
              onClick={() => setShowPwd((s) => !s)}
            >
              {showPwd ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {error && <p style={{ color: "red", fontSize: "0.9rem", marginTop: "6px" }}>{error}</p>}

        <button type="submit" style={styles.primaryBtn} disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <div style={styles.orRow}>
        <span style={styles.orLine} />
        <span style={{ margin: "0 12px" }}>or sign in with</span>
        <span style={styles.orLine} />
      </div>

      <div style={styles.socialRow}>
        <button style={styles.socialBtn} aria-label="Sign in with Google"><GoogleIcon /></button>
        <button style={styles.socialBtn} aria-label="Sign in with Apple"><AppleIcon /></button>
        <button style={styles.socialBtn} aria-label="Sign in with Microsoft"><MicrosoftIcon /></button>
      </div>

      <p style={{ textAlign: "center", marginTop: "16px", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
        Don’t have an account?{" "}
        <button onClick={onSwitch} style={{ ...styles.link, background: "none", border: "none", padding: 0 }}>
          Create one
        </button>
      </p>

      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </div>
  );
}

export default function SignIn({ onSwitch, onClose }) {
  return <SignInForm onSwitch={onSwitch} onClose={onClose} />;
}