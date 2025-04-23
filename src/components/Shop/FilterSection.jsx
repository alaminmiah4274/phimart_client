const FilterSection = ({
  priceRange,
  handlePriceChange,
  categories,
  selectedCategory,
  handleCategoryChange,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/*Price Range*/}
      <div className="bg-white p-4 rounded-lg shadow">
        <label
          htmlFor=""
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Price Range
        </label>

        {/*minimum range*/}
        <div className="flex items-center space-x-4">
          <input
            type="number"
            min="0"
            step="10"
            max={priceRange[1]}
            value={priceRange[0]}
            onChange={(e) => handlePriceChange(0, Number(e.target.value))}
            className="w-20 p-2 border rounded-md"
          />
          <input
            type="range"
            min="0"
            max={priceRange[1]}
            step="10"
            value={priceRange[0]}
            onChange={(e) => handlePriceChange(0, Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/*maximum range*/}
        <div className="flex items-center space-x-4 mt-2">
          <input
            type="number"
            min={priceRange[0]}
            max="1000"
            step="10"
            value={priceRange[1]}
            onChange={(e) => handlePriceChange(1, Number(e.target.value))}
            className="w-20 p-2 border rounded-md"
          />
          <input
            type="range"
            min={priceRange[0]}
            max="1000"
            step="10"
            value={priceRange[1]}
            onChange={(e) => handlePriceChange(1, Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      {/*Category Filter*/}
      <div className="bg-white p-4 border rounded-md">
        <label
          htmlFor=""
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Category
        </label>
        <select
          className="w-full p-2 border rounded-md"
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option>All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/*Searching*/}
      <div className="bg-white p-4 rounded-lg shadow">
        <label
          htmlFor=""
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Search
        </label>
        <input
          type="text"
          className="w-full p-2 border rounded-md"
          placeholer="Search books..."
        />
      </div>

      {/*Sorting*/}
      <div className="bg-white p-4 rounded-lg shadow">
        <label
          htmlFor=""
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Sort By Price
        </label>
        <select name="" id="" className="w-full p-2 border rounded-md">
          <option value="">Default</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSection;
