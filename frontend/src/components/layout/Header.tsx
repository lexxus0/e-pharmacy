"use client";

import Image from "next/image";
import homeLogo from "@/public/Layout/whitelogo.png";
import logo from "@/public/Layout/logo.svg";
import headernav from "@/public/Layout/headernav.svg";
import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import AuthLinks from "../auth/AuthLinks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthHeader from "../auth/AuthHeader";
import BurgerMenu from "../navigation/BurgerMenu";
import { useAppSelector } from "@/store/stores/hooks";
import { selectIsLoggedIn } from "@/store/auth/selectors";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const pathname = usePathname();

  const isHomePage = pathname === "/";
  const isStoresPage = pathname === "/medicine-store";

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className={` ${!isHomePage ? "h-[130px]" : ""}`} />;
  }

  const navLinks = [
    {
      name: "Home",
      href: "/",
      styles: "!ml-[-14.25px] py-1.5 !px-4",
      unactive: `${isHomePage ? "ml-[-12px] " : ""}`,
    },
    {
      name: "Medicine store",
      href: "/medicine-store",
      styles: `${isHomePage ? "" : "ml-[-5px] px-2 py-1.5"}`,
      unactive: `${isHomePage ? "ml-[-16px] " : ""}`,
    },
    {
      name: "Medicine",
      href: "/medicine",
      styles: "px-4 py-1.5 ml-[-16px]",
      unactive: `${isStoresPage ? "ml-[-14px]" : "ml-[-3.5px] !pt-[-52px]"}`,
    },
  ];

  return (
    <div
      className={`container flex items-center justify-between   ${
        isHomePage
          ? "absolute top-5 left-0 right-0"
          : "mt-[25px] md:mt-7 mb-[62px]"
      }`}
    >
      <div className="flex items-center gap-3 xxl:mr-10">
        <Link href="/">
          <Image
            src={isHomePage ? homeLogo : logo}
            alt="Website logo"
            width={32}
            height={32}
            className="text-transparent cursor-pointer"
          />
        </Link>
        <p
          className={`font-semibold text-base md:text-xl ${
            isHomePage ? "text-[#F0F0F0]" : "text-black"
          }`}
        >
          E-Pharmacy
        </p>
      </div>
      <div className="hidden xxl:block relative">
        <Image
          src={headernav}
          alt="Decorative header image"
          className="pt-0.5"
        />
        <nav>
          <ul className="flex absolute top-3 gap-11 pl-7.5">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (pathname.endsWith(link.href) && link.href !== "/");

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm rounded-3xl  cursor-pointer ${
                      isActive
                        ? `text-[#F0F0F0] green ${link.styles}`
                        : `text-black ${link.unactive}`
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      {isLoggedIn ? (
        <AuthHeader />
      ) : (
        <div className="hidden xxl:block">
          <AuthLinks />
        </div>
      )}
      <RxHamburgerMenu
        width={32}
        height={26}
        onClick={() => setIsOpen(!isOpen)}
        className={`xxl:hidden cursor-pointer
          ${isHomePage ? "text-[#F0F0F0]" : "text-black"}
          `}
      />

      <BurgerMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
