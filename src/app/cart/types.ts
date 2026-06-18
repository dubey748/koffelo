export interface TCartItems {
  cartItemId: number;
  userId: number;
  sessionId: any;
  quantity: number;
  price: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
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
