import {
  Feather,
  Ionicons,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import ConfirmDialog from "../Component/modal/ConfirmDialog";
import { useAuth } from "@/context/AuthContext";

const menuItems = [
  {
    id: 1,
    title: "Profile Details",
    icon: "person-circle-outline",
    route: "/pages/ProfileDetails",
  },
  {
    id: 2,
    title: "Legal",
    icon: "wallet-outline",
    route: "/pages/Legal",
  }
];

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const [openModal, setOpenModal] = React.useState(false);

  const handleMenuPress = (route: string) => {
    Toast.show({
      type: "success",
      text1: "Opening",
      text2: `Navigating to ${route}`,
    });

    router.push(route as any);
  };

  const handleLogout = () => {
    setOpenModal(true);
  };

  const handleEditProfile = () => {
    Toast.show({
      type: "info",
      text1: "Edit Profile",
      text2: "Profile editing coming soon",
    });
  };

  const handleConfirmLogout = async () => {
    try {
      await signOut();
      setOpenModal(false);
      Toast.show({ type: 'success', text1: 'Logged Out', text2: 'See you again soon' });
      // Navigation will be handled by the root layout based on auth state
    } catch (error) {
      console.error("Logout failed:", error);
      Toast.show({ type: 'error', text1: 'Error', text2: 'Failed to logout' });
    }
  };

  const displayName = user ? `${user.first_name} ${user.last_name}` : "User";
  const displayEmail = user?.email || "user@example.com";

  return (
    <View className="flex-1 bg-white ">

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >

        {/* Profile Section */}
        <View className="items-center pt-28">

          {/* Avatar */}
          <View className="w-[170px] h-[170px] rounded-full border-[10px] border-[#E8E8E8] items-center justify-center overflow-hidden">
            <Image
              source={{
                uri: "https://i.pinimg.com/736x/b8/d4/9b/b8d49b88ebb79c9187d82cc8f0fe4e3a.jpg",
              }}
              style={{ width: 250, height:250 }}
              alt={user?.first_name}
            />
          </View>

          {/* Name */}
          <Text className="text-primary text-[30px] font-medium uppercase mt-6"
          >
            {displayName}
          </Text>

          {/* Email */}
          <Text className="text-[#787878] text-[18px] mt-2 font-medium">
            {displayEmail}
          </Text>
        </View>

        {/* White Main Content */}
        <View className="mt-10 px-5 pt-7 pb-10">

          {menuItems.map((item, index) => (
            <View key={item.id}>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  handleMenuPress(item.route)
                }
                className="flex-row items-center justify-between py-6"
              >

                <View className="flex-row items-center gap-5">

                  {/* Icon Circle */}
                  <View className="w-16 h-16 rounded-full bg-[#EEF1E8] items-center justify-center">

                    <Ionicons
                      name={item.icon as any}
                      size={22}
                      color="#14532D"
                    />
                  </View>

                  {/* Title */}
                  <Text className="text-18px] text-black font-medium">
                    {item.title}
                  </Text>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={22}
                  color="#7C7C7C"
                />
              </TouchableOpacity>

              {index !== menuItems.length - 1 && (
                <View className="h-[1px] bg-[#ECECE7]" />
              )}
            </View>
          ))}

          {/* Logout */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleLogout}
            className="py-5 flex-row items-center gap-5"
          >

            <View className="w-14 h-14 rounded-full bg-[#F6B8B8] items-center justify-center">

              <MaterialCommunityIcons
                name="logout"
                size={22}
                color="#C62828"
              />
            </View>

            <Text className="text-[#C62828] text-[18px] font-semibold">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <ConfirmDialog
        isOpen={openModal}
        title="Are you sure?"
        message="This action cannot be undone."
        confirmText="Yes, Confirm"
        cancelText="Cancel"
        onCancel={() => setOpenModal(false)}
        onConfirm={handleConfirmLogout}
        isLoading={false}
      />


    </View>
  );
}