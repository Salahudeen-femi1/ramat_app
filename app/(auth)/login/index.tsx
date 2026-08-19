import ActionButton from '@/app/Component/button/ActionButton'
import { useAuth } from '@/context/AuthContext'
import { showErrorToast, showSuccessToast } from '@/helper/toast'
import { loginService } from '@/services/authServices'
import { Ionicons } from "@expo/vector-icons"
import { useMutation } from '@tanstack/react-query'
import { router } from 'expo-router'
import { useFormik } from 'formik'
import React from 'react'
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Yup from 'yup'

export default function Login() {

  const { signIn, completeOnboarding } = useAuth()

  const mutation = useMutation<
    { token: string; user: { role: string } },
    Error,
    { email: string; pin: string }
  >({
    mutationFn: loginService,
    onSuccess: async (response) => {
      showSuccessToast("Login successfully");
      console.log("login response", response);

      if (response?.user?.role === "user") {
        await signIn(response.user as any, response.token, response.user.role);
        await completeOnboarding();
        router.push("/(tabs)");
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
      email: Yup.string().email("Invalid email address").required("Email is required for login"),
      pin: Yup.string().required("PIN is required").min(4, "PIN must be at least 4 digits").max(4, "PIN must be 4 digits")
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
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons
                name="arrow-back-circle-outline"
                size={30}
                color="black"
              />
            </TouchableOpacity>

            <View className="flex flex-col items-center text-center mt-6 mb-10">
              <Text className="font-medium text-[30px] text-black mb-2">
                Welcome Back!
              </Text>
              <Text className='text-sm'>You can log back in to your account using your Email.</Text>
            </View>
          </View>
          <View>
            <Text className="font-medium text-[20px] text-black mb-2">
              Email
            </Text>

            <View className="flex-row items-center bg-gray-100 rounded-xl px-4 h-16">

              <TextInput
                value={formik.values.email}
                onChangeText={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
                placeholder="you@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                className="flex-1 text-base"
              />
            </View>

            {formik.touched.email && formik.errors.email && (
              <Text className="text-red-500 mt-1">
                {formik.errors.email}
              </Text>
            )}
          </View>

          <View>
            <Text className="font-medium text-[20px] text-black mb-2">
              Pin
            </Text>

            <View className="flex-row items-center bg-gray-100 rounded-xl px-4 h-16">
              <TextInput
                value={formik.values.pin}
                onChangeText={formik.handleChange("pin")}
                onBlur={formik.handleBlur("pin")}
                placeholder="0000"
                keyboardType="number-pad"
                secureTextEntry
                maxLength={4}
                className="flex-1 text-base"
              />
            </View>

            {formik.touched.pin && formik.errors.pin && (
              <Text className="text-red-500 mt-1">
                {formik.errors.pin}
              </Text>
            )}
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