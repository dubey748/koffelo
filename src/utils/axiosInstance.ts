import axios from "axios";

import { cookieHelper } from "./cookieHelper";
import { CloudCog } from "lucide-react";
import { useAuthModalStore } from "@/store/useCartStore";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = cookieHelper.get("token");
    const sessionId = cookieHelper.get("sessionId");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else if (sessionId) {
      config.headers["Session-Id"] = sessionId;
    }
    return config;
  },

  (err) => Promise.reject(err)
);
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear cookies if unauthorized
      cookieHelper.remove("token");
      cookieHelper.remove("sessionId");
      const { setOpen } = useAuthModalStore.getState();
      setOpen(true);
      // Optional: redirect to login page
      // window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
