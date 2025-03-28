import { RootState } from "../store";

export const selectCartItems = (state: RootState) => state.cart.cart;
export const selectTotal = (state: RootState) => state.cart.total;
