import Navbar from "/src/layouts/Navbar";
import Footer from "/src/layouts/Footer";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
