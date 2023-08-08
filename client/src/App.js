import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Authentication from "./components/Authentication";
import NavBar from "./components/NavBar";
import GroceryCollection from "./components/GroceryCollection";
import GroceryDetails from "./components/GroceryDetails";
import GroceryForm from "./components/GroceryForm";
import AddGrocery from "./components/AddGrocery";
import EditingGrocery from "./components/EditingGrocery";
import Errors from "./components/Errors";
import "./index.css";
import Bottom from "./components/Bottom";
import { GroceriesProvider } from "./context/GroceriesContext";

function App() {
  const [user, setUser] = useState(null);
  const [grocery_edit, setGroceryEdit] = useState(false);
  const [errors, setErrors] = useState(null);
  const updateUser = (user) => setUser(user);

  const navigate = useNavigate();

  useEffect (()=> {
    return () => {
      setErrors(null);
    }
  }, [])

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

  const handleEdit = (grocery) => {
    setGroceryEdit(grocery);
    navigate(`groceries/edit/${grocery.id}`);
  };

  if (!user)
    return (
      <>
        <NavBar user={user} setUser={setUser} />
        <Errors errors={errors} />
        <Routes>
          <Route path="/" element={<Home fetchUser={fetchUser} />} />
          <Route
            path="/authentication"
            element={
              <Authentication updateUser={updateUser} setErrors={setErrors} />
            }
          />
        </Routes>
      </>
    );

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <GroceriesProvider>
        <Routes>
          <Route
            path="/"
            element={<Home username={user.first_name} fetchUser={fetchUser} />}
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
            element={<GroceryCollection user={user} />}
          />
          <Route
            path="/groceries/:id"
            element={<GroceryDetails user={user} handleEdit={handleEdit} />}
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
          <Route path="/groceries/new" element={<GroceryForm setErrors={setErrors}/>} />
          <Route path="/addgrocery" element={<AddGrocery />} />
        </Routes>
      </GroceriesProvider>
      <Bottom />
    </>
  );
}
export default App;
