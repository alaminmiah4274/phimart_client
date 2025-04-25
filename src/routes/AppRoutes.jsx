import { Route, Routes } from "react-router";
import About from "/src/pages/About";
import Home from "/src/pages/Home";
import MainLayout from "/src/layouts/MainLayout";
import Shop from "/src/pages/Shop.jsx";
import Login from "/src/pages/Login.jsx";
import Register from "/src/pages/Register.jsx";
import Dashboard from "/src/pages/Dashboard.jsx";
import PrivateRoute from "/src/components/PrivateRoute.jsx";
import ActivateAccount from "/src/components/Registration/ActivateAccount.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="shop" element={<Shop />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="activate/:uid/:token" element={<ActivateAccount />} />
      </Route>
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
