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

  async getHistory(userId: string): Promise<Cart[]> {
    const carts = await this.cartModel.find({ userId, status: "completed" });
    if (carts.length === 0) {
      throw new NotFoundException("You haven't any completed orders yet.");
    }
    return carts;
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
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ medicineId: new Types.ObjectId(medicineId), quantity });
    }

    return cart.save();
  }

  async checkout(userId: string) {
    const cart = await this.cartModel
      .findOne({ userId, status: "active" })
      .populate("items.medicineId");

    if (!cart || cart.items.length === 0) {
      throw new NotFoundException("The cart is empty");
    }

    let sum = 0;
    for (const item of cart.items) {
      const medicine = item.medicineId as Medicine;
      sum += medicine.price * item.quantity;
    }

    cart.status = "completed";
    await cart.save();

    return {
      message: "Order placed.",
      totalAmount: Math.round(sum * 100) / 100,
    };
  }
}
