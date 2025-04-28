import CartItemList from "../components/Cart/CartItemList";
import CartSummary from "../components/Cart/CartSummary";
import useCartContext from "/src/hooks/useCartContext";
import { Suspense, useEffect, useState } from "react";

const Cart = () => {
	// cart context functionalities
	const {
		loading,
		cart,
		createOrGetCart,
		updateCartItemQuantity,
		deleteCartItems,
	} = useCartContext();

	// handling the cart locally
	const [localCart, setLocalCart] = useState(cart);

	// fetching the cart data from server
	useEffect(() => {
		if (!cart && !loading) createOrGetCart();
	}, [createOrGetCart]);

	// for setting the local cart data if the server cart is changed
	useEffect(() => {
		setLocalCart(cart);
	}, [cart]);

	// updating cart item quantity
	const handleUpdateQuantity = async (itemId, newQuantity) => {
		// updating locally
		const prevLocalCartCopy = localCart;

		setLocalCart((prevLocalCart) => {
			const updatedItems = prevLocalCart.items.map((item) =>
				item.id === itemId
					? {
							...item,
							quantity: newQuantity,
							total_price: item.product.price * newQuantity,
					  }
					: item
			);

			return {
				...prevLocalCart,
				items: updatedItems,
				total_price: updatedItems.reduce(
					(sum, item) => sum + item.total_price,
					0
				),
			};
		});

		// updating in the server
		try {
			await updateCartItemQuantity(itemId, newQuantity);
		} catch (err) {
			console.log("error of update cart quantity:", err);
			setLocalCart(prevLocalCartCopy); // rollback concept
		}
	};

	// removing cart items
	const handleRemoveCartItems = async (itemId) => {
		// removing locally
		setLocalCart((prevLocalCart) => {
			const remainingItems = prevLocalCart.items.filter(
				(item) => item.id !== itemId
			);

			// return {
			// 	...prevLocalCart,
			// 	items: prevLocalCart.items.filter((item) => item.id !== itemId),
			// };

			return {
				...prevLocalCart,
				items: remainingItems,
				total_price: remainingItems.reduce(
					(sum, item) => sum + item.total_price,
					0
				),
			};
		});

		// removing in the server
		try {
			await deleteCartItems(itemId);
		} catch (err) {
			console.log("remove item error:", err);
		}
	};

	if (loading) return <div>Loading...</div>;
	if (!localCart) return <div>No Cart Found</div>;

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
				<div>
					<Suspense fallback={<p>Loading...</p>}>
						<CartItemList
							items={localCart.items}
							handleUpdateQuantity={handleUpdateQuantity}
							handleRemoveCartItems={handleRemoveCartItems}
						/>
					</Suspense>
				</div>
				<div>
					<CartSummary
						totalPrice={localCart.total_price}
						itemCount={localCart.items.length}
					/>
				</div>
			</div>
		</div>
	);
};

export default Cart;
