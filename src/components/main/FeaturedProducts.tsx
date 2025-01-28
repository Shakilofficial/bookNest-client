import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import type { TProduct } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

import FeaturedProductCard from "../product/FeaturedProductCard";
import { RainbowButton } from "../ui/rainbow-button";
import SectionHeader from "../utils/SectionHeader";

const FeaturedProducts = () => {
  const [products, setProducts] = useState<TProduct[]>([]);

  const { data, error, isLoading, isFetching } = useGetAllProductsQuery([
    { name: "sortBy", value: "price" },
    { name: "sortOrder", value: "desc" },
    { name: "limit", value: 10 },
  ]);
  useEffect(() => {
    if (data?.data) {
      setProducts(data.data);
    }
  }, [data]);

  if (isLoading || isFetching) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState />;
  }

  return (
    <section className="py-12">
      <div className="container mx-auto">
        <SectionHeader
          highlight="Featured Products"
          subtitle="Discover the most popular products, curated just for you."
          className="text-center mb-8"
        />
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="relative w-full mx-auto"
        >
          <CarouselContent className="flex gap-2">
            {products.map((product) => (
              <CarouselItem
                key={product._id}
                className="flex-shrink-0 basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 hover:scale-105 transition-transform duration-300 ease-in-out"
              >
                <div className="p-2">
                  <FeaturedProductCard product={product} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full transition-all duration-300"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </CarouselPrevious>
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full transition-all duration-300"
              aria-label="Next slide"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </CarouselNext>
        </Carousel>
        <div className="text-center mt-8">
          <RainbowButton>View All Books</RainbowButton>
        </div>
      </div>
    </section>
  );
};

const LoadingState = () => (
  <section className="flex justify-center items-center min-h-[200px]">
    <p>Loading featured products...</p>
  </section>
);

const ErrorState = () => (
  <section className="flex justify-center items-center min-h-[200px]">
    <p className="text-red-500">
      Failed to load featured products. Please try again later.
    </p>
  </section>
);

export default FeaturedProducts;
