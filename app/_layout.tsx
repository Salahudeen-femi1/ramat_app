import { AuthProvider, useAuth } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { PaddingProvider } from "@/context/PaddingProvider";
import { setupInterceptors } from "@/helper/axios";
import { toastConfig } from "@/helper/toast";
import {
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
  useFonts,
} from "@expo-google-fonts/poppins";
import { Feather } from "@expo/vector-icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect } from "react";
import { Pressable, StatusBar } from "react-native";
import Toast from "react-native-toast-message";
import './globals.css';

const queryClient = new QueryClient();

function RootLayoutContent() {
  const { isLoggedIn, isLoading, signOut, onboardingStatus } = useAuth();

  // Setup axios interceptors with logout callback
  useEffect(() => {
    setupInterceptors(signOut);
  }, [signOut]);

  const checkAuth = useCallback(() => {
    if (isLoggedIn) {
      if (onboardingStatus === "complete") {
        router.replace("/(tabs)")
      } else {
        router.replace("/(onboarding)/stepOne");
      }
    } else {
      router.replace("/(auth)/login")
    }
  }, [isLoggedIn, onboardingStatus])

  // Handle routing based on auth state
  useEffect(() => {
    if (isLoading) return;
    checkAuth()
  }, [isLoading, checkAuth]);

  const [fontsLoaded, error] = useFonts({
    poppinsThin: Poppins_100Thin,
    poppinsExtraLight: Poppins_200ExtraLight,
    poppinsLight: Poppins_300Light,
    poppinsRegular: Poppins_400Regular,
    poppinsMedium: Poppins_500Medium,
    poppinsSemiBold: Poppins_600SemiBold,
    poppinsBold: Poppins_700Bold,
    poppinsExtraBold: Poppins_800ExtraBold,
    poppinsBlack: Poppins_900Black,
  });

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
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
        name="(screen)/(cart)"
        options={{
          headerShown: false,
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
        <PaddingProvider>
          <CartProvider>
            <StatusBar
              backgroundColor={"transparent"}
              translucent={true}
              animated={true}
            />
            <RootLayoutContent />
            <Toast config={toastConfig} />
          </CartProvider>
        </PaddingProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
