import { Route, Routes } from "react-router";
import About from "/src/pages/About";
import Home from "/src/pages/Home";
import MainLayout from "/src/layouts/MainLayout";
import Shop from "/src/pages/Shop.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="shop" element={<Shop />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
