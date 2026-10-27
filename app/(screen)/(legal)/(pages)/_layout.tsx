import { Feather } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

export default function ProfilePagesLayout() {
    return (
        <Stack
            screenOptions={{
                headerLeft: () => (
                    <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
                        <Feather name="chevron-left" size={24} color="#201C1C" />
                    </TouchableOpacity>
                ),
                headerShadowVisible: false,
                headerTitleAlign: "center",
            }}
        >
            <Stack.Screen
                name="PrivacyPolicyScreen"
                options={{ title: "Privacy Policy" }}
            />
            <Stack.Screen
                name="TermOfUse"
                options={{ title: "Terms of Use" }}
            />
            <Stack.Screen
                name="HelpCenterScreen"
                options={{ title: "Help Center" }}
            />
            <Stack.Screen
                name="ContactSupportScreen"
                options={{ title: "Contact Support" }}
            />
            <Stack.Screen
                name="RateScreen"
                options={{ title: "Rate Our App" }}
            />
        </Stack>
    );
}
