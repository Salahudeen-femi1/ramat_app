import { ImageSourcePropType } from "react-native";

export interface cardType {
    id: string;
    title: string;
    description: string;
    price: number | string;
    image: ImageSourcePropType; 
}

export interface CompletedorderProps {
  id: number;
  label: string;
  ordertag: string;
  date: string;
  time: string;
 }