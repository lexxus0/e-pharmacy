export interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface IState {
  isLoading: boolean;
  error: string | null;
}

export interface IStores {
  _id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  rating: number;
  type: StoreType;
}

export interface IReviews {
  _id: string;
  name: string;
  avatar: string;
  testimonial: string;
}

export enum StoreType {
  General = "general",
  Nearest = "nearest",
}
