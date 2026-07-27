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
    extras?: Extra[]
}

export interface CompletedorderProps {
  id: number;
  label: string;
  ordertag: string;
  date: string;
  time: string;
 }