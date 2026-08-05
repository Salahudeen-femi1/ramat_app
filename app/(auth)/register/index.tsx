import { Link, router } from 'expo-router'
import { useFormik } from 'formik'
import React from 'react'
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Yup from 'yup'

import ActionButton from '@/app/Component/button/ActionButton'
import { showErrorToast, showSuccessToast } from '@/helper/toast'
import { UserProps } from '@/lib/interfaces'
import { registerService } from '@/services/authServices'
import { Ionicons } from '@expo/vector-icons'
import { useMutation } from '@tanstack/react-query'

interface RegisterFormValues {
  phone: string;
  email: string;
  first_name: string;
  last_name: string;
  gender: string;
  marketing?: boolean;
}

export default function Register() {
  
  const [marketing, setMarketing] = React.useState(true);

  const mutation = useMutation<
    { message?: string; token?: string; user?: UserProps; role?: string },
    any,
    RegisterFormValues
  >({
    mutationFn: registerService,
    onSuccess: (data, variables) => {
      showSuccessToast(
        data.message || "Registration successful. Please verify your email."
      );
      console.log("register response", data);
      router.push({ pathname: "/(auth)/verify_email", params: { email: variables.email } });
      router.push('/(tabs)')
    },
    onError: (err: any) => {
      const errMessage = err.response?.data?.message || err.message || 'Registration failed. Please try again.';
      showErrorToast(errMessage);
    },
  });

  const formik = useFormik<RegisterFormValues>({
    initialValues: {
      phone: '',
      email: '',
      first_name: '',
      last_name: '',
      gender: '',
    },
    validationSchema: Yup.object({
      phone: Yup.string().required('Phone number is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      first_name: Yup.string().required('First name is required'),
      last_name: Yup.string().required('Last name is required'),
      gender: Yup.string().required('Gender is required'),
    }),
    onSubmit: (values) => {
      mutation.mutate({ ...values, marketing });
    },
  });
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className=' flex-1 items-center text-center p-7'>
          <Text className='text-center font-medium text-3xl mb-3'>Let&apos;s get Started</Text>
          <Text className='text-center text-[17px] w-80 font-medium'>We just need a bit more information. Please enter your details to get started.</Text>
        </View>

        <View className='flex flex-col gap-4 p-3'>

          <View className="flex-row gap-3 mb-2">
            <View className="flex-1">
              <Text className="font-semibold text-black mb-2">
                First name <Text className="text-red-500">*</Text>
              </Text>

              <TextInput
                value={formik.values.first_name}
                onChangeText={formik.handleChange("first_name")}
                onBlur={formik.handleBlur("first_name")}
                placeholder="e.g John"
                className="bg-gray-100 rounded-xl h-16 px-4"
              />

              {formik.touched.first_name && formik.errors.first_name && (
                <Text className="text-red-500 mt-1">
                  {formik.errors.first_name}
                </Text>
              )}
            </View>

            <View className="flex-1">
              <Text className="font-semibold text-black mb-2">
                Last name <Text className="text-red-500">*</Text>
              </Text>

              <TextInput
                value={formik.values.last_name}
                onChangeText={formik.handleChange("last_name")}
                onBlur={formik.handleBlur("last_name")}
                placeholder="e.g Doe"
                className="bg-gray-100 rounded-xl h-16 px-4 "
              />

              {formik.touched.last_name && formik.errors.last_name && (
                <Text className="text-red-500 mt-1">
                  {formik.errors.last_name}
                </Text>
              )}
            </View>
          </View>

          <View className="flex-1">
            <Text className="font-semibold text-black mb-2">
              Phone number <Text className="text-red-500">*</Text>
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

          {/* Email */}

          <View className="mb-6">
            <Text className="font-semibold text-black mb-2">
              Email address <Text className="text-red-500">*</Text>
            </Text>

            <TextInput
              value={formik.values.email}
              onChangeText={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
              placeholder="example@email.com"
              keyboardType="email-address"
              className="bg-gray-100 rounded-xl h-16 px-4 text-base"
            />

            {formik.touched.email && formik.errors.email && (
              <Text className="text-red-500 mt-1">
                {formik.errors.email}
              </Text>
            )}
          </View>
          
          {/* Gender */}

          <View className="mb-6">
            <Text className="font-semibold text-black mb-2">
              Gender <Text className="text-red-500">*</Text>
            </Text>

            <View className="flex-row gap-3">
              {/* Male */}
              <TouchableOpacity
                onPress={() => {
                  formik.setFieldValue('gender', 'male');
                  formik.setFieldTouched('gender', true);
                }}
                activeOpacity={0.8}
                className={`flex-1 h-14 rounded-xl border justify-center items-center ${formik.values.gender === "male"
                    ? "bg-[#154A22] border-[#154A22]"
                    : "bg-white border-gray-300"
                  }`}
              >
                <Text
                  className={`font-medium ${formik.values.gender === "male" ? "text-white" : "text-black"
                    }`}
                >
                  Male
                </Text>
              </TouchableOpacity>

              {/* Female */}
              <TouchableOpacity
                onPress={() => {
                  formik.setFieldValue('gender', 'female');
                  formik.setFieldTouched('gender', true);
                }}
                activeOpacity={0.8}
                className={`flex-1 h-14 rounded-xl border justify-center items-center ${formik.values.gender === "female"
                    ? "bg-[#154A22] border-[#154A22]"
                    : "bg-white border-gray-300"
                  }`}
              >
                <Text
                  className={`font-medium ${formik.values.gender === "female" ? "text-white" : "text-black"
                    }`}
                >
                  Female
                </Text>
              </TouchableOpacity>
            </View>
            {formik.touched.gender && formik.errors.gender && (
              <Text className="text-red-500 mt-1">
                {formik.errors.gender}
              </Text>
            )}
          </View>

          {/* Checkbox */}

          <TouchableOpacity
            onPress={() => setMarketing(!marketing)}
            className="flex-row items-start mb-10"
          >
            <View
              className={`w-6 h-6 rounded border mr-3 justify-center items-center ${marketing
                ? "bg-[#154A22] border-[#0B6E4F]"
                : "border-gray-400"
                }`}
            >
              {marketing && (
                <Ionicons name="checkmark" size={16} color="white" />
              )}
            </View>

            <Text className="flex-1 text-gray-800 leading-6">
              I want to receive emails and other marketing and
              promotional communications
            </Text>
          </TouchableOpacity>

          {/* Continue Button */}
          <ActionButton
            name="Continue"
            action={() => formik.handleSubmit()}
            disabled={mutation.isPending || !formik.isValid}
            loading={mutation.isPending}
          />

          {/* Footer */}

          <Text className="text-center text-gray-400 leading-7 mb-10">
            By signing up, you agree to our{" "}
            <Text className="text-[#0B6E4F] font-semibold">
              Terms of Use
            </Text>{" "}
            and{" "}
            <Text className="text-[#0B6E4F] font-semibold">
              Privacy Policy
            </Text>
          </Text>
          <Link href="/login" className='text-[#2D5A27] font-semibold text-center mb-10'>Already have an account? Login</Link>

        </View>

      </ScrollView>
    </SafeAreaView >
  )
}