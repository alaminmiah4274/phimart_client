import { useState } from "react";
import ProductList from "/src/components/Shop/ProductList.jsx";
import Pagination from "/src/components/Shop/Pagination.jsx";
import useFetchProducts from "/src/hooks/useFetchProducts.js";
import useFetchCategories from "/src/hooks/useFetchCategories.js";
import FilterSection from "/src/components/Shop/FilterSection.jsx";

const ShopPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const { products, loading, totalPages } = useFetchProducts(
    currentPage,
    priceRange,
    selectedCategory,
    searchQuery,
    sortOrder,
  );

  const categories = useFetchCategories();

  const handlePriceChange = (index, value) => {
    setPriceRange((prev) => {
      const newRange = [...prev];
      newRange[index] = value;
      return newRange;
    });
    setCurrentPage(1);
  };

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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shop Our Products</h1>
      <FilterSection
        priceRange={priceRange}
        handlePriceChange={handlePriceChange}
        categories={categories}
        selectedCategory={selectedCategory}
        handleCategoryChange={setSelectedCategory}
        searchQuery={searchQuery}
        handleSearchQuery={setSearchQuery}
        sortOrder={sortOrder}
        handleSorting={setSortOrder}
      />
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
