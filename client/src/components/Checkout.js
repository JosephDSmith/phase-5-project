import React from "react";
import { useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const Checkout = ({ setErrors, setCart }) => {
  const storedOrderData = localStorage.getItem("orderData");
  const orderData = JSON.parse(storedOrderData);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const handleBackToCart = () => {
    navigate("/cart");
  };

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();

    // Create a payment method
    const paymentMethod = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    // Handle payment using the payment method
    if (paymentMethod.error) {
      console.error(paymentMethod.error);
    } else {
      // Make an API request to your backend to create an order
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        // Handle successful payment and order creation
        console.log("Payment successful and order created!");
        // Optionally clear the cart and order data from local storage
        localStorage.removeItem("cart");
        localStorage.removeItem("orderData");
        setCart([])
        navigate("/orders"); // Redirect to orders page
      } else {
        response.json().then((errors) => setErrors(errors.error));
      }
    }
  };

  return (
    <div>
      <h2>Order Summary</h2>
      <p>Total Items: {orderData.total_items}</p>
      <p>Subtotal: ${orderData.subtotal}</p>
      <p>Tax: ${orderData.tax} </p>
      <h2>Total Price: ${orderData.total_price}</h2>

      {/* Stripe Payment Form */}
      <form onSubmit={handlePaymentSubmit}>
        <CardElement />
        <button type="submit">Complete Order</button>
      </form>

      <button onClick={handleBackToCart}>Back to Cart</button>
    </div>
  );
};

export default Checkout