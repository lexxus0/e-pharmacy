import { RootState } from "../store";

export const selectMedicine = (state: RootState) => state.medicine.medicine;
export const selectTotalPages = (state: RootState) => state.medicine.totalPages;
export const selectMedicineItem = (state: RootState) => state.medicine.item;
