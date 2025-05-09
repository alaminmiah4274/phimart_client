import HeroCarousel from "/src/components/Home/Carousel/HeroCarousel";
import Features from "/src/components/Features.jsx";
import Product from "/src/components/Products/Product.jsx";
import DiscountSection from "/src/components/Home/Discount/DiscountSection.jsx";
import Category from "/src/components/Home/Categories/Category.jsx";

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
