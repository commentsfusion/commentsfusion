import Image from 'next/image'
import img1 from "../../assets/landingPageImages/img_1.png"
import img2 from "../../assets/landingPageImages/img_2.png"
import img3 from "../../assets/landingPageImages/img_3.png"
import img4 from "../../assets/landingPageImages/img_4.png"
import img5 from "../../assets/landingPageImages/img_5.png"
import img6 from "../../assets/landingPageImages/img_6.png"
import img7 from "../../assets/landingPageImages/img_7.png"
import { useEffect, useState } from 'react'

export default function LandingPageImages() {
  // Track viewport width for responsive adjustments
  const [viewportWidth, setViewportWidth] = useState(0)
  
  useEffect(() => {
    // Set initial viewport width
    setViewportWidth(window.innerWidth)
    
    // Update viewport width on resize
    const handleResize = () => {
      setViewportWidth(window.innerWidth)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  // Get the path definition based on screen size
  const getPathDefinition = () => {
    // Path for desktop and larger screens
    if (viewportWidth >= 768) {
      return `M180 120 
              L400 120
              C500 120, 580 120, 580 120
              C700 120, 780 160, 780 280 
              C780 400, 700 480, 580 480
              C580 480, 220 480, 220 480
              C100 480, 20 560, 20 680
              C20 800, 100 880, 220 880
              C220 880, 580 880, 580 880
              C700 880, 780 960, 780 1080
              C780 1200, 700 1280, 400 1280`;
    }
    
    // Path for mobile devices - exactly matching the screenshot
    return `M100 120 
            L400 120
            C520 120, 600 120, 600 120
            C700 120, 760 160, 760 280 
            C760 380, 700 480, 580 480
            C580 480, 100 480, 100 480
            C30 480, 10 580, 60 650
            C110 720, 200 750, 220 760
            C240 770, 280 780, 320 780
            C360 780, 420 780, 520 780
            C620 780, 660 820, 660 880
            C660 940, 620 980, 520 980
            C420 980, 400 1050, 400 1100
            C400 1150, 400 1320, 400 1320`;
  }
  
  // Get stroke width based on screen size
  const getStrokeWidth = () => {
    if (viewportWidth < 640) return "6"; 
    if (viewportWidth < 768) return "8";
    return "16";
  }
  
  return (
    <div className="p-4 sm:p-6 md:p-8 relative w-full max-w-6xl mx-auto">
      {/* Main container */}
      <div className="relative h-full">
        {/* SVG Path overlay with responsive adjustments */}
        <svg className="absolute inset-0 w-full h-full overflow-visible z-0" 
            viewBox={viewportWidth < 768 ? "0 0 800 1600" : "0 0 800 1400"}
            preserveAspectRatio="xMidYMid meet">
          <path 
            className="journey-path"
            d={getPathDefinition()}
            stroke="white" 
            strokeWidth={getStrokeWidth()}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        
        {/* Content with higher z-index */}
        <div className="relative z-10">
          {/* Row 1 */}
          <div className="flex justify-between mb-16 ml-12 sm:ml-14 sm:mb-24 md:mb-32">
            {/* Freelancers */}
            <div className="w-20 sm:w-28 md:w-40 text-center">
              <div className="mb-2 sm:mb-3 overflow-hidden">
                <Image 
                  src={img1} 
                  alt="Freelancers"
                  width={160}
                  height={110}
                  className="rounded-lg w-full h-auto"
                />
              </div>
              <p className="text-black font-bold text-xs sm:text-sm">Freelancers</p>
            </div>
            
            {/* Arrow in the middle */}
            <div className="flex items-center justify-center -mt-8 sm:-mt-12 md:-mt-16">
              <svg className="w-6 sm:w-8 md:w-10 h-4 sm:h-5 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 12">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 6h14M19 6l-4 -4M19 6l-4 4" />
              </svg>
            </div>
            
            {/* Spot the Right Lead */}
            <div className="w-20 sm:w-28 md:w-40 text-center">
              <div className="mb-2 sm:mb-3 overflow-hidden">
                <Image
                  src={img2} 
                  alt="Spot the Right Lead"
                  width={160}
                  height={110}
                  className="rounded-lg w-full h-auto"
                />
              </div>
              <p className="text-black font-bold text-xs sm:text-sm">Spot the Right Lead</p>
            </div>
          </div>
          
          {/* Row 2 */}
          <div className="flex justify-between mb-16 sm:mb-24 md:mb-32">
            {/* Value-Driven Comment */}
            <div className="w-20 sm:w-28 md:w-40 text-center">
              <div className="mb-2 sm:mb-3 overflow-hidden">
                <Image 
                  src={img3} 
                  alt="Drop a Value-Driven Comment"
                  width={160}
                  height={110}
                  className="rounded-lg w-full h-auto"
                />
              </div>
              <div className="text-black font-bold text-xs sm:text-sm">
                <p>Drop a Value-Driven Comment</p>
              </div>
            </div>
            
            {/* Arrow in the middle - Left pointing */}
            <div className="flex items-center justify-center -mt-8 sm:-mt-12 md:-mt-16">
              <svg className="w-6 mb-12 sm:w-8 md:w-10 h-4 sm:h-5 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 12">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 6H5M5 6l4 -4M5 6l4 4" />
              </svg>
            </div>
            
            {/* Get Noticed */}
            <div className="w-20 sm:w-28 md:w-40 text-center">
              <div className="mb-2 sm:mb-3 overflow-hidden">
                <Image 
                  src={img4}  
                  alt="Get Noticed"
                  width={160}
                  height={110}
                  className="rounded-lg w-full h-auto"
                />
              </div>
              <div className="text-black font-bold text-xs sm:text-sm">
                <p>Get Noticed + Build Trust</p>
              </div>
            </div>
          </div>
          
          {/* Row 3 */}
          <div className="flex justify-between mb-16 sm:mb-24 md:mb-32">
            {/* Profile Click */}
            <div className="w-20 sm:w-28 md:w-40 text-center">
              <div className="mb-2 sm:mb-3 overflow-hidden">
                <Image 
                  src={img5} 
                  alt="Profile Click"
                  width={160}
                  height={110}
                  className="rounded-lg w-full h-auto"
                />
              </div>
              <div className="text-black font-bold text-xs sm:text-sm">
                <p>Profile Click = Warm Interest</p>
              </div>
            </div>
            
            {/* Arrow in the middle */}
            <div className="flex items-center justify-center -mt-8 sm:-mt-12 md:-mt-16">
              <svg className="w-6 mb-12 sm:w-8 md:w-10 h-4 sm:h-5 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 12">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 6h14M19 6l-4 -4M19 6l-4 4" />
              </svg>
            </div>
        
            {/* They Engage */}
            <div className="w-20 sm:w-28 md:w-40 text-center">
              <div className="mb-2 sm:mb-3 overflow-hidden">
                <Image 
                  src={img6} 
                  alt="They Engage"
                  width={160}
                  height={110}
                  className="rounded-lg w-full h-auto"
                />
              </div>
              <div className="text-black font-bold text-xs sm:text-sm">
                <p>They Engage or DM You First</p>
              </div>
            </div>
          </div>
          
          {/* Final row - increased top margin for better path alignment */}
          <div className="flex justify-center mt-32 sm:mt-36 md:mt-40 ">
            {/* Close the Deal */}
            <div className="w-20 sm:w-28 md:w-40 text-center">
              <div className="mb-2 sm:mb-3 overflow-hidden">
                <Image 
                  src={img7} 
                  alt="Close the Deal"
                  width={160}
                  height={110}
                  className="rounded-lg w-full h-auto"
                />
              </div>
              <p className="-mt-8 text-black font-bold text-xs sm:text-sm ">You Close the Deal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}