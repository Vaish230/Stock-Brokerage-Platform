import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./landingPage/home/HomePage.jsx";
import SignUp from "./landingPage/signup/Signup.jsx";
import Login from "./landingPage/login/Login.jsx";
import AboutPage from "./landingPage/about/AboutPage.jsx";
import ProductPage from "./landingPage/products/ProductPage.jsx";
import SupportPage from "./landingPage/support/SupportPage.jsx";
import PricingPage from "./landingPage/pricing/PricingPage.jsx";
import Notfound from "./landingPage/Notfound.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
