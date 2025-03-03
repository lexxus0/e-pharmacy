import { ApiProperty } from "@nestjs/swagger";

export class UpdateCartDto {
  @ApiProperty({
    description: "Id of medicine user wants to add to cart",
    example: "67c43de93cf3fa1956951e9f",
  })
  medicineId: string;

  @ApiProperty({
    description: "Quantity of medicine user wants to add to cart",
    example: 4,
  })
  quantity: number;
}
