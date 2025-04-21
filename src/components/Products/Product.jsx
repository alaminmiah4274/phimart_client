// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Navigation } from "swiper/modules";

import { useEffect, useState } from "react";
// import axios from "axios";
import ProductItem from "/src/components/Products/ProductItem";
import ErrorAlert from "/src/components/ErrorAlert";
import apiClient from "/src/components/services/api_client.js";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    apiClient
      .get("/products/")
      .then((res) => setProducts(res.data.results))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  /*
  finally() in axios: The finally() method of Promise instances schedules a function to be called 
  when the promise is settled (either fulfilled or rejected).
  */

  return (
    <section className="mx-auto py-16 bg-gray-50">
      <div className="flex items-center justify-between px-4 md:px-8 mb-4">
        <h2 className="text-2xl md:text-4xl font-bold">Trending Products</h2>
        <a
          href="#"
          className="btn btn-secondary px-4 md:px-6 py-4 md:py-6 rounded-full text-lg"
        >
          View All
        </a>
      </div>

      {/*Spinner*/}
      {loading && (
        <div className="flex items-center justify-center py-10">
          <span className="loading loading-spinner loading-xl text-secondary"></span>
        </div>
      )}

      {/*Error*/}
      {error && <ErrorAlert error={error} />}

      {/*Product Slider*/}
      {!loading && !error && products.length > 0 && (
        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          navigation
          className="mt-4 px-4 container"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} className="flex justify-center">
              <ProductItem product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {!loading && !error && products.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No Products Available</p>
      )}
    </section>
  );
};

export default Product;
