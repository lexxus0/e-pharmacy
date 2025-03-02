import { Controller, Get, Param } from "@nestjs/common";
import { MedicinesService } from "./medicine.service";
import { Medicine } from "src/database/schemas/medicine.schema";

@Controller("api/products")
export class MedicinesController {
  constructor(private readonly medicinesService: MedicinesService) {}

  @Get()
  async getAll(): Promise<Medicine[]> {
    return this.medicinesService.getAll();
  }

  @Get(":id")
  async getById(@Param("id") id: string): Promise<Medicine | null> {
    return this.medicinesService.getById(id);
  }
}
