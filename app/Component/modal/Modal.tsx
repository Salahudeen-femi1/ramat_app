// components/Modal.tsx
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Modal as RNModal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

interface modalProps {
  children: React.ReactNode;
  onClose: () => void;
  showClose?: boolean;
  customMode?: boolean;
  visible?: boolean;
}

const Modal = ({
  children,
  onClose,
  showClose = true,
  customMode = false,
  visible = true,
}: modalProps) => {
  return (
    <RNModal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      {/* Overlay */}
      <View style={styles.overlay}>
        {customMode ? (
          children
        ) : (
          <View style={styles.container}>
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
        )}
      </View>
    </RNModal>
  );
};

export default Modal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)", // bg-black/80
    justifyContent: "flex-end",
    alignItems: "center",
  },

  container: {
    backgroundColor: "#ffffff",
    // maxWidth: 800, // approximates lg:w-1/2
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    maxHeight: "90%",
    width: "100%",
    flex: 1
  },

  closeBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 100,
    padding: 8,
  }
});