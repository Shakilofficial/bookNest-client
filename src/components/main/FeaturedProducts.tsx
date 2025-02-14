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
import { Link } from "react-router-dom";
import FeaturedProductCard from "../product/FeaturedProductCard";
import Error from "../skeleton/Error";
import GridSkeleton from "../skeleton/GridSkeleton";
import { RainbowButton } from "../ui/rainbow-button";
import SectionHeader from "../utils/SectionHeader";

const FeaturedProducts = () => {
  const { isFetching, isLoading, isError, error, data } =
    useGetAllProductsQuery([
      { name: "sortBy", value: "price" },
      { name: "sortOrder", value: "desc" },
      { name: "limit", value: 10 },
    ]);

  if (isLoading || isFetching) {
    return <GridSkeleton />;
  }

  if (isError || error) {
    return <Error />;
  }

  const products: TProduct[] = data?.data || [];

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
                className="flex-shrink-0 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 hover:scale-105 transition-transform duration-300 ease-in-out"
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
          <Link to="/all-products">
            <RainbowButton className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
              Explore All Products
            </RainbowButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
