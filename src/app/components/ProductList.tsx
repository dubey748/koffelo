"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    name: "Classic Blend",
    description:
      "A smooth, well-balanced coffee with hints of chocolate and nuts.",
    price: 12.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Dark Roast",
    description: "A bold, intense coffee with a smoky flavor and full body.",
    price: 14.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Espresso Blend",
    description:
      "A rich, full-bodied coffee perfect for espresso-based drinks.",
    price: 15.99,
    image: "/placeholder.svg?height=200&width=200",
  },
];

export default function ProductList() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Our Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: any) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={() => setSelectedProduct(product)}
          />
        ))}
      </div>
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">
              {selectedProduct.name}
            </h3>
            <p className="mb-4">{selectedProduct.description}</p>
            <p className="font-semibold mb-4">
              Price: ${selectedProduct.price.toFixed(2)}
            </p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => setSelectedProduct(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
