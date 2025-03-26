import Categories from "@/components/main/Categories";
import FeaturedProducts from "@/components/main/FeaturedProducts";
import Hero from "@/components/main/Hero";
import Publishers from "@/components/main/Publishers";
import RecomendedProducts from "@/components/main/RecomendedProducts";
import { Testimonials } from "@/components/main/Testimonals";
import WCU from "@/components/main/WCU";

const Home = () => {
  return (
    <div className="space-y-12 md:space-y-20">
      <Hero />
      <FeaturedProducts />
      <Categories />
      <RecomendedProducts />
      <Publishers />
      <WCU />
      <Testimonials />
    </div>
  );
};

export default Home;
