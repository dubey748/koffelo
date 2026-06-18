export type TProductsTypes = Root2[];

export interface Root2 {
  name: string;
  description: string;
  productShortDescription: string;
  productUsp: ProductUsp[];
  categoryId: number;
  categoryName: string;
  isActive: boolean;
  variants: Variant[];
}

export interface ProductUsp {
  title: string;
  description: string;
  icon: string;
}

export interface Variant {
  productId: number;
  productVariant: string;
  price: string;
  discountedPrice: string;

  stockQuantity: number;
  sku: string;
  isActive: boolean;
  images: Image[];
}

export interface Image {
  imageId: number;
  imageUrl: string;
  isPrimary: boolean;
}
//PRODUCT DETAIL
export interface TProductDetails {
  productDetails: ProductDetails;
}

export interface ProductDetails {
  product: Product;
  variants: Product[];
  images?: Image[];
}
export interface Platform {
  platformName: string;
  redirectUrl: string;
  iconUrl: string;
}

export interface Product {
  productId: number;
  name: string;
  description: string;
  productShortDescription: string;
  productUsp: ProductUsp[];
  price: string;
  discountedPrice: string;
  discountedPercentage: number;
  stockQuantity: number;
  sku: string;
  productVariant: string;
  categoryId: number;
  isActive: boolean;
  Category: Category;
  ProductImages: ProductImage[];
  marketPlaceLink: Platform[];
}

export interface ProductUsp {
  title: string;
  description: string;
  icon: string;
}

export interface Category {
  categoryId: number;
  name: string;
}

export interface ProductImage {
  imageId: number;
  imageUrl: string;
  isPrimary: boolean;
}

export interface Image {
  imageId: number;
  imageUrl: string;
  isPrimary: boolean;
  productId: number;
}

//Review section types
export interface TReview {
  averageRating: number;
  count: number;
  page: number;
  limit: number;
  totalPages: number;
  reviews: Review[];
}
export interface Review {
  reviewId: number;
  user: User;
  title: string;
  rating: number;
  description: string;
  imageUrls: string[];
  createdAt: string;
}

export interface User {
  userId: number;
  firstName: string;
  lastName: any;
}
