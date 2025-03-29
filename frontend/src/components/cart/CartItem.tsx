"use client";

import { ICart } from "@/interfaces/interfaces";
import Image from "next/image";
import { useRef, useState } from "react";
import img from "@/public/pills.webp";
import { useAppDispatch } from "@/store/stores/hooks";
import { deleteItemFromCart, updateCart } from "@/store/cart/operations";
import { debounce } from "lodash";

interface ICartItemProps {
  item: ICart;
}

export default function CartItem({ item }: ICartItemProps) {
  const dispatch = useAppDispatch();
  const [count, setCount] = useState(item.quantity);

  const debouncedUpdateCart = useRef(
    debounce((itemId, newCount) => {
      dispatch(updateCart({ medicineId: itemId, quantity: newCount }));
    }, 2250)
  ).current;

  const handleQuantityChange = (newCount: number) => {
    setCount(newCount);
    debouncedUpdateCart(item.medicineId._id, newCount);
  };

  return (
    <div className="flex relative cartForm justify-center gap-3 py-8 md:gap-5 md:justify-start">
      <Image
        src={item.medicineId?.photo || img}
        alt={`${item.medicineId.name}'s picture`}
        width={120}
        height={120}
        className="border border-[#f1f1f1] rounded-3xl md:w-[122px] md:h-[133px]"
      />
      <div>
        <div className="flex flex-col gap-2 md:flex-row md:justify-between">
          <div className="md:flex md:flex-col md:gap-2">
            <p className="font-semibold text-base text-[#1d1e21] md:text-lg">
              {item.medicineId.name}
            </p>
            <p className="mb-1 text-sm text-[#6a6a6f]">
              {item.medicineId.category}
            </p>
          </div>

          <p className="font-medium text-sm text-[#1d1e21]">
            ৳{item.medicineId.price}
          </p>
        </div>
        <div className="flex justify-center items-center gap-4 mt-4.5 md:justify-between md:gap-[365px] xxl:gap-30">
          <div className="flex items-center gap-4 border border-[rgba(29,30,33,0.1)]  rounded-[60px] w-[95px] h-8 md:w-[108px] md:h-11 md:p-1.5">
            <button
              type="button"
              onClick={() => handleQuantityChange(count + 1)}
              className="text-lg font-bold px-2 py-1 text-green-400"
            >
              +
            </button>
            <span className="text-base text-[#1d1e21] max-w-1.5">{count}</span>
            <button
              type="button"
              onClick={() => handleQuantityChange(count > 1 ? count - 1 : 1)}
              className="text-lg font-bold px-2 py-1 text-green-400"
            >
              -
            </button>
          </div>
          <button
            type="button"
            onClick={() =>
              dispatch(deleteItemFromCart({ itemId: item.medicineId._id }))
            }
            className="rounded-[40px] h-8 bg-[rgba(232,80,80,0.1)] font-medium text-sm text-[#e85050] px-3.5 mt-2  md:py-2 md:px-3"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
