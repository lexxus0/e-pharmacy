import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: false, versionKey: false })
export class Medicine extends Document {
  @Prop({ required: true })
  photo: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  suppliers: string;

  @Prop({ required: true })
  stock: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true, type: Object })
  details: {
    description: string;
    medicinal_uses: string;
    antioxidant_properties: string;
    anti_diabetic_effects: string;
    heart_health: string;
    anti_cancer_properties: string;
    immune_support: string;
    digestive_aid: string;
  };

  @Prop({ required: true, type: Object })
  reviews: {
    avatar: string;
    name: string;
    testimonial: string;
  };
}

export const MedicineSchema = SchemaFactory.createForClass(Medicine);
