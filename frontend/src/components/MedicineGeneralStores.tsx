"use client";

import { useAppDispatch, useAppSelector } from "@/store/stores/hooks";
import { fetchGeneralStores } from "@/store/stores/operations";
import { selectGeneralStores } from "@/store/stores/selectors";
import { useEffect, useState } from "react";
import MedicineStoresList from "./MedicineStoresList";
import Loader from "./Loader";

export default function MedicineGeneralStores() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchGeneralStores()).finally(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  const stores = useAppSelector(selectGeneralStores);
  return (
    <section className="container mb-20 md:mb-30">
      <h2 className="!text-left mb-10 md:mb-8 xxl:mb-10">Medicine store</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <MedicineStoresList stores={stores} location="page" />
      )}
    </section>
  );
}
