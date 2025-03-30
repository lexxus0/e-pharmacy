"use client";

import { fetchMedicine } from "@/store/medicine/operations";
import { useAppDispatch } from "@/store/stores/hooks";
import { BiFilterAlt } from "react-icons/bi";
import React, { useState } from "react";
import Select, { StylesConfig } from "react-select";

const customStyles: StylesConfig<{ value: string; label: string }> = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "white",
    border: "1px solid rgba(29, 30, 33, 0.1)",
    outline: "none",
    borderRadius: "24px",
    paddingLeft: "7px",
    height: "44px",
    fontSize: "14px",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#f9f9f9",
    borderRadius: "4px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#d3d3d3" : "transparent",
    color: state.isSelected ? "#000" : "#333",
    padding: "8px 12px",
    cursor: "pointer",
  }),
  clearIndicator: (provided) => ({
    ...provided,
    color: "red",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#888",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "rgba(29, 30, 33, 0.4)",
    fontSize: "12px",
  }),
};

const options = [
  { value: "Painkillers", label: "Painkillers" },
  { value: "Antihistamines", label: "Antihistamines" },
  { value: "Sedatives", label: "Sedatives" },
  { value: "Gastrointestinal", label: "Gastrointestinal" },
  { value: "Diuretics", label: "Diuretics" },
  { value: "Vitamins & Supplements", label: "Vitamins & Supplements" },
  { value: "Antibiotics", label: "Antibiotics" },
  { value: "Cholesterol-lowering", label: "Cholesterol-lowering" },
  { value: "Personal Care", label: "Personal Care" },
  { value: "Blood Pressure", label: "Blood Pressure" },
  { value: "Diabetes Medication", label: "Diabetes Medication" },
];

export default function Filters() {
  const dispatch = useAppDispatch();

  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();
  const [keyword, setKeyword] = useState<string>("");

  const handleApplyFilters = () => {
    dispatch(
      fetchMedicine({
        limit: 9,
        currentPage: 1,
        category: selectedCategory,
        keyword,
      })
    );
  };

  return (
    <div className="flex flex-col gap-3 mb-10 md:flex-row">
      <Select
        options={options}
        onChange={(option) =>
          setSelectedCategory(
            option && "value" in option ? option.value : undefined
          )
        }
        placeholder="Product category"
        styles={customStyles}
        className="md:w-[214px] outline-0"
        isClearable
      />
      <input
        type="text"
        placeholder="Search medicine"
        value={keyword}
        className="input !w-[335px] md:!w-[224px]"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button
        onClick={handleApplyFilters}
        className="flex w-[116px] items-center gap-2 green rounded-[60px] text-[#F0F0F0] font-medium text-sm py-3 px-6.5"
      >
        <BiFilterAlt />
        Filter
      </button>
    </div>
  );
}
