import authApiClient from "../services/auth_api_client";

const CartSummary = ({ totalPrice, itemCount, cartId }) => {
	const shipping = itemCount === 0 || parseFloat(totalPrice) > 100 ? 0 : 10;
	const tax = parseFloat(totalPrice) * 0.1;
	const orderTotal = parseFloat(totalPrice) + shipping + tax;

	const handleDeleteCart = () => {
		localStorage.removeItem("cartId");
	};

	const handleCreateOrder = async () => {
		try {
			const response = await authApiClient.post("/orders/", {
				cart_id: cartId,
			});

			// status: 201
			if (response.status === 201) {
				handleDeleteCart();

				alert("Order created successfully");
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="card bg-base-100 shadow-xl">
			<div className="card-body">
				<h2 className="text-xl font-semibold mb-4">Order Summary</h2>
				<div className="space-y-2">
					<div className="flex justify-between">
						<span className="text-gray-500">
							Subtotal {itemCount} Items
						</span>
						<span>${totalPrice.toFixed(2)}</span>
					</div>
					<div className="flex justify-between">
						<span className="text-gray-500">Shipping</span>
						<span>
							{shipping === 0
								? "Free"
								: `$${shipping.toFixed(2)}`}
						</span>
					</div>
					<div className="flex justify-between">
						<span className="text-gray-500">Estimated Tax</span>
						<span>${tax.toFixed(2)}</span>
					</div>
					<div className="border-t border-gray-200 pt-2 mt-2">
						<div className="flex justify-between font-medium">
							<span>Order Total</span>
							<span>${orderTotal.toFixed(2)}</span>
						</div>
					</div>
				</div>
				<div className="card-actions justify-end mt-4">
					<button
						className="btn btn-primary w-full"
						onClick={handleCreateOrder}
						disabled={itemCount === 0}
					>
						Proceed to Checkout
					</button>
				</div>
			</div>
		</div>
	);
};

export default CartSummary;
