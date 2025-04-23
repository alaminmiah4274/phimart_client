import { useState, useEffect } from "react";
import apiClient from "/src/components/services/api_client.js";

const useFetchCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    apiClient.get("/categories").then((res) => setCategories(res.data));
  }, []);

  return categories;
};

export default useFetchCategories;
