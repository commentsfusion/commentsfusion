'use client';
import React from "react";

const AboutSection = () => {
  return (
    <section className="text-white py-16 px-3 md:py-37 md:px-20">
      <div className="max-w-4xl mx-auto text-center">
        {/* Headings */}
        <h2 className="text-4xl md:text-6xl font-bold mb-4 md:mb-8">About us</h2>
        <h3 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8">
          Storyline of <span className="text-sky-400 italic">Comments Fusion</span>
        </h3>
      </div>

      {/* Full-width Paragraph */}
      <div className="w-full px-0">
        <p className="text-base md:text-2xl leading-7 md:leading-11 text-center text-white w-full max-w-none">
          The journey of <span className="font-bold">Comments Fusion</span> began with a personal challenge. As a seasoned marketer and
          founder of a successful digital agency <span className="font-bold">Konquer Solutions Pvt.Ltd.</span>, <span className="font-bold">Murad Butt</span> found it increasingly difficult to engage meaningfully with prospects on <span className="font-bold">LinkedIn</span>. Despite having strong services and a credible profile, generating conversations that led to real business opportunities was both time consuming and ineffective through traditional methods like cold outreach or generic comments. <span className="font-bold">Murad</span> realized this wasn’t just his problem it was a widespread gap in the digital networking process. Business owners and professionals were struggling to turn passive online presence into active lead generation. Out of this frustration came inspiration.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
