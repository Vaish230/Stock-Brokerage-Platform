import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
function Notfound() {
  return (
    <>
      <Navbar />
      <div className="container p-5 text-center">
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <Link to="/">
          <button className="btn btn-primary">Go back to Home</button>
        </Link>
      </div>
      <Footer />
    </>
  );
}

export default Notfound;
