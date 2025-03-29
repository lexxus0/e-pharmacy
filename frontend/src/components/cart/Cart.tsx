"use client";

import { useAppDispatch, useAppSelector } from "@/store/stores/hooks";
import { useEffect, useState } from "react";
import { getCart } from "@/store/cart/operations";
import { selectIsLoggedIn } from "@/store/auth/selectors";
import { redirect } from "next/navigation";
import CartForm from "./CartForm";
import CartList from "./CartList";
import Loader from "../layout/Loader";

export default function Cart() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsAuthChecked(true);
  }, []);

  useEffect(() => {
    if (isAuthChecked) {
      if (!isLoggedIn) {
        redirect("/login");
      } else {
        setIsLoading(true);
        dispatch(getCart()).finally(() => {
          setIsLoading(false);
        });
      }
    }
  }, [dispatch, isLoggedIn, isAuthChecked]);

  if (!isAuthChecked || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="xxl:flex xxl:gap-[96px]">
      <CartForm />
      <CartList />
    </div>
  );
}
