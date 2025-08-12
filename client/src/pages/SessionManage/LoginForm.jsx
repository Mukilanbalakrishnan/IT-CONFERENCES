import React, { useState } from "react";
import "./LoginForm.css"; // Reuse your existing styles

export default function AuthForm() {
  const [activeTab, setActiveTab] = useState("signin");
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    username: "",
    email: "",
    mobile: "",
    dob: "",
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Password validation logic has been removed.
    setIsLoading(true);
    console.log("Signup data:", signupForm);
    // Simulate an API call
    setTimeout(() => setIsLoading(false), 1500);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Login data:", loginForm);
    // Simulate an API call
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Tab Header */}
        <div className="tab-header">
          <button
            className={`tab-btn ${activeTab === "signin" ? "active" : ""}`}
            onClick={() => setActiveTab("signin")}
          >
            Sign In
          </button>
          <button
            className={`tab-btn ${activeTab === "signup" ? "active" : ""}`}
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </button>
        </div>

        {/* Sign In Form */}
        {activeTab === "signin" && (
          <form onSubmit={handleLoginSubmit} className="auth-form fade-in">
            <h2 className="auth-title">Welcome Back</h2>
            <p className="auth-subtitle">Sign in to continue</p>

            <div className="input-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={loginForm.username}
                onChange={handleLoginChange}
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={loginForm.password}
                onChange={handleLoginChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="form-options">
              <label className="checkbox-container">
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" className="forgot-link">Forgot password?</a>
            </div>

            <button type="submit" className="auth-button" disabled={isLoading}>
              {isLoading ? <span className="spinner"></span> : "Sign In"}
            </button>
          </form>
        )}

        {/* Sign Up Form */}
        {activeTab === "signup" && (
          <form onSubmit={handleSignupSubmit} className="auth-form fade-in" noValidate>
            <h2 className="auth-title">Create Account</h2>
            <p className="auth-subtitle">Join us today</p>

            <div className="input-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={signupForm.username}
                onChange={handleSignupChange}
                placeholder="Choose a username"
                required
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={signupForm.email}
                onChange={handleSignupChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="input-group">
              <label>Mobile Number</label>
              <input
                type="tel"
                name="mobile"
                value={signupForm.mobile}
                onChange={handleSignupChange}
                placeholder="Enter your mobile number"
                pattern="[0-9]{10}"
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={signupForm.password}
                onChange={handleSignupChange}
                placeholder="Create a password"
                required
              />
            </div>

            <div className="input-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={signupForm.confirmPassword}
                onChange={handleSignupChange}
                placeholder="Confirm your password"
                required
              />
            </div>

            <div className="form-agreement">
              <input type="checkbox" required />
              <label>
                I agree to the <a href="#">Terms & Conditions</a>
              </label>
            </div>

            <button type="submit" className="auth-button" disabled={isLoading}>
              {isLoading ? <span className="spinner"></span> : "Sign Up"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
