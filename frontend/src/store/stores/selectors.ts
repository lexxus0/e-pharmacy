import { RootState } from "../store";

export const selectGeneralStores = (state: RootState) => state.stores.general;
export const selectNearestStores = (state: RootState) => state.stores.nearest;
export const selectIsLoading = (state: RootState) => state.stores.isLoading;
