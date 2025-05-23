import React from "react";
import Header from "../components/pricing_components/Header";
import PricingToggle from "../components/pricing_components/PricingToggle";
import PricingSection from "../components/pricing_components/PricingSection";
import Navbar from "../components/landingPage_components/Navbar";
import Footer from "../components/landingPage_components/Footer";
import ReviewsSection from "../components/pricing_components/reviews";
import IncludedSection from "../components/pricing_components/included";
import StrategicCommentingSection from "../components/pricing_components/StrategicProspectsSection";
import SocialInsightsSection from "../components/pricing_components/social_linkedin_supportSection";
import FaqSection from "../components/pricing_components/FAQSection";
const PricingPage = () => {
  return (
    
    <div className="bg-black min-h-screen px-4 py-10 bg-[linear-gradient(to_bottom,#000000,#33C6F4)] bg-fixed">
      <Navbar />
      <Header />
      <div className="flex justify-center">
        <PricingToggle />
      </div>
      <PricingSection />
      <ReviewsSection />
      <IncludedSection />
      <StrategicCommentingSection/>
      <SocialInsightsSection/>
      <FaqSection />
      {/* Add any additional sections here */}
      <Footer/>

    </div>
  );
};

export default PricingPage;
