
import React, { createContext, useContext } from "react";
import { Platform } from "react-native";

const padding = {
  screen: Platform.select({
    android: 16,
    ios: 16,
    default: 16,
  }),

  top: Platform.select({
    android: 20,
    ios: 10,
    default: 10,
  }),

  bottom: Platform.select({
    android: 16,
    ios: 20,
    default: 16,
  }),

  horizontal: 16,
  vertical: 16,
};

const PaddingContext = createContext(padding);

export function PaddingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PaddingContext.Provider value={padding}>
      {children}
    </PaddingContext.Provider>
  );
}

export function usePadding() {
  return useContext(PaddingContext);
}