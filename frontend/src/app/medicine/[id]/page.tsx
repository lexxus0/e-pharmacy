"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/stores/hooks";
import { useEffect, useState } from "react";
import { fetchMedicineById } from "@/store/medicine/operations";
import { selectMedicineItem } from "@/store/medicine/selectors";
import Loader from "@/components/layout/Loader";
import Description from "@/components/shared/Description";
import ItemReviews from "@/components/reviews/ItemReviews";
import { updateCart } from "@/store/cart/operations";
import { selectIsLoggedIn } from "@/store/auth/selectors";
import AuthModal from "@/components/auth/AuthModal";

export default function MedicineDetail() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const [isLoading, setIsLoading] = useState(true);
  const [activePage, setActivePage] = useState("description");

  const [count, setCount] = useState(1);

  useEffect(() => {
    if (typeof id === "string") {
      dispatch(fetchMedicineById({ _id: id })).finally(() => {
        setIsLoading(false);
      });
    }
  }, [id, dispatch]);
  const item = useAppSelector(selectMedicineItem);

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen(!isOpen);

  const handleAddClick = (id: string) => {
    dispatch(updateCart({ medicineId: id, quantity: count }));
  };

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="container">
      {!isLoading && item ? (
        <div className="flex flex-col gap-2 mt-16 mb-20 md:gap-4 xxl:flex-row">
          <div className="md:flex md:gap-4 xxl:flex-col">
            <Image
              src={item.photo}
              alt={`${item.name}'s picture`}
              width={335}
              height={337}
              className="border border-[rgba(89,177,122,0.6)] mb-2 rounded-3xl md:w-[364px] md:mb-0 md:h-[284px] xxl:h-[337px]"
            />
            <div className="bg-white p-5 rounded-[20px] md:w-[324px] md:p-8 xxl:w-[364px] xxl:p-5">
              <div className="flex justify-between md:flex-col md:gap-8 xxl:gap-0 xxl:flex-row">
                <div className="flex flex-col gap-1 mb-4">
                  <p className="font-semibold text-base text-[#1d1e21] truncate w-30 md:text-lg">
                    {item.name}
                  </p>
                  <p className="font-normal text-xs text-[rgba(29,30,33,0.6)]">
                    Brand: {item.suppliers}
                  </p>
                </div>
                <p className="font-semibold text-base text-[#1d1e21] md:text-lg">
                  ৳{Math.round(item.price)}
                </p>
              </div>
              <div className="flex items-center justify-between md:mt-9 xxl:mt-0">
                <div className="flex mt-4.5 items-center gap-4 border border-[rgba(29,30,33,0.1)] px-2 rounded-[60px] w-[108px] h-11">
                  <button
                    type="button"
                    onClick={increment}
                    className="text-lg font-bold px-2 py-1 text-green-400"
                  >
                    +
                  </button>
                  <span className="text-base text-[#1d1e21] max-w-1.5">
                    {count}
                  </span>
                  <button
                    type="button"
                    onClick={decrement}
                    className="text-lg font-bold px-2 py-1 text-green-400"
                  >
                    -
                  </button>
                </div>
                <div className="flex justify-between items-center flex-row-reverse mt-4">
                  <button
                    type="button"
                    onClick={() =>
                      isLoggedIn ? handleAddClick(item._id) : handleClick()
                    }
                    className="green text-[#F0F0F0] py-2.5 px-3 leading-[140%] rounded-3xl font-medium text-sm h-11 md:px-6"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="p-5 rounded-[20px] bg-white pt-5 pb-10 md:p-8 md:pb-16">
            <div className="flex gap-2 mb-5 md:mb-8">
              <button
                onClick={() => setActivePage("description")}
                className={`bg-[rgba(89,177,122,0.1)] rounded-[40px] px-3.5 py-2 text-[#59b17a] md:font-medium ${
                  activePage === "description" ? "green text-[#F0F0F0]" : ""
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActivePage("reviews")}
                className={`bg-[rgba(89,177,122,0.1)] rounded-[40px] px-3.5 py-2 text-[#59b17a] md:font-medium  
                  ${activePage === "reviews" ? "green text-[#F0F0F0]" : ""}
                  `}
              >
                Reviews
              </button>
            </div>
            {activePage === "description" ? (
              <Description details={item.details} />
            ) : (
              <ItemReviews reviews={item.reviews} />
            )}
          </div>
          <AuthModal isOpen={isOpen} onClose={handleClick} />
        </div>
      ) : (
        <div className="min-h-screen flex justify-center items-center">
          <Loader />
        </div>
      )}
    </div>
  );
}
