import { ENDPOINT } from "@/endpoint";
import { axiosInstance } from "@/utils/axiosInstance";
import { cookieHelper } from "@/utils/cookieHelper";
import React, { useEffect, useState } from "react";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
import { BillDetailsPanel } from "./Authentication";
import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import { GTMTracker } from "@/utils/GTMEventManager";
import { useGetAddresses } from "@/provider/queryProvider";

const RazorPayIntegration = ({
  hasCartItems,
  selectedAddressId,
  setOpen,
  setStep,
  handleCodPlaceOrder,
  setSelectedPaymentMethod,
  selectedPaymentMethod,

  setSummary,
  summary,
}: any) => {
  const { error, isLoading, Razorpay } = useRazorpay();
  const router = useRouter();
  const { data } = useGetAddresses();

  const createPaymentOrder = async () => {
    try {
      const response = await axiosInstance.post(
        `${ENDPOINT.CREATE_PAYMENT_ORDER}`,
        { shippingAddressId: selectedAddressId }
      );
      return response.data?.data?.order;
    } catch (err) {
      console.log(err);
    }
  };
  const orderStatusHandler = async (order_id: string) => {
    try {
      const res = await axiosInstance.post(ENDPOINT.CHECK_ORDER_STATUS, {
        paymentOrderId: order_id,
      });
      return res.data?.data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCartSummary(selectedPaymentMethod !== "paynow");
  }, [selectedPaymentMethod]);

  const handlePayment = async () => {
    setOpen(false);
    const userDetails = cookieHelper.get("user");

    const order = await createPaymentOrder();
    const options: RazorpayOrderOptions = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY as string,
      amount: order.amount * 100, // Amount in paise
      currency: "INR",
      name: "Koffelo",
      description: "Test Transaction",
      order_id: order.id, // Generate order_id on server
      handler: async () => {
        const currentAddressDetails = data?.find(
          (item: any) => item?.addressId === selectedAddressId
        );
        await orderStatusHandler(order.id).then(async (res) => {
          if (res.orderStatus === "confirmed") {
            const orderResponse = await axiosInstance.get(
              `/api/orders/${res.orderId}`
            );
            const totalPrice =
              orderResponse?.data?.data?.order?.OrderItems?.reduce(
                (acc: any, curr: any) =>
                  acc + Number(curr?.unitPrice) * curr?.quantity,
                0
              );
            GTMTracker.trackPurchase({
              transaction_id: orderResponse.data?.data?.order?.transactionId,
              content_ids: orderResponse.data?.data?.order?.OrderItems?.map(
                (item: any) => item.Product?.productId
              ),
              contents: orderResponse.data?.data?.order?.OrderItems?.map(
                (item: any) => {
                  return {
                    id: item.Product?.productId,
                    quantity: item?.quantity,
                    item_price: item?.unitPrice * item.quantity,
                  };
                }
              ),
              value: totalPrice,
              currency: "INR",
              num_items: orderResponse.data?.data?.order?.OrderItems?.length,
              phone: currentAddressDetails?.phoneNo,
              first_name: currentAddressDetails?.name,
              last_name: currentAddressDetails?.name,
              city: currentAddressDetails?.city,
              state: currentAddressDetails?.state,
              zip: currentAddressDetails?.postalCode,
              country: currentAddressDetails?.country,
              // coupon: "{{Coupon Code}}",
              payment_method: orderResponse.data?.data?.order?.paymentMethod,
              user_id: orderResponse.data?.data?.order?.userId,
            });
            setOpen(true);
            setStep(6);
            setTimeout(() => {
              router.push("/orders");
            }, 5000);
          } else {
            setOpen(true);
            setStep(7);
          }
        });
      },
      modal: {
        backdropclose: false,
      },
      prefill: {
        name: "",
        email: "",
        contact: userDetails.phone,
      },
      theme: {
        color: "brown",
      },
    };
    const razorpayInstance = new Razorpay(options);
    razorpayInstance.on("payment.failed", function (response) {
      console.log("Payment Failed:", response.error);
    });

    razorpayInstance.open();
  };
  const fetchCartSummary = async (isCod: boolean) => {
    let url = `/api/cart`;
    if (isCod) {
      url = `/api/cart/?paymentMethod=cash_on_delivery`;
    }
    const res = await axiosInstance.get(url);
    setSummary(res.data?.data?.summary);
  };

  return (
    <div className="space-y-4">
      {/* Pay Now */}
      <label className="flex items-start space-x-4 border border-[#8B7355] rounded-md p-4 bg-white cursor-pointer w-full">
        <input
          type="radio"
          name="paymentMethod"
          value={selectedPaymentMethod}
          className="h-5 w-5 text-[#8B7355] focus:ring-[#8B7355] border-gray-300 mt-1"
          defaultChecked
          disabled={false}
          onChange={() => {
            setSelectedPaymentMethod("paynow");
          }}
          // onClick={handlePayment}
        />
        <div>
          <span className="font-semibold text-gray-800">Pay now (Online)</span>
          <p className="text-sm text-gray-500 mt-1">
            Pay instantly using Razorpay.
          </p>
        </div>
      </label>

      {/* COD */}
      <label className="flex items-start space-x-4 border border-[#8B7355] rounded-md p-4 bg-white cursor-pointer w-full">
        <input
          type="radio"
          name="paymentMethod"
          value={selectedPaymentMethod}
          onChange={() => {
            setSelectedPaymentMethod("cod");
          }}
          className="h-5 w-5 text-[#8B7355] focus:ring-[#8B7355] border-gray-300 mt-1"
        />
        <div>
          <span className="font-semibold text-gray-800">
            Cash on Delivery (COD)
          </span>
          <p className="text-sm text-gray-500 mt-1">
            Pay with cash when your order is delivered.
          </p>
        </div>
      </label>
      {hasCartItems && <BillDetailsPanel summary={summary} />}

      <button
        onClick={() => {
          if (selectedPaymentMethod === "paynow") {
            handlePayment();
          } else {
            // handleCodPlaceOrder();
            handleCodPlaceOrder().then(async (res: any) => {
              const orderResponse = await axiosInstance.get(
                `/api/orders/${res?.data?.order?.orderId}`
              );
              const currentAddressDetails = data?.find(
                (item: any) => item?.addressId === selectedAddressId
              );
              const totalPrice =
                orderResponse?.data?.data?.order?.OrderItems?.reduce(
                  (acc: any, curr: any) =>
                    acc + Number(curr?.unitPrice) * curr?.quantity,
                  0
                );
              GTMTracker.trackPurchase({
                transaction_id: orderResponse.data?.data?.order?.transactionId,
                content_ids: orderResponse.data?.data?.order?.OrderItems?.map(
                  (item: any) => item.Product?.productId
                ),
                contents: orderResponse.data?.data?.order?.OrderItems?.map(
                  (item: any) => {
                    return {
                      id: item.Product?.productId,
                      quantity: item?.quantity,
                      item_price: Number(item?.unitPrice) * item?.quantity,
                    };
                  }
                ),
                value: totalPrice,
                currency: "INR",
                num_items: orderResponse.data?.data?.order?.OrderItems?.length,
                phone: currentAddressDetails?.phoneNo,
                first_name: currentAddressDetails?.name,
                last_name: currentAddressDetails?.name,
                city: currentAddressDetails?.city,
                state: currentAddressDetails?.state,
                zip: currentAddressDetails?.postalCode,
                country: currentAddressDetails?.country,
                payment_method: orderResponse.data?.data?.order?.paymentMethod,
                user_id: orderResponse.data?.data?.order?.userId,
              });
              setOpen(true);
              setStep(6);
              setTimeout(() => {
                router.push("/orders");
              }, 5000);
            });
          }
        }}
        className="w-full py-4 px-6 rounded-md font-medium text-base text-white cursor-pointer hover:opacity-90"
        style={{ backgroundColor: "#8B7355" }}
        // disabled={placingOrder || isLoading}
      >
        Place order
        {/* {placingOrder ? "Placing Order..." : "Proceed to pay"} */}
      </button>
    </div>
  );
};

export default RazorPayIntegration;
