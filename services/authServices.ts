import api from "@/helper/axios";
import { UserProps } from "@/lib/interfaces";

/**
 * Fetch the current authenticated user
 */
export const getUserService = async (): Promise<{ data: UserProps }> => {
  const response = await api.get("/user");
  return response.data;
};

/**
 * Logout the user (call backend to invalidate token)
 */
export const logoutService = async (): Promise<void> => {
  try {
    await api.post("/logout");
  } catch (error) {
    // Even if logout fails, we'll clear local state
    console.error("Logout failed:", error);
  }
};

/**
 * Login with phone number (OTP/verification flow)
 */
export const loginService = async (phone: string): Promise<{ data: { token: string; user: UserProps; role: string } }> => {
  const response = await api.post("/login", { phone });
  return response.data;
};

/**
 * Verify OTP
 */
export const verifyOtpService = async (phone: string, otp: string): Promise<{ data: { token: string; user: UserProps; role: string } }> => {
  const response = await api.post("/verify-otp", { phone, otp });
  return response.data;
};

/**
 * Register user
 */
export const registerService = async (data: {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  password: string;
}): Promise<{ data: { token: string; user: UserProps; role: string } }> => {
  const response = await api.post("/register", data);
  return response.data;
};
