import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema, Types } from "mongoose";
import { Medicine } from "./medicine.schema";

@Schema()
export class CartItem {
  @Prop({ type: Types.ObjectId, ref: "Medicine", required: true })
  medicineId: Medicine | Types.ObjectId;

  @Prop({ required: true })
  quantity: number;
}

@Schema({ versionKey: false })
export class Cart extends Document {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  })
  userId: Types.ObjectId;

  @Prop({ type: [CartItem], default: [] })
  items: CartItem[];

  @Prop({ enum: ["active", "completed"], required: true, default: "active" })
  status: string;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
