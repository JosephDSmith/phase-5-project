import React from "react";
import { useNavigate } from "react-router-dom";

const Cart = ({ cart, setOrderData }) => {
  const subtotal =  cart.reduce((a, b)  => a + b.price, 0)
  const total_items = cart.length
  const tax = (subtotal * 0.053).toFixed(2);
  const total_price = (parseFloat(subtotal) + parseFloat(tax)).toFixed(2);
  const grocery_ids = cart.map((grocery) => grocery.id)

  const navigate = useNavigate();

  const handleCheckout = () => {
    const order = {
      total_items,
      subtotal,
      tax,
      total_price,
      grocery_ids,
    };
  
    // Set the order data in local Storage
   
    localStorage.setItem('orderData', JSON.stringify(order));
  
    // Navigate to the checkout page
    navigate("/checkout");
  };

  return (
    <>
      <ul>
        {cart.map((grocery, idx) => (
          <li key={idx}>
            {grocery.name} <img src={grocery.image} alt={grocery.name} />{" "}
            {grocery.price}
          </li>
        ))}
      </ul>
      <p>Subtotal: ${subtotal}</p>
      <p>(Tax and Total calculated at checkout)</p>
      <button onClick={handleCheckout}>Checkout</button>
    </>
  );
};

export default Cart;
