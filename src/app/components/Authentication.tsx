"use client";
import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "react-hot-toast";
import { axiosInstance } from "@/utils/axiosInstance";
import { ENDPOINT } from "@/endpoint";
import { cookieHelper } from "@/utils/cookieHelper";
import { useAuthModalStore } from "@/store/useCartStore";
import { useFetchPincode, useGetAddresses } from "@/provider/queryProvider";
import { useRouter } from "next/navigation";
import { useCartItems } from "@/store/useCartStore";
import { useCartStore } from "@/store/useCartStore";
import { useQueryClient } from "@tanstack/react-query";
import RazorPayIntegration from "./RazorPayIntegration";
import { GTMTracker } from "@/utils/GTMEventManager";

const PhoneNumberStep = ({
  phoneNumber,
  setPhoneNumber,
  onNext,
  setStep,
}: any) => {
  const handleLogin = async () => {
    if (
      !phoneNumber ||
      phoneNumber.length !== 10 ||
      !/^\d{10}$/.test(phoneNumber)
    ) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }
    try {
      const response = await axiosInstance.post(ENDPOINT.SEND_OTP, {
        phone: phoneNumber,
      });
      if (response.data?.success) {
        toast.success("OTP sent successfully");
        onNext();
        // setStep(2);
      } else {
        toast.error(response.data?.message || "Failed to send OTP");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error sending OTP");
    }
  };
  return (
    <div className="space-y-6 max-w-full my-5 w-full sm:max-w-md mx-auto px-2 sm:px-4">
      <div className="relative">
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full px-16 py-4 text-base border rounded-md focus:outline-none text-gray-900 placeholder-gray-400"
          style={{ borderColor: "#8B7355" }}
          placeholder="Phone Number"
          maxLength={10}
        />
        <span className="absolute left-4 top-4 text-black font-medium text-base">
          +91
        </span>
      </div>
      <button
        onClick={handleLogin}
        className="w-full py-4 px-6 rounded-md font-medium text-base text-white cursor-pointer hover:opacity-90"
        style={{ backgroundColor: "#8B7355" }}
      >
        Login
      </button>
    </div>
  );
};

