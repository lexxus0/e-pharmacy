import { Controller, Get, Param, Query } from "@nestjs/common";
import { MedicinesService } from "./medicine.service";
import { Medicine } from "src/database/schemas/medicine.schema";

@Controller("api/products")
export class MedicinesController {
  constructor(private readonly medicinesService: MedicinesService) {}

  @Get()
  async getAll(
    @Query("page") page: string,
    @Query("limit") limit: string,
    @Query("category") category: string,
    @Query("keyword") keyword: string
  ) {
    return this.medicinesService.getAll(
      Number(page),
      Number(limit),
      category,
      keyword
    );
  }

  @Get(":id")
  async getById(@Param("id") id: string): Promise<Medicine | null> {
    return this.medicinesService.getById(id);
  }
}
