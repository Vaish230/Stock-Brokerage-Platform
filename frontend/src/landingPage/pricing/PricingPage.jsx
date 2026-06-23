import React from "react";
import Hero from "./Hero";
import OpenAccount from "../OpenAccount";
import Brokerage from "./Brokerage";
import Footer from "../Footer";
import Navbar from "../Navbar";
function PricingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <OpenAccount />
      <Brokerage />
      <Footer />
    </>
  );
}

export default PricingPage;
