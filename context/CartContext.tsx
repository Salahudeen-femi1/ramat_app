import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ImageSourcePropType } from "react-native";

export interface CartExtra {
  _id?: string;
  id?: string;
  name?: string;
  label?: string;
  price: string | number;
}

export interface CartItem {
  id: string;
  name: string;
  description: string;
  price: string | number;
  image: ImageSourcePropType | string;
  quantity: number;
  extras: CartExtra[];
}

type CartPayload = Omit<CartItem, "id" | "quantity" | "extras"> & {
  id?: string;
  _id?: string;
  quantity?: number;
  extras?: CartExtra[];
};

type CartContextType = {
  cartItems: CartItem[];
  cartCount: number;
  isHydrated: boolean;
  addToCart: (item: CartPayload) => Promise<void>;
  clearCart: () => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
};

const CART_STORAGE_KEY = "@ramat_cart_items";

const CartContext = createContext<CartContextType | undefined>(undefined);

const normalizeExtras = (extras?: CartExtra[]) =>
  (extras ?? []).map((extra) => ({
    _id: extra._id ?? extra.id,
    name: extra.name ?? extra.label,
    price: extra.price,
  }));

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  const persistCart = useCallback(async (items: CartItem[]) => {
    await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, []);

  const loadCart = useCallback(async () => {
    try {
      const savedCart = await AsyncStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsedCart = (JSON.parse(savedCart) as (CartItem & { _id?: string })[])
          .map((item) => ({ ...item, id: item.id ?? item._id }))
          .filter((item) => Boolean(item.id));
        setCartItems(parsedCart);
      }
    } catch (error) {
      console.error("Failed to load cart", error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const addToCart = useCallback(
    async (item: CartPayload) => {
      const id = item.id ?? item._id;
      if (!id) {
        console.error("Cannot add cart item without a product ID", item);
        return;
      }

      const normalizedItem: CartItem = {
        id,
        name: item.name,
        description: item.description,
        price: item.price,
        image: item.image,
        quantity: Number(item.quantity ?? 1),
        extras: normalizeExtras(item.extras),
      };

      setCartItems((prev) => {
        const nextItems = [...prev, normalizedItem];

        persistCart(nextItems).catch(console.error);

        return nextItems;
      });
    },
    [persistCart]
  );

  const clearCart = useCallback(async () => {
    await AsyncStorage.removeItem(CART_STORAGE_KEY);
    setCartItems([]);
  }, []);

  const removeFromCart = useCallback(
    async (itemId: string) => {
      setCartItems((prev) => {
        const nextItems = prev.filter((item) => item.id !== itemId);

        persistCart(nextItems).catch(console.error);

        return nextItems;
      });
    },
    [persistCart]
  );

  const updateQuantity = useCallback(
    async (itemId: string, quantity: number) => {
      setCartItems((prev) => {
        const nextItems = prev.map((item) =>
          item.id === itemId ? { ...item, quantity: Math.max(1, quantity) } : item
        );
        persistCart(nextItems).catch(console.error);
        return nextItems;
      });
    },
    [persistCart]
  );

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const value = useMemo(
    () => ({
      cartItems,
      cartCount,
      isHydrated,
      addToCart,
      clearCart,
      removeFromCart,
      updateQuantity,
    }),
    [addToCart, cartCount, cartItems, clearCart, isHydrated, removeFromCart, updateQuantity]
    
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
};
