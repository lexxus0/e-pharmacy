import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Cart } from "src/database/schemas/cart.schema";
import { Medicine } from "src/database/schemas/medicine.schema";

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<Cart>) {}

  async getCart(userId: string): Promise<{ data: Cart; items: number }> {
    const cart = await this.cartModel
      .findOne({ userId, status: "active" })
      .populate("items.medicineId");

    if (!cart) {
      throw new NotFoundException("The cart is empty.");
    }

    return {
      data: cart,
      items: cart.items.length,
    };
  }

  async updateCart(userId: string, medicineId: string, quantity: number) {
    let cart = await this.cartModel.findOne({ userId, status: "active" });

    if (!cart) {
      cart = new this.cartModel({ userId, items: [], status: "active" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.medicineId.toString() === medicineId
    );

    if (itemIndex !== -1) {
      cart.items[itemIndex].quantity = quantity;
    } else {
      cart.items.push({ medicineId: new Types.ObjectId(medicineId), quantity });
    }

    await cart.save();

    return this.cartModel
      .findOne({ _id: cart._id })
      .populate("items.medicineId");
  }

  async checkout(
    userId: string,
    name: string,
    email: string,
    phone: string,
    address: string
  ) {
    const cart = await this.cartModel.findOne({ userId, status: "active" });

    if (!cart || cart.items.length === 0) {
      throw new NotFoundException("The cart is empty");
    }

    cart.status = "completed";
    cart.customerInfo = { name, email, phone, address };

    await cart.save();

    return { message: "Order placed successfully." };
  }

  async removeItem(userId: string, itemId: string) {
    const cart = await this.cartModel.findOne({ userId, status: "active" });

    if (!cart) {
      throw new NotFoundException("Cart not found");
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.medicineId.toString() === itemId
    );

    if (itemIndex === -1) {
      throw new NotFoundException("Item not found in cart");
    }

    cart.items.splice(itemIndex, 1);
    await cart.save();

    return { message: "Item removed successfully." };
  }
}
