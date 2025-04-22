import { useState, useEffect } from "react";
import apiClient from "/src/components/services/api_client.js";
import ProductList from "/src/components/Shop/ProductList.jsx";

const ShopPage = () => {
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

  return (
    <div>
      <ProductList products={products} loading={loading} />
    </div>
  );
};

export default ShopPage;
