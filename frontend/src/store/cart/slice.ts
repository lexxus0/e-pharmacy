import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getCart,
  updateCart,
  checkout,
  deleteItemFromCart,
} from "./operations";
import { ICart } from "@/interfaces/interfaces";
import { handlePending, handleRejected } from "../init";

interface CartState {
  cart: ICart[];
  localCart: ICart[];
  total: number | null;
  isLoading: boolean;
  error: null;
}

const initialState: CartState = {
  cart: [],
  localCart: [],
  total: null,
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.cart.find(
        (i) => i.medicineId._id === action.payload.id
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        handlePending(state);
      })
      .addCase(getCart.fulfilled, (state, action: PayloadAction<ICart>) => {
        state.cart = Array.isArray(action.payload) ? action.payload : [];
        state.isLoading = false;
      })
      .addCase(getCart.rejected, (state, action) => {
        handleRejected(
          state,
          action as { payload: string | undefined; type: string }
        );
      })
      .addCase(updateCart.pending, (state) => {
        handlePending(state);
      })
      .addCase(
        updateCart.fulfilled,
        (state, action: PayloadAction<ICart[]>) => {
          state.cart = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(updateCart.rejected, (state, action) => {
        handleRejected(
          state,
          action as { payload: string | undefined; type: string }
        );
      })
      .addCase(checkout.pending, (state) => {
        handlePending(state);
      })
      .addCase(checkout.fulfilled, (state) => {
        state.cart = [];
      })
      .addCase(checkout.rejected, (state, action) => {
        handleRejected(
          state,
          action as { payload: string | undefined; type: string }
        );
      })
      .addCase(deleteItemFromCart.pending, (state) => {
        handlePending(state);
      })
      .addCase(
        deleteItemFromCart.fulfilled,
        (state, action: PayloadAction<{ itemId: string }>) => {
          state.cart = state.cart.filter(
            (item) => item.medicineId._id !== action.payload.itemId
          );
          state.isLoading = false;
        }
      )
      .addCase(deleteItemFromCart.rejected, (state, action) => {
        handleRejected(
          state,
          action as { payload: string | undefined; type: string }
        );
      });
  },
});

export const { updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
