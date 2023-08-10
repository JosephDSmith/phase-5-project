import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import App from "./App";

const stripePromise = loadStripe(
  "pk_test_51NdaTNEcZovKrpbU29uGWqhRBqIj8zlUnkDYTE8OXl1TiK0oL8T7ztY5JeOFF9Xk2svqASo9uySBbUymlYxcR79D00uVlCKIKQ"
);

createRoot(document.getElementById("root")).render(
  <Router>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </Router>
);
