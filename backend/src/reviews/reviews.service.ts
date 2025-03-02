import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Review } from "src/database/schemas/review.schema";

@Injectable()
export class ReviewsService {
  constructor(@InjectModel(Review.name) private reviewModel: Model<Review>) {}

  async getAll(): Promise<Review[]> {
    return this.reviewModel.find().exec();
  }
}
