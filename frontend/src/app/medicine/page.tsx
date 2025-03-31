"use client";

import Filters from "@/components/navigation/Filters";
import MedicineList from "@/components/medicine/MedicineList";
import { Suspense, useEffect, useState } from "react";
import Loader from "@/components/layout/Loader";

export default function MedicinePage() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? (
    <div className="container mt-4 ">
      <div>
        <h2 className="!text-left mb-10">Medicine</h2>
        <Filters />
        <MedicineList />
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex justify-center items-center">
      <Loader />
    </div>
  );
}
