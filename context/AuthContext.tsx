
import { getUserService, logoutService } from "@/services/authServices";
import { setupInterceptors } from "@/helper/axios";
import { globals } from "@/lib/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { UserProps } from "@/lib/interfaces";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type OnboardingStatus = "loading" | "complete" | "incomplete";

type AuthContextType = {
  user: UserProps | null;
  token: string | null;
  role: string | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  onboardingStatus: OnboardingStatus;
  signIn: (user: UserProps, token: string, role: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [onboardingStatus, setOnboardingStatus] =
    useState<OnboardingStatus>("loading");
  const [isBootstrapLoading, setIsBootstrapLoading] = useState(true);

  const queryClient = useQueryClient();

  const {
    data: userResponse,
    isLoading: isUserLoading,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUserService,
    enabled: !!token,
    retry: false,
    staleTime: 1000 * 60 * 1,
  });

  console.log("token", token);
  const user = userResponse?.data;
  console.log("user:", user);

  // Bootstrap: Restore auth state from AsyncStorage on app start
  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const savedToken = await AsyncStorage.getItem(globals.AUTH_TOKEN_KEY);
        const savedRole = await AsyncStorage.getItem(globals.CURRENT_ROLE_KEY);
        const savedOnboarding = await AsyncStorage.getItem(
          globals.ONBOARDING_STATUS_KEY
        );

        if (savedToken) {
          setToken(savedToken);
          if (savedRole) {
            setRole(savedRole);
          }
        }

        if (savedOnboarding === "true") {
          setOnboardingStatus("complete");
        } else {
          setOnboardingStatus("incomplete");
        }
      } catch (e) {
        console.error("Failed to bootstrap auth", e);
      } finally {
        setIsBootstrapLoading(false);
      }
    };

    bootstrapAsync();
  }, []);

  const signIn = useCallback(
    async (userData: UserProps, authToken: string, userRole: string) => {
      try {
        await Promise.all([
          AsyncStorage.setItem(globals.AUTH_TOKEN_KEY, authToken),
          AsyncStorage.setItem(globals.CURRENT_ROLE_KEY, userRole),
        ]);
        setToken(authToken);
        setRole(userRole);
        queryClient.setQueryData(["user"], { data: userData });
      } catch (e) {
        console.error("Failed to sign in", e);
        throw new Error("Login failed");
      }
    },
    [queryClient]
  );

  const signOut = useCallback(async () => {
    try {
      // Call logout service to invalidate token on backend
      await logoutService();
    } catch (e) {
      console.error("Logout service failed", e);
    } finally {
      // Clear local state regardless of backend response
      await Promise.all([
        AsyncStorage.removeItem(globals.AUTH_TOKEN_KEY),
        AsyncStorage.removeItem(globals.CURRENT_ROLE_KEY),
      ]);
      setToken(null);
      setRole(null);
      queryClient.clear();
    }
  }, [queryClient]);

  const refreshUser = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const completeOnboarding = useCallback(async () => {
    try {
      await AsyncStorage.setItem(globals.ONBOARDING_STATUS_KEY, "true");
      setOnboardingStatus("complete");
    } catch (e) {
      console.error("Failed to save onboarding status", e);
    }
  }, []);

  const isLoading = isBootstrapLoading || (!!token && isUserLoading);

  const value = useMemo(
    () => ({
      user,
      token,
      role,
      isLoading,
      isLoggedIn: !!user && !!token,
      onboardingStatus,
      signIn,
      signOut,
      refreshUser,
      completeOnboarding,
    }),
    [
      user,
      token,
      role,
      isLoading,
      onboardingStatus,
      signIn,
      signOut,
      refreshUser,
      completeOnboarding,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
