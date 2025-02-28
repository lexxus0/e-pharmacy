import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Medicine, MedicineSchema } from "src/database/schemas/medicine.schema";
import { MedicinesService } from "./medicine.service";
import { MedicinesController } from "./medicine.controller";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Medicine.name, schema: MedicineSchema },
    ]),
  ],
  controllers: [MedicinesController],
  providers: [MedicinesService],
})
export class MedicinesModule {}
