import HeroCarousel from "/src/components/Carousel/HeroCarousel";
import Features from "/src/components/Features.jsx";
import Product from "/src/components/Products/Product.jsx";
import DiscountSection from "/src/components/Discount/DiscountSection.jsx";
import Category from "/src/components/Categories/Category.jsx";

const Home = () => {
  return (
    <div>
      <HeroCarousel />
      <Features />
      <Category />
      <Product />
      <DiscountSection />
    </div>
  );
};

export default Home;
