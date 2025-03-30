import { IStores } from "@/interfaces/interfaces";
import React from "react";
import { BsGeoAlt, BsTelephone } from "react-icons/bs";
import { FaStar } from "react-icons/fa";

type MedicineStoreItemProps = {
  store: IStores;
  location: string;
};

export default function MedicineStoreItem({
  store,
  location,
}: MedicineStoreItemProps) {
  const handleOpenMaps = () => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      store.address
    )}`;
    window.open(mapsUrl, "_blank");
  };
  return (
    <li
      key={store._id}
      className="rounded-3xl bg-[#e7f1ed] px-8 py-9 relative overflow-hidden md:w-[344px] xxl:w-[392px]"
    >
      <div className="flex justify-between mb-5 items-center gap-3">
        <p className="font-semibold text-base text-[#1d1e21] truncate md:text-lg">
          {store.name}
        </p>
        <div
          className={`flex items-center gap-3 font-medium ${
            location === "page" ? "md:absolute md:bottom-7.5 md:right-10" : ""
          }`}
        >
          <p className="flex items-center gap-1.5 text-sm">
            <FaStar className="text-amber-400" />
            {store.rating}
          </p>

          <p className="rounded-lg px-3.5 py-2 bg-[rgba(89,177,122,0.1)] text-xs font-semibold uppercase text-[#59b17a] w-16">
            {store.status}
          </p>
        </div>
      </div>
      <div
        className={`flex flex-col gap-4.5 pr-[60px] text-sm text-[#93939a] ${
          location === "page" ? "md:mb-9" : ""
        }`}
      >
        <p className="flex gap-2">
          <BsGeoAlt />
          {store.address}
        </p>
        <p className="flex gap-2">
          <BsTelephone />
          {store.phone}
        </p>
      </div>
      <div
        className={`hidden rounded-3xl green px-4 py-2.5 text-[#F0F0F0] ${
          location === "page" ? "md:inline" : ""
        }`}
      >
        <button type="button" onClick={handleOpenMaps}>
          Visit Store
        </button>
      </div>
      <div
        className={`absolute right-[-89px] bottom-[-35px] ${
          location === "page"
            ? "md:top-[-10px] md:right-[-50px] xxl:top-[3px] xxl:right-[-20px]"
            : ""
        }`}
      >
        <div className="w-[166px] h-8 bg-[rgba(89,177,122,0.08)] rotate-[22deg] rounded-[20px_0_0_20px]  translate-x-11"></div>
        <div className="w-[166px] h-8 bg-[rgba(89,177,122,0.08)] rotate-[22deg] rounded-[20px_0_0_20px] mb-4"></div>
        <div className="w-[166px] h-8 bg-[rgba(89,177,122,0.08)] rotate-[22deg] rounded-[20px_0_0_20px] "></div>
      </div>
    </li>
  );
}
