import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

const contactsPage = [
  {
    title: "Email Support",
    icon: "mail-outline",
    contact: "support@ramatPickup.com",
    note: "Send us an email and we will get back to you.",
    buttonText: "Email us"
  },
  {
    title: "Phone Support",
    icon: "call-outline",
    contact: "07049193149",
    note: "Speak directly with our customer support team.",
    buttonText: "Call us"
  },
] as const;

const ContactSupport = () => {
  return (
    <View className="flex-1 bg-white px-5 pt-8">
      <Text className="mt-2 mb-7 text-center text-[20px] text-gray-500 font-poppinsRegular w-50">
        Our team is here to help with any questions or issues.
      </Text>

      {contactsPage.map((contact) => (
        <View
          key={contact.title}
          className="mb-10 rounded-3xl border border-[#E8E8E8] bg-white p-5 py-8 shadow-sm"
        >
          <View className="flex-row items-center gap-4">
            <View className="h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#EEF1E8]">
              <Ionicons name={contact.icon} size={24} color="#14532D" />
            </View>

            <View className="flex-1">
              <Text className="text-[18px] text-black font-poppinsMedium">
                {contact.title}
              </Text>
              <Text className="mt-1 text-[16px] text-[#14532D] font-poppinsMedium">
                {contact.contact}
              </Text>
              <Text className="mt-1 text-[14px] leading-5 text-gray-500 font-poppinsRegular">
                {contact.note}
              </Text>
            </View>
          </View>

          <Pressable
            className="mt-5 w-3xl items-center rounded-3xl bg-primary px-5 py-3"
            onPress={() => router.push("/")}
          >
            <Text className="text-[16px] text-white font-poppinsMedium">
              {contact.buttonText}
            </Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
};

export default ContactSupport;
