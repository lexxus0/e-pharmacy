import { IMedicine } from "@/interfaces/interfaces";
import { updateCart } from "@/store/cart/operations";
import { useAppDispatch, useAppSelector } from "@/store/stores/hooks";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { selectIsLoggedIn } from "@/store/auth/selectors";
import AuthModal from "../auth/AuthModal";

interface MedicineItemProps {
  item: IMedicine;
}

export default function MedicineItem({ item }: MedicineItemProps) {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen(!isOpen);

  const handleAddClick = (id: string) => {
    dispatch(updateCart({ medicineId: id, quantity: 1 }));
  };

  return (
    <li>
      <Image
        src={item.photo}
        alt={`s picture`}
        width={335}
        height={300}
        className="border-[1.15px] border-[rgba(89,177,122,0.6)] rounded-3xl mb-2 md:w-[226px] md:h-[260px] xxl:size-[280px]"
      />
      <div className="bg-white p-5 rounded-3xl">
        <div className="flex justify-between">
          <div className="flex flex-col gap-1 mb-4">
            <p className="font-semibold text-base text-[#1d1e21] truncate w-30 md:text-lg">
              {item.name}
            </p>
            <p className="font-normal text-xs text-[rgba(29,30,33,0.6)]">
              {item.suppliers}
            </p>
          </div>
          <p className="font-semibold text-base text-[#1d1e21] md:text-lg">
            ৳{Math.round(item.price)}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() =>
              isLoggedIn ? handleAddClick(item._id) : handleClick()
            }
            className="green text-[#F0F0F0] py-2.5 px-3 leading-[140%] rounded-3xl font-medium text-sm"
          >
            Add to cart
          </button>
          <Link
            href={`/medicine/${item._id}`}
            className="underline text-xs text-[#1d1e21]"
          >
            Details
          </Link>
        </div>
        <AuthModal isOpen={isOpen} onClose={handleClick} />
      </div>
    </li>
  );
}
