import React from "react";
import Navbar from "../Navbar";
import Hero from "./Hero";
import Awards from "./Awards";
import Stats from "./Stats";
import Pricing from "./Pricing";
import Education from "./Education";
import OpenAccount from "../OpenAccount";
import Footer from "../Footer";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Pricing />

      <Stats />
      <Awards />
      <Education />
      <OpenAccount />
      <Footer />
    </>
  );
}

export default HomePage;
