// components/Modal.tsx

import { toastConfig } from "@/helper/toast";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Modal as RNModal,
  StyleSheet,
  TouchableOpacity,
  View,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import Toast from "react-native-toast-message";

interface modalProps {
  children: React.ReactNode;
  onClose: () => void;
  showClose?: boolean;
  customMode?: boolean;
  visible?: boolean;
  position?: "top" | "bottom";
}

const SearchModal = ({
  children,
  onClose,
  showClose = true,
  customMode = false,
  visible = true,
  position = "bottom",
}: modalProps) => {
  return (
    <RNModal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      {/* Overlay */}
      {customMode ? (
        <Pressable
          style={[styles.overlay, position === "top" ? styles.overlayTop : styles.overlayBottom]}
          onPress={onClose}
        >
          <TouchableWithoutFeedback style={{ width: "100%" }}>
            {children}
          </TouchableWithoutFeedback>
        </Pressable>
      ) : (
        <Pressable
          style={[styles.overlay, position === "top" ? styles.overlayTop : styles.overlayBottom]}
          onPress={onClose}
        >
          <TouchableWithoutFeedback>
            <View style={[styles.container, position === "top" ? styles.containerTop : styles.containerBottom]}>
              {showClose && (
                <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                  <View className="flex-1 bg-gray-100 w-10 h-10 items-center justify-center rounded-full">
                    {/* Simple close icon replacement */}
                    <Ionicons name="close-outline" size={22} />
                  </View>
                </TouchableOpacity>
              )}
              {children}
            </View>
          </TouchableWithoutFeedback>
        </Pressable>
      )}

      <Toast config={toastConfig} />
    </RNModal>
  );
};

export default SearchModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    alignItems: "center",
  },
  overlayTop: {
    justifyContent: "flex-start",
  },
  overlayBottom: {
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "#F4F6F1",
    width: "100%",
    maxWidth: 600,
    maxHeight: "20%",
    minHeight: "10%"
  },
  containerTop: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  containerBottom: {
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  closeBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 100,
    padding: 8,
  }
});