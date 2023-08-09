import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";

function NavBar({ user, setUser, cart }) {
  
  const total_items = cart.length
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("cart");
    fetch("/api/logout", {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        setUser(null);
        navigate("/authentication");
      }
    });
  };

  if (!user)
    return (
      <div className="navWrapper">
        <NavLink to="/">
          <img src={logo} alt="Logo" />{" "}
        </NavLink>
        <div className="navigation">
          <NavLink
            className={(navClass) => (navClass.isActive ? "active_link" : "")}
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={(navClass) => (navClass.isActive ? "active_link" : "")}
            to="/authentication"
          >
            Login
          </NavLink>
        </div>
      </div>
    );

  return (
    <div className="navWrapper">
      <NavLink to="/">
        <img src={logo} alt="Logo" />{" "}
      </NavLink>
      <div className="navigation">
        <NavLink
          className={(navClass) => (navClass.isActive ? "active_link" : "")}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={(navClass) => (navClass.isActive ? "active_link" : "")}
          to="/groceries"
        >
          Grocery Collection
        </NavLink>

        {user.is_admin && (
          <NavLink
            className={(navClass) => (navClass.isActive ? "active_link" : "")}
            to="/groceries/new"
          >
            Add a Grocery
          </NavLink>
        )}
        <NavLink
          className={(navClass) => (navClass.isActive ? "active_link" : "")}
          to="/authentication"
          onClick={handleLogout}
        >
          Logout
        </NavLink>
        <NavLink
          className={(navClass) => (navClass.isActive ? "active_link" : "")}
          to="/cart"
        >
          Cart {total_items}
        </NavLink>
        <NavLink
          className={(navClass) => (navClass.isActive ? "active_link" : "")}
          to="/orders"
        >
          My Orders
        </NavLink>
      </div>
    </div>
  );
}
export default NavBar;
