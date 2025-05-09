import { useEffect, useState } from "react";
import apiClient from "/src/components/services/api_client.js";

const useFetchProducts = (
	currentPage,
	priceRange,
	selectedCategory,
	searchQuery,
	sortOrder
) => {
	const [products, setProducts] = useState([]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [totalPages, setTotalPages] = useState(0);

	useEffect(() => {
		const fetchProducts = async () => {
			setLoading(true);
			const url = `/products/?price__gt=${priceRange[0]}&price__lt=${priceRange[1]}&page=${currentPage}&category_id=${selectedCategory}&search=${searchQuery}&ordering=${sortOrder}`;
			try {
				const res = await apiClient.get(url);
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
	}, [currentPage, priceRange, selectedCategory, searchQuery, sortOrder]);

	return { products, loading, totalPages };
};

export default useFetchProducts;

/*
Phimart server:
https://phimart-gold.vercel.app/api/v1/

users:
cobev93035@buides.com: Arner@2024
gasire4128@lushosa.com: Oiled@2024
*/
