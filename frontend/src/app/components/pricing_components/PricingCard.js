


import React from "react";
import { loadStripe } from "@stripe/stripe-js";

const PricingCard = ({ 
  title, 
  price, 
  features, 
  highlight, 
  cardClass = "", 
  titleClass = "", 
  priceClass = "", 
  periodClass = "", 
  featureClass = "", 
  bulletClass = "", 
  buttonClass = "", 
  ctaTextClass = "", 
  noteClass = "", 
  isYearly = false, 
  planId
}) => {


  const handleCheckout = async () => {
    const isLoggedIn = localStorage.getItem("authToken");  

  if (!isLoggedIn) {
    console.error("User not logged in. Redirecting to login page.");
    window.location.href = "/signup-login";
    return;
  }

  console.log("Button clicked!");

  const stripe = await loadStripe('pk_test_51RivJZQ3k9KkZTyxpJNvf6oNmnMfIjfxsTfX57CiyAocSq2fuZnAGTiZQqAjhzEd7mjtlE31uIsAkxtSMRASQvvZ004THiK5vx');   



   let priceInCents = parseFloat(price.replace('$', '').trim()) * 100; 

  if (isNaN(priceInCents)) {
    console.error("Invalid price format:", price);
    return;
  }


  priceInCents = Math.round(priceInCents); 

  console.log("Amount (in cents):", priceInCents);
  

  console.log("Amount:", priceInCents);
  console.log("Plan ID:", planId);

  // Send the request to create a payment intent
  const response = await fetch('http://localhost:5000/api/payment/create-payment-intent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: priceInCents, 
      planId,  
    }),
  });

  const data = await response.json();
  console.log("Received data:", data);

  const { sessionId } = data;  
  console.log("Received sessionId:", sessionId);


  if (!data.sessionId) {
    console.error('Error: sessionId is not defined!');
    return;
  }


  const { error } = await stripe.redirectToCheckout({
    sessionId: sessionId,  
  });

  if (error) {
    console.error('Error during checkout:', error.message);
  }
};



  return (
    <div className={`flex flex-col p-8 rounded-3xl border-2 ${highlight ? 'border-sky-400 bg-[#33C6F4] z-20 shadow-xl transform -translate-y-10' : 'border-sky-500 bg-black'} relative space-y-10 transition-all duration-300 h-full w-full max-w-xs md:max-w-sm lg:max-w-md mx-auto min-h-[650px] ${cardClass}`}>
      {/* Title Section */}
      <div className="mb-4">
        <h2 className={`text-3xl font-bold mb-2 tracking-wide ${title.toLowerCase() === 'premium' ? 'text-white' : 'text-[#33C6F4]'}`}>
          {title.toUpperCase()}
        </h2>
        <div className="flex items-baseline gap-2">
          <span className={`text-4xl font-bold ${title.toLowerCase() === 'premium' ? 'text-white' : 'text-[#33C6F4]'}`}>
            {price}
          </span>
          <span className={`text-4xl font-bold ${title.toLowerCase() === 'premium' ? 'text-white' : 'text-[#33C6F4]'}`}>/</span>
          {isYearly ? (
            <span className={`text-lg font-bold ${title.toLowerCase() === 'premium' ? 'text-white' : 'text-[#33C6F4]'}`}>yearly</span>
          ) : (
            <span className={`text-lg font-bold ${title.toLowerCase() === 'premium' ? 'text-white' : 'text-[#33C6F4]'}`}>monthly</span>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="space-y-2">
        <button
          className={`w-full py-4 rounded-full text-lg font-bold flex items-center justify-center gap-2 transition-colors h-[48px] ${title.toLowerCase() === 'premium' ? 'bg-[#232728] text-white' : 'bg-sky-400 text-white'} ${buttonClass}`}
          onClick={handleCheckout}
        >
          <span className={ctaTextClass}>Start for free</span>
          <span className="text-xl">→</span>
        </button>
        {title !== 'AGENCY' && (
          <p className={`text-sm text-center ${noteClass}`}>
            No credit card required
          </p>
        )}
      </div>

      {/* Features List */}
      <ul className={`space-y-4 ${title.toLowerCase() === 'premium' ? 'text-black' : 'text-white'}`}>
        {features.map((feature, idx) => (
          <li key={idx} className={`flex items-start text-lg ${featureClass}`}>
            <span className={`mr-3 mt-1 ${bulletClass}`}>•</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PricingCard;