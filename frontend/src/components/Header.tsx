"use client";

import Image from "next/image";
import logo from "../public/Layout/logo.svg";
import burger from "../public/Layout/burger.svg";
import { useState } from "react";
import BurgerMenu from "./BurgerMenu";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="container absolute top-5 left-0 right-0 flex justify-between ">
      <div className="flex items-center gap-3">
        <a href="/home">
          <Image
            src={logo}
            alt="Website logo"
            width={32}
            height={32}
            className="text-transparent cursor-pointer"
          />
        </a>
        <p className="font-semibold text-base">E-Pharmacy</p>
      </div>
      <Image
        src={burger}
        alt="Burger menu logo"
        width={32}
        height={26}
        onClick={() => setIsOpen(!isOpen)}
      />
      <BurgerMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
