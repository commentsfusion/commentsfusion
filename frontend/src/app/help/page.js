import Layout from "../components/layout";
import Card from "../components/help_components/card";
export default function HelpPage({
  cardData = [
    {
      id: "kickStart",
      logo: "/images/help/first.svg",
      Title: "Kickstart Your Comments Fusion Setup",
      p: "This brief guide will assist you in getting started.",
    },
    {
      id: "initialSetup",
      logo: "/images/help/second.svg",
      Title: "Initial Setup for Comments Nexus",
      p: "Discover how to tailor your tone to suit various communication styles and engagement types.",
    },
    {
       id: "Segment",
      logo: "/images/help/third.svg",
      Title: "Segment, Track, and Cultivate",
      p: "Proactively engage prospects early and guide them toward revenue generating opportunities.",
    },
    {
      id: "Meetings",
      logo: "/images/help/fourth.svg",
      Title: "Turn Meetings into Conversions",
      p: "Optimize Outreach to Schedule More Meetings, Drive Conversions, and Expand Your Mailing List.",
    },
    {
      id: "browserAdd",
      logo: "/images/help/fifth.svg",
      Title: "Browser Add-on for Chrome and Edge",
      p: "Integrate Comments Fusion within LinkedIn for a unified experiene.",
    },
    {
      id: "enhanceProfile",
      logo: "/images/help/sixth.svg",
      Title: "Enhance Profile and Content",
      p: "Boost your LinkedIn with AI-powered profiles, personalized outreach, engaging content, and strong recommendations.",
    },
    {
      id: "platformLinkages",
      logo: "/images/help/seventh.svg",
      Title: "Platform Linkages",
      p: "Integrate your favourite software with comments fusion for maximum productivity rephrase.",
    },
    {
       id: "profileMembership",
      logo: "/images/help/eight.svg",
      Title: "Profile & Membership",
      p: "Update Your Account and Subscription Details.",
    },
    {
      id: "technicalSupport",
      logo: "/images/help/nineth.svg",
      Title: "Technical Support",
      p: "Quick fixes and steps to stay connected, updated, and in control.",
    },
  ],
}) {
  return (
    <Layout>
      <Card cardData={cardData} />
    </Layout>
  );
}
