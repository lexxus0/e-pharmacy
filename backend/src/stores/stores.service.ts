import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Medicine } from "src/database/schemas/medicine.schema";
import { Store } from "src/database/schemas/store.schema";

@Injectable()
export class StoreService {
  constructor(@InjectModel(Store.name) private StoreModel: Model<Store>) {}

  async getStores(): Promise<Store[]> {
    return this.StoreModel.find({ type: "general" }).exec();
  }

  async getNearest(): Promise<Store[]> {
    return this.StoreModel.find({ type: "nearest" }).exec();
  }
}
