import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchGeneralStores, fetchNearestStores } from "./operations";
import { IStores } from "@/interfaces/interfaces";
import { handlePending, handleRejected } from "../init";

export interface StoresState {
  general: IStores[];
  nearest: IStores[];
  isLoading: boolean;
  error: string | null;
}

const initialState: StoresState = {
  general: [],
  nearest: [],
  isLoading: false,
  error: null,
};

const storesSlice = createSlice({
  name: "stores",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGeneralStores.pending, (state) => {
        handlePending(state);
      })
      .addCase(
        fetchGeneralStores.fulfilled,
        (state, action: PayloadAction<IStores[]>) => {
          state.isLoading = false;
          state.general = action.payload;
        }
      )
      .addCase(fetchGeneralStores.rejected, (state, action) => {
        handleRejected(state, action);
      })
      .addCase(fetchNearestStores.pending, (state) => {
        handlePending(state);
      })
      .addCase(
        fetchNearestStores.fulfilled,
        (state, action: PayloadAction<IStores[]>) => {
          state.isLoading = false;
          state.nearest = action.payload;
        }
      )
      .addCase(fetchNearestStores.rejected, (state, action) => {
        handleRejected(state, action);
      });
  },
});

export default storesSlice.reducer;
