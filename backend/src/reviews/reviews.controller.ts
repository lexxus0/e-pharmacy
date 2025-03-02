import { Controller, Get } from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { Review } from "src/database/schemas/review.schema";

@Controller("api/customer-reviews")
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  async getAll(): Promise<Review[]> {
    return this.reviewsService.getAll();
  }
}
