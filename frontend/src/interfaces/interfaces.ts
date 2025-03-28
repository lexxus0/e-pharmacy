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
  status: StoreStatus;
}

export interface IReviews {
  _id: string;
  name: string;
  avatar: string;
  testimonial: string;
  score: number;
  date: string;
}
export enum StoreType {
  General = "general",
  Nearest = "nearest",
}

export enum StoreStatus {
  Open = "open",
  Close = "close",
}

export interface IMedicineResponse {
  totalItems: number;
  limit: number;
  totalPages: number;
  currentPage: number;
  items: IMedicine[];
}

export interface IMedicine {
  _id: string;
  name: string;
  photo: string;
  suppliers: string;
  price: number;
  stock: number;
  category: string;
}

export interface IMedicineItem {
  _id: string;
  name: string;
  photo: string;
  suppliers: string;
  price: number;
  stock: number;
  details: IDetails;
  reviews: IReviews[];
}

export interface IDetails {
  description: string;
  medicinal_uses: string;
  antioxidant_properties: string;
  anti_diabetic_effects: string;
  heart_health: string;
  anti_cancer_properties: string;
  immune_support: string;
  digestive_aid: string;
}

export interface IUser {
  name?: string;
  email: string;
  phone?: string;
  password?: string;
}

export interface IUserResponse {
  user: IUser;
  token: string;
  refreshToken?: string;
}

export interface ICart {
  medicineId: IMedicine;
  quantity: number;
  _id: string;
}

export interface ICartResponse {
  _id: string;
  items: ICart[];
  status: CartStatus;
}

export enum CartStatus {
  Open = "open",
  Close = "close",
}
