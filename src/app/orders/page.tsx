"use client";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/utils/axiosInstance";
import { ENDPOINT } from "@/endpoint";
import toast from "react-hot-toast";
import Nav from "../components/nav";

// --- Types ---
export interface Root {
  order: Order;
  tracking: Tracking;
}

export interface Order {
  orderId: number;
  totalAmount: string;
  status: string;
  paymentMethod: string;
  orderPriceBreakup: OrderPriceBreakup;
  transactionId: any;
  shippingAddressId: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
  OrderItems: OrderItem[];
  shippingAddress: ShippingAddress;
}

export interface OrderPriceBreakup {
  subtotal: number;
  codCharges: number;
  totalAmount: number;
  shippingCharges: number;
}

export interface OrderItem {
  orderItemId: number;
  quantity: number;
  unitPrice: string;
  orderId: number;
  productId: number;
  Product: Product;
}

export interface Product {
  productId: number;
  name: string;
  price: string;
  productVariant: string;
  ProductImages: ProductImage[];
}

export interface ProductImage {
  imageId: number;
  imageUrl: string;
  isPrimary: boolean;
}

export interface ShippingAddress {
  addressId: number;
  name: string;
  phoneNo: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Tracking {
  success: boolean;
  status: number;
  data: any[];
}

// --- Tracking info type for UI ---
interface TrackingInfo {
  date: string;
  status: string;
  activity: string;
  location: string;
  "sr-status": string;
  "sr-status-label": string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);
  const [orderDetails, setOrderDetails] = useState<Root | null>(null);

