export interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface IState {
  isLoading: boolean;
  error: string | null;
}

export interface IStores {
  name: string;
  address: string;
  city: string;
  phone: string;
  rating: number;
  type: StoreType;
}

export enum StoreType {
  General = "general",
  Nearest = "nearest",
}
