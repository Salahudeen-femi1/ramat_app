import ActionButton from '@/app/Component/button/ActionButton'
import { router, useLocalSearchParams } from 'expo-router'
import { useFormik } from 'formik'
import React, { useRef } from 'react'
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, TextInput, View } from 'react-native'
import * as Yup from 'yup'

import { AppText } from '@/app/Component/AppText'
import { showErrorToast, showSuccessToast } from '@/helper/toast'
import { verificationEmailService } from '@/services/authServices'
import { useMutation } from '@tanstack/react-query'
import { SafeAreaView } from 'react-native-safe-area-context'

const EmailVerification = () => {

    const { email } = useLocalSearchParams<{ email: string }>()
    const inputRef = useRef<TextInput>(null)

    const mutation = useMutation({
        mutationFn: verificationEmailService,
        onSuccess: (data) => {
            console.log(data)
            showSuccessToast(data.message || "Email verified successfully. Please login.");
            router.replace("/(auth)/login");
        },
        onError: (error: any) => {
            showErrorToast(error.response?.data?.message || "Verification failed. Invalid code.");
        },
    });

    const formik = useFormik({
        initialValues: {
            otp: ""
        },
        validationSchema: Yup.object({
            otp: Yup.string().required("Verification code is required").length(4, "Code must be 4 digits")
        }),
        onSubmit: (value) => {
            if (!email) {
                showErrorToast("Email is missing. Please return to the registration page.");
                return;
            }
            mutation.mutate({ email, otp: value.otp })
        }
    })

    const codeArray = formik.values.otp.split("");

    return (
        <SafeAreaView className='flex-1  bg-white px-6'>
            <ScrollView showsHorizontalScrollIndicator={false}  contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    className="flex-1"
                >
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View className="flex flex-col gap-8 pt-2">
                            <View className="flex flex-col gap-3">
                                <AppText className="text-2xl font-quickBold text-black">
                                    Verification Code
                                </AppText>
                                <AppText className="text-base text-black/70 leading-6">
                                    Enter the 4-digit code sent to your email {email}.
                                </AppText>
                            </View>

                            <View className="flex flex-col gap-6">
                                <View className="flex flex-col gap-2">
                                    <AppText className="text-sm font-semibold text-black">
                                        Code
                                    </AppText>

                                    {/* Visual PIN boxes */}
                                    <Pressable
                                        onPress={() => inputRef.current?.focus()}
                                        className="flex-row justify-between gap-4 w-full mt-2"
                                    >
                                        {[0, 1, 2, 3].map((index) => (
                                            <View
                                                key={index}
                                                className={`w-[52px] h-[52px] border rounded-xl items-center justify-center bg-[#F9FAF7] ${formik.values.otp.length === index
                                                    ? "border-primary border-2"
                                                    : "border-primary/30"
                                                    }`}
                                            >
                                                <AppText className="text-xl font-quickBold text-black">
                                                    {codeArray[index] || ""}
                                                </AppText>
                                            </View>
                                        ))}
                                    </Pressable>

                                    {/* Hidden TextInput */}
                                    <TextInput
                                        ref={inputRef}
                                        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
                                        value={formik.values.otp}
                                        onChangeText={formik.handleChange("otp")}
                                        onBlur={formik.handleBlur("otp")}
                                        keyboardType="number-pad"
                                        maxLength={4}
                                        autoFocus={true}
                                    />

                                    {formik.touched.otp && formik.errors.otp && (
                                        <AppText className="text-xs text-red-600 mt-1">
                                            {formik.errors.otp}
                                        </AppText>
                                    )}
                                </View>
                            </View>
                        </View>

                        <View className="flex flex-col gap-4 py-8">
                            <ActionButton
                                name="Verify Code"
                                action={() => formik.handleSubmit()}
                                disabled={!email || mutation.isPending}
                                loading={mutation.isPending}
                            />
                            <ActionButton
                                name="Back"
                                hasBG={false}
                                action={() => router.back()}
                            />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    )
}

export default EmailVerification;