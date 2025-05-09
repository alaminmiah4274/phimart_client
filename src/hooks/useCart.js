import { useCallback, useEffect, useState } from "react";
import authApiClient from "../components/services/auth_api_client";

const useCart = () => {
	const [authToken] = useState(
		() => JSON.parse(localStorage.getItem("authTokens"))?.access
	);

	const [cart, setCart] = useState(null);
	const [cartId, setCartId] = useState(() => localStorage.getItem("cartId"));
	const [loading, setLoading] = useState(false);

	// create a new cart
	const createOrGetCart = useCallback(async () => {
		setLoading(true);
		try {
			const response = await authApiClient.post("/carts/");

			// status : 200

			// to set cart id to local storage only once
			if (!cartId) {
				localStorage.setItem("cartId", response.data.id);

				// cart id
				setCartId(response.data.id);
			}

			// cart
			setCart(response.data);

			// to set the cart id in local storage
			// localStorage.setItem("cartId", res.data.id);
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	}, [cartId]);

	// add items to the cart
	const AddCartItems = useCallback(
		async (product_id, quantity) => {
			setLoading(true);

			if (!cartId) await createOrGetCart();

			try {
				const response = await authApiClient.post(
					`/carts/${cartId}/items/`,
					{
						product_id,
						quantity,
					}
				);

				return response.data;
			} catch (err) {
				console.log("Error adding cart items:", err);
			} finally {
				setLoading(false);
			}
		},
		[cartId, createOrGetCart]
	);

	// Update cart Item Quantity:
	const updateCartItemQuantity = useCallback(
		async (itemId, quantity) => {
			try {
				await authApiClient.patch(`/carts/${cartId}/items/${itemId}`, {
					quantity,
				});
			} catch (err) {
				console.log("error update cart item:", err);
			}
		},
		[cartId]
	);

	// delete cart item
	const deleteCartItems = useCallback(
		async (itemId) => {
			try {
				await authApiClient.delete(`/carts/${cartId}/items/${itemId}`);
			} catch (err) {
				console.log("delete cart item error:", err);
			}
		},
		[cartId]
	);

	// declared for refreshing navbar cart
	useEffect(() => {
		const initializeCart = async () => {
			setLoading(true);
			await createOrGetCart();
			setLoading(false);
		};

		initializeCart();
	}, [createOrGetCart]);

	return {
		loading,
		cart,
		cartId,
		createOrGetCart,
		AddCartItems,
		updateCartItemQuantity,
		deleteCartItems,
	};
};

export default useCart;
