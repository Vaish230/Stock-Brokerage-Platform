import React from "react";
import Hero from "./Hero";
import Team from "./Team";
import Navbar from "../Navbar";
import Footer from "../Footer";
function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Hero />
        <Team />
      </div>
      <Footer />
    </>
  );
}

export default AboutPage;
