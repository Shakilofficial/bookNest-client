import Categories from "@/components/main/Categories";
import FeaturedBooks from "@/components/main/FeaturedBooks";
import Hero from "@/components/main/Hero";
import Container from "@/components/utils/Container";

const Home = () => {
  return (
    <div>
      <Hero />
      <Container>
        <FeaturedBooks />
        <Categories />
      </Container>
    </div>
  );
};

export default Home;
