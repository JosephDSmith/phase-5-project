import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Authentication from "./components/Authentication";
import NavBar from "./components/NavBar";
import GroceryCollection from "./components/GroceryCollection";
import GroceryDetails from "./components/GroceryDetails";
import GroceryForm from "./components/GroceryForm";
import NotFound from "./components/NotFound";
import EditingGrocery from "./components/EditingGrocery";
import Errors from "./components/Errors";
import AdminPrivileges from "./components/AdminPrivileges";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Orders from "./components/Orders";
import "./index.css";
import Bottom from "./components/Bottom";
import { GroceriesProvider } from "./context/GroceriesContext";

function App() {
  const [user, setUser] = useState(null);
  const [grocery_edit, setGroceryEdit] = useState(false);
  const [errors, setErrors] = useState(null);
  const [isNotNewGrocery, setIsNotNewGrocery] = useState(true);
  const [cart, setCart] = useState([]);

  const updateUser = (user) => setUser(user);

  const navigate = useNavigate();

  useEffect(() => {
    const clearErrorsTimeout = setTimeout(() => {
      setErrors(null);
    }, 5000); // Clear errors after 5 seconds

    return () => {
      clearTimeout(clearErrorsTimeout); // Cleanup timeout when component unmounts
    };
  }, [errors]);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () =>
    fetch("/api/authorized").then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setUser(data);
        });
      } else {
        setUser(null);
      }
    });

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCart(parsedCart);
    } else {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, []);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const addItemToCart = (item) => {
    // store the item to localStorage
    updateCart([...cart, item]);
  };

  const handleEdit = (grocery) => {
    setGroceryEdit(grocery);
    navigate(`groceries/edit/${grocery.id}`);
  };


  if (!user)
    return (
      <>
        <NavBar user={user} setUser={setUser} cart={cart} />
        <Errors errors={errors} />
        <GroceriesProvider>
        <Routes>
          <Route path="/" element={<Home fetchUser={fetchUser} addItemToCart={addItemToCart} user={user}/>} />
          <Route
            path="/authentication"
            element={
              <Authentication
                updateUser={updateUser}
                setErrors={setErrors}
                user={user}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </GroceriesProvider>
      </>
    );

  return (
    <>
      <NavBar user={user} setUser={setUser} cart={cart} />

      {user.is_admin && (
        <AdminPrivileges
          first_name={user.first_name}
          last_name={user.last_name}
        />
      )}
      <Errors errors={errors} />
      <GroceriesProvider>
        <Routes>
          <Route
            path="/"
            element={
              <Home first_name={user.first_name} fetchUser={fetchUser} addItemToCart={addItemToCart} />
            }
          />
          <Route
            path="/authentication"
            element={
              <Authentication updateUser={updateUser} setErrors={setErrors} />
            }
          />
          <Route
            exact
            path="/groceries"
            element={
              <GroceryCollection user={user} addItemToCart={addItemToCart} fetchUser={fetchUser}/>
            }
          />
          <Route
            path="/groceries/:id"
            element={
              <GroceryDetails
                user={user}
                handleEdit={handleEdit}
                isNotNewGrocery={isNotNewGrocery}
                setIsNotNewGrocery={setIsNotNewGrocery}
                addItemToCart={addItemToCart}
              />
            }
          />
          <Route
            path="/groceries/edit/:id"
            element={
              <EditingGrocery
                grocery_edit={grocery_edit}
                setErrors={setErrors}
              />
            }
          />
          /
          <Route
            path="/groceries/new"
            element={
              <GroceryForm
                setErrors={setErrors}
                setIsNotNewGrocery={setIsNotNewGrocery}
              />
            }
          />
          <Route path="/cart" element={<Cart cart={cart} />} />
          <Route
            path="/checkout"
            element={<Checkout setErrors={setErrors} setCart={setCart} />}
          />
          <Route
            path="/orders"
            element={<Orders fetchUser={fetchUser} user={user} />}
          />
          <Route path="/groceries/*" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </GroceriesProvider>
      <Bottom />
    </>
  );
}
export default App;
