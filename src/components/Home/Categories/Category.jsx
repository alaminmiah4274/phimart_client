import { useState, useEffect } from "react";
import apiClient from "/src/components/services/api_client.js";
import CategoryItems from "/src/components/Home/Categories/CategoryItems.jsx";

const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    apiClient.get("/categories/").then((res) => setCategories(res.data));
  }, []);

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      {/*Category Heading*/}
      <div className="flex items-center justify-between px-4 md:px-8 mb-4">
        <h2 className="text-2xl md:text-4xl font-bold">Browse Category</h2>
        <a
          href="#"
          className="btn btn-secondary px-4 md:px-6 py-4 md:py-6 rounded-full text-lg"
        >
          View All
        </a>
      </div>

      {/*Category Grid*/}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <CategoryItems key={category.id} index={index} category={category} />
        ))}
      </div>
    </section>
  );
};

export default Category;
