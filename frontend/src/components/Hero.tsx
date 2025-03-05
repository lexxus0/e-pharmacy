import Image from "next/image";
import pills from "@/public/pills.png";

export default function Hero() {
  return (
    <section className="min-h-screen min-w-screen green text-white mb-10 flex items-center justify-center md:mb-16">
      <div className="container relative text-left xxl:!max-w-[750px] xxl:!p-0">
        <h1 className="font-semibold text-5xl mb-5 z-20 relative md:pl-5 md:pr-20 md:text-7xl xxl:px-auto xxl:flex xxl:items-center xxl:justify-center xxl:pr-[100px]">
          Your medication delivered
        </h1>
        <p className="pl-[130px] text-xs mb-5 z-20 relative md:text-base md:pl-[414px] md:pr-20 xxl:pl-[450px]">
          Say goodbye to all your healthcare worries with us
        </p>
        <Image
          src={pills}
          alt="Decorative pills image"
          className="absolute top-[-8%] z-0 md:w-[460px] md:top-[-45%] md:left-[15%] xxl:w-[540px] xxl:left-[5%] xxl:top-[-65%]"
          width={310}
          height={312}
        />
      </div>
    </section>
  );
}
