import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const getPasswordStrength = (pass) => {
    if (!pass) return { level: 0, label: "", color: "" };
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    const map = [
      { level: 1, label: "Weak", color: "#ef4444" },
      { level: 2, label: "Fair", color: "#f59e0b" },
      { level: 3, label: "Good", color: "#3b82f6" },
      { level: 4, label: "Strong", color: "#22c55e" },
    ];
    return map[score - 1] || { level: 0, label: "", color: "" };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/auth/register", {
        name,
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.location.href = `http://localhost:5174/?token=${res.data.token}&user=${encodeURIComponent(JSON.stringify(res.data.user))}`;
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Left Branding Panel */}
      <div className="auth-brand-panel">
        <div className="brand-content">
          <div className="brand-logo">
            <img src="/pics/logo.svg" alt="Logo" className="brand-logo-img" />
          </div>
          <h1 className="brand-title">Start your investment journey today</h1>
          <p className="brand-subtitle">
            Open a free Demat & Trading account in minutes. Zero brokerage on
            equity delivery. Join crores of investors already on Zerodha.
          </p>
          <ul className="brand-features">
            <li>
              <span className="feature-check">✓</span>
              Free equity delivery trading
            </li>
            <li>
              <span className="feature-check">✓</span>
              ₹20 flat fee on F&O trades
            </li>
            <li>
              <span className="feature-check">✓</span>
              Advanced charting & analytics
            </li>
            <li>
              <span className="feature-check">✓</span>
              Real-time portfolio tracking
            </li>
          </ul>
          <div className="brand-decorations">
            <div className="deco-circle deco-1"></div>
            <div className="deco-circle deco-2"></div>
            <div className="deco-circle deco-3"></div>
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="auth-form-panel">
        <div className="auth-form-wrapper">
          <div className="auth-form-header">
            <h2 className="auth-form-title">Create your account</h2>
            <p className="auth-form-subtitle">
              Already have an account?{" "}
              <Link to="/login" className="auth-link">
                Sign in
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form" id="signup-form" noValidate>
            {error && (
              <div className="auth-error" role="alert">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="signup-name" className="form-label">Full Name</label>
              <input
                id="signup-name"
                type="text"
                name="name"
                className="form-input"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="signup-email" className="form-label">Email address</label>
              <input
                id="signup-email"
                type="email"
                name="email"
                className="form-input"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="signup-password" className="form-label">Password</label>
              <div className="input-with-icon">
                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="form-input"
                  placeholder="Min. 6 characters"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
              {/* Password strength bar */}
              {formData.password && (
                <div className="password-strength">
                  <div className="strength-bars">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="strength-bar"
                        style={{
                          background: i <= passwordStrength.level ? passwordStrength.color : "#e5e7eb",
                        }}
                      />
                    ))}
                  </div>
                  <span className="strength-label" style={{ color: passwordStrength.color }}>
                    {passwordStrength.label}
                  </span>
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="signup-confirm" className="form-label">Confirm Password</label>
              <div className="input-with-icon">
                <input
                  id="signup-confirm"
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  className={`form-input ${
                    formData.confirmPassword && formData.password !== formData.confirmPassword
                      ? "input-error"
                      : formData.confirmPassword && formData.password === formData.confirmPassword
                      ? "input-success"
                      : ""
                  }`}
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowConfirm(!showConfirm)}
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirm ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              id="signup-submit-btn"
              className={`auth-submit-btn ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? (
                <span className="btn-loader">
                  <span className="spinner"></span> Creating account...
                </span>
              ) : (
                "Create Free Account"
              )}
            </button>
          </form>

          <p className="auth-terms">
            By creating an account, you agree to our{" "}
            <a href="#" className="auth-link">Terms of Service</a> and{" "}
            <a href="#" className="auth-link">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
