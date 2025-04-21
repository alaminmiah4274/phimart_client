import HeroCarousel from "/src/components/Carousel/HeroCarousel";
import Features from "/src/components/Features.jsx";
import Product from "/src/components/Products/Product.jsx";

const Home = () => {
  return (
    <div>
      <HeroCarousel />
      <Features />
      <Product />
    </div>
  );
};

export default Home;
