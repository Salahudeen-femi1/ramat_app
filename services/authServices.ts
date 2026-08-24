import api from "@/helper/axios";
import { UserProps } from "@/lib/interfaces";
import { FoodProps, martItem } from "@/utility/interface";

/**
 * Fetch the current authenticated user
 */
export const getUserService = async (): Promise<{ data: UserProps; token: string; }> => {
  const response = await api.get("/user");
  return response.data;
};

// fetch user order

type StatusType = "ongoing" | "completed"

export const getOrderService = async (status: StatusType) => {
  const endpoint =
    status === "ongoing"
      ? "/order/ongoing"
      : "/order/completed";

  const response = await api.get(endpoint);

  return response.data.items;
};

// fetch mini market data

export const miniMarketService = async (): Promise<martItem[]> => {
  const response = await api.get('');
  return response.data?.items;
};

export const getMenuService = async (category: string): Promise<FoodProps[]> => {
  const endpoint = category === "All"
    ? "/menu"
    : `/menu/category/${encodeURIComponent(category)}`;

  const response = await api.get(endpoint);
  return response.data?.items ?? [];
};

export const verificationEmailService = async (data: { email: string; otp: string }) => {
  const response = await api.post("/auth/verify-email", data);
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
 * Login with email and PIN
 */
export const loginService = async (data: { email: string; pin: string }): Promise<{ token: string; user: UserProps; role: string }> => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

/**
 * Verify OTP
 */
export const verifyOtpService = async (phone: string, otp: string): Promise<{ token: string; user: UserProps; role: string }> => {
  const response = await api.post("auth/verify-otp", { phone, otp });
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
  gender: string;
  marketing?: boolean;
}): Promise<{
  message?: string;
  token?: string;
  user?: UserProps;
  role?: string;
  pin: string;
}> => {
  const response = await api.post("/auth/register", data);
  return response.data;
};
