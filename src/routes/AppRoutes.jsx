import { Route, Routes } from "react-router";
import About from "/src/pages/About";
import Home from "/src/pages/Home";
import MainLayout from "/src/layouts/MainLayout";
import DashboardLayout from "/src/layouts/DashboardLayout";
import Shop from "/src/pages/Shop.jsx";
import Register from "/src/pages/Register.jsx";
import Dashboard from "/src/pages/Dashboard.jsx";
import PrivateRoute from "/src/components/PrivateRoute.jsx";
import ActivateAccount from "/src/components/Registration/ActivateAccount.jsx";
import Profile from "/src/pages/Profile";
import ProductDetail from "/src/pages/ProductDetail";
import Cart from "/src/pages/Cart.jsx";
import Orders from "../pages/Orders";
import Login from "/src/pages/Login.jsx";
import PaymentSuccess from "../pages/PaymentSuccess";
import AddProduct from "../pages/AddProduct";

const AppRoutes = () => {
	return (
		<Routes>
			<Route element={<MainLayout />}>
				<Route path="/" element={<Home />} />
				<Route path="about" element={<About />} />
				<Route path="shop" element={<Shop />} />
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
				<Route
					path="/activate/:uid/:token"
					element={<ActivateAccount />}
				/>
				<Route path="shop/:productId" element={<ProductDetail />} />
			</Route>

			<Route
				path="dashboard"
				element={
					<PrivateRoute>
						<DashboardLayout />
					</PrivateRoute>
				}
			>
				<Route index element={<Dashboard />} />
				<Route path="profile" element={<Profile />} />
				<Route path="cart" element={<Cart />} />
				<Route path="orders" element={<Orders />} />
				<Route path="products/add" element={<AddProduct />} />
				<Route path="payment/success" element={<PaymentSuccess />} />
			</Route>
		</Routes>
	);
};

export default AppRoutes;
