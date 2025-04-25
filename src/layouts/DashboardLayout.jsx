import { useState } from "react";
import { Outlet } from "react-router";
import { FiPackage, FiShoppingCart, FiStar, FiUsers } from "react-icons/fi";
import Sidebar from "/src/components/Dashboard/Sidebar";
import Navbar from "/src/components/Dashboard/Navbar";
import StatCard from "/src/components/Dashboard/StatCard";
import Order from "/src/components/Dashboard/Order";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidbar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="drawer lg:drawer-open">
      {/*Mobile drawer checkbox*/}
      <input
        id="drawer-toggle"
        type="checkbox"
        className="drawer-toggle"
        checked={sidebarOpen}
        onChange={toggleSidbar}
      />

      {/*Page content*/}
      <div className="drawer-content flex flex-col">
        {/*Navbar*/}
        <Navbar sidebarOpen={sidebarOpen} />

        {/*Main Content*/}
        <main className="p-6">
          <Outlet />
        </main>
      </div>

      {/*Sidebar content*/}
      <Sidebar />
    </div>
  );
};

export default DashboardLayout;
