import { create } from "zustand";
import { TProduct } from "./productTypes";
import { axiosInstance } from "@/utils/axiosInstance";
import { ENDPOINT } from "@/endpoint";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CloudCog } from "lucide-react";
import { cookieHelper } from "@/utils/cookieHelper";

// API Call

export const useAddTocartItemsAPI = () => {
  const queryclient = useQueryClient();

  return useMutation({
    mutationFn: async ({ product, quantity }: any) => {
      const res = await axiosInstance.post(ENDPOINT.ADD_TO_CART, {
        productId: product?.productId,

        quantity,
      });

      return res.data?.data;
    },

    onSuccess: (data) => {
      // If sessionId is present in response, store it in cookies
      if (data?.sessionId) {
        cookieHelper.set("sessionId", data.sessionId, { path: "/" });
      }
      queryclient.invalidateQueries({
        queryKey: ["cart-Item"],
      });
    },
  });
};

export const useCartItems = () => {
  return useQuery({
    queryKey: ["cart-Item"],
    queryFn: async () => {
      const token = cookieHelper.get("token");

      const response = await axiosInstance.get(ENDPOINT.ADD_TO_CART);
      return response?.data?.data;
    },
  });
};

export const useUpdateCartItems = () => {
  const queryclient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      quantity,

      cartId,
    }: {
      quantity: number;

      cartId: number;
    }) => {
      const response = await axiosInstance.put(
        `${ENDPOINT.ADD_TO_CART}/${cartId}`,

        {
          quantity,
        }
      );

      return response.data;
    },

    onSuccess: () => {
      queryclient.invalidateQueries({
        queryKey: ["cart-Item"],
      });
    },
  });
};

export const useRemoveCartItems = () => {
  const queryclient = useQueryClient();

  return useMutation({
    mutationFn: async ({ cartId }: { cartId: number }) => {
      const response = await axiosInstance.delete(
        `${ENDPOINT.ADD_TO_CART}/${cartId}`
      );

      return response.data;
    },

    onSuccess: () => {
      queryclient.invalidateQueries({
        queryKey: ["cart-Item"],
      });
    },
  });
};

interface CartStoreState {
  cartItems: TProduct[];

  savedCartItems: any[];

  setCartItem: (product: TProduct) => Promise<void>;

  removeCartItem: (productId: string) => void;

  reset: () => void;
}

export const useCartStore = create<CartStoreState>((set, get) => ({
  cartItems: [],

  savedCartItems: [],

  setCartItem: async (savedProduct) => {
    try {
      const existingItems = get().cartItems;

      const updatedItems = existingItems.some(
        (item) => item.productId === savedProduct.productId
      )
        ? existingItems.map((item) =>
            item.productId === savedProduct.productId ? savedProduct : item
          )
        : [...existingItems, savedProduct];

      set({ cartItems: updatedItems });
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  },

  removeCartItem: (productId: string | number) => {
    const idNum = typeof productId === "string" ? Number(productId) : productId;
    const filteredItems = get().cartItems.filter(
      (item) => item.productId !== idNum
    );
    set({ cartItems: filteredItems });
  },

  reset: () => set({ cartItems: [] }),
}));

// Auth/Checkout Modal Store
interface AuthModalState {
  open: boolean;
  setOpen: (open: boolean) => void;
  step: number;
  setStep: (step: number) => void;
}
export const useAuthModalStore = create<AuthModalState>((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
  step: 1,
  setStep: (step: number) => set({ step }),
}));
