import cover1 from "@/assets/images/cover-4.jpg";
import cover2 from "@/assets/images/wcu-1.jpg";
import cover3 from "@/assets/images/wcu-2.jpg";
import cover4 from "@/assets/images/wcu-3.jpg";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RainbowButton } from "../ui/rainbow-button";

const slides = [
  {
    image: cover1,
    title: "Discover Your Next Favorite Book",
    description:
      "Dive into a curated collection of stories and knowledge to transform your world.",
  },
  {
    image: cover2,
    title: "Unlock Worlds of Imagination",
    description:
      "Explore new perspectives and diverse voices through our handpicked selection.",
  },
  {
    image: cover3,
    title: "Experience the Joy of Reading",
    description: "Find the perfect book to inspire, educate, and entertain.",
  },
  {
    image: cover4,
    title: "Read, Learn, and Grow",
    description: "Embark on a journey of lifelong learning and discovery.",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () =>
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );

  return (
    <section className="relative h-[50vh] md:h-[70vh] overflow-hidden">
      <AnimatePresence initial={false} custom={currentSlide}>
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentSlide ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              className="absolute inset-0 w-full h-full object-cover"
              src={slide.image}
              alt={`Slide ${index + 1}`}
            />
            <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
              <div className="text-center text-white px-8 max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl">
                <motion.h1
                  className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {slide.title}
                </motion.h1>
                <motion.p
                  className="text-lg sm:text-xl md:text-2xl mb-8"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {slide.description}
                </motion.p>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link to="/all-products">
                    <RainbowButton className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold mt-6">
                      Explore Books
                    </RainbowButton>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index ? "bg-white scale-125" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
