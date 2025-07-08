'use client';
import React from 'react';
import Image from 'next/image';

const ReviewsSection = () => {
  return (
    <section className="py-40 px-4 relative">
      <div className="max-w-4xl mx-auto relative h-[480px] max-lg:h-[410px] max-md:h-[350px]" >
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
          className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center top-[-30] z-2"
          // style={{ top: -30, zIndex: 2 }}
        >
          {/* <Image src="/images/pricing/1.png" alt="Product Hunt w-[160px] h-[160px] max-lg:w-[10px] max-lg:h-[10px]" width={160} height={160} /> */}
          <Image
  src="/images/pricing/1.png"
  alt="Product Hunt"
  width={160}
  height={160}
  className="w-[160px] h-[160px] max-lg:w-[130px] max-lg:h-[130px] max-md:w-[110px] max-md:h-[110px]"
/>

        </div>
        {/* Bottom Left Badge (Chrome) */}
        <div
          className="absolute flex flex-col items-center z-2 right-[65%] max-lg:right-[66%] max-md:right-[67%] bottom-[-20px]"
          // style={{ left: 140, bottom: -10, zIndex: 2 }}
        >
          <Image src="/images/pricing/2.png" alt="Chrome" width={160} height={160} className='max-lg:w-[130px] max-lg:h-[130px] max-md:w-[110px] max-md:h-[110px]'/>
        </div>
        {/* Bottom Right Badge (Other) */}
        <div
          className="absolute flex flex-col items-center z-2 left-[65%] max-lg:left-[66%] max-md:left-[67%] bottom-[-20px]"
          // style={{ right: 140, bottom:-10, zIndex: 2 }}
        >
          <Image src="/images/pricing/3.png" alt="Other" width={160} height={160} className='max-lg:w-[130px] max-lg:h-[130px] max-md:w-[110px] max-md:h-[110px]'/>
        </div>
        {/* Centered Reviews Text */}
        <div className="absolute left-1/2 top-80 max-lg:top-65 max-md:top-53 -translate-x-1/2 -translate-y-1/2 z-10">
          <h2 className="text-white text-4xl max-lg:text-3xl max-md:text-2xl font-bold text-center drop-shadow-lg">Reviews</h2>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;