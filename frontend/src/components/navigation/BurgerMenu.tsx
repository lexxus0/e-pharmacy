"use client";

import { IModalProps } from "@/interfaces/interfaces";
import burgerNav from "@/public/Layout/burgerNav.svg";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/stores/hooks";
import { selectIsLoggedIn } from "@/store/auth/selectors";
import { signoutUser } from "@/store/auth/operations";
import AuthLinks from "../auth/AuthLinks";

export default function BurgerMenu({ isOpen, onClose }: IModalProps) {
  const pathname = usePathname();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();

  const links = [
    {
      href: "/",
      label: "Home",
      styles: "ml-7.5 w-20    h-[32px] !my-0.75 md:!py-1 ",
    },
    {
      href: "/medicine-store",
      label: "Medicine store",
      styles:
        "px-[0px] w-30 ml-3 h-[32px] !my-0.5 !py-1.5 md:h-7 md:!py-0.5 md:!my-[-1px]",
    },
    {
      href: "/medicine",
      label: "Medicine",
      styles: "px-4 w-24 ml-6 !pb-1 h-[34px] md:!my-[-2px] md:!py-1 md:h-7.5",
    },
  ];
  return (
    <>
      {isOpen && <div className="fixed inset-0 z-40" onClick={onClose} />}

      <div
        className={`fixed top-0 right-0 h-full w-[55%] green shadow-lg z-50 flex flex-col justify-between transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <button
          className="absolute top-4 right-4"
          onClick={onClose}
          aria-label="Close menu on button click"
        >
          <IoClose className="text-[#F0F0F0] text-2xl cursor-pointer" />
        </button>

        <nav className="absolute top-[42%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="relative  w-[60vw] max-w-[142px] mx-auto">
            <Image
              src={burgerNav}
              alt="Decorative menu image"
              className="mx-auto"
            />

            <ul className="absolute top-[4px] right-0 w-full flex flex-col items-end space-y-3.25">
              {links.map(({ href, label, styles }) => {
                const isActive =
                  pathname === href ||
                  (pathname.endsWith(href) && href !== "/");
                return (
                  <li key={href} className="w-full">
                    <a
                      href={href}
                      className={`block 
                        text-[#93939a] text-sm md:text-base transition-all duration-300 ease-in-out py-2  ${
                          isActive
                            ? `green rounded-3xl  text-[#F0F0F0] ${styles}`
                            : `${href === "/medicine-store" && "md:!mt-[-5px]"}`
                        }`}
                    >
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
        <div className="mt-auto pb-10">
          {!isLoggedIn ? (
            <AuthLinks location={true} />
          ) : (
            <div className="flex justify-center text-[#F0F0F0]">
              <button
                onClick={() => dispatch(signoutUser())}
                className="rounded-[60px] border-[rgba(241,241,241,0.5)] border px-8 py-3 bg-inherit"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
