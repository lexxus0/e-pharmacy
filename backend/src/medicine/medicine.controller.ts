import { Controller, Get, Param, Query } from "@nestjs/common";
import { MedicinesService } from "./medicine.service";
import { Medicine } from "src/database/schemas/medicine.schema";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { MedicineResponseDto } from "src/dto/medicine-response.dto";
import { MedicineByIdResponseDto } from "src/dto/medicine-by-id.dto";
@ApiTags("Products")
@Controller("api/products")
export class MedicinesController {
  constructor(private readonly medicinesService: MedicinesService) {}

  @Get()
  @ApiOperation({ summary: "Get paginated list of medicine products" })
  @ApiResponse({
    status: 200,
    type: MedicineResponseDto,
    description: "Successfully received medicine",
  })
  @ApiResponse({ status: 404, description: "Service not found" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  async getAll(
    @Query("page") page: string,
    @Query("limit") limit: string,
    @Query("category") category: string,
    @Query("keyword") keyword: string
  ) {
    return {
      status: 200,
      data: await this.medicinesService.getAll(
        Number(page),
        Number(limit),
        category,
        keyword
      ),
      message: "Successfully received medicine",
    };
  }

  @Get(":id")
  @ApiOperation({ summary: "Get detailed info of medicine by id" })
  @ApiResponse({
    status: 200,
    type: MedicineByIdResponseDto,
    description: "Successfully received medicine by id",
  })
  @ApiResponse({ status: 404, description: "Service not found" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  async getById(@Param("id") id: string): Promise<{
    status: number;
    message: string;
    data: Medicine;
  } | null> {
    return {
      status: 200,
      data: await this.medicinesService.getById(id),
      message: "Successfully received medicine by id",
    };
  }
}
