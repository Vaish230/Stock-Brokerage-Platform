import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg p-3"
        style={{
          backgroundColor: "#fff",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.08)",
        }}
      >
        <div className="container-fluid mx-5">
          <Link className="navbar-brand mx-5" to="/">
            <img src="/pics/logo.svg" alt="Logo" width="30%" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse d-flex justify-content-end"
            id="navbarNavDropdown"
          >
            <ul className="navbar-nav align-items-center">
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mx-4" to="/products">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/pricing">
                  Pricing
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mx-4" to="/support">
                  Support
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/login"
                  style={{ fontWeight: 500, color: "#374151" }}
                >
                  Login
                </Link>
              </li>
              <li className="nav-item ms-2">
                <Link
                  to="/signup"
                  style={{
                    padding: "8px 20px",
                    background: "#f56834",
                    color: "#fff",
                    borderRadius: "6px",
                    textDecoration: "none",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    transition: "background 0.2s",
                  }}
                  onMouseOver={(e) => (e.target.style.background = "#d4501c")}
                  onMouseOut={(e) => (e.target.style.background = "#f56834")}
                >
                  Open Account
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
