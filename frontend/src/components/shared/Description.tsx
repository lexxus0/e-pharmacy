import { IDetails } from "@/interfaces/interfaces";
import React from "react";

interface DescriptionProps {
  details: IDetails;
}

export default function Description({ details }: DescriptionProps) {
  return (
    <div>
      <ul className="flex flex-col gap-5 text-sm md:text-base">
        <li className="text-[#6a6a6f]">{details.description}</li>
        <li>
          <span className="text-[#6a6a6f]">Medicinal Uses: </span>
          {details.medicinal_uses}
        </li>
        <li>
          <span className="text-[#6a6a6f]">Antioxidant Properties: </span>
          {details.antioxidant_properties}
        </li>
        <li>
          <span className="text-[#6a6a6f]">Anti-Diabetic Effects: </span>
          {details.anti_diabetic_effects}
        </li>
        <li>
          <span className="text-[#6a6a6f]">Heart Health: </span>
          {details.heart_health}
        </li>
        <li>
          <span className="text-[#6a6a6f]">Anti-Cancer Properties: </span>
          {details.anti_cancer_properties}
        </li>
        <li>
          <span className="text-[#6a6a6f]">Immune Support: </span>
          {details.immune_support}
        </li>
        <li>
          <span className="text-[#6a6a6f]">Digestive Aid: </span>
          {details.digestive_aid}
        </li>
      </ul>
    </div>
  );
}
