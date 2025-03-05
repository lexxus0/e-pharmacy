"use client";

import Image from "next/image";
import logo from "../public/Layout/logo.svg";
import headernav from "../public/Layout/headernav.svg";
import burger from "../public/Layout/burger.svg";
import { useState } from "react";
import BurgerMenu from "./BurgerMenu";
import AuthLinks from "./AuthLinks";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === "/home";

  const navLinks = [
    { name: "Home", href: "/home" },
    { name: "Medicine store", href: "/medicine-store" },
    { name: "Medicine", href: "/medicine" },
  ];

  return (
    <div
      className={`container flex justify-between ${
        isHomePage ? "absolute top-5 left-0 right-0" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <Link href="/home">
          <Image
            src={logo}
            alt="Website logo"
            width={32}
            height={32}
            className="text-transparent cursor-pointer"
          />
        </Link>
        <p className="font-semibold text-base text-white md:text-xl">
          E-Pharmacy
        </p>
      </div>
      <div className="hidden xxl:block relative">
        <Image src={headernav} alt="Decorative header image" />
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
                    className={`text-sm cursor-pointer ${
                      isActive ? "text-[#59b17a]" : "text-black"
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
      <Image
        src={burger}
        alt="Burger menu logo"
        width={32}
        height={26}
        onClick={() => setIsOpen(!isOpen)}
        className="xxl:hidden"
      />
      <div className="hidden xxl:block">
        <AuthLinks />
      </div>
      <BurgerMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
