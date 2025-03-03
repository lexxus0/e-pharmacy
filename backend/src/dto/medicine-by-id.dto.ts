import { ApiProperty } from "@nestjs/swagger";
import { Medicine } from "src/database/schemas/medicine.schema";

export class MedicineByIdResponseDto {
  @ApiProperty({
    example: "https://i.ibb.co/bLKP624/5-15-1000x1000-min.jpg",
    description: "Image of medicine",
  })
  photo: string;

  @ApiProperty({ example: "Aspirine", description: "Name of medicine" })
  name: string;

  @ApiProperty({ example: "Square", description: "Supplier of medicine" })
  suppliers: string;

  @ApiProperty({ example: 12, description: "Stock of medicine" })
  stock: number;

  @ApiProperty({ example: 32.12, description: "Price of medicine" })
  price: number;

  @ApiProperty({
    example: {
      description:
        "Aspirin is a widely used medication known for its pain-relieving and anti-inflammatory effects. It is commonly used to reduce fever and alleviate mild to moderate pain such as headaches, muscle pain, and arthritis.",
      medicinal_uses:
        "Aspirin is effective in treating pain, inflammation, and fever. It is widely used for conditions such as arthritis, headaches, and muscle pain. It also has cardiovascular benefits, helping to reduce the risk of heart attacks and strokes.",
      antioxidant_properties:
        "Although not a direct antioxidant, aspirin can reduce oxidative stress by inhibiting inflammatory processes. This may contribute to its protective effects on blood vessels and overall cellular health.",
      anti_diabetic_effects:
        "Studies suggest aspirin may enhance insulin sensitivity and reduce chronic inflammation, which is beneficial for diabetic patients. However, it should be used cautiously under medical supervision.",
      heart_health:
        "Aspirin prevents blood clot formation by inhibiting platelet aggregation. It is commonly prescribed for individuals at risk of heart attacks, strokes, and other cardiovascular diseases.",
      anti_cancer_properties:
        "Some research indicates that aspirin may lower the risk of colorectal and other cancers by reducing chronic inflammation and inhibiting tumor growth.",
      immune_support:
        "Aspirin modulates the immune response by reducing inflammation, which can help manage autoimmune conditions and chronic inflammatory disorders.",
      digestive_aid:
        "Long-term use of aspirin may cause digestive issues such as ulcers, but its anti-inflammatory properties may help manage conditions like inflammatory bowel disease.",
    },
    description: "Object of details about medicine",
  })
  details: object;

  @ApiProperty({
    example: {
      name: "Maria Tkachuk",
      avatar: "https://ftp.goit.study/img/avatars/2.jpg",
      testimonial:
        "After starting this medication, I noticed positive changes within a few days. Highly recommended!",
    },
    description: "Object of reviews about medicine",
  })
  reviews: object;
}
