import { RootState } from "../store";

export const selectGeneralStores = (state: RootState) => state.stores.general;
export const selectNearestStores = (state: RootState) => state.stores.nearest;
