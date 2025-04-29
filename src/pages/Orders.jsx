import { useEffect, useState } from "react";
import OrderCard from "../components/Orders/OrderCard";
import authApiClient from "../components/services/auth_api_client";

const Orders = () => {
	const [orders, setOrders] = useState([]);
	const [ordersLoading, setOrdersLoading] = useState(false);

	useEffect(() => {
		setOrdersLoading(true);
		authApiClient
			.get("/orders/")
			.then((res) => setOrders(res.data))
			.finally(() => setOrdersLoading(false));
	}, []);

	const handleCancelOrder = async (orderId) => {
		try {
			const res = await authApiClient.post(`/orders/${orderId}/cancel/`);

			// status: 200
			if (res.status === 200) {
				setOrders((prevOrder) =>
					prevOrder.map((order) =>
						order.id === orderId
							? { ...order, status: "Cancelled" }
							: order
					)
				);
			}
		} catch (err) {
			console.log(err);
		}
	};

	if (ordersLoading) return <div>Loading...</div>;

	return (
		<div className="container mx-auto py-8 px-4">
			<h1 className="text-2xl font-bold mb-6">Orders Details</h1>
			{orders.map((order) => (
				<OrderCard
					key={order.id}
					order={order}
					onCancel={handleCancelOrder}
				/>
			))}
		</div>
	);
};

export default Orders;
