import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: false, versionKey: false })
export class Store extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true, enum: ["general", "nearest"] })
  type: string;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
