import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  // Get initials from name
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container" style={{ position: "relative" }}>
      <img src="/image.png" style={{ width: "50px" }} alt="Logo" />
      <div className="menus">
        <ul>
          <li>
            <Link style={{ textDecoration: "none" }} to="/" onClick={() => handleMenuClick(0)}>
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>Dashboard</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} onClick={() => handleMenuClick(1)} to="/orders">
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>Orders</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} onClick={() => handleMenuClick(2)} to="/holdings">
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>Holdings</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} onClick={() => handleMenuClick(3)} to="/positions">
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>Positions</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} onClick={() => handleMenuClick(4)} to="/funds">
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>Funds</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} onClick={() => handleMenuClick(5)} to="/apps">
              <p className={selectedMenu === 5 ? activeMenuClass : menuClass}>Apps</p>
            </Link>
          </li>
        </ul>
        <hr />
        <div className="profile" onClick={handleProfileClick} style={{ position: "relative" }}>
          <div className="avatar">{getInitials(user?.name)}</div>
          <p className="username">{user?.name?.split(" ")[0] || "User"}</p>

          {/* Profile Dropdown */}
          {profileDropdownOpen && (
            <div className="profile-dropdown" onClick={(e) => e.stopPropagation()}>
              <div className="dropdown-header">
                <p className="dropdown-name">{user?.name}</p>
                <p className="dropdown-email">{user?.email}</p>
              </div>
              <hr className="dropdown-divider" />
              <button className="dropdown-logout-btn" onClick={logout} id="logout-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
