import { ApiProperty } from "@nestjs/swagger";

export class checkoutCartDto {
  @ApiProperty({
    description: "Name of user",
    example: "Oleksii",
  })
  name: string;

  @ApiProperty({
    description: "Email of user",
    example: "oleksii@gmail.com",
  })
  email: string;

  @ApiProperty({
    description: "Mobile phone of user",
    example: "1231231212",
  })
  phone: string;

  @ApiProperty({
    description: "Local address of user",
    example: "Washington, Oleksii street, USA",
  })
  address: string;

  @ApiProperty({
    description: "Type of payment",
    example: "bank",
  })
  paymentMethod: string;
}
