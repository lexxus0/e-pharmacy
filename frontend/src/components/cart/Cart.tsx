"use client";

import { useAppDispatch, useAppSelector } from "@/store/stores/hooks";
import { useEffect } from "react";
import { getCart } from "@/store/cart/operations";
import { selectIsLoggedIn } from "@/store/auth/selectors";
import { redirect } from "next/navigation";
import CartForm from "./CartForm";
import CartList from "./CartList";

export default function Cart() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  if (!isLoggedIn) redirect("/login");
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);
  return (
    <div className="xxl:flex xxl:gap-[96px]">
      <CartForm />
      <CartList />
    </div>
  );
}
