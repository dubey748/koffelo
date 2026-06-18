import { notFound } from "next/navigation";
import ProductDetail from "../../components/ProductDetails";
import { axiosInstance } from "@/utils/axiosInstance";
import { ENDPOINT } from "@/endpoint";
import { TProductDetails } from "@/app/components/types";
import axios from "axios";

interface AllProductsApiResponse {
  success: boolean;
  message: string;
  data: {
    products: Array<{
      name: string;
      description: string;
      productShortDescription: string;
      productUsp: Array<{
        title: string;
        description: string;
        icon: string;
      }>;
      categoryId: number;
      categoryName: string;
      isActive: boolean;
      variants: Array<{
        productId: number;
        productVariant: string;
        price: string;
        discountedPrice: string;
        stockQuantity: number;
        sku: string;
        isActive: boolean;
        discountedPercentage: number;
        marketPlaceLink: {
          platformName: string;
          redirectUrl: string;
          iconUrl: string;
        }[];
        images: Array<{
          imageId: number;
          imageUrl: string;
          isPrimary: boolean;
        }>;
      }>;
    }>;
  };
}

const getproductDetails = async (
  variantId: string
): Promise<TProductDetails["productDetails"]> => {
  try {
    const res = await axiosInstance.get<AllProductsApiResponse>(
      ENDPOINT.GET_PRODUCT_INFO
    );

    const allProducts = res?.data?.data?.products || [];

    let foundProduct: TProductDetails["productDetails"] | undefined;

    for (const mainProduct of allProducts) {
      const foundVariant = mainProduct.variants.find(
        (variant) => variant.productId.toString() === variantId
      );

      if (foundVariant) {
        const primaryImage =
          foundVariant.images.find((img) => img.isPrimary)?.imageUrl ||
          foundVariant.images[0]?.imageUrl ||
          "/assets/placeholder.png";

        foundProduct = {
          product: {
            productId: foundVariant.productId,
            name: mainProduct.name,

            description: mainProduct.description,
            productShortDescription: mainProduct.productShortDescription,
            productUsp: mainProduct.productUsp,
            price: foundVariant.price,
            discountedPrice: foundVariant.discountedPrice,
            discountedPercentage: foundVariant.discountedPercentage,
            marketPlaceLink: foundVariant.marketPlaceLink,
            stockQuantity: foundVariant.stockQuantity,
            sku: foundVariant.sku,
            productVariant: foundVariant.productVariant,
            categoryId: mainProduct.categoryId,
            isActive: foundVariant.isActive,
            Category: {
              categoryId: mainProduct.categoryId,
              name: mainProduct.categoryName,
            },
            ProductImages: foundVariant.images,
          },
          variants: mainProduct.variants.map((v) => ({
            productId: v.productId,
            name: mainProduct.name,
            description: mainProduct.description,
            productShortDescription: mainProduct.productShortDescription,
            productUsp: mainProduct.productUsp,
            discountedPercentage: v.discountedPercentage,
            price: v.price,
            discountedPrice: v.discountedPrice,
            marketPlaceLink: v.marketPlaceLink,
            stockQuantity: v.stockQuantity,
            sku: v.sku,
            productVariant: v.productVariant,
            categoryId: mainProduct.categoryId,
            isActive: v.isActive,
            Category: {
              categoryId: mainProduct.categoryId,
              name: mainProduct.categoryName,
            },
            ProductImages: v.images,
          })),
        };
        break;
      }
    }

    if (!foundProduct) {
      notFound();
    }

    return foundProduct;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      notFound();
    }
    console.error("Failed to fetch product details:", error);
    notFound();
  }
};

export default async function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const productDetails = await getproductDetails(params?.productId);

  return <ProductDetail productDetails={productDetails} />;
}
