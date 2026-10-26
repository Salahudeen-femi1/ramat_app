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

const profilePage = [
  {
    id: 1,
    title: "Profile Details",
    icon: "person-circle-outline",
    route: "/(screen)/(profile)",
  },
  {
    id: 2,
    title: "Legal",
    icon: "wallet-outline",
    route: "/(screen)/(legal)",
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
        <View className="items-center pt-28 bg-primary rounded-b-[50px] h-[350px] relative overflow-hidden">

          {/* Avatar */}
          <View className="w-[150px] h-[150px] rounded-full border-[10px] border-[#E8E8E8] items-center justify-center fixed z-10 overflow-hidden">
            <Image
              source={{
                uri: "https://i.pinimg.com/1200x/97/bb/06/97bb067e30ff6b89f4fbb7b9141025ca.jpg",
              }}
              style={{ width: 150, height: 150 }}
              alt={user?.first_name}
            />
          </View>

          <View className="bg-white/10 h-60 w-60 rounded-full absolute -left-20 top-3" />
          <View className="bg-white/10 h-60 w-60 rounded-full absolute -right-10 bottom-0" />
          {/* Name */}
          <Text className="text-white text-[25px] font-poppinsMedium uppercase mt-3"
          >
            {displayName}
          </Text>

          {/* Email */}
          <View className="flex-row items-center gap-2 px-6 py-2 rounded-full bg-white/20 mt-1">
            <Ionicons name="mail-outline" size={22} color="white" />
            <Text className="text-white text-[18px] font-poppinsMedium">
              {displayEmail}
            </Text>
          </View>

        </View>

        {/* White Main Content */}
        <View className="mx-5 my-10 rounded-[30px] p-7 bg-gray-100 ">

          {profilePage.map((item, index) => (
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
                  <Text className="text-18px] text-black font-poppinsMedium">
                    {item.title}
                  </Text>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={22}
                  color="#7C7C7C"
                />
              </TouchableOpacity>

              {index !== profilePage.length - 1 && (
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

            <Text className="text-[#C62828] text-[18px] font-poppinsMedium">
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