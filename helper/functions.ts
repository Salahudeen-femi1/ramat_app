import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";


export const useAuthCheck = () => {
    const { isLoggedIn,  onboardingStatus } = useAuth();
    if (isLoggedIn) {
        if (onboardingStatus === "complete") {
            router.replace("/(tabs)")
        } else {
            router.replace("/(onboarding)/stepOne");
        }
        return "authenticated"
    } else {
        router.replace("/(auth)/login")
        return "unauthenticated"
    }
}