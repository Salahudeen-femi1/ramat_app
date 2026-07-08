import ActionButton from '@/app/Component/button/ActionButton'
import { useAuth } from '@/context/AuthContext'
import { showErrorToast, showSuccessToast } from '@/helper/toast'
import { loginService } from '@/services/authServices'
import { useMutation } from '@tanstack/react-query'
import { Link, router } from 'expo-router'
import { useFormik } from 'formik'
import React from 'react'
import { ScrollView, Text, TextInput, View, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from "@expo/vector-icons";
import * as Yup from 'yup'

export default function Login() {

  const { signIn, completeOnboarding } = useAuth()

  const mutation = useMutation<
    { token: string; user: { role: string } },
    Error,
    string
  >({
    mutationFn: loginService,
    onSuccess: async (response) => {
      showSuccessToast("Login successfully");
      console.log("login response", response);

      if (response?.user?.role === "user") {
        await signIn(response.user as any, response.token, response.user.role);
        await completeOnboarding();
        router.push("/(auth)/verify_email");
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
      email: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required for login")
    }),
    onSubmit: (value) => {
      mutation.mutate(value.email)
    }

  })
  return (
    <SafeAreaView className='flex-1 p-5 bg-white'>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
        <View>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons
              name="arrow-back-circle-outline"
              size={30}
              color="black"
            />
          </TouchableOpacity>

          <View className="flex flex-col items-center text-center mt-6">
            <Text className="font-semibold text-[35px] text-black mb-2">
              Welcome Back!
            </Text>
            <Text className='text-md'>You can log back in to your account using your Email.</Text>
          </View>
        </View>
        <View>
          <Text className="font-semibold text-[20px] text-black mb-2">
            Email
          </Text>

          <View className="flex-row items-center bg-gray-100 rounded-xl px-4 h-16">

            <TextInput
              value={formik.values.email}
              onChangeText={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
              placeholder="you@example.com"
              keyboardType="email-address"
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
          <ActionButton
            name="Login"
            action={formik.handleSubmit}
            loading={formik.isSubmitting}

          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}