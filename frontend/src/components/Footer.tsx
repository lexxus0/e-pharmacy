import Image from "next/image";
import logo from "../public/Layout/logo.svg";
import { TiSocialFacebook } from "react-icons/ti";
import { AiFillInstagram, AiFillYoutube } from "react-icons/ai";

export default function Footer() {
  return (
    <section className="green text-[#f7f8fa]">
      <div className="container py-5 md:py-8">
        <div className="md:flex">
          <div className="md:flex md:flex-col  md:w-[400px]">
            <div className="flex items-center gap-3 text-white mb-5">
              <Image
                src={logo}
                alt="Website logo"
                width={32}
                height={32}
                className="text-transparent cursor-pointer"
              />
              <p className="font-semibold text-base md:text-xl">E-Pharmacy</p>
            </div>
            <p className="text-sm pr-14 mb-10">
              Get the medicine to help you feel better, get back to your active
              life, and enjoy every moment.
            </p>
          </div>
          <div className="md:flex md:flex-col xxl:pl-20 xxl:flex-row xxl:justify-end xxl:gap-[300px]">
            <nav className="pb-20 md:pb-8">
              <ul className="flex gap-8 text-sm font-semibold md:text-base">
                <li className="cursor-pointer">Home</li>
                <li className="cursor-pointer">Medicine Store</li>
                <li className="cursor-pointer">Medicine</li>
              </ul>
            </nav>
            <ul className="hidden md:flex md:gap-3 ml-auto">
              <li className="md:p-2 border border-[rgba(247,248,250,0.2)] rounded-[10px] xxl:size-11 xxl:text-2xl">
                <TiSocialFacebook className="cursor-pointer" />
              </li>
              <li className="md:p-2 border border-[rgba(247,248,250,0.2)] rounded-[10px] xxl:size-11 xxl:text-2xl">
                <AiFillInstagram className="cursor-pointer" />
              </li>
              <li className="md:p-2 border border-[rgba(247,248,250,0.2)] rounded-[10px] xxl:size-11 xxl:text-2xl">
                <AiFillYoutube className="cursor-pointer" />
              </li>
            </ul>
          </div>
        </div>
        <div className="text-[10px] leading-[100%] space-x-2 text-[#f7f8fa] pt-5 relative md:px-10 md:text-sm xxl:flex xxl:justify-center ">
          <p className="relative inline after:absolute after:content-['']  after:w-[1px] after:mt-[1px] after:mx-[1px] after:h-2 md:after:h-4 after:bg-[#f7f8fa] after:right-[-6px] after:top-1/2 after:-translate-y-1/2 after:opacity-[0.4] md:pr-6">
            © E-Pharmacy 2023. All Rights Reserved
          </p>
          <p className="relative inline after:absolute after:content-[''] after:w-[1px] after:h-2 md:after:h-4 after:mt-[1px] after:bg-[#f7f8fa] after:right-[-6px] after:top-1/2 after:-translate-y-1/2 after:opacity-[0.4] md:px-6">
            Privacy Policy
          </p>
          <p className="md:inline md:pl-6">Terms & Conditions</p>
          <div className="absolute top-0 left-0 w-full h-[1px] bg-[rgba(247,248,250,0.3)]"></div>
        </div>
      </div>
    </section>
  );
}
