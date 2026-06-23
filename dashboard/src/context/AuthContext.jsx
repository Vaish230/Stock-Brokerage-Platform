import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get("token");
    const urlUser = urlParams.get("user");

    if (urlToken && urlUser) {
      localStorage.setItem("token", urlToken);
      localStorage.setItem("user", urlUser);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      try {
        // Basic JWT expiry check (decode payload without verifying)
        const payload = JSON.parse(atob(storedToken.split(".")[1]));
        if (payload.exp * 1000 < Date.now()) {
          // Token expired — clear and redirect
          logout();
        } else {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch {
        logout();
      }
    } else {
      // No token — redirect to login
      window.location.href = "http://localhost:5173/login";
    }
    setIsLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    window.location.href = "http://localhost:5173/";
  };

  const getAuthHeader = () => ({
    Authorization: `Bearer ${token}`,
  });

  return (
    <AuthContext.Provider value={{ user, token, logout, getAuthHeader, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return context;
};

export default AuthContext;
