import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ActionButton from '@/app/Component/button/ActionButton'

export default function Login() {

  const formik = useFormik({
    initialValues: {
      phone: ""
    },
    validationSchema: Yup.object({
      phone: Yup.string().required("Phone number is required for loig.")
    }),
    onSubmit: (value) => {

    }

  })
  return (
    <View className="flex-1">
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

      <ActionButton 
      name="Login"
      />
    </View>
  )
}