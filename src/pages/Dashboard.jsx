import { useState } from "react";
import { Link } from "react-router";
import {
  FiBarChart2,
  FiPackage,
  FiPlusCircle,
  FiShoppingCart,
  FiStar,
  FiTag,
  FiUsers,
  FiMenu,
  FiX,
} from "react-icons/fi";
import Sidebar from "/src/components/Dashboard/Sidebar";
import Navbar from "/src/components/Dashboard/Navbar";
import StatCard from "/src/components/Dashboard/StatCard";
import Order from "/src/components/Dashboard/Order";

export default function Dashboard() {
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={FiPackage} title="Total Products" value="245" />
            <StatCard icon={FiShoppingCart} title="Total Orders" value="128" />
            <StatCard icon={FiUsers} title="Total Users" value="573" />
            <StatCard icon={FiStar} title="Average Rating" value="4.8" />
          </div>

          <Order />
        </main>
      </div>

      {/*Sidebar content*/}
      <Sidebar />
    </div>
  );
}
