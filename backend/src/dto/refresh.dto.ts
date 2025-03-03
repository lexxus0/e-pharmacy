import { ApiProperty } from "@nestjs/swagger";

export class RefreshDto {
  @ApiProperty({
    description: "Old refresh token",
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFvenlyc2t5aUBnbWFpbC5jb20iLCJ1c2VySWQiOiI2N2MxZDgzZjQ5MTcxNmIwZmJlOWI3Y2IiLCJpYXQiOjE3NDA5NTI4MDIsImV4cCI6MTc0MzU0NDgwMn0.as2dy_SW3xXqcBzptRJLJdy7AYaj2Cc-tOmyl7OMeqs",
  })
  refreshToken: string;
}
