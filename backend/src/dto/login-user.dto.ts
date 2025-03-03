import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
  @ApiProperty({
    description: "Email of existing user",
    example: "dmytro@gmail.com",
  })
  email: string;

  @ApiProperty({
    description: "Password of existing user",
    example: "dimon123",
  })
  password: string;
}
