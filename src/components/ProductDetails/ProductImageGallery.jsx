import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Thumbs } from "swiper/modules";
import defaultImage from "/src/assets/default_product.jpg";

const ProductImageGallery = ({ images, ProductName }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const displayImages = images.length > 0 ? images : [{ image: defaultImage }];

  return (
    <div className="rounded-lg border overflow-hidden">
      <Swiper
        modules={[Navigation, Thumbs]}
        navigation
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        className="product-main-slider"
      >
        {displayImages.map((imageObj, idx) => (
          <SwiperSlide key={idx}>
            <div className="aspect-square bg-base-100">
              <img
                src={imageObj.image}
                alt={ProductName}
                className="h-full w-full object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductImageGallery;
