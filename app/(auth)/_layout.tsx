import { Stack } from "expo-router";
import React from "react";

export default function AuthLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="register/index" />
            <Stack.Screen name="login" />
            <Stack.Screen name="forgotten_password" />
            <Stack.Screen name="verify_email/index" />
        </Stack>
    );
}
