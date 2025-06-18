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
    
      <div className="flex flex-col justify-center items-center  mt-14 ">
        <div className="w-[75%] h-95  flex  border border-2-white bg-black rounded-[10px]">
          <div className="w-[47%]  my-8 mx-8">
            <h1 className="text-[20px] font-bold">
              Strategic Comments That Keep You in the Spotlight
            </h1>
            <p className="text-[14px]  mt-2">
              Boost the visibility and lifespan of your LinkedIn posts with our
              time-tested, staggered engagement strategy:
            </p>
            <ul className="relative text-[13px] mt-4 before:content-['•'] before:absolute before:left-[-1px] before:top-[-9px] before:text-[24px] pl-3">
              Day 1: 13 comments to generate buzz and drive early traction
            </ul>
            <ul className="relative text-[13px] mt-4 before:content-['•'] before:absolute before:left-[-1px] before:top-[-9px] before:text-[24px] pl-3">
              Day 3: 1 comment to keep your post active and circulating
            </ul>
            <ul className="relative text-[13px] mt-4 before:content-['•'] before:absolute before:left-[-1px] before:top-[-9px] before:text-[24px] pl-3">
              Day 5: 1 final comment to extend reach and maintain relevance.
            </ul>
            <p className="text-[15px]  mt-3">
              And here’s the bonus when they engage with your content, their
              network sees it too, expanding your reach and opening the door to
              even more meaningful connections.
            </p>
          </div>

          <div className="w-[50%] border-2 my-8 mx-8 flex justify-center relative bg-white rounded-2xl">
            <h1 className="absolute left-[-65]  top-33 rotate-[-90deg] font-bold text-2xl text-black">
              Number of Views
            </h1>
            <img
              src="/images/features/strategicComments.gif"
              className="h-[280px] ml-6 w-[300px]"
            />
          </div>
        </div>

        <div className="w-[75%] h-95  flex  border border-2-white bg-black mt-14 rounded-[10px]">
          <div className="w-[47%]  my-8 mx-8">
            <h1 className="text-[20px] font-bold">
              Community-Driven Engagement for Maximum Reach
            </h1>
            <p className="text-[14px]  mt-8">
              Stand out and get noticed by the right people with 15 thoughtful
              comments from real business owners and professionals. Our platform
              connects your posts with a rotating group of community members,
              keeping every interaction organic and authentic.
            </p>
            <p className="text-[15px]  mt-8">
              And here’s the bonus when they engage with your content, their
              network sees it too, expanding your reach and opening the door to
              even more meaningful connections.
            </p>
          </div>

          <div className="w-[50%] border-2 my-8 mx-8  bg-white rounded-2xl">
            <div className="m-4 rounded-2xl w-[93%] flex flex-col h-24 border-2 border-blue-500  px-3 py-2">
              <div className="flex">
                <h1 className="text-[16px] text-black font-bold ">Discovery</h1>
                <img
                  className="w-3 h-3 ml-1 mt-[6px]"
                  src="/images/features/qustionMark.svg"
                />
              </div>

              <div className="flex mt-4 ">
                {discoveryData.map((item, index) => (
                  <div key={index} className={index === 1 ? "ml-[45%]" : ""}>
                    <h1 className="text-[15px] text-black font-semibold">
                      <div ref={ref}>
                       {inView && (
        <CountUp start={0} end={item.price} duration={3} />
      )}
      </div>
                      
                    </h1>
                    <h1 className="text-[12px] text-black font-medium mt-[-6px]">
                      {item.title}
                    </h1>
                  </div>
                ))}
              </div>
            </div>
            <div className="m-4 rounded-2xl w-[93%] flex flex-col h-42 border-2 border-blue-500  px-2.5 py-3">
              <div className="flex">
                <h1 className="text-[16px] text-black font-bold ">
                  Engagement
                </h1>
                <img
                  className="w-3 h-3 ml-1 mt-[6px]"
                  src="/images/features/qustionMark.svg"
                />
              </div>
              {engagementData.map((item, index) => (
                <div key={index}>
                  <div className="mt-4 flex justify-between">
                    <p className="text-black font-medium text-[13px]">
                      {item.reacts}
                    </p>
                    <div className="flex gap-5">
                      <p className="text-black text-[13px]">{item.numbers}</p>
                      <img
                        src="images/features/rightArrow.svg"
                        className="w-3.5 h-3.5 mt-[3px]"
                      ></img>
                    </div>
                  </div>
                  <hr
                    className={`border border-blue-500 w-[105%] mt-1 ml-[-10px] ${
                      index === 2 ? "hidden" : ""
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
