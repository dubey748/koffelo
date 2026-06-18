import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React, { PropsWithChildren, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CarouselProduct = ({ children }: PropsWithChildren) => {
  const ref = useRef<any>(null);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1440 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1440, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="relative">
      <Carousel
        transitionDuration={600}
        infinite
        ref={ref}
        arrows={false}
        responsive={responsive}
      >
        {children}
      </Carousel>
      <div className="flex justify-center gap-4 mt-8">
        <Button
          size="icon"
          variant="outline"
          className="rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
          onClick={() => {
            ref.current?.previous();
          }}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          onClick={() => {
            ref.current?.next();
          }}
          className="rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CarouselProduct;
