export interface OrderDetails {
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
