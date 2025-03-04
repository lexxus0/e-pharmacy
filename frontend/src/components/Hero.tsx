import Image from "next/image";
import pills from "@/public/pills.png";

export default function Hero() {
  return (
    <section className="min-h-screen min-w-screen green text-white mb-10 flex items-center justify-center">
      <div className="container relative text-left">
        <h1 className="font-semibold text-5xl mb-5 z-20 relative">
          Your medication delivered
        </h1>
        <p className="pl-[130px] text-xs mb-5 z-20 relative">
          Say goodbye to all your healthcare worries with us
        </p>
        <Image
          src={pills}
          alt="Decorative pills image"
          className="absolute top-[-8%] z-0"
          width={310}
          height={312}
        />
      </div>
    </section>
  );
}
