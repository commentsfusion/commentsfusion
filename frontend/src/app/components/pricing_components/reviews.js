'use client';
import React from 'react';
import Image from 'next/image';

const ReviewsSection = () => {
  return (
    <section className="py-40 px-4 relative">
      <div className="max-w-4xl mx-auto relative" style={{ height: 480 }}>
        {/* Triangle SVG or Image */}
        <Image
          src="/images/pricing/Polygon.png"
          alt="Triangle"
          fill
          style={{ objectFit: 'contain', zIndex: 1 }}
          className="pointer-events-none select-none"
        />
        {/* Top Badge (Product Hunt) */}
        <div
          className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
          style={{ top: -30, zIndex: 2 }}
        >
          <Image src="/images/pricing/1.png" alt="Product Hunt" width={160} height={160} />
        </div>
        {/* Bottom Left Badge (Chrome) */}
        <div
          className="absolute flex flex-col items-center"
          style={{ left: 140, bottom: -10, zIndex: 2 }}
        >
          <Image src="/images/pricing/2.png" alt="Chrome" width={160} height={160} />
        </div>
        {/* Bottom Right Badge (Other) */}
        <div
          className="absolute flex flex-col items-center"
          style={{ right: 140, bottom:-10, zIndex: 2 }}
        >
          <Image src="/images/pricing/3.png" alt="Other" width={160} height={160} />
        </div>
        {/* Centered Reviews Text */}
        <div className="absolute left-1/2 top-80 -translate-x-1/2 -translate-y-1/2 z-10">
          <h2 className="text-white text-4xl font-bold text-center drop-shadow-lg">Reviews</h2>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;