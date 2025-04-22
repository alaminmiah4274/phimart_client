import { useEffect, useState } from "react";
import apiClient from "/src/components/services/api_client.js";

const useFetchProducts = (currentPage) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await apiClient.get(`/products/?page=${currentPage}`);
        const data = await res.data;

        setProducts(data.results);
        setTotalPages(Math.ceil(data.count / data.results.length));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]);

  return { products, loading, totalPages };
};

export default useFetchProducts;
