import useCartContext from "/src/hooks/useCartContext";
import { useState } from "react";
import { FaCheck, FaShoppingCart } from "react-icons/fa";
import { FaMinus, FaPlus } from "react-icons/fa6";

const AddToCartButton = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { AddCartItems } = useCartContext();

  const increateQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await AddCartItems(product.id, quantity);
      setIsAdded(true);
      setIsAdding(false);
    } catch (err) {
      console.log(err);
      setIsAdded(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="join">
        {/*Minus Button*/}
        <button
          className="btn btn-outline join-item"
          onClick={decreaseQuantity}
          disabled={quantity <= 1}
        >
          <FaMinus className="h-4 w-4" />
        </button>

        <input
          type="number"
          value={quantity}
          min={1}
          readOnly
          max={product.stock}
          className="input input-bordered join-item w-16 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />

        {/* Plus Button */}
        <button
          className="btn btn-outline join-item"
          onClick={increateQuantity}
          disabled={quantity >= product.stock}
        >
          <FaPlus className="h-4 w-4" />
        </button>
      </div>

      {/*Button of adding to shopping cart*/}
      <button
        className="btn btn-primary w-full"
        disabled={isAdding || isAdded || product.stock === 0}
        onClick={handleAddToCart}
      >
        {isAdding ? (
          <span className="flex items-center">
            <span className="loading loading-spinner loading-sm mr-2"></span>
            Adding...
          </span>
        ) : isAdded ? (
          <span className="flex items-center">
            <FaCheck className="mr-2 h-4 w-4" />
            Added to Cart
          </span>
        ) : (
          <span className="flex items-center">
            <FaShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </span>
        )}
      </button>
    </div>
  );
};

export default AddToCartButton;

/*

const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false);
      setIsAdded(true);

      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    }, 1000);
  };

*/
