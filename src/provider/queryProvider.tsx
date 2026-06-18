"use client";
import React, { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/utils/axiosInstance";
import { ENDPOINT } from "@/endpoint";
import { cookieHelper } from "@/utils/cookieHelper";

const queryClient = new QueryClient();

const QueryProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export const useGetAddresses = () => {
  return useQuery({
    queryKey: ["addresses"],
    queryFn: async () => {
      const res = await axiosInstance.get(ENDPOINT.GET_ADDRESS);
      return res.data?.data || [];
    },
    enabled: !!cookieHelper.get("token"),
  });
};
export const useFetchPincode = (pincode: string) => {
  return useQuery({
    queryKey: ["pincode", pincode],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `${ENDPOINT.FETCH_PINCODE}?pincode=${pincode}`
      );
      return res.data?.data || [];
    },
    enabled: pincode?.length === 6,
  });
};

export default QueryProvider;
