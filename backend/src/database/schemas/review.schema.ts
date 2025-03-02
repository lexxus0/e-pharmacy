import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: false, versionKey: false })
export class Review extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  avatar: string;

  @Prop({ required: true })
  testimonial: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
