"use client";

import Filters from "@/components/navigation/Filters";
import MedicineList from "@/components/medicine/MedicineList";
import { Suspense } from "react";
import Loader from "@/components/layout/Loader";

export default function MedicinePage() {
  return (
    <div className="container mt-4 ">
      <h2 className="!text-left mb-10">Medicine</h2>
      <Filters />
      <Suspense fallback={<Loader />}>
        <MedicineList />
      </Suspense>
    </div>
  );
}
