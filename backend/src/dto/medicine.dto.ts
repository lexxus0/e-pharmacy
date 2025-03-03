import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class MedicineDto {
  @ApiProperty({ example: 1, description: "Page number", minimum: 1 })
  page: number;

  @ApiProperty({ example: 9, description: "Items per page", minimum: 1 })
  limit: number;

  @ApiPropertyOptional({
    example: "Skin care",
    description: "Category filter",
  })
  category?: string;

  @ApiPropertyOptional({
    example: "Aspirin",
    description: "Keyword search (by name)",
  })
  keyword?: string;
}
