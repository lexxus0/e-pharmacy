import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from "@nestjs/common";
import { StoreService } from "./stores.service";
import { Store } from "src/database/schemas/store.schema";

@Controller("stores")
export class StoreController {
  constructor(private readonly storesService: StoreService) {}

  @Get()
  async getStores(): Promise<Store[]> {
    return this.storesService.getStores();
  }

  @Get("/nearest")
  async getNearest(): Promise<Store[]> {
    return this.storesService.getNearest();
  }
}