const OTPStep = ({
  phoneNumber,
  otp,
  setOtp,
  onNext,
  onEdit,
}: // setStep,
any) => {
  const [timer, setTimer] = useState(30);
  const [resending, setResending] = useState(false);
  const {
    data: { cartItems },
  } = useCartItems();
  // Timer countdown effect
  React.useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Resend OTP handler
  const handleResendOTP = async () => {
    setResending(true);
    try {
      const response = await axiosInstance.post(ENDPOINT.SEND_OTP, {
        phone: phoneNumber,
      });
      if (response.data?.success) {
        toast.success("OTP resent successfully");
        setTimer(30); // Restart timer
      } else {
        toast.error(response.data?.message || "Failed to resend OTP");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error resending OTP");
    } finally {
      setResending(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }
    try {
      const response = await axiosInstance.post(ENDPOINT.VERIFY_OTP, {
        phone: phoneNumber,
        code: Number(otp),
      });
      const token = response?.data?.data.token;
      GTMTracker.trackAddAddressInfo({
        // event: "AddAddressInfo",
        content_ids: cartItems?.map((item: any) => String(item?.productId)),
        contents: cartItems?.map((item: any) => {
          return {
            id: item?.productId,
            quantity: item.quantity,
            item_price: item.price,
          };
        }),
        phone: response?.data?.data?.phone, // SHA256 hashed
        value: cartItems?.reduce((acc: any, curr: any) => {
          return acc + Number(curr.price);
        }, 0),
        currency: "INR",
        user_id: response?.data?.data?.userId,
        num_items: cartItems?.length,
      });
      cookieHelper.set("token", token);
      cookieHelper.set("user", JSON.stringify(response.data?.data));
      // --- Merge cart after login ---
      const sessionId = cookieHelper.get("sessionId");
      if (sessionId && token) {
        try {
          await axiosInstance.post(ENDPOINT.MERGE_CART, { sessionId });
          cookieHelper.remove("sessionId");
        } catch (mergeErr) {
          console.error("Cart merge failed", mergeErr);
        }
      }
      // --- End merge logic ---
      if (response.data?.success) {
        toast.success("OTP verified successfully");
        onNext();
      } else {
        toast.error(response.data?.message || "Incorrect OTP");
      }
    } catch (err) {
      toast.error("Incorrect OTP");
      console.error(err, "khgdsiy");
    }
  };
  return (
    <div className="space-y-6 max-w-full w-full sm:max-w-md mx-auto px-2 sm:px-4">
      <p className="text-sm text-[#523A3C]">
        Enter OTP sent to: +91 {phoneNumber}
        <button
          onClick={onEdit}
          className="text-blue-500 hover:text-blue-600 ml-2 text-sm font-semibold"
        >
          Edit
        </button>
      </p>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="w-full px-4 py-4 text-base border rounded-md focus:outline-none text-gray-900"
        style={{ borderColor: "#8B7355" }}
        placeholder="Enter 6-digit OTP"
        maxLength={6}
      />
      <button
        onClick={handleVerifyOTP}
        className="w-full py-4 px-6 rounded-md font-medium text-base text-white cursor-pointer hover:opacity-90"
        style={{ backgroundColor: "#8B7355" }}
      >
        Verify OTP
      </button>
      <div className="flex items-center justify-between mt-2">
        {timer > 0 ? (
          <span className="text-sm text-gray-500">Resend OTP in {timer}s</span>
        ) : (
          <button
            onClick={handleResendOTP}
            disabled={resending}
            className="text-[#8B7355] font-semibold text-sm hover:underline"
          >
            {resending ? "Resending..." : "Resend OTP"}
          </button>
        )}
      </div>
    </div>
  );
};

const AddressStep = ({
  addressData,
  setAddressData,
  onNext,
  hasCartItems,
  phoneNumber,
  editingAddressId,
  setPhoneNumber,
  onSaved,
  setIsPhoneNumberEditing,
}: any) => {
  const [selectedType, setSelectedType] = useState("Home");
  const { setOpen, setStep } = useAuthModalStore();
  const { data } = useFetchPincode(addressData.pincode);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (data) {
      setAddressData({
        ...addressData,
        state: data.statename,
        city: data.district,
      });
    }
  }, [data]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleAddressSubmit = async () => {
    if (!addressData.name || addressData.name.trim().length < 2) {
      toast.error("Please enter a valid name.");
      return;
    }
    if (!addressData.phone || !/^\d{10}$/.test(addressData.phone)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }
    if (!addressData.houseNumber || addressData.houseNumber.trim().length < 2) {
      toast.error("Please enter a valid house/building number.");
      return;
    }
    if (!addressData.roadName || addressData.roadName.trim().length < 2) {
      toast.error("Please enter a valid road/area/colony name.");
      return;
    }
    if (!addressData.city || addressData.city.trim().length < 2) {
      toast.error("Please enter a valid city name.");
      return;
    }
    if (!addressData.state || addressData.state.trim().length < 2) {
      toast.error("Please enter a valid state name.");
      return;
    }
    if (!addressData.pincode || !/^\d{6}$/.test(addressData.pincode)) {
      toast.error("Please enter a valid 6-digit pincode.");
      return;
    }
    if (!addressData.country || addressData.country.trim().length < 2) {
      toast.error("Please enter a valid country name.");
      return;
    }

    try {
      const finalAddressData = { ...addressData, addressType: selectedType };
      const payload = {
        name: finalAddressData?.name,
        phoneNo: finalAddressData?.phone,
        addressLine1: finalAddressData?.houseNumber,
        addressLine2: finalAddressData?.roadName,
        city: finalAddressData?.city,
        state: finalAddressData?.state,
        postalCode: finalAddressData?.pincode,
        country: finalAddressData?.country,
        isDefault: true,
        type: selectedType,
      };
      if (editingAddressId) {
        // update existing address
        await axiosInstance.put(
          `${ENDPOINT.UPDATE_ADDRESS}/${editingAddressId}`,
          payload
        );
        toast.success("Address updated successfully!");
        setAddressData({});
        setPhoneNumber({});
      } else {
        await axiosInstance.post(ENDPOINT.CREATE_ADDRESS, payload);
        toast.success("Address added successfully!");
        setAddressData({});
        setPhoneNumber({});
      }
      // refresh addresses list so PaymentStep shows the new address
      try {
        queryClient.invalidateQueries({ queryKey: ["addresses"] });
      } catch (err) {
        console.error("Failed to invalidate addresses:", err);
      }
      // notify parent that save completed (so it can clear editing state)
      if (onSaved) onSaved();
      // --- Merge cart after address save ---
      const token = cookieHelper.get("token");
      const sessionId = cookieHelper.get("sessionId");
      if (token && sessionId && sessionId !== null) {
        try {
          const mergeRes = await axiosInstance.post(ENDPOINT.MERGE_CART, {
            sessionId,
          });
          cookieHelper.remove("sessionId");

          if (mergeRes.data?.success) {
            if (!hasCartItems) {
              setOpen(false); // Close dialog for new users
              setStep(1);
            } else {
              onNext(); // Proceed to COD/payment step
            }
          } else {
            toast.error("Cart merge failed after address save.");
          }
        } catch (mergeErr) {
          toast.error("Cart merge failed after address save.");
          console.error("Cart merge failed", mergeErr);
        }
      } else {
        if (!hasCartItems) {
          setOpen(false); // Close dialog for new users
          setStep(1);
        } else {
          onNext(); // No merge needed, just proceed
        }
      }
      // --- End merge logic ---
    } catch (error) {
      console.error(error);
      toast.error("Failed to save address.");
    }
  };

  const addressTypes = ["Home", "Work", "Other"];

  // when parent provides addressData for editing, set the selected type
  React.useEffect(() => {
    if (addressData?.addressType) setSelectedType(addressData.addressType);
    if (addressData?.type) setSelectedType(addressData.type);
  }, [addressData]);

  useEffect(() => {
    return () => {
      setIsPhoneNumberEditing(false);
    };
  }, []);

  return (
    <div className="space-y-6 max-w-full w-full sm:max-w-md mx-auto px-2 sm:px-4">
      <div>
        <p className="text-sm text-[#523A3C] mb-3 font-medium">Save as *</p>
        <div className="flex items-center space-x-3">
          {addressTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-md text-sm font-medium border ${
                selectedType === type
                  ? "bg-[#8B7355] text-white border-[#8B7355]"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          name="name"
          value={addressData.name || ""}
          onChange={handleInputChange}
          className="w-full px-4 py-3 text-base border rounded-md"
          style={{ borderColor: "#8B7355" }}
          placeholder="Name *"
        />
        <input
          type="tel"
          name="phone"
          onFocus={() => setIsPhoneNumberEditing(true)}
          value={addressData.phone || ""}
          onChange={handleInputChange}
          className="w-full px-4 py-3 text-base border rounded-md"
          style={{ borderColor: "#8B7355" }}
          placeholder="Phone No. *"
          maxLength={10}
        />
        <input
          type="text"
          name="pincode"
          value={addressData.pincode || ""}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*$/.test(value) && value.length <= 6) {
              handleInputChange(e);
            }
          }}
          className="w-full px-4 py-3 text-base border rounded-md"
          style={{ borderColor: "#8B7355" }}
          placeholder="Pincode *"
        />
        <input
          type="text"
          name="houseNumber"
          value={addressData.houseNumber || ""}
          onChange={handleInputChange}
          className="w-full px-4 py-3 text-base border rounded-md"
          style={{ borderColor: "#8B7355" }}
          placeholder="House No., Building Name *"
        />
        <input
          type="text"
          name="roadName"
          value={addressData.roadName || ""}
          onChange={handleInputChange}
          className="w-full px-4 py-3 text-base border rounded-md"
          style={{ borderColor: "#8B7355" }}
          placeholder="Road Name, Area, Colony *"
        />

        <input
          type="text"
          name="city"
          value={addressData.city || ""}
          onChange={handleInputChange}
          className="w-full px-4 py-3 text-base border rounded-md"
          style={{ borderColor: "#8B7355" }}
          placeholder="City *"
        />
        <input
          type="text"
          name="state"
          value={addressData.state || ""}
          onChange={handleInputChange}
          className="w-full px-4 py-3 text-base border rounded-md"
          style={{ borderColor: "#8B7355" }}
          placeholder="State *"
        />

        <input
          type="text"
          name="country"
          value={addressData.country || ""}
          onChange={handleInputChange}
          className="w-full px-4 py-3 text-base border rounded-md"
          style={{ borderColor: "#8B7355" }}
          placeholder="Country *"
        />
      </div>
      <button
        onClick={handleAddressSubmit}
        className="w-full py-4 px-6 rounded-md font-medium text-base text-white cursor-pointer hover:opacity-90"
        style={{ backgroundColor: "#8B7355" }}
      >
        Save address and process
      </button>
    </div>
  );
};

