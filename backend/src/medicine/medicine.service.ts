import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Medicine } from "src/database/schemas/medicine.schema";

@Injectable()
export class MedicinesService {
  constructor(
    @InjectModel(Medicine.name) private medicineModel: Model<Medicine>
  ) {}

  async getById(id: string): Promise<Medicine> {
    const objectId = new Types.ObjectId(id);

    const medicine = await this.medicineModel.findOne({ _id: objectId }).exec();
    if (!medicine) {
      throw new NotFoundException("Medicine not found");
    }
    return medicine;
  }

  async getAll(
    page = 1,
    limit = 9,
    category?: string,
    keyword?: string
  ): Promise<{
    items: Medicine[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  }> {
    const perPage = Math.max(1, Math.min(limit, 50));
    const currentPage = Math.max(1, page);

    const filter: any = {};
    if (category) {
      filter.category = category;
    }
    if (keyword) {
      filter.name = { $regex: keyword, $options: "i" };
    }

    const totalItems = await this.medicineModel.countDocuments(filter);

    const totalPages = Math.ceil(totalItems / perPage);

    const items = await this.medicineModel
      .find(filter)
      .select("-details -reviews")
      .skip((currentPage - 1) * perPage)
      .limit(perPage)
      .exec();

    return {
      items,
      totalItems,
      totalPages,
      currentPage,
      limit: perPage,
    };
  }
}
