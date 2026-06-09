import {
  Feather,
  Ionicons,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import { router } from "expo-router";
// import { router } from "expo-router";
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

  const [openModal, setOpenModal] = React.useState(false)

  const handleMenuPress = (route: string) => {
    Toast.show({
      type: "success",
      text1: "Opening",
      text2: `Navigating to ${route}`,
    });

    router.push(route as any);
  };

  const handleLogout = () => {
    Toast.show({
      type: "success",
      text1: "Logged Out",
      text2: "See you again soon 👋",
    });

  setOpenModal(true);
  };

  const handleEditProfile = () => {
    Toast.show({
      type: "info",
      text1: "Edit Profile",
      text2: "Profile editing coming soon",
    });
  };

  return (
    <View className="flex-1 ">

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >

        {/* Profile Section */}
        <View className="items-center pt-28">

          {/* Avatar */}
          <View className="relative">

            <View className="w-[170px] h-[170px] rounded-full border-[10px] border-[#E8E8E8] items-center justify-center overflow-hidden">
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400",
                }}
                className="w-full h-full"
              />
            </View>

            {/* Edit Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleEditProfile}
              className="absolute bottom-3 right-2 bg-primary w-14 h-14 rounded-full items-center justify-center"
            >
              <Feather
                name="edit-2"
                size={22}
                color="white"
              />
            </TouchableOpacity>
          </View>

          {/* Name */}
          <Text className="text-primary text-[30px] font-semibold mt-6">
            Zinhle Mkhize
          </Text>

          {/* Email */}
          <Text className="text-[#787878] text-[18px] mt-2 font-medium">
            zinhle.m@kula.app
          </Text>
        </View>

        {/* White Main Content */}
        <View className="bg-[#F8F8F4] mt-10 px-5 pt-7 pb-10">

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
        onConfirm={() => {
          // perform logout actions here
          setOpenModal(false)
          Toast.show({ type: 'success', text1: 'Logged Out', text2: 'See you again soon' })
        }}
        isLoading={false}
      />

    </View>
  );
}