import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  Req,
  UseGuards,
} from "@nestjs/common";
import { CartService } from "./cart.service";
import { JwtAuthGuard } from "src/guards/auth.guard";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";
import { UpdateCartDto } from "src/dto/update-cart.dto";

@Controller("api/cart")
@UseGuards(JwtAuthGuard)
@ApiResponse({ status: 401, description: "Unauthorized" })
@ApiResponse({ status: 404, description: "Service not found" })
@ApiResponse({ status: 500, description: "Internal server error" })
@ApiBearerAuth()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @ApiOperation({ summary: "Get cart of user's items" })
  @ApiResponse({
    status: 200,
    description: "Successfully got cart",
    example: {
      _id: "67c5f575e5dfd287869e8560",
      userId: "67c4d524275bc5d350c95172",
      items: [
        {
          medicineId: "67c3479b9167ae929133edb3",
          quantity: 2,
          _id: "67c5f575e5dfd287869e8561",
        },
        {
          medicineId: "67c3479b9167ae929133edb1",
          quantity: 5,
          _id: "67c5f581e5dfd287869e8565",
        },
      ],
      status: "active",
    },
  })
  async getCart(@Req() req) {
    return {
      status: 200,
      data: await this.cartService.getCart(req.user.userId),
      message: "Successfully got cart",
    };
  }

  @Put("update")
  @ApiOperation({ summary: "Update cart" })
  @ApiBody({ type: UpdateCartDto })
  @ApiResponse({
    status: 200,
    description: "Successfully updated cart",
    example: {
      _id: "67c5f575e5dfd287869e8560",
      userId: "67c4d524275bc5d350c95172",
      items: [
        {
          medicineId: "67c3479b9167ae929133edb3",
          quantity: 2,
          _id: "67c5f575e5dfd287869e8561",
        },
        {
          medicineId: "67c3479b9167ae929133edb1",
          quantity: 5,
          _id: "67c5f581e5dfd287869e8565",
        },
      ],
      status: "active",
    },
  })
  async updateCart(@Req() req, @Body() body) {
    return {
      status: 200,
      data: await this.cartService.updateCart(
        req.user.userId,
        body.medicineId,
        body.quantity
      ),
      message: "Successfully updated cart",
    };
  }

  @Post("checkout")
  @ApiResponse({
    status: 200,
    description: "Successfully checked out",
    example: {
      message: "Order placed.",
      totalAmount: 555.81,
    },
  })
  @ApiOperation({ summary: "Set order to completed and get full price" })
  async checkout(@Req() req) {
    return {
      status: 200,
      data: await this.cartService.checkout(req.user.userId),
      message: "Successfully checked out",
    };
  }
}
