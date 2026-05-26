import React from "react";
import { Animated, Easing, Text, TouchableOpacity, View } from "react-native";
import Modal from "./Modal";

interface ConfirmDialogProps {
  isOpen: boolean;
  title?: string;
  message?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onCancel: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

const ConfirmDialog = ({
  isOpen,
  title = "Are you sure you want to logout?",
  message = "This action cannot be undone.",
  confirmText = "Yes, Confirm",
  cancelText = "Cancel",
  onCancel,
  onConfirm,
  isLoading = false,
}: ConfirmDialogProps) => {
  const scale = React.useRef(new Animated.Value(0.85)).current;
  const opacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (isOpen) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 220,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          friction: 8,
          tension: 80,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.85,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isOpen, opacity, scale]);

  if (!isOpen) return null;

  return (
    <Modal onClose={onCancel} customMode visible={isOpen}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%" }} >
        <Animated.View
          style={{
            width: "90%",
            maxWidth: 520,
            backgroundColor: "white",
            borderRadius: 12,
            padding: 20,
            opacity: opacity,
            transform: [{ scale }],
          }}
        >
          <Text className="text-xl font-semibold mb-4">{title}</Text>
          <View className="mb-6">
            {typeof message === "string" ? (
              <Text className="text-pryClr">{message}</Text>
            ) : (
              message
            )}
          </View>
          <View className="flex flex-col md:flex-row gap-4 justify-center items-center">
            {cancelText && (
              <TouchableOpacity
                onPress={onCancel}
                className="w-full md:w-1/2 h-[50px] rounded-lg flex justify-center items-center font-medium disabled:opacity-50"
                disabled={isLoading}
              >
                <Text className="text-gray-600">{cancelText}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={onConfirm}
              className="w-full md:w-1/2 h-[50px] bg-red-600 text-medium flex justify-center items-center rounded-lg disabled:opacity-50"
              disabled={isLoading}
            >
              <Text className="text-white">
                {isLoading ? "Please wait..." : confirmText}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};
             
export default ConfirmDialog;
