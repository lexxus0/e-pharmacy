import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: "Name of the user",
    example: "Alex",
  })
  name: string;

  @ApiPropertyOptional({
    description: "Email of the user",
    example: "alex@gmail.com",
  })
  email: string;

  @ApiPropertyOptional({
    description: "Phone number of the user",
    example: "+380731604175",
  })
  phone: string;

  @ApiPropertyOptional({
    description: "Password for the user account",
    example: "dimon123",
  })
  password: string;
}