export const BillDetailsPanel = ({ summary }: any) => {
  const { data } = useCartItems();
  const cartItems = data?.cartItems || [];

  const subtotal = cartItems.reduce((sum: number, item: any) => {
    const price =
      typeof item.price === "string"
        ? parseFloat(item.price)
        : Number(item.price) || 0;
    const quantity = Number(item.quantity) || 0;
    return sum + price * quantity;
  }, 0);
  const discountAmount = 0;
  const shippingCost = 0;
  const totalPayable = subtotal + shippingCost - discountAmount;

  return (
    // <div className="bg-white rounded-lg shadow-sm p-6 border mt-[10px] border-gray-200 w-full">
    //   <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">
    //     Bill Details
    //   </h3>
    //   <div className="space-y-3 text-sm text-gray-600">
    //     <div className="flex justify-between">
    //       <span>Total Item Price</span>
    //       <span>₹ {subtotal.toFixed(2)}</span>
    //     </div>

    //     {/* Shipping row removed */}
    //     <hr className="my-3" />
    //     <div className="flex justify-between font-bold text-base text-gray-800">
    //       <span>Total payable</span>
    //       <span>₹ {totalPayable.toFixed(2)}</span>
    //     </div>
    //   </div>
    // </div>
    <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm mt-[10px]">
      <h3 className="mb-4 border-b pb-2 text-lg font-semibold text-gray-800">
        Bill Details
      </h3>
      {summary && (
        <div className="space-y-3 text-sm text-gray-600">
          {/* --- Subtotal --- */}
          <div className="flex justify-between">
            <span>Total Item Price</span>
            <span>₹ {summary?.subtotal?.toFixed(2)}</span>
          </div>

          {/* --- Shipping Charges --- */}
          <div className="flex justify-between">
            <span>Shipping Charges</span>
            {summary?.shippingCharges > 0 ? (
              <span>₹ {summary?.shippingCharges.toFixed(2)}</span>
            ) : (
              <span className="font-medium text-green-600">Free</span>
            )}
          </div>

          {/* --- COD Charges (only shows if > 0) --- */}
          {summary?.codCharges > 0 && (
            <div className="flex justify-between">
              <span>COD Charges</span>
              <span>₹ {summary?.codCharges.toFixed(2)}</span>
            </div>
          )}

          <hr className="my-3" />

          {/* --- Total Payable --- */}
          <div className="flex justify-between text-base font-bold text-gray-800">
            <span>Total payable</span>
            <span>₹ {summary?.total.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

const PaymentStep = ({
  onPlaceOrder,
  selectedAddressId,
  setSelectedAddressId,
}: any) => {
  // const step =
  const { open, setOpen, step, setStep } = useAuthModalStore();

  const { data: addresses, isLoading } = useGetAddresses();
  const [placingOrder, setPlacingOrder] = useState(false);
  const resetCart = useCartStore((state) => state.reset);
  const queryClient = useQueryClient();
  const {
    data: { cartItems },
  } = useCartItems();
  // Find default or first address
  const defaultAddress =
    addresses?.find((a: any) => a.isDefault) || addresses?.[0];
  // Using event dispatch to notify parent to open editor

  React.useEffect(() => {
    if (!addresses || addresses.length === 0) return;
    const def = addresses.find((a: any) => a.isDefault) || addresses[0];
    const id = def?.id ?? def?._id ?? def?.addressId ?? null;
    setSelectedAddressId(id);
  }, [addresses]);

  // helper to format address line
  const formatAddressSummary = (a: any) => {
    if (!a) return "";
    const parts = [
      a.houseNumber || a.addressLine1 || a.house || a.line1 || "",
      a.roadName || a.addressLine2 || a.line2 || "",
      a.city || a.town || "",
      a.state || "",
      a.postalCode || a.pincode || a.zip || "",
    ]
      .filter(Boolean)
      .join(", ");
    return parts;
  };
  const handlePlaceOrder = async () => {
    if (step === 4) {
      GTMTracker.trackAddPaymentInfo({
        content_ids: cartItems.map((item: any) => String(item?.productId)),
        contents: cartItems.map((item: any) => {
          return {
            id: item?.productId,
            quantity: item.quantity,
            item_price: item.price,
          };
        }),
        value: cartItems.reduce((acc: any, curr: any) => {
          return acc + curr.price;
        }, 0),
        currency: "INR",
        phone: defaultAddress?.phoneNo,
        user_id: cookieHelper.get("user")?.userId,
        num_items: cartItems?.length,
        first_name: defaultAddress.name,
        last_name: defaultAddress.name,
        city: defaultAddress?.city,
        state: defaultAddress?.state,
        zip: defaultAddress?.postalCode,
        country: defaultAddress?.country,
      });
      setStep(5);
      return;
    }

    const selected =
      (addresses || []).find((a: any) => {
        const id = a.id ?? a._id ?? a.addressId;
        return id?.toString() === selectedAddressId?.toString();
      }) || defaultAddress;

    if (!selected) {
      toast.error("No shipping address found. Please add an address.");
      return;
    }
  };

  return (
    <div className="space-y-6 max-w-md mx-auto">
      {addresses && addresses.length > 0 && (
        <div className="space-y-3 mb-2">
          {addresses.map((a: any) => {
            const id = a.id ?? a._id ?? a.addressId ?? JSON.stringify(a);
            const isSelected = selectedAddressId?.toString() === id?.toString();
            return (
              <div
                key={id}
                className={`border rounded-md p-4 bg-white flex items-start gap-3 cursor-pointer ${
                  isSelected ? "ring-2 ring-[#8B7355]" : ""
                }`}
                onClick={() => setSelectedAddressId(id)}
              >
                <div className="flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => {
                      e.stopPropagation();
                      if (e.target.checked) setSelectedAddressId(id);
                      else setSelectedAddressId(null);
                    }}
                    className="h-4 w-4 text-[#8B7355] rounded"
                    aria-label={`Select address ${
                      a.name || a.fullName || "Recipient"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">
                    {a.name || a.fullName || "Recipient"}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {a.phone || a.phoneNo || a.mobile}
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    {formatAddressSummary(a)}
                  </div>
                  <div className="text-md font-bold text-[#8B7355] border border-brand-dark w-fit rounded-md px-2 mt-2">
                    {a.type ?? a.addressType ?? a.address_type ?? "Home"}
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // signal parent to open address editor with this address
                      // parent FullCheckoutFlow provides `openEditAddress` via global store
                      // we'll set a temporary event on window for simplicity
                      const ev = new CustomEvent("openAddressEdit", {
                        detail: { address: a },
                      });
                      window.dispatchEvent(ev);
                    }}
                    className="text-sm text-[#8B7355] font-medium"
                  >
                    Edit
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <button
        onClick={handlePlaceOrder}
        className="w-full py-4 px-6 rounded-md font-medium text-base text-white cursor-pointer hover:opacity-90"
        style={{ backgroundColor: "#8B7355" }}
        disabled={placingOrder || isLoading}
      >
        {placingOrder ? "Placing Order..." : "Proceed to pay"}
      </button>
    </div>
  );
};

const OrderConfirmationStep = () => {
  const router = useRouter();
  const { setOpen } = useAuthModalStore();
  return (
    <div className="space-y-6 text-center py-10">
      <div className="text-green-500 text-6xl mb-4 flex justify-center">🎉</div>
      <h3 className="text-2xl font-semibold text-gray-900">
        Order Placed Successfully!
      </h3>
      <p className="text-gray-600">
        Your order has been confirmed. You will receive an SMS with the details
        shortly.
      </p>
      <button
        onClick={() => {
          setOpen(false);
          setTimeout(() => router.push("/"), 100);
        }}
        className="w-full max-w-sm mx-auto py-4 px-6 rounded-md font-medium text-base text-white cursor-pointer hover:opacity-90"
        style={{ backgroundColor: "#8B7355" }}
      >
        Continue Shopping
      </button>
    </div>
  );
};
const OrderFailureStep = () => {
  const router = useRouter();
  const { setOpen } = useAuthModalStore();
  return (
    <div className="space-y-6 text-center py-10">
      {/* <div className="text-green-500 text-6xl mb-4 flex justify-center">🎉</div> */}
      <h3 className="text-2xl font-semibold text-gray-900">Order Failed!</h3>
      <p className="text-gray-600">Your order has been failed</p>
      <button
        onClick={() => {
          setOpen(false);
          setTimeout(() => router.push("/"), 100);
        }}
        className="w-full max-w-sm mx-auto py-4 px-6 rounded-md font-medium text-base text-white cursor-pointer hover:opacity-90"
        style={{ backgroundColor: "#8B7355" }}
      >
        Continue Shopping
      </button>
    </div>
  );
};

const FullCheckoutFlow = ({ hasCartItems = true }: any) => {
  const { open, setOpen, step, setStep } = useAuthModalStore();
  const {
    data: savedAddresses,
    isLoading: addressesLoading,
    refetch,
  } = useGetAddresses();
  const defaultAddress =
    savedAddresses?.find((a: any) => a.isDefault) || savedAddresses?.[0];
  // Using event dispatch to notify parent to open editor
  const [selectedAddressId, setSelectedAddressId] = useState<any>(
    defaultAddress?.id ??
      defaultAddress?._id ??
      defaultAddress?.addressId ??
      null
  );
  const [isPhoneNumberEditing, setIsPhoneNumberEditing] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [addressData, setAddressData] = useState<any>({ country: "India" });
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const userDetails = cookieHelper.get("user");

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("paynow");
  const [summary, setSummary] = useState<{
    subtotal: number;
    shippingCharges: number;
    codCharges: number;
    total: number;
  } | null>(null);

  React.useEffect(() => {
    const handler = (e: any) => {
      const addr = e?.detail?.address;
      if (!addr) return;
      // normalize fields into addressData shape used by AddressStep
      const normalized = {
        name: addr.name || addr.fullName || "",
        phone:
          addr.phone || addr.phoneNo || addr.mobile || userDetails.phone || "",
        houseNumber: addr.houseNumber || addr.addressLine1 || addr.house || "",
        roadName: addr.roadName || addr.addressLine2 || addr.line2 || "",
        city: addr.city || addr.town || "",
        state: addr.state || "",
        pincode: addr.postalCode || addr.pincode || addr.zip || "",
        country: addr.country || "India",
        addressType: addr.addressType || addr.type || "Home",
      };

      setAddressData(normalized);
      // determine id
      const id = addr.id ?? addr._id ?? addr.addressId ?? null;
      setEditingAddressId(id);
      setStep(3);
      if (!normalized.phone) {
        setPhoneNumber(userDetails?.phone);
      }
    };
    window.addEventListener("openAddressEdit", handler as EventListener);
    return () =>
      window.removeEventListener("openAddressEdit", handler as EventListener);
  }, [setStep]);

  useEffect(() => {
    if (!addressData?.phone && !isPhoneNumberEditing) {
      setPhoneNumber(userDetails?.phone);
      setAddressData({ ...addressData, phone: userDetails?.phone });
    }
  }, [userDetails]);

  // Adjust step based on addresses after login
  useEffect(() => {
    if (
      !addressesLoading &&
      savedAddresses &&
      savedAddresses.length === 0 &&
      step === 4
    ) {
      setStep(3);
    }
  }, [savedAddresses, addressesLoading, step]);

  const handleNext = async () => {
    if (!hasCartItems && step === 2) {
      setOpen(false);
      setStep(1);
      toast.success("Login successful!");
      return;
    }

    // After OTP, prepopulate phone in addressData if not set
    if (step === 2 && phoneNumber && !addressData.phone) {
      setAddressData((prev: any) => ({ ...prev, phone: phoneNumber }));
    }

    // Always navigate to Set Address step after OTP for users with cart items
    if (step === 2 && hasCartItems) {
      setStep(4);
      return;
    }

    if (step === 3) {
      await refetch();
      setStep(step + 1);
    } else {
      setStep(step + 1);
    }
  };
  const handleCodPlaceOrder = async () => {
    if (step === 4) {
      setStep(5);
      return;
    }

    const selected =
      (savedAddresses || []).find((a: any) => {
        const id = a.id ?? a._id ?? a.addressId;
        return id?.toString() === selectedAddressId?.toString();
      }) || defaultAddress;

    if (!selected) {
      toast.error("No shipping address found. Please add an address.");
      return;
    }
    setPlacingOrder(true);
    try {
      const payload = {
        shippingAddressId: selected.id || selected._id || selected.addressId,
        paymentMethod: "cash_on_delivery",
      };
      const response = await axiosInstance.post(ENDPOINT.CREATE_ORDER, payload);
      toast.success("Order placed successfully!");
      queryClient.invalidateQueries({ queryKey: ["cart-Item"] }); // Force cart refetch
      return response?.data;
    } catch (error) {
      toast.error("Failed to place order.");
      console.error(error);
    } finally {
      setPlacingOrder(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (step === 4) {
      setStep(5);
      return;
    }
    // After OTP, prepopulate phone in addressData if not set
    if (step === 2 && phoneNumber && !addressData.phone) {
      setAddressData((prev: any) => ({ ...prev, phone: phoneNumber }));
    }

    // Always navigate to Set Address step after OTP for users with cart items
    if (step === 2 && hasCartItems) {
      setStep(4);
      return;
    }
    // if(){}
    setStep(step + 1);
  };

  const handleEditPhone = () => {
    setStep(1);
    setOtp("");
  };

  const getStepTitle = () => {
    switch (step) {
      case 1:
      case 2:
        return "Login/Signup";
      case 3:
        return (
          <span className="flex items-center">
            <ArrowLeft
              className="mr-3 cursor-pointer"
              onClick={() => {
                setOpen(false);
                setStep(1);
              }}
            />{" "}
            Add delivery address
          </span>
        );
      case 4:
        return (
          <div>
            <span className="flex items-center">
              <ArrowLeft
                className="mr-3 cursor-pointer"
                onClick={() => {
                  // close modal when clicking back arrow
                  setOpen(false);
                  setStep(1);
                }}
              />{" "}
              Set Address
            </span>
            <div className="ml-auto w-full flex justify-end">
              <button
                onClick={() => {
                  // open address step to add a new address
                  setStep(3);
                }}
                className="px-3 py-2 text-sm rounded-md bg-white border text-[#8B7355] hover:bg-gray-50"
              >
                Add new address
              </button>
            </div>
          </div>
        );
      case 5:
        return "payment method";
      case 6:
        return "Order Confirmed!";
      default:
        return "Checkout";
    }
  };

  const renderCurrentStep = () => {
    switch (step) {
      case 1:
        return (
          <PhoneNumberStep
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            onNext={handleNext}
            // setStep={setStep}
          />
        );
      case 2:
        return (
          <OTPStep
            phoneNumber={phoneNumber}
            otp={otp}
            setOtp={setOtp}
            onNext={handleNext}
            onEdit={handleEditPhone}
            // setStep={setStep}
          />
        );
      case 3:
        // Only show address dialog if user has cart items
        if (!hasCartItems) return null;
        return (
          <div className="flex flex-col h-[300px] lg:flex-row gap-8 lg:gap-12">
            <div className="flex-grow">
              <AddressStep
                addressData={addressData}
                setAddressData={setAddressData}
                setIsPhoneNumberEditing={setIsPhoneNumberEditing}
                onNext={() => {
                  if (!hasCartItems) {
                    setOpen(false);
                    setStep(1);
                  } else {
                    handleNext();
                  }
                }}
                hasCartItems={hasCartItems}
                phoneNumber={phoneNumber}
                editingAddressId={editingAddressId}
                setPhoneNumber={setPhoneNumber}
                onSaved={() => setEditingAddressId(null)}
              />
              {/* {hasCartItems && <BillDetailsPanel />} */}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <div className="w-full">
              <PaymentStep
                onPlaceOrder={handleNext}
                selectedAddressId={selectedAddressId}
                setSelectedAddressId={setSelectedAddressId}
              />
              {/* <BillDetailsPanel /> */}
            </div>
          </div>
        );
      case 5:
        return (
          <RazorPayIntegration
            hasCartItems={true}
            handlePlaceOrder={handlePlaceOrder}
            selectedAddressId={selectedAddressId}
            setOpen={setOpen}
            setStep={setStep}
            handleCodPlaceOrder={handleCodPlaceOrder}
            setSelectedPaymentMethod={setSelectedPaymentMethod}
            selectedPaymentMethod={selectedPaymentMethod}
            setSummary={setSummary}
            summary={summary}
          />
        );
      case 6:
        return <OrderConfirmationStep />;
      case 7:
        return <OrderFailureStep />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-full w-full sm:max-w-md md:max-w-lg p-0 bg-[#FDFBF8] border-none">
          <div className="max-h-[80vh] mb-[20px] overflow-auto">
            <div className="px-2 sm:px-4">
              <div className="flex items-center space-x-2 text-sm text-gray-500 mb-8 flex-wrap"></div>
              <DialogHeader className="mb-6 text-center md:text-left">
                <DialogTitle className="text-2xl font-bold text-gray-800 ">
                  {getStepTitle()}
                </DialogTitle>
              </DialogHeader>
              {renderCurrentStep()}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FullCheckoutFlow;
