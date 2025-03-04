import { Controller, Get } from "@nestjs/common";
import { StoreService } from "./stores.service";
import { Store } from "src/database/schemas/store.schema";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { StoresDto } from "src/dto/store.dto";

@Controller("api/stores")
@ApiResponse({ status: 404, description: "Service not found" })
@ApiResponse({ status: 500, description: "Internal server error" })
export class StoreController {
  constructor(private readonly storesService: StoreService) {}

  @Get()
  @ApiOperation({ summary: "Get common stores for the main page" })
  @ApiResponse({
    status: 200,
    type: StoresDto,
    description: "Successfully got stores",
  })
  async getStores(): Promise<{
    status: number;
    message: string;
    data: Store[];
  }> {
    return {
      status: 200,
      data: await this.storesService.getStores(),
      message: "Successfully got stores",
    };
  }

  @Get("/nearest")
  @ApiOperation({ summary: "Get the nearest stores" })
  @ApiResponse({
    status: 200,
    type: StoresDto,
    description: "Successfully got nearest stores",
  })
  async getNearest(): Promise<{
    status: number;
    message: string;
    data: Store[];
  }> {
    return {
      status: 200,
      data: await this.storesService.getNearest(),
      message: "Successfully got nearest stores",
    };
  }
}
