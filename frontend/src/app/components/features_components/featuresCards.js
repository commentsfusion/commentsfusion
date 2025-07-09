'use client'
import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";


function FeaturesCards() {
 const { ref, inView } = useInView({
    triggerOnce: false, 
    threshold: 0.5,     
  });

  const discoveryData = [
    {
      price: 26030,
      title: "Impressions",
    },
    {
      price: 20000,
      title: "Members reached",
    },
  ];
  const engagementData = [
    {
      reacts: "Reactions",
      numbers: 70,
    },
    {
      reacts: "Comments",
      numbers: 50,
    },
    {
      reacts: "Reposts",
      numbers: 2,
    },
  ];

  return (
    <>
    
      <div className="flex flex-col justify-center items-center  mt-18 ">
        <div className="w-[92%] max-lg:w-[93%] max-md:w-[94%]   flex  border border-2-white bg-black rounded-[10px]">
          <div className="w-[47%]  max-lg:w-[54%] my-8 mx-8 max-lg:my-5 max-lg:mx-5 max-md:my-3 max-md:mx-3">
            <h1 className="text-[23px] font-bold  max-lg:text-[18px] max-md:text-[16px]">
              Strategic Comments That Keep You in the Spotlight
            </h1>
            <p className="text-[15px]  mt-4 max-lg:text-[12px] max-lg:mt-[1%] max-md:text-[10.5px]">
              Boost the visibility and lifespan of your LinkedIn posts with our
              time-tested, staggered engagement strategy:
            </p>
            <ul className="relative text-[13px] mt-5 before:content-['•'] before:absolute before:left-[-1px] before:top-[-9px] before:text-[24px] pl-3 max-lg:text-[11.5px] max-lg:mt-[2%] max-md:text-[10px] ">
              Day 1: 13 comments to generate buzz and drive early traction
            </ul>
            <ul className="relative text-[13px] mt-5 before:content-['•'] before:absolute before:left-[-1px] before:top-[-9px] before:text-[24px] pl-3 max-lg:text-[11.5px] max-lg:mt-[2%] max-md:text-[10px]">
              Day 3: 1 comment to keep your post active and circulating
            </ul>
            <ul className="relative text-[13px] mt-5 before:content-['•'] before:absolute before:left-[-1px] before:top-[-9px] before:text-[24px] pl-3 max-lg:text-[11.5px] max-lg:mt-[2%] max-md:text-[10px]">
              Day 5: 1 final comment to extend reach and maintain relevance.
            </ul>
            <p className="text-[15px]  mt-4 max-lg:text-[12px]  max-lg:mt-[2%] max-md:text-[10.5px]">
              And here’s the bonus when they engage with your content, their
              network sees it too, expanding your reach and opening the door to
              even more meaningful connections.
            </p>
          </div>

          <div className="w-[50%]   border-2 my-8 mx-8 flex justify-center  relative bg-white rounded-2xl max-lg:my-6 max-lg:mx-6 max-md:my-4.5 max-md:mx-4.5 max-md:items-center">
            <h1 className="absolute left-[-65]  top-36 max-lg:top-[42%] max-lg:left-[-45]  rotate-[-90deg] font-bold text-3xl text-black max-lg:text-xl max-md:text-[18px]">
              Number of Views
            </h1>
            <img
              src="/images/features/strategicComments.gif"
              className="h-[320px] ml-8 w-[330px] max-md:mt-[1%]   max-lg:h-[250px] max-lg:w-[270px] max-md:h-[215px] max-md:w-[230px] rounded-2xl"
              
            />
          </div>
        </div>















        <div className="w-[92%] max-lg:w-[93%] max-md:w-[94%]    flex  border border-2-white bg-black mt-14 rounded-[10px]">
          <div className="w-[47%]  my-8 mx-8 max-lg:my-5 max-lg:mx-5">
            <h1 className="text-[23px] font-bold max-lg:text-[18px] max-md:text-[14px]">
              Community-Driven Engagement for Maximum Reach
            </h1>
            <p className="text-[15px] max-lg:text-[12px]  max-md:text-[10.5px]  mt-8 max-lg:mt-5">
              Stand out and get noticed by the right people with 15 thoughtful
              comments from real business owners and professionals. Our platform
              connects your posts with a rotating group of community members,
              keeping every interaction organic and authentic.
            </p>
            <p className="text-[15px] max-lg:text-[12px]  max-md:text-[10.5px]  mt-8 max-lg:mt-5">
              And here’s the bonus when they engage with your content, their
              network sees it too, expanding your reach and opening the door to
              even more meaningful connections.
            </p>
          </div>

          <div className="w-[50%] border-2 my-8 mx-8  bg-white rounded-2xl max-lg:my-6 max-lg:mx-6 flex justify-center flex-col items-center ">
            <div className="m-4 rounded-2xl w-[93%]   flex flex-col  border-2 border-blue-500  px-3 py-2 max-lg:py-1.5 max-lg:px-2.5 max-md:py-1 max-md:px-2 max-lg:m-2 max-lg:mt-3.5  ">
              <div className="flex ">
                <h1 className="text-[16px] text-black font-bold max-lg:text-[14px] max-md:text-[13px]">Discovery</h1>
                <img
                  className="w-3 h-3 ml-1 mt-[6px] max-lg:mt-[5px]"
                  src="/images/features/qustionMark.svg"
                />
              </div>

              <div className="flex mt-4 max-lg:mt-1 max-md:mt-0 ">
                {discoveryData.map((item, index) => (
                  <div key={index} className={index === 1 ? "ml-[45%] max-md:ml-[30%]" : ""}>
                    <h1 className="text-[15px]  max-lg:text-[14px] text-black font-semibold max-md:text-[12px]">
                      <div ref={ref}>
                       {inView && (
        <CountUp start={0} end={item.price} duration={3} />
      )}
      </div>
                      
                    </h1>
                    <h1 className="text-[12px] max-lg:text-[11px] max-md:text-[10px] text-black font-medium mt-[-6px]">
                      {item.title}
                    </h1>
                  </div>
                ))}
              </div>
            </div>
            <div className="m-4 rounded-2xl w-[93%] flex flex-col  border-2 border-blue-500 max-lg:m-3 max-lg:mt-1 max-md:mt-0 max-lg:mb-3.5 ">
              <div className="flex px-2.5 pt-3 max-lg:pt-1">
                <h1 className="text-[16px] text-black font-bold max-lg:text-[14px] max-md:text-[13px]">
                  Engagement
                </h1>
                <img
                  className="w-3 h-3 ml-1 mt-[6px] max-lg:mt-[4px]  "
                  src="/images/features/qustionMark.svg"
                />
              </div>
              {engagementData.map((item, index) => (
                <div key={index}>
                  <div className="mt-3 max-md:mt-2 flex justify-between ">
                    <p className="text-black font-medium text-[13px] px-2.5 max-lg:text-[11px] ">
                      {item.reacts}
                    </p>
                    <div className={`flex gap-5 px-2.5 py-1 max-lg:py-0 ${index === 2 ? "mb-1" : ""}`}>
                      <p className="text-black text-[13px] max-lg:text-[11px]">{item.numbers}</p>
                      <img
                        src="images/features/rightArrow.svg"
                        className="w-3.5 h-3.5 mt-[2px] max-md:h-3 max-md:w-3"
                      ></img>
                    </div>
                  </div>
                  <hr
                    className={`border border-blue-500 w-[100%] mt-1  ${
                      index === 2 ? "hidden   " : ""
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FeaturesCards;
