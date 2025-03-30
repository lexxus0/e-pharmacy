import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema, Types } from "mongoose";
import { Medicine } from "./medicine.schema";

@Schema()
export class CustomerInfo {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  address: string;
}

const CustomerInfoSchema = SchemaFactory.createForClass(CustomerInfo);

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

  @Prop({ type: CustomerInfoSchema })
  customerInfo?: CustomerInfo;
}

export const CartSchema = SchemaFactory.createForClass(Cart);

CartSchema.index({ userId: 1, status: 1 }, { unique: true });
