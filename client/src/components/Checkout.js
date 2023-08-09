import React from "react";
import { useNavigate } from "react-router-dom";

const Checkout = ({ cart }) => {
  const storedOrderData = localStorage.getItem("orderData");
  const orderData = JSON.parse(storedOrderData);
  const navigate = useNavigate()

  const handleBackToCart = () => {
    navigate("/cart");
  };

  return (
    <div>
      <h2>Order Summary</h2>
      <p>Total Items: {orderData.total_items}</p>
      <p>Subtotal: ${orderData.subtotal}</p>
      <p>Tax: ${orderData.tax} </p>
      <h2>Total Price: ${orderData.total_price}</h2>
      <button onClick={handleBackToCart}>Back to Cart</button>
    </div>
  );
};

export default Checkout;