  // Fetch all orders
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(ENDPOINT.CREATE_ORDER);
      setOrders(res.data?.data?.orders || []);
    } catch (err) {
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Fetch full order details by ID
  const fetchOrderById = async (orderId: number) => {
    setDetailsLoading(true);
    try {
      const res = await axiosInstance.get(
        `${ENDPOINT.GET_ORDER_BY_ID}/${orderId}`
      );
      const data: Root = res.data?.data;
      if (!data) throw new Error("No order details found");
      setOrderDetails(data);
      setExpandedOrderId(orderId);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch order details");
    } finally {
      setDetailsLoading(false);
    }
  };

  // Toggle order details view
  const handleToggleDetails = (orderId: number) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
      setOrderDetails(null);
    } else {
      fetchOrderById(orderId);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F1E9]">
      <Nav />
      <div className="mx-auto max-w-3xl p-6">
        <h1 className="mb-8 text-3xl font-bold text-[#4A4A4A]">My Orders</h1>

        {loading && <div className="text-gray-500">Loading orders...</div>}
        {!loading && orders.length === 0 && (
          <div className="text-gray-500">No orders found.</div>
        )}

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
            >
              {/* --- Order Header --- */}
              <div className="mb-2 flex items-center justify-between">
                <span className="text-lg font-semibold text-[#8B5E3C]">
                  Order #{order.orderId}
                </span>
                <span
                  className={`rounded px-3 py-1 text-sm font-medium ${
                    order.status?.trim().toLowerCase() === "confirmed"
                      ? "bg-green-100 text-green-600"
                      : "bg-[#D4B996] text-[#4A4A4A]"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <div className="mb-4 text-xs italic text-gray-500">
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : ""}
              </div>
              {order.OrderItems && (
                <div>
                  <div className="mb-1 font-medium text-[#4A4A4A]">Items:</div>
                  <ul className="space-y-3">
                    {order.OrderItems.map((item: any, idx: number) => (
                      <li
                        key={idx}
                        className="flex items-center gap-4 rounded-lg bg-[#F8F1E9] p-2"
                      >
                        {item.Product?.ProductImages?.[0]?.imageUrl && (
                          <img
                            src={item.Product.ProductImages[0].imageUrl}
                            alt={item.Product.name}
                            className="h-16 w-16 rounded-md border border-gray-200 object-cover shadow-sm"
                          />
                        )}
                        <div className="flex flex-col justify-center">
                          <span className="text-base font-semibold text-[#4A4A4A]">
                            {item.Product?.name}
                          </span>
                          <div className="mt-1 flex items-center gap-3">
                            <span className="text-sm text-gray-700">
                              Qty: <b>{item.quantity}</b>
                            </span>
                            <span className="text-sm font-semibold text-[#8B5E3C]">
                              ₹{item.unitPrice}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {/* --- View Order Details Button --- */}
              <div className="mt-6 text-right">
                <button
                  onClick={() => handleToggleDetails(order.orderId)}
                  className="rounded-lg bg-[#8B5E3C] px-4 py-2 text-sm font-medium text-white hover:bg-[#704a2f]"
                >
                  {expandedOrderId === order.orderId
                    ? "Hide Order Details"
                    : "View Order Details"}
                </button>
              </div>

              {/* --- Expanded Section --- */}
              {/* --- Expanded Section --- */}
              {expandedOrderId === order.orderId && orderDetails && (
                <div className="mt-4 space-y-6 border-t border-gray-200 pt-6">
                  {/* --- Shipping Address --- */}
                  {orderDetails.order.shippingAddress && (
                    <div>
                      <h3 className="mb-2 text-lg font-semibold text-[#4A4A4A]">
                        Shipping Address
                      </h3>
                      <div className="rounded-lg border border-gray-200 bg-[#FDF8F3] p-4 text-sm text-gray-700">
                        <p className="font-bold text-gray-800">
                          {orderDetails.order.shippingAddress.name}
                        </p>
                        <p>{orderDetails.order.shippingAddress.phoneNo}</p>
                        <p>
                          {orderDetails.order.shippingAddress.addressLine1}
                          {orderDetails.order.shippingAddress.addressLine2
                            ? `, ${orderDetails.order.shippingAddress.addressLine2}`
                            : ""}
                        </p>
                        <p>
                          {orderDetails.order.shippingAddress.city},{" "}
                          {orderDetails.order.shippingAddress.state} -{" "}
                          {orderDetails.order.shippingAddress.postalCode}
                        </p>
                        <p>{orderDetails.order.shippingAddress.country}</p>
                      </div>
                    </div>
                  )}

                  {/* --- Price Breakdown / Order Summary --- */}
                  <div className="mt-4 border-t border-gray-200 pt-4 text-sm space-y-2">
                    <div className="flex justify-between text-gray-600">
                      <span>Item Total</span>
                      <span className="font-medium text-gray-800">
                        ₹
                        {orderDetails?.order?.orderPriceBreakup?.subtotal?.toFixed(
                          2
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      {orderDetails?.order?.orderPriceBreakup?.shippingCharges >
                      0 ? (
                        <span className="font-medium text-gray-800">
                          ₹
                          {orderDetails?.order?.orderPriceBreakup?.shippingCharges?.toFixed(
                            2
                          )}
                        </span>
                      ) : (
                        <span className="font-medium text-green-600">Free</span>
                      )}
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>COD Charges</span>
                      <span className="font-medium text-gray-800">
                        ₹
                        {orderDetails?.order?.orderPriceBreakup?.codCharges?.toFixed(
                          2
                        )}
                      </span>
                    </div>
                    <hr className="!my-2" />
                    <div className="flex justify-between text-base font-bold text-[#4A4A4A]">
                      <span>Grand Total</span>
                      <span>
                        ₹
                        {orderDetails?.order?.orderPriceBreakup?.totalAmount.toFixed(
                          2
                        )}
                      </span>
                    </div>
                  </div>

                  {/* --- Tracking Timeline --- */}
                  {orderDetails.tracking?.data?.length > 0 ? (
                    <div className="mt-4">
                      <h3 className="mb-2 text-lg font-semibold text-[#4A4A4A]">
                        Tracking Timeline
                      </h3>
                      <ul className="relative border-l-2 border-[#8B5E3C] pl-6">
                        {orderDetails.tracking.data.map(
                          (track: TrackingInfo, idx: number) => (
                            <li key={idx} className="relative mb-6">
                              <div className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-[#8B5E3C]" />
                              <div>
                                <p className="text-sm font-semibold text-[#4A4A4A]">
                                  {track.activity}
                                </p>
                                <p className="text-xs text-gray-600 mt-0.5">
                                  {track.date} — {track.location}
                                </p>
                                <p className="mt-1 text-xs italic text-gray-500">
                                  Status: {track["sr-status-label"]}
                                </p>
                              </div>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  ) : (
                    <p className="mt-4 text-sm text-gray-500">
                      No tracking updates available.
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
