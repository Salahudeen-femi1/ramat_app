import { router, Stack } from "expo-router";
import './globals.css'
import { Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen
      name="(tabs)"
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="(auth)"
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

  </Stack>;
}
