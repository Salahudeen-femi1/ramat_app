import ActionButton from '@/app/Component/button/ActionButton'
import { useAuth } from '@/context/AuthContext'
import { showErrorToast, showSuccessToast } from '@/helper/toast'
import { loginService } from '@/services/authServices'
import { useMutation } from '@tanstack/react-query'
import { Link, router } from 'expo-router'
import { useFormik } from 'formik'
import React from 'react'
import { ScrollView, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
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
        router.push("/(auth)/verify_phone");
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
      phone: ""
    },
    validationSchema: Yup.object({
      phone: Yup.string().required("Phone number is required for loig.")
    }),
    onSubmit: (value) => {
      mutation.mutate(value.phone)
    }

  })
  return (
    <SafeAreaView className='flex-1 p-5'>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
        <View>
          <Text className="font-semibold text-black mb-2">
            Phone number
          </Text>

          <View className="flex-row items-center bg-gray-100 rounded-xl px-4 h-16">

            <TextInput
              value={formik.values.phone}
              onChangeText={formik.handleChange("phone")}
              onBlur={formik.handleBlur("phone")}
              placeholder="08000000000"
              keyboardType="phone-pad"
              className="flex-1 text-base"
            />
          </View>

          {formik.touched.phone && formik.errors.phone && (
            <Text className="text-red-500 mt-1">
              {formik.errors.phone}
            </Text>
          )}
        </View>

        <View>
          <ActionButton
            name="Login"
            action={() => formik.handleSubmit()}
          />
          <Text className='text-center mt-3'>Don&apos;t have an account? 
            <Link href="/(auth)/register" className='text-[#2D5A27] font-semibold'> Register</Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}