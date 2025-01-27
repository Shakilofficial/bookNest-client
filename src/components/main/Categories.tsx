import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Particles } from "../ui/particles";
import SectionHeader from "../utils/SectionHeader";

interface Category {
  name: string;
}

const categories: Category[] = [
  { name: "Fiction" },
  { name: "Science" },
  { name: "SelfDevelopment" },
  { name: "Poetry" },
  { name: "Religious" },
  { name: "Fantasy" },
  { name: "Adventure" },
  { name: "Horror" },
  { name: "Romance" },
  { name: "Comedy" },
  { name: "Action" },
  { name: "Thriller" },
  { name: "Drama" },
  { name: "Western" },
  { name: "Mystery" },
  { name: "ScienceFiction" },
  { name: "History" },
  { name: "Technology" },
];

const Categories = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto">
        <SectionHeader
          highlight="Explore Product Categories"
          subtitle="Discover the most popular categories."
          className="text-center mb-8"
        />
        <Carousel
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="relative w-full mx-auto"
        >
          <CarouselContent className="flex gap-2">
            {categories.map((category) => (
              <CarouselItem
                key={category.name}
                className="basis-1/2 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 hover:scale-105 transition-transform duration-500 ease-in-out"
              >
                <Link to={`/category/${category.name.toLowerCase()}`}>
                  <div className="relative flex h-[100px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background">
                    <Particles
                      className="absolute inset-0 z-0 opacity-50"
                      quantity={100}
                      color=""
                      refresh
                    />
                    <span className="text-primary text-lg font-extrabold z-10">
                      {category.name}
                    </span>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full bg-white hover:bg-gray-200 transition-all duration-500 ease-in-out"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </CarouselPrevious>
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full bg-white hover:bg-gray-200 transition-all duration-500 ease-in-out"
              aria-label="Next slide"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </CarouselNext>
        </Carousel>
      </div>
    </section>
  );
};

export default Categories;
