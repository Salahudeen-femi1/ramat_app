import { AuthProvider, useAuth } from "@/context/AuthContext";
import { setupInterceptors } from "@/helper/axios";
import { Feather } from "@expo/vector-icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router, Stack } from "expo-router";
import { useEffect } from "react";
import { Pressable } from "react-native";
import './globals.css';

const queryClient = new QueryClient();

function RootLayoutContent() {
  const { isLoggedIn, isLoading, signOut, onboardingStatus } = useAuth();

  // Setup axios interceptors with logout callback
  useEffect(() => {
    setupInterceptors(signOut);
  }, [signOut]);

  // Handle routing based on auth state
  useEffect(() => {
    if (isLoading) return;

    if (!isLoggedIn) {
      // Redirect to login if not authenticated
      router.replace("/(auth)/login");
    } else if (isLoggedIn && onboardingStatus === "incomplete") {
      // Redirect to onboarding if not completed
      router.replace("/(onboarding)/stepOne");
    } else if (isLoggedIn && onboardingStatus === "complete") {
      // Redirect to main app if authenticated and onboarded
      router.replace("/(tabs)");
    }
  }, [isLoggedIn, isLoading, onboardingStatus]);

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="(auth)"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="(onboarding)"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="movie/[id]"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="pages/Cart"
        options={{
          headerShown: true,
          title: 'My Order',

          // Normal React Native styles
          headerStyle: {
            backgroundColor: '#fff',
          },

          headerTitleStyle: {
            fontSize: 18,
            fontWeight: '300',
            color: '#000',
          },

          headerShadowVisible: false,

          headerTitleAlign: 'center',

          // Tailwind works here
          headerLeft: () => (
            <Pressable
              onPress={() => router.back()}
              className="ml-2 p-2 rounded-full bg-gray-100 active:opacity-70"
            >
              <Feather
                name="chevron-left"
                size={24}
                color="black"
              />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="pages/Checkout"
        options={{
          headerShown: true,
          title: 'Checkout',

          // Normal React Native styles
          headerStyle: {
            backgroundColor: '#fff',
          },

          headerTitleStyle: {
            fontSize: 20,
            fontWeight: '300',
            color: '#000',
          },

          headerShadowVisible: false,

          headerTitleAlign: 'center',

          // Tailwind works here
          headerLeft: () => (
            <Pressable
              onPress={() => router.back()}
              className="ml-2 p-2 rounded-full bg-gray-100 active:opacity-70"
            >
              <Feather
                name="chevron-left"
                size={24}
                color="black"
              />
            </Pressable>
          ),
        }}
      />

    </Stack>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RootLayoutContent />
      </AuthProvider>
    </QueryClientProvider>
  );
}
