import ActionButton from '@/app/Component/button/ActionButton'
import { useAuth } from '@/context/AuthContext'
import { showErrorToast, showSuccessToast } from '@/helper/toast'
import { loginService } from '@/services/authServices'
import { Ionicons } from "@expo/vector-icons"
import { useMutation } from '@tanstack/react-query'
import { Link, router } from 'expo-router'
import { useFormik } from 'formik'
import React from 'react'
import { Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Yup from 'yup'

export default function Login() {

  const[showPassword, setShowPassword] = React.useState(false)
  const { signIn } = useAuth()

  const mutation = useMutation<
    { token: string; user: { role: string } },
    Error,
    { email: string; pin: string }
  >({
    mutationFn: loginService,
    onSuccess: async (response) => {
      console.log("login response", response);

      if (response?.user?.role === "user") {
        await signIn(
          response.user as any,
          response.token,
          response.user.role
        );
        showSuccessToast("Login successfully");
        router.replace("/(tabs)");
      } else {
        showErrorToast("Try to log in via web");
      }
    },
    onError: (err: any) => {
      console.error("error logging in", err);
      let errMessage = err.response?.data?.message || err.message;
      showErrorToast(errMessage || "Error occurred while logging in.");
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      pin: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address")
        .required("Email is required for login"),
      pin: Yup.string().required("PIN is required")
        .min(4, "PIN must be at least 4 digits")
        .max(4, "PIN must be 4 digits")
    }),
    onSubmit: (value) => {
      mutation.mutate({ email: value.email, pin: value.pin })
    }

  })
  return (
    <SafeAreaView className='flex-1 p-5 bg-white'>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>

        <View className='flex flex-col gap-8'>
          <View>
            <TouchableOpacity onPress={() => router.push('/register')}>
              <Ionicons
                name="arrow-back-circle-outline"
                size={30}
                color="black"
              />
            </TouchableOpacity>

            <View className="flex flex-col items-center text-center mt-6 mb-10">
              <Text className="font-medium text-[30px] text-black mb-1 font-[poppinsMedium]">
                Welcome Back!
              </Text>
              <Text className='text-sm font-[poppinsRegular]'>You can log back in to your account using your Email.</Text>
            </View>
          </View>
          <View>

            <View className="flex-row items-center gap-3 bg-gray-100 rounded-xl px-4 h-16">
              <Ionicons
                name="mail-outline"
                size={20}
                color="#6B7280"
              />

              <TextInput
                value={formik.values.email}
                onChangeText={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
                placeholder="Email"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                className="flex-1 text-base text-gray-900"
              />
            </View>

            {formik.touched.email && formik.errors.email && (
              <Text className="text-red-500 mt-1">
                {formik.errors.email}
              </Text>
            )}
          </View>

          <View>

            <View className="flex-row gap-2 items-center bg-gray-100 rounded-xl px-4 h-16">

              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="#6B7280"
              />

              <TextInput
                value={formik.values.pin}
                onChangeText={formik.handleChange("pin")}
                onBlur={formik.handleBlur("pin")}
                placeholder="Password"
                placeholderTextColor="#9CA3AF"
                keyboardType="number-pad"
                secureTextEntry={!showPassword}
                maxLength={4}
                className="flex-1 text-base text-gray-900"
              />

              <Pressable onPress={() => setShowPassword((prev) => !prev)}>
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#6B7280"
                />
              </Pressable>
            </View>

            {formik.touched.pin && formik.errors.pin && (
              <Text className="text-red-500 mt-1">
                {formik.errors.pin}
              </Text>
            )}
          </View>

          <View className="w-full flex-1 justify-start font-poppinsBold pl-10">
            <Link
              href="/register"
              className="text-red-600 "
            >
              Forgotten Password?
            </Link>
          </View>
        </View>

        <View>
          <ActionButton
            name="Login"
            action={formik.handleSubmit}
            loading={mutation.isPending}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
