import HeroCarousel from "/src/components/Carousel/HeroCarousel";
import Features from "/src/components/Features.jsx";
import Product from "/src/components/Products/Product.jsx";
import DiscountSection from "/src/components/Discount/DiscountSection.jsx";

const Home = () => {
  return (
    <div>
      <HeroCarousel />
      <Features />
      <Product />
      <DiscountSection />
    </div>
  );
};

export default Home;
