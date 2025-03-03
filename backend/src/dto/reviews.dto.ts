import { ApiProperty } from "@nestjs/swagger";

export class ReviewsDto {
  @ApiProperty({
    description: "Name of the reviewer",
    example: "Maria Tkachuk",
  })
  name: string;

  @ApiProperty({
    description: "Avatar of the reviewer",
    example: "https://ftp.goit.study/img/avatars/1.jpg",
  })
  avatar: string;

  @ApiProperty({
    description: "Testimonial of the reviewer",
    example: "I had a great experience using this medical platform ",
  })
  testimonial: string;
}
