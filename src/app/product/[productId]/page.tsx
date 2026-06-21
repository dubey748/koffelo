import { notFound } from "next/navigation";
import Nav from "../../components/nav";
import Footer from "../../components/footer";
import ProductDetail from "../../components/ProductDetails";
import ProductPreview from "../../components/ProductPreview";
import { axiosInstance } from "@/utils/axiosInstance";
import { ENDPOINT } from "@/endpoint";
import { TProductDetails } from "@/app/components/types";
import {
  FALLBACK_CATALOGUE,
  FallbackProduct,
} from "@/app/components/_fallbackCatalogue";

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

type Outcome =
  | { kind: "api"; details: TProductDetails["productDetails"] }
  | { kind: "preview"; product: FallbackProduct; others: FallbackProduct[] }
  | { kind: "notfound" };

const resolveProduct = async (variantId: string): Promise<Outcome> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // If no API URL configured, render the premium preview straight away
  if (!apiUrl) {
    const numericId = Number(variantId);
    const match = FALLBACK_CATALOGUE.find((p) => p.id === numericId);
    if (match) {
      return {
        kind: "preview",
        product: match,
        others: FALLBACK_CATALOGUE.filter((p) => p.id !== match.id),
      };
    }
    return { kind: "notfound" };
  }

  // API path
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
      return { kind: "notfound" };
    }

    return { kind: "api", details: foundProduct };
  } catch (error) {
    console.error("Failed to fetch product details:", error);
    // Graceful degradation: if the configured API errors out, fall back
    // to preview mode for known IDs so the page never hard-crashes.
    const numericId = Number(variantId);
    const match = FALLBACK_CATALOGUE.find((p) => p.id === numericId);
    if (match) {
      return {
        kind: "preview",
        product: match,
        others: FALLBACK_CATALOGUE.filter((p) => p.id !== match.id),
      };
    }
    return { kind: "notfound" };
  }
};

export default async function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const outcome = await resolveProduct(params?.productId);

  if (outcome.kind === "notfound") {
    notFound();
  }

  if (outcome.kind === "preview") {
    return (
      <>
        <Nav />
        <ProductPreview product={outcome.product} others={outcome.others} />
        <Footer />
      </>
    );
  }

  return <ProductDetail productDetails={outcome.details} />;
}
