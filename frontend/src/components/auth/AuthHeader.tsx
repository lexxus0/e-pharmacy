"use client";

import { selectUser } from "@/store/auth/selectors";
import { selectCartItems } from "@/store/cart/selectors";
import { useAppDispatch, useAppSelector } from "@/store/stores/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuShoppingCart } from "react-icons/lu";
import { useMediaQuery } from "react-responsive";
import { useState, useEffect } from "react";
import { signoutUser } from "@/store/auth/operations";
import { clearCart } from "@/store/cart/slice";
import { toast } from "sonner";

export default function AuthHeader() {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const cart = useAppSelector(selectCartItems);

  const isHomePage = pathname === "/";
  const isDesktop = useMediaQuery({ minWidth: 1440 });

  const onSignout = () => {
    dispatch(signoutUser());
    toast.success("Successfully signed out.");
    dispatch(clearCart());
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex gap-2 ml-auto mr-2.5 xxl:ml-0">
      <div className="rounded-full bg-white size-10 p-3 relative md:size-11 md:p-3.5">
        <div
          className={`absolute size-4 top-[-3px] right-0 rounded-full ${
            isHomePage
              ? "bg-yellow-300 text-gray-600"
              : "bg-[rgba(89,177,122,0.1)] text-[#59b17a]"
          }`}
        >
          <p className="text-center font-bold text-xs ">{cart.length}</p>
        </div>
        <Link href="/cart">
          <LuShoppingCart className="text-[#59b17a] size-4" />
        </Link>
      </div>
      <div
        className={`rounded-full size-10 p-2.5 text-center md:size-11 md:p-3 ${
          isHomePage ? "bg-white" : "bg-[rgba(89,177,122,0.1)]"
        }`}
      >
        <p className="text-[#59b17a]">
          {user?.name ? user.name[0].toUpperCase() : ""}
        </p>
      </div>
      {isDesktop && (
        <button
          className={`border rounded-[60px] h-11 text-sm px-8 ${
            isHomePage
              ? "border-white text-[#F0F0F0]"
              : "text-[#59b17a] border-[rgba(89,177,122,0.5)] "
          }`}
          type="button"
          onClick={() => onSignout()}
        >
          Logout
        </button>
      )}
    </div>
  );
}
