export interface TProduct {
  productId: number;
  name: string;
  description: string;
  productShortDescription: string;
  productUsp: ProductUsp[];
  price: string;
  stockQuantity: number;
  sku: string;
  productVariant: string;
  categoryId: number;
  isActive: boolean;
  Category: Category;
  quantity?: number;
  ProductImages: ProductImage[];
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
