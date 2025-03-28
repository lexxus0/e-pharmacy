import RegisterForm from "@/components/auth/RegisterForm";
import pill from "@/public/authpill.webp";
import Image from "next/image";

export default function page() {
  return (
    <div className="container relative mt-[106px] md:mt-[168px] xxl:flex xxl:gap-13.5 xxl:mt-[220px]">
      <Image
        className="absolute right-7.5 top-[-60px] md:w-[179px] md:h-[175px] md:top-[-110px] md:right-32 xxl:right-185"
        src={pill}
        alt="Decorative pill image"
        width={95}
        height={93}
      />
      <h4 className="font-semibold text-[28px] text-[#1d1e21] mb-5 md:text-[54px] md:pr-20 md:mb-13.5 xxl:pr-0 xxl:!w-[1235px]">
        Your medication, delivered Say goodbye to all{" "}
        <span className="text-[#59b17a]">your healthcare</span> worries with us
      </h4>
      <RegisterForm />
    </div>
  );
}
