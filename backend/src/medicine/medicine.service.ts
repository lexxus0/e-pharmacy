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

  async getAll(): Promise<Medicine[]> {
    return this.medicineModel.find().select("-details -reviews").exec();
  }
}
