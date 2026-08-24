import { ImageSourcePropType } from "react-native";

export interface Extra {
  id: string;
  label: string;
  price: number | string;
}

export interface cardType {
  id: string;
  title: string;
  description: string;
  price: number | string;
  image: ImageSourcePropType;
  extras?: Extra[];
}

export interface CompletedorderProps {
  id: number;
  label: string;
  ordertag: string;
  date: string;
  time: string;
}

export interface Extras {
  id: string;
  label: string;
  price: string | number;
}

export interface FoodProps {
  id: string;
  title: string;
  description: string;
  category: string;
  price: string | number;
  extras?: Extras[];
  image: ImageSourcePropType;
}

export type ResponseProps = {
  items: FoodProps[]
}

export interface OngoingOrderProps {
  status: string;
  orderName: string;
  amount: string;
}

export interface martItem {
  id: string;
  title: string;
  description: string;
  price: string | number;
  category: string;
  image: ImageSourcePropType;
  extras?: Extras[]
}

export interface RegisterFormValues {
  phone: string;
  email: string;
  first_name: string;
  last_name: string;
  gender: string;
  marketing?: boolean;
  pin: string;
}