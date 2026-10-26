import { useAuth } from '@/context/AuthContext'
import { usePadding } from '@/context/PaddingProvider'
import { showErrorToast, showSuccessToast } from '@/helper/toast'
import { loginService } from '@/services/authServices'
import { Ionicons } from "@expo/vector-icons"
import { useMutation } from '@tanstack/react-query'
import { router } from 'expo-router'
import { useFormik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import { Animated, Easing, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, useWindowDimensions, View } from 'react-native'
import * as Yup from 'yup'

const C = {
  primary: '#2D5A27',
  background: '#FDFBF7',
  text: '#1B241A',
  muted: '#5E6A5A',
  subtle: '#6C7468',
  border: '#E6E1D3',
  placeholder: '#8A9285',
  amberSoft: '#FBEBC8',
  amber: '#C47F0A',
};

const F = {
  regular: 'Poppins_400Regular',
  medium: 'Poppins_500Medium',
  semibold: 'Poppins_600SemiBold',
  bold: 'Poppins_700Bold',
};

export default function Login() {

  const [showPassword, setShowPassword] = React.useState(false)
  const [focused, setFocused] = useState<'email' | 'pin' | null>(null);
  const { height } = useWindowDimensions()
  const { signIn } = useAuth()
  const padding = usePadding()
  const pinInputRef = useRef<TextInput>(null)

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

  const fieldStyle = (name: 'email' | 'pin') => [
    styles.field,
    focused === name && styles.fieldFocused,
    !!(formik.touched[name] && formik.errors[name]) && { borderColor: '#D94C47' },
  ] as const;

  const PickupBag = () => (
    <View style={styles.bagVisual}>
      <View style={styles.bagBody}>
        <View style={styles.bagHandle} />
        <Ionicons name="bag-handle-outline" size={42} color="#FDFBF7" />
      </View>
    </View>
  );

  // / Gently floats its children up and down (the hero cards and the bag).
  function Float({ distance, duration, style, children }: {
    distance: number; duration: number; style?: any; children: React.ReactNode;
  }) {
    const t = useRef(new Animated.Value(0)).current;
    useEffect(() => {
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(t, { toValue: 1, duration, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(t, { toValue: 0, duration, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        ])
      );
      loop.start();
      return () => loop.stop();
    }, [t, duration]);
    const translateY = t.interpolate({ inputRange: [0, 1], outputRange: [0, distance] });
    const flat = StyleSheet.flatten(style) ?? {};
    return (
      <Animated.View style={[flat, { transform: [...((flat.transform as any[]) ?? []), { translateY }] }]}>
        {children}
      </Animated.View>
    );
  }
  return (
    <View style={styles.root}>
      {/* ── Hero ─────────────────────────────────────────── */}
      <View style={styles.hero} pointerEvents="none">
        <View style={[styles.circle, { left: -35, top: -60, width: 460, height: 460, borderRadius: 230, backgroundColor: '#316329' }]} />
        <View style={[styles.circle, { left: 25, top: -10, width: 340, height: 340, borderRadius: 170, backgroundColor: '#356B2D' }]} />
        <View style={[styles.circle, { left: 80, top: 45, width: 230, height: 230, borderRadius: 115, backgroundColor: '#3A7332' }]} />

        <Float distance={-7} duration={2500} style={styles.bag}>
          {/* <PickupBag /> */}
        </Float>

        <Float distance={8} duration={2100} style={[styles.card, { left: 22, top: 176, transform: [{ rotate: '-5deg' }] }]}>
          <View style={[styles.cardIcon, { backgroundColor: C.primary }]}>
            <Ionicons name="checkmark" size={18} color="#FDFBF7" />
          </View>
          <View>
            <Text style={styles.cardLabel}>Pickup code</Text>
            <Text style={styles.cardValue}>RP-4827</Text>
          </View>
        </Float>

        <Float distance={-7} duration={2300} style={[styles.card, { right: 22, top: 112, transform: [{ rotate: '4deg' }] }]}>
          <View style={[styles.cardIcon, { backgroundColor: C.amberSoft }]}>
            <Ionicons name="time-outline" size={18} color={C.amber} />
          </View>
          <View>
            <Text style={styles.cardLabel}>Ready in</Text>
            <Text style={styles.cardValue}>15 min</Text>
          </View>
        </Float>
      </View>

      {/* Header: brand + guest, in frosted pills */}
      {/* <SafeAreaView edges={['top']} style={styles.headerWrap} pointerEvents="box-none">
        <View style={styles.header}>
          <View style={styles.glass}>
            <View style={styles.logo}>
              <Ionicons name="bag-handle-outline" size={17} color={C.primary} />
            </View>
            <Text style={styles.brand}>RAMAT PICKUP</Text>
          </View>
          <Pressable accessibilityRole="button" onPress={() => { }}>
            <View style={[styles.glass, { paddingLeft: 20, paddingRight: 20 }]}>
              <Text style={styles.guest}>Continue as guest</Text>
            </View>
          </Pressable>
        </View>
      </SafeAreaView> */}

      {/* ── Sheet ────────────────────────────────────────── */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={[styles.sheetWrap, { top: Math.min(262, height * 0.31) }]}
      >
        <ScrollView
          style={styles.sheet}
          contentContainerStyle={[styles.sheetContent, { flexGrow: 1 }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>
            Welcome <Text style={{ color: C.primary }}>back</Text>
          </Text>
          <Text style={styles.subtitle}>Log in to order your favourite meals.</Text>

          <View style={styles.fields}>
            <View style={fieldStyle('email')}>
              <Ionicons name="mail-outline" size={20} color={C.subtle} />
              <TextInput
                style={styles.input}
                placeholder="Email address"
                placeholderTextColor={C.placeholder}
                keyboardType="email-address"
                textContentType="emailAddress"
                autoComplete="email"
                autoCapitalize="none"
                autoCorrect={false}
                spellCheck={false}
                returnKeyType="next"
                onSubmitEditing={() => pinInputRef.current?.focus()}
                value={formik.values.email}
                onChangeText={formik.handleChange('email')}
                onBlur={(event) => {
                  formik.handleBlur('email')(event);
                  setFocused(null);
                }}
                onFocus={() => setFocused('email')}
              />
            </View>

            {formik.touched.email && formik.errors.email ? (
              <Text style={styles.errorText}>{formik.errors.email}</Text>
            ) : null}

            <View style={fieldStyle('pin')}>
              <Ionicons name="lock-closed-outline" size={20} color={C.subtle} />
              <TextInput
                ref={pinInputRef}
                style={styles.input}
                placeholder="PIN"
                placeholderTextColor={C.placeholder}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                value={formik.values.pin}
                onChangeText={formik.handleChange('pin')}
                onBlur={(event) => {
                  formik.handleBlur('pin')(event);
                  setFocused(null);
                }}
                keyboardType="number-pad"
                maxLength={4}
                onFocus={() => setFocused('pin')}
              />
              <Pressable
                accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
                hitSlop={8}
                onPress={() => setShowPassword((v) => !v)}
                style={styles.eye}
              >
                <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={21} color={C.subtle} />
              </Pressable>
            </View>

            {formik.touched.pin && formik.errors.pin ? (
              <Text style={styles.errorText}>{formik.errors.pin}</Text>
            ) : null}
          </View>

          <Pressable accessibilityRole="button" onPress={() => { }} style={styles.forgot}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={() => formik.handleSubmit()}
            disabled={mutation.isPending}
            style={({ pressed }) => [styles.loginButton, (pressed || mutation.isPending) && { opacity: 0.9, transform: [{ scale: 0.99 }] }]}
            className='bg-primary rounded-[30px] py-2 h-[60px] justify-center font-poppinsSemiBold shadow-inherit elevation-[8px] items-center'
          >
            <Text style={styles.loginText}>{mutation.isPending ? 'Logging in...' : 'Log in'}</Text>
          </Pressable>

          {/* <View style={styles.dividerRow}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.line} />
          </View> */}

          {/* <View style={styles.socialRow}>
            <Pressable accessibilityRole="button" onPress={() => { }} style={styles.social}>
              <GoogleG />
              <Text style={styles.socialText}>Google</Text>
            </Pressable>
            <Pressable accessibilityRole="button" onPress={() => { }} style={styles.social}>
              <Ionicons name="phone-portrait-outline" size={19} color={C.primary} />
              <Text style={styles.socialText}>Phone number</Text>
            </Pressable>
          </View> */}

          <View style={styles.footer}>
            <Text style={styles.footerText}>New to Ramat Pickup?</Text>
            <Pressable accessibilityRole="button" onPress={() => router.push("/(auth)/register")} style={styles.createHit}>
              <Text 
              className='font-poppinsMedium'
              style={styles.createText}
              >Create account</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.primary },

  // hero
  hero: { position: 'absolute', top: 0, left: 0, right: 0, height: 330, backgroundColor: C.primary, overflow: 'hidden', zIndex: 0 },
  circle: { position: 'absolute' },
  bag: { position: 'absolute', alignSelf: 'center', left: 110, top: 70 },
  card: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 9,
    paddingLeft: 9,
    paddingRight: 16,
    borderRadius: 22,
    backgroundColor: '#FDFBF7',
    shadowColor: '#0A1808',
    shadowOpacity: 0.28,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  cardIcon: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  cardLabel: { fontFamily: F.regular, fontSize: 11, color: C.muted },
  cardValue: { fontFamily: F.bold, fontSize: 14, color: C.text, letterSpacing: 0.4 },
  bagVisual: { width: 112, height: 112, alignItems: 'center', justifyContent: 'center' },
  bagBody: {
    width: 100,
    height: 100,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0A1808',
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 12 },
    elevation: 10,
  },
  bagHandle: {
    position: 'absolute',
    top: 18,
    width: 42,
    height: 30,
    borderRadius: 18,
    borderWidth: 4,
    borderColor: '#FDFBF7',
    borderBottomWidth: 0,
    transform: [{ translateY: -2 }],
  },

  // header
  headerWrap: { position: 'absolute', top: 0, left: 0, right: 0 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 8 },
  glass: {
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 7,
    paddingRight: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: 'rgba(253,251,247,0.28)',
    backgroundColor: 'rgba(253,251,247,0.18)',
  },
  logo: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#FDFBF7', alignItems: 'center', justifyContent: 'center' },
  brand: { fontFamily: F.semibold, fontSize: 12.5, letterSpacing: 1.8, color: '#FDFBF7' },
  guest: { fontFamily: F.medium, fontSize: 14, color: '#FDFBF7' },

  // sheet
  sheetWrap: { position: 'absolute', left: 0, right: 0, top: 262, bottom: 0, zIndex: 1, elevation: 12 },
  sheet: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    shadowColor: '#0A1808',
    shadowOpacity: 0.14,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: -6 },
    elevation: 12,
  },
  sheetContent: { paddingHorizontal: 28, paddingTop: 28, paddingBottom: 40 },
  title: { fontFamily: F.bold, fontSize: 30, lineHeight: 33, letterSpacing: -0.9, color: C.text },
  subtitle: { marginTop: 6, fontFamily: F.regular, fontSize: 14.5, color: C.muted },

  fields: { marginTop: 20, gap: 12 },
  errorText: { color: '#D94C47', fontFamily: F.regular, fontSize: 12, marginTop: -4 },
  field: {
    height: 56,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: C.border,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 18,
    paddingRight: 6,
    gap: 12,
  },
  fieldFocused: {
    borderColor: C.primary,
    shadowColor: C.primary,
    shadowOpacity: 0.14,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
  },
  input: { flex: 1, fontFamily: F.regular, fontSize: 15, color: C.text, paddingVertical: 0 },
  eye: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },

  forgot: { alignSelf: 'flex-end', height: 44, justifyContent: 'center', paddingHorizontal: 2 },
  forgotText: { fontFamily: F.semibold, fontSize: 13.5, color: C.primary },

  loginButton: {
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2D5A27',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2D5A27',
    shadowOpacity: 0.32,
    shadowRadius: 13,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  loginText: { fontFamily: F.semibold, fontSize: 16, color: '#FDFBF7' },

  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 18, marginBottom: 14 },
  line: { flex: 1, height: 1, backgroundColor: C.border },
  dividerText: { fontFamily: F.regular, fontSize: 12.5, color: C.subtle },

  socialRow: { flexDirection: 'row', gap: 12 },
  social: {
    flex: 1,
    height: 52,
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: C.border,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  socialText: { fontFamily: F.semibold, fontSize: 14.5, color: C.text },

  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 8, gap: 2 },
  footerText: { fontFamily: "poppinsRegular", fontSize: 14, color: C.muted },
  createHit: { height: 44, justifyContent: 'center', paddingHorizontal: 4 },
  createText: { fontSize: 14, color: C.primary },
});
