"use client";

import { IMedicine } from "@/interfaces/interfaces";
import { fetchMedicine } from "@/store/medicine/operations";
import { selectMedicine, selectTotalPages } from "@/store/medicine/selectors";
import { useAppDispatch, useAppSelector } from "@/store/stores/hooks";
import { useEffect, useState } from "react";
import MedicineItem from "./MedicineItem";
import { useSearchParams } from "next/navigation";
import Pagination from "./Pagination";

export default function MedicineList() {
  const dispatch = useAppDispatch();
  const totalPages = useAppSelector(selectTotalPages);
  const searchParams = useSearchParams();
  const [currPage, setCurrPage] = useState(
    Number(searchParams.get("page")) || 1
  );

  const setSearchParams = (params: URLSearchParams) => {
    window.history.replaceState(null, "", "?" + params.toString());
  };

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("page", currPage.toString());

    setSearchParams(params);

    dispatch(
      fetchMedicine({
        currentPage: currPage,
        limit: 12,
      })
    );
  }, [currPage, dispatch]);

  const medicine = useAppSelector(selectMedicine);

  return (
    <div>
      <ul className="flex flex-col gap-5 mb-10 md:flex-row md:flex-wrap md:gap-3">
        {medicine.map((item: IMedicine) => (
          <MedicineItem item={item} key={item._id} />
        ))}
      </ul>

      <Pagination
        currentPage={currPage}
        totalPages={totalPages}
        onPageChange={setCurrPage}
      />
    </div>
  );
}
