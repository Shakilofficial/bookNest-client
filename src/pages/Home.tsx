import Categories from "@/components/main/Categories";
import FeaturedProducts from "@/components/main/FeaturedProducts";
import Hero from "@/components/main/Hero";
import Publishers from "@/components/main/Publishers";
import RecomendedProducts from "@/components/main/RecomendedProducts";
import { Testimonials } from "@/components/main/Testimonals";
import WCU from "@/components/main/WCU";
import Container from "@/components/utils/Container";

const Home = () => {
  return (
    <div>
      <Hero />
      <Container>
        <FeaturedProducts />
        <Categories />
        <RecomendedProducts />
        <Publishers />
        <WCU />
        <Testimonials />
      </Container>
    </div>
  );
};

export default Home;
