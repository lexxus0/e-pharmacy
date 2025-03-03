import { ApiProperty } from "@nestjs/swagger";

export class StoresDto {
  @ApiProperty({
    description: "Name of the store",
    example: "Pharmacy Hope",
  })
  name: string;

  @ApiProperty({
    description: "Address of the store",
    example: "Shevchenka St, 100",
  })
  address: string;

  @ApiProperty({
    description: "City of the store",
    example: "Lviv",
  })
  city: string;

  @ApiProperty({
    description: "Phone of the store",
    example: "0322-45-67-89",
  })
  phone: string;

  @ApiProperty({
    description: "City of the store",
    example: "Lviv",
  })
  rating: number;

  @ApiProperty({
    description: "Type of the store",
    example: "general",
  })
  type: ["general", "nearest"];
}
