import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.location.href = `http://localhost:5174/?token=${res.data.token}&user=${encodeURIComponent(JSON.stringify(res.data.user))}`;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
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
          <h1 className="brand-title">Welcome back to Zerodha</h1>
          <p className="brand-subtitle">
            India's most trusted stock broker. Millions of traders and investors
            trust us with their investments.
          </p>
          <div className="brand-stats">
            <div className="stat-item">
              <span className="stat-number">1Cr+</span>
              <span className="stat-label">Active Users</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">₹3000Cr+</span>
              <span className="stat-label">Daily Turnover</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">15+</span>
              <span className="stat-label">Years Experience</span>
            </div>
          </div>
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
            <h2 className="auth-form-title">Sign in to your account</h2>
            <p className="auth-form-subtitle">
              Don't have an account?{" "}
              <Link to="/signup" className="auth-link">
                Create one free
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form" id="login-form" noValidate>
            {error && (
              <div className="auth-error" role="alert">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="login-email" className="form-label">Email address</label>
              <input
                id="login-email"
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
              <div className="label-row">
                <label htmlFor="login-password" className="form-label">Password</label>
              </div>
              <div className="input-with-icon">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="form-input"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
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
            </div>

            <button
              type="submit"
              id="login-submit-btn"
              className={`auth-submit-btn ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? (
                <span className="btn-loader">
                  <span className="spinner"></span> Signing in...
                </span>
              ) : (
                "Sign in to Dashboard"
              )}
            </button>
          </form>

          <p className="auth-terms">
            By signing in, you agree to our{" "}
            <a href="#" className="auth-link">Terms of Service</a> and{" "}
            <a href="#" className="auth-link">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
