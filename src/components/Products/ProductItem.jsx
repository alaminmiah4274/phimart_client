import defaultImg from "/src/assets/default_product.jpg";

const ProductItem = ({ product }) => {
  return (
    <div className="card bg-base-100 h-[420px] shadow-sm">
      <figure className="px-8 pt-10">
        <img
          src={product.images.length > 0 ? product.images[0].image : defaultImg}
          alt="Shoes"
          className="rounded-xl w-full h-[220px]"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{product.name}</h2>
        <p className="font-bold text-xl text-red-700">${product.price}</p>
        <p>{product.description}</p>
        <div className="card-actions">
          <button className="btn btn-secondary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
