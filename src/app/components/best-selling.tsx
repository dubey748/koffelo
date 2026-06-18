"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

const products = {
  id: 1,
  name: "Premium",
  image: "/assets/philosophy.jpg",
  label: "50gm",
};
export default function BestSelling() {
  const route = useRouter();

  return (
    <div
    className="bg-[#f5e6d3] py-16 items-center justify-center flex"
    id="ourphillosophy"
  >
    <img
      src={products.image}
      alt="product"
      className="w-90 h-full object-contain"
    />
  </div>
  );
}
