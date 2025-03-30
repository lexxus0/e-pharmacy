import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  Req,
  UseGuards,
  Param,
  Delete,
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
import { checkoutCartDto } from "src/dto/checkout-cart.dto";

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

  @Post("checkout/:userId")
  @ApiOperation({ summary: "Checkout user's cart" })
  @ApiBody({ type: checkoutCartDto })
  @ApiResponse({
    status: 200,
    description: "Successfully checked out",
  })
  @ApiResponse({ status: 404, description: "User not found" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  async checkout(
    @Param("userId") userId: string,
    @Body("name") name: string,
    @Body("email") email: string,
    @Body("phone") phone: string,
    @Body("address") address: string
  ) {
    return await this.cartService.checkout(userId, name, email, phone, address);
  }

  @Delete(":userId/item/:itemId")
  @ApiOperation({ summary: "Remove an item from the user's cart" })
  @ApiResponse({
    status: 200,
    example: {
      _id: {
        _id: "67c5f575e5dfd287869e8560",
      },
    },
  })
  @ApiResponse({ status: 404, description: "Item not found in cart" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  async removeItem(
    @Param("userId") userId: string,
    @Param("itemId") itemId: string
  ) {
    return await this.cartService.removeItem(userId, itemId);
  }
}
