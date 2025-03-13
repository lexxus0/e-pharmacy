"use client";

import { useAppDispatch, useAppSelector } from "@/store/stores/hooks";
import { fetchNearestStores } from "@/store/stores/operations";
import { selectNearestStores } from "@/store/stores/selectors";
import { useEffect, useState } from "react";
import MedicineStoresList from "./MedicineStoresList";
import Loader from "./Loader";

export default function MedicineNearestStores() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchNearestStores()).finally(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  const stores = useAppSelector(selectNearestStores);

  return (
    <section className="container mb-20 md:mb-30">
      <h2 className="mb-3.5">Your Nearest Medicine Store</h2>
      <p className="text-sm text-center text-[#93939a] mb-10 md:text-base">
        Search for Medicine, Filter by your location
      </p>
      {isLoading ? (
        <Loader />
      ) : (
        <MedicineStoresList stores={stores} location="home" />
      )}
    </section>
  );
}
