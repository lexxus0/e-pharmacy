"use client";

import { IModalProps } from "@/interfaces/interfaces";
import burgerNav from "@/public/Layout/burgerNav.svg";
import { IoClose } from "react-icons/io5";
import AuthLinks from "./AuthLinks";
import Image from "next/image";

export default function BurgerMenu({ isOpen, onClose }: IModalProps) {
  const links = [
    { href: "/home", label: "Home" },
    { href: "/medicine-store", label: "Medicine store" },
    { href: "/medicine", label: "Medicine" },
  ];
  return (
    <>
      {isOpen && <div className="fixed inset-0 z-40" onClick={onClose} />}

      <div
        className={`fixed top-0 right-0 h-full w-[55%] green shadow-lg z-50 flex flex-col justify-between transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <button className="absolute top-4 right-4" onClick={onClose}>
          <IoClose className="text-white text-2xl cursor-pointer" />
        </button>

        <nav className="absolute top-[42%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="relative  w-[60vw] max-w-[142px] mx-auto">
            <Image
              src={burgerNav}
              alt="Decorative menu image"
              width={134}
              height={142}
              className="mx-auto"
            />

            <ul className="absolute top-[3.5px] right-0 w-full flex flex-col items-end space-y-3">
              {links.map(({ href, label }) => (
                <li key={href} className="w-full">
                  <a href={href} className="block w-full">
                    <button className="text-[#93939a] text-sm md:text-base lg:text-lg transition-all duration-300 ease-in-out w-full py-2">
                      {label}
                    </button>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <div className="mt-auto pb-10">
          <AuthLinks />
        </div>
      </div>
    </>
  );
}
