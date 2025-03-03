import { Controller, Get } from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { Review } from "src/database/schemas/review.schema";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ReviewsDto } from "src/dto/reviews.dto";

@Controller("api/customer-reviews")
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  @ApiOperation({ summary: "Get reviews for the main page" })
  @ApiResponse({
    status: 200,
    type: ReviewsDto,
    description: "Successfully got reviews",
    schema: {
      example: {
        _id: "67c43de93cf3fa1956951e9f",
        name: "Maria Tkachuk",
        avatar: "https://ftp.goit.study/img/avatars/2.jpg",
        testimonial:
          "I recently used this medical platform to book an appointment with a specialist, and I was impressed by how easy and user-friendly the process was. Highly recommended!",
      },
    },
  })
  @ApiResponse({ status: 404, description: "Service not found" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  async getAll(): Promise<{
    status: number;
    message: string;
    data: Review[];
  }> {
    return {
      status: 200,
      data: await this.reviewsService.getAll(),
      message: "Successfully got reviews",
    };
  }
}
