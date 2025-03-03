import { ApiProperty } from "@nestjs/swagger";
import { Medicine } from "src/database/schemas/medicine.schema";
import { MedicineItemDto } from "./medicine-item.dto";

export class MedicineResponseDto {
  @ApiProperty({ example: 30, description: "Total number of items" })
  totalItems: number;

  @ApiProperty({ example: 6, description: "Total number of pages" })
  totalPages: number;

  @ApiProperty({ example: 1, description: "Current page number" })
  currentPage: number;

  @ApiProperty({ example: 6, description: "Items per page" })
  limit: number;

  @ApiProperty({
    type: [MedicineItemDto],
    description: "List of medicine products",
  })
  items: MedicineItemDto[];
}
