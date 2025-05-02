import Image from "next/image";

export default function DecorativeBirds() {
  return (
    <>
      <Image 
        src="/images/landing-page/left_bot.svg" 
        alt="Bird left" 
        width={100} height={100} 
        className="absolute bottom-6 left-6 animate-bounce" 
      />
      <Image 
        src="/images/landing-page/right_bot.svg" 
        alt="Bird right" 
        width={100} height={100}
        className="absolute bottom-6 right-6 animate-bounce" 
      />
    </>
  );
}
