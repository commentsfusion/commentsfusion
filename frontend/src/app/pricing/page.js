import React from "react";
import Header from "../components/pricing_components/Header";
import PricingToggle from "../components/pricing_components/PricingToggle";
import PricingSection from "../components/pricing_components/PricingSection";
import Navbar from "../components/landingPage_components/Navbar";
import Footer from "../components/landingPage_components/Footer";

const PricingPage = () => {
  return (
    <div className="bg-black min-h-screen px-4 py-10">
      <Navbar />
      <Header />
      <div className="flex justify-center">
        <PricingToggle />
      </div>
      <PricingSection />
      <Footer/>
    </div>
  );
};

export default PricingPage;
