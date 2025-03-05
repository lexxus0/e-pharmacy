"use client";

import { IStores } from "@/interfaces/interfaces";
import { FaStar } from "react-icons/fa";
import { BsGeoAlt, BsTelephone } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "@/store/stores/hooks";
import { fetchNearestStores } from "@/store/stores/operations";
import { selectNearestStores } from "@/store/stores/selectors";
import { useEffect, useState } from "react";

export default function MedicineStores() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchNearestStores()).finally(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  const stores = useAppSelector(selectNearestStores);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="container mb-20 md:mb-30">
      <h2 className="mb-3.5">Your Nearest Medicine Store</h2>
      <p className="text-sm text-center text-[#93939a] mb-10 md:text-base">
        Search for Medicine, Filter by your location
      </p>
      <ul className="flex flex-col gap-5 md:flex-row md:gap-x-4 md:gap-y-8 md:flex-wrap xxl:gap-x-8 xxl:gap-y-[38px]">
        {stores.map((store: IStores) => (
          <li
            key={store._id}
            className="rounded-3xl bg-[#e7f1ed] px-8 py-9 relative overflow-hidden md:w-[344px] xxl:w-[392px]"
          >
            <div className="flex justify-between mb-5">
              <p className="font-semibold text-base text-[#1d1e21] truncate md:text-lg">
                {store.name}
              </p>
              <p className="flex items-center gap-1.5 font-medium ">
                <FaStar className="text-amber-400" />
                {store.rating}
              </p>
            </div>
            <div className="flex flex-col gap-4.5 pr-[60px] text-sm text-[#93939a]">
              <p className="flex gap-2">
                <BsGeoAlt />
                {store.address}
              </p>
              <p className="flex gap-2">
                <BsTelephone />
                {store.phone}
              </p>
            </div>
            <div className="absolute right-[-89px] bottom-[-35px]">
              <div className="w-[166px] h-8 bg-[rgba(89,177,122,0.08)] rotate-[22deg] rounded-[20px_0_0_20px]  translate-x-11"></div>
              <div className="w-[166px] h-8 bg-[rgba(89,177,122,0.08)] rotate-[22deg] rounded-[20px_0_0_20px] mb-4"></div>
              <div className="w-[166px] h-8 bg-[rgba(89,177,122,0.08)] rotate-[22deg] rounded-[20px_0_0_20px] "></div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
