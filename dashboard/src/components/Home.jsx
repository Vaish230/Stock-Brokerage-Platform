import React from "react";
import { useAuth } from "../context/AuthContext";
import Dashboard from "./Dashboard";
import TopBar from "./Topbar";

const Home = () => {
  const { isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="auth-loading">
        <div className="auth-loading-spinner"></div>
      </div>
    );
  }

  if (!user) {
    // AuthContext is already redirecting — show nothing while redirect happens
    return null;
  }

  return (
    <>
      <TopBar />
      <Dashboard />
    </>
  );
};

export default Home;
