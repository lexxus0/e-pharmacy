"use client";

import { selectCartItems } from "@/store/cart/selectors";
import { useAppSelector } from "@/store/stores/hooks";
import CartItem from "./CartItem";
import { ICart } from "@/interfaces/interfaces";

export default function CartList() {
  const items = useAppSelector(selectCartItems);

  return (
    <div className="w-full xxl:w-[460px]">
      {items.map((item: ICart) => (
        <CartItem key={item._id} item={item} />
      ))}
    </div>
  );
}
