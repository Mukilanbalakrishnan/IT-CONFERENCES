import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";

const BackArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 12H5M12 19l-7-7 7-7"/>
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
    textAlign: "center",
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
  secondaryBtn: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1px solid var(--surface-dark)",
    background: "transparent",
    color: "var(--text-primary)",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: "0.95rem",
    marginTop: "10px",
    transition: "all 0.2s ease",
  },
  backButton: {
    position: "absolute",
    top: "16px",
    left: "20px",
    background: "none",
    border: "none",
    fontSize: "24px",
    color: "var(--text-secondary)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "4px",
    borderRadius: "6px",
    transition: "all 0.2s ease",
  },
  stepIndicator: {
    textAlign: "center",
    fontSize: "0.9rem",
    color: "var(--text-secondary)",
    marginBottom: "20px",
  },
  link: {
    color: "var(--brand-orange)",
    textDecoration: "none",
    fontWeight: 600,
    cursor: "pointer",
  },
};

function SignInForm({ onSwitch, onClose, onLoginSuccess }) {
  const [mode, setMode] = useState("signin"); // "signin", "forgot-request", "forgot-reset"
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Reset all states when switching modes
  const resetFormStates = () => {
    setUsername("");
    setPassword("");
    setEmail("");
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
    setShowPwd(false);
    setShowNewPwd(false);
    setShowConfirmPwd(false);
    setError("");
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post(
        "https://it-con-backend.onrender.com/api/users/signin",
        { username, password },
        { withCredentials: true }
      );

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      onLoginSuccess(data);

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

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      await axios.post("https://it-con-backend.onrender.com/api/users/forgot-password", { email });
      toast.success("OTP sent to your email");
      setMode("forgot-reset");
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to send OTP";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    try {
      await axios.post("https://it-con-backend.onrender.com/api/users/reset-password", {
        email,
        otp,
        newPassword
      });
      
      toast.success("Password reset successfully");
      // Reset and go back to sign in
      resetFormStates();
      setMode("signin");
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to reset password";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToSignIn = () => {
    resetFormStates();
    setMode("signin");
  };

  const handleForgotPassword = () => {
    resetFormStates();
    setMode("forgot-request");
  };

  const getTitle = () => {
    switch (mode) {
      case "forgot-request":
        return "Reset Password";
      case "forgot-reset":
        return "Set New Password";
      default:
        return "Sign In";
    }
  };

  const getStepIndicator = () => {
    switch (mode) {
      case "forgot-request":
        return "Step 1 of 2 - Enter your email to receive OTP";
      case "forgot-reset":
        return "Step 2 of 2 - Enter OTP and new password";
      default:
        return null;
    }
  };

  return (
    <div style={styles.card}>
      {/* Close Button */}
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

      {/* Back Button - Show when not in signin mode */}
      {(mode === "forgot-request" || mode === "forgot-reset") && (
        <button
          onClick={handleBackToSignIn}
          style={styles.backButton}
          title="Back to Sign In"
        >
          <BackArrowIcon />
        </button>
      )}

      <h2 style={styles.title}>{getTitle()}</h2>
      
      {getStepIndicator() && (
        <div style={styles.stepIndicator}>{getStepIndicator()}</div>
      )}

      {/* Sign In Form */}
      {mode === "signin" && (
        <form onSubmit={handleSignIn}>
          <div style={styles.inputGroup}>
            <label style={styles.inputLabel} htmlFor="username">Email or Mobile number</label>
            <input
              id="username"
              type="text"
              placeholder="Email or Mobile number"
              style={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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

          <div style={{ textAlign: "center", margin: "16px 0" }}>
            <span 
              style={styles.link} 
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </span>
          </div>

          <p style={{ marginTop: "22px", textAlign: "center", fontSize: "0.85rem" }}>
            Don't have an account?{" "}
            <span style={styles.link} onClick={onSwitch}>
              Sign Up
            </span>
          </p>
        </form>
      )}

      {/* Forgot Password - Request OTP */}
      {mode === "forgot-request" && (
        <form onSubmit={handleRequestOtp}>
          <div style={styles.inputGroup}>
            <label style={styles.inputLabel} htmlFor="forgot-email">
              Email Address
            </label>
            <input
              id="forgot-email"
              type="email"
              placeholder="Enter your email"
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" style={styles.primaryBtn} disabled={loading}>
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
      )}

      {/* Forgot Password - Reset */}
      {mode === "forgot-reset" && (
        <form onSubmit={handleResetPassword}>
          <div style={styles.inputGroup}>
            <label style={styles.inputLabel} htmlFor="otp">
              OTP Code
            </label>
            <input
              id="otp"
              type="text"
              placeholder="Enter 6-digit OTP"
              style={styles.input}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.inputLabel} htmlFor="new-password">
              New Password
            </label>
            <div style={styles.passwordWrapper}>
              <input
                id="new-password"
                type={showNewPwd ? "text" : "password"}
                placeholder="Enter new password"
                style={{ ...styles.input, paddingRight: "55px" }}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <button
                type="button"
                style={styles.toggleBtn}
                onClick={() => setShowNewPwd((s) => !s)}
              >
                {showNewPwd ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.inputLabel} htmlFor="confirm-password">
              Confirm New Password
            </label>
            <div style={styles.passwordWrapper}>
              <input
                id="confirm-password"
                type={showConfirmPwd ? "text" : "password"}
                placeholder="Confirm new password"
                style={{ ...styles.input, paddingRight: "55px" }}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                style={styles.toggleBtn}
                onClick={() => setShowConfirmPwd((s) => !s)}
              >
                {showConfirmPwd ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button type="submit" style={styles.primaryBtn} disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      )}

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default SignInForm;