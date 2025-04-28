import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import AppRoutes from "/src/routes/AppRoutes.jsx";
import "./index.css";
import { AuthProvider } from "/src/context/AuthContext.jsx";
import { CartProvider } from "/src/context/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
);
