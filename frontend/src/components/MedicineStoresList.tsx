import { IStores } from "@/interfaces/interfaces";
import MedicineStoreItem from "./MedicineStoreItem";

type MedicineStoresListProps = {
  stores: IStores[];
  location: string;
};

export default function MedicineStoresList({
  stores,
  location,
}: MedicineStoresListProps) {
  return (
    <ul className="flex flex-col gap-5 md:flex-row md:gap-x-4 md:gap-y-8 md:flex-wrap xxl:gap-x-8 xxl:gap-y-[38px]">
      {stores.map((store: IStores) => (
        <MedicineStoreItem store={store} key={store._id} location={location} />
      ))}
    </ul>
  );
}
