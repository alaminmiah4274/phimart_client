import { useState } from "react";
import ProductList from "/src/components/Shop/ProductList.jsx";
import Pagination from "/src/components/Shop/Pagination.jsx";
import useFetchProducts from "/src/hooks/useFetchProducts.js";

const ShopPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { products, loading, totalPages } = useFetchProducts(currentPage);

  // const fetchProducts = () => {
  //   setLoading(true);
  //   apiClient
  //     .get(`/products/?page=${currentPage}`)
  //     .then((res) => {
  //       setProducts(res.data.results);
  //       setTotalPages(Math.ceil(res.data.count / res.data.results.length));
  //     })
  //     .catch((err) => setError(err.message))
  //     .finally(() => setLoading(false));
  // };

  return (
    <div>
      <ProductList products={products} loading={loading} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        handleCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default ShopPage;
