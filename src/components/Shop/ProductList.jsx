import ProductItem from "/src/components/Products/ProductItem.jsx";

const ProductList = ({ products, loading }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-10 min-h-screen">
        <span className="loading loading-spinner loading-xl text-secondary"></span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-10">
      {products.map((product, idx) => (
        <ProductItem key={idx} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
