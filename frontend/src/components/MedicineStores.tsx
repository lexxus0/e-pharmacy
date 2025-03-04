"use client";

import { useAppDispatch, useAppSelector } from "@/store/stores/hooks";
import { fetchNearestStores } from "@/store/stores/operations";
import { selectNearestStores } from "@/store/stores/selectors";
import { useEffect } from "react";

export default function MedicineStores() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchNearestStores());
  }, [dispatch]);
  const stores = useAppSelector(selectNearestStores);
  console.log(stores);
  return <h3>Check</h3>;
}
