import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  Req,
  UseGuards,
  UnauthorizedException,
} from "@nestjs/common";
import { CartService } from "./cart.service";
import { JwtAuthGuard } from "src/guards/auth.guard";

@Controller("api/cart")
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getCart(@Req() req) {
    return this.cartService.getCart(req.user.userId);
  }

  @Get("history")
  async getHistory(@Req() req) {
    return this.cartService.getHistory(req.user.userId);
  }

  @Put("update")
  async updateCart(@Req() req, @Body() body) {
    return this.cartService.updateCart(
      req.user.userId,
      body.medicineId,
      body.quantity
    );
  }

  @Post("checkout")
  async checkout(@Req() req) {
    return this.cartService.checkout(req.user.userId);
  }
}
