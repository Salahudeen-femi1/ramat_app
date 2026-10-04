import { image as fallbackImages } from "@/app/constants/image";
import { ImageSourcePropType } from "react-native";

/** Convert API, saved-cart, and bundled image values into a safe RN source. */
export const getImageSource = (value: unknown): ImageSourcePropType => {
  if (typeof value === "number") return value;

  if (typeof value === "string") {
    const uri = value.trim();
    return uri ? { uri } : fallbackImages.image;
  }

  if (value && typeof value === "object" && "uri" in value) {
    const uri = (value as { uri?: unknown }).uri;
    if (typeof uri === "string" && uri.trim()) return { uri: uri.trim() };
  }

  return fallbackImages.image;
};
