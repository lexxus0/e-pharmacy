import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchMedicine, fetchMedicineById } from "./operations";
import {
  IMedicine,
  IMedicineItem,
  IMedicineResponse,
} from "@/interfaces/interfaces";
import { handlePending, handleRejected } from "../init";

interface MedicineState {
  medicine: IMedicine[];
  item: IMedicineItem | null;
  totalItems: number | null;
  limit: number | null;
  totalPages: number | null;
  currentPage: number | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: MedicineState = {
  medicine: [],
  item: null,
  totalItems: null,
  limit: null,
  totalPages: null,
  currentPage: null,
  isLoading: false,
  error: null,
};

const medicineSlice = createSlice({
  name: "medicine",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMedicine.pending, (state) => {
        handlePending(state);
      })
      .addCase(
        fetchMedicine.fulfilled,
        (state, action: PayloadAction<IMedicineResponse>) => {
          state.isLoading = false;
          state.medicine = action.payload.items;
          state.totalItems = action.payload.totalItems;
          state.limit = action.payload.limit;
          state.totalPages = action.payload.totalPages;
          state.currentPage = action.payload.currentPage;
        }
      )
      .addCase(fetchMedicine.rejected, (state, action) => {
        handleRejected(state, action);
      })
      .addCase(fetchMedicineById.pending, (state) => {
        handlePending(state);
      })
      .addCase(
        fetchMedicineById.fulfilled,
        (state, action: PayloadAction<IMedicineItem>) => {
          state.isLoading = false;
          state.item = action.payload;
        }
      )
      .addCase(fetchMedicineById.rejected, (state, action) => {
        handleRejected(state, action);
      });
  },
});

export default medicineSlice.reducer;
