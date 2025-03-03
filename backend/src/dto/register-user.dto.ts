import { ApiProperty } from "@nestjs/swagger";

export class RegisterUserDto {
  @ApiProperty({
    description: "Name of the user",
    example: "Dmytro",
  })
  name: string;

  @ApiProperty({
    description: "Email of the user",
    example: "dmytro@gmail.com",
  })
  email: string;

  @ApiProperty({
    description: "Phone number of the user",
    example: "+380123231231",
  })
  phone: string;

  @ApiProperty({
    description: "Password for the user account",
    example: "dimon123",
  })
  password: string;
}
