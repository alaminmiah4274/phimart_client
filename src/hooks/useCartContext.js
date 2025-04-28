import { useContext } from "react";
import CartContext from "/src/context/CartContext.jsx";

const useCartContext = () => {
  return useContext(CartContext);
};

export default useCartContext;
