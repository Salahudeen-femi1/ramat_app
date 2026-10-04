import api from "@/helper/axios";
import { Extra, FoodProps, martItem, UserProps } from "@/utility/interface";

type ApiExtra = Partial<Extra> & { _id?: string; label?: string };

const normalizeExtras = (extras?: ApiExtra[]): Extra[] =>
  (extras ?? []).map((extra, index) => ({
    id: extra.id ?? extra._id ?? `extra-${index}`,
    name: extra.name ?? extra.label ?? "Extra",
    price: extra.price ?? 0,
  }));

/**
 * Fetch the current authenticated user
 */
export const getUserService = async (): Promise<{ user: UserProps; token?: string }> => {
  const response = await api.get("/auth/me");
  const responseData = response.data;
  const user = responseData?.user ?? responseData?.data?.user ?? responseData?.data ?? responseData;
  return { ...responseData, user };
};

// fetch user order

type StatusType = "ongoing" | "completed"

export const getOrderService = async (status: StatusType, order_id: string) => {
  const endpoint =
    status === "ongoing"
      ? `/orders/${order_id}/tracking`
      : "/orders";

  const response = await api.get(endpoint);

  return response.data.orders ?? [];
};

// fetch mini market data

export const miniMarketService = async (params: {
  query: string
}): Promise<martItem[]> => {
  const response = await api.get('/market', {
    params: {
      martSearch: params.query
    }
  });
  const items = (response.data?.items ?? []) as Array<
    Omit<martItem, "id" | "extras"> & {
      id?: string;
      _id?: string;
      extras?: ApiExtra[];
    }
  >;

  return items.map((item) => ({
    ...item,
    id: item.id ?? item._id ?? "",
    extras: normalizeExtras(item.extras),
  }));
};

export const getMenuService = async (category: string, params?: {
  query?: string
}
): Promise<FoodProps[]> => {
  const endpoint = category === "All"
    ? "/menu"
    : `/menu/category/${encodeURIComponent(category)}`;

  const response = await api.get(endpoint, {
    params: params?.query ?
      {
        search: params.query
      } : undefined
  });
  const items = (response.data?.items ?? []) as Array<
    Omit<FoodProps, "id" | "extras"> & {
      id?: string;
      _id?: string;
      extras?: ApiExtra[];
    }
  >;
  return items.map((item) => ({
    ...item,
    id: item.id ?? item._id ?? "",
    extras: normalizeExtras(item.extras),
  }));
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

export const paymentService = async (data: { orderId: string; }) => {
  const response = await api.post('/payments/initialize', data)
  return response.data
}

export const verifyPayment = async (reference: string) => {
  const response = await api.get(`/payments/verify/${reference}`);
  return response.data;
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

export const createOrder = async (data: {
  pickupTime: string;
  items: {
    menuItem: string;
    itemType: string;
    quantity: number;
    selectedExtras: {
      name: string;
      price: number;
    }[];
  }[];
}) => {
  const response = await api.post("/orders", data);
  const responseData = response.data;
  const orderData = responseData?.order ?? responseData?.data?.order ?? responseData?.data ?? responseData;
  const orderId = orderData?.orderId ?? orderData?._id ?? orderData?.id;

  return {
    ...responseData,
    orderId,
  };
};

export const paymentInitializer = async (data: {
  orderId: string; amount: string;
}) => {
  if (!data.orderId) {
    throw new Error("Cannot initialize payment: the created order response did not include an order ID.");
  }

  const response = await api.post('/payment/initialize', data)
  return response.data;
}
