import React from "react";

function GroupPlan() {
  const groupItems = [
    {
      img: "images/features/logoStructure/structureFirst.svg",
      heading: "Business Networking Groups",
      text: `Empower your members to stand out on LinkedIn and expand your community’s impact.`,
      mtImg: "mt-6.5",
      mrImg: "mr-37",
      mlDiv: "ml-120",
      mtDiv: "mt-0",
    },
    {
      img: "images/features/logoStructure/structureSecond.svg",
      heading: "Co-Working Spaces",
      text: `Add value to your space by giving clients a simple way to boost their online presence.`,
      mtImg: "mt-37",
      mrImg: "ml-37",
      mlDiv: "mr-135",
      mtDiv: "mt-36",
    },
     {
      img: "images/features/logoStructure/Structurethird.svg",
      heading: "Marketing Agencies",
      text: `Position yourself as the go-to partner by integrating LinkedIn visibility into your strategy offering.`,
      mtImg: "mt-66",
      mrImg: "mr-37",
      mlDiv: "ml-120",
      mtDiv: "mt-66",
    },
    {
      img: "images/features/logoStructure/structureFourth.svg",
      heading: "VA Service Providers",
      text: `Own the spotlight from behind the scenes making your clients the stars.`,
      mtImg: "mt-98",
      mrImg: "ml-37",
      mlDiv: "mr-135",
      mtDiv: "mt-98",
    },
    {
      img: "images/features/logoStructure/structureFifth.svg",
      heading: "LinkedIn Content Specialists",
      text: `You write it, we make sure the right people see it. That’s teamwork.`,
      mtImg: "mt-128",
      mrImg: "mr-37",
      mlDiv: "ml-120",
      mtDiv: "mt-128",
    },
     {
      img: "images/features/logoStructure/structureSixth.svg",
      heading: "Commerce Networks",
      text: `Empower local businesses by boosting visibility and credibility for their leaders.`,
      mtImg: "mt-159",
      mrImg: "ml-37",
      mlDiv: "mr-125",
      mtDiv: "mt-159",
    },
     {
      img: "images/features/logoStructure/structureSeventh.svg",
      heading: "Startup Networks and Incubators",
      text: `Give your founders the connections and trust they need to lead and grow.`,
      mtImg: "mt-189",
      mrImg: "mr-37",
      mlDiv: "ml-120",
      mtDiv: "mt-189",
    },
    
  ];

  return (
    <>
      <h1 className="text-4xl font-bold text-center mt-35">
        Who benefits from the
        <span className="text-[#33C6F4]"> Group Plan?</span>
      </h1>

      <div className="relative flex justify-center mt-25">
        <img
          src="images/features/logoStructure/logoStructure.svg"
          className="w-67"
        />

        {groupItems.map((item, index) => (
          <React.Fragment key={index}>
            <img
              src={item.img}
              className={`w-17 absolute ${item.mrImg} ${item.mtImg} hover:scale-107 transition-transform duration-300 ease-in-out`}
            />

            <div className={`absolute w-100 ml-18 ${item.mtDiv} ${item.mlDiv}`}>
              <h1 className="text-[#33C6F4] text-2xl font-bold absolute ">
                {item.heading}
              </h1>

              <p className="mt-8">{item.text}</p>
            </div>
          </React.Fragment>
        ))}
      </div>
    </>
  );
}

export default GroupPlan;
