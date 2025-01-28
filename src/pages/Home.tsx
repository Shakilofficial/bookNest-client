import Categories from "@/components/main/Categories";
import FeaturedProducts from "@/components/main/FeaturedProducts";
import Hero from "@/components/main/Hero";
import Container from "@/components/utils/Container";

const Home = () => {
  return (
    <div>
      <Hero />
      <Container>
        <FeaturedProducts />
        <Categories />
      </Container>
    </div>
  );
};

export default Home;
