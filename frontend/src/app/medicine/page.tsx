import MedicineList from "@/components/MedicineList";
import React from "react";

export default function page() {
  return (
    <div className="container">
      <h2 className="!text-left mb-10">Medicine</h2>
      <MedicineList />
    </div>
  );
}
