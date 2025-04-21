import { Route, Routes } from "react-router";
import About from "/src/pages/About";
import Home from "/src/pages/Home";
import Product from "/src/pages/Product";
import MainLayout from "/src/layouts/MainLayout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Product />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
