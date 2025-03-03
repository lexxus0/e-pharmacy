import { ApiProperty } from "@nestjs/swagger";

export class MedicineItemDto {
  @ApiProperty({
    example: "https://i.ibb.co/bLKP624/5-15-1000x1000-min.jpg",
    description: "Image of medicine",
  })
  photo: string;

  @ApiProperty({ example: "Aspirine", description: "Name of medicine" })
  name: string;

  @ApiProperty({ example: "Square", description: "Supplier of medicine" })
  suppliers: string;

  @ApiProperty({ example: 12, description: "Stock of medicine" })
  stock: number;

  @ApiProperty({ example: 32.12, description: "Price of medicine" })
  price: number;
}
