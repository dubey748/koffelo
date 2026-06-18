import Image from "next/image";
import { Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
  };
  onSelect: () => void;
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-48 mb-4 overflow-hidden rounded-md">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {product.description}
        </p>
        <p className="font-semibold text-lg">₹{product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onSelect}>
          View Details
        </Button>
        <Button>
          <Coffee className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
