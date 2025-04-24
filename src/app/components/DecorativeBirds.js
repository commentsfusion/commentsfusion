import Image from "next/image";

export default function DecorativeBirds() {
  return (
    <>
      <Image 
        src="/bird-left.png" 
        alt="Bird left" 
        width={100} height={100} 
        className="absolute bottom-6 left-6 animate-bounce" 
      />
      <Image 
        src="/bird-right.png" 
        alt="Bird right" 
        width={100} height={100} 
        className="absolute bottom-6 right-6 animate-bounce" 
      />
    </>
  );
}
