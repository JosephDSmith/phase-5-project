import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";

function NavBar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
  
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
          to="/butterflies"
        >
          Butterfly Collection
        </NavLink>
        <NavLink
          className={(navClass) => (navClass.isActive ? "active_link" : "")}
          to="/plants"
        >
          Plant Collection
        </NavLink>
        <NavLink
          className={(navClass) => (navClass.isActive ? "active_link" : "")}
          to="/addtothegarden"
        >
          Add to the Garden
        </NavLink>
        <NavLink
          className={(navClass) => (navClass.isActive ? "active_link" : "")}
          to="/authentication"
          onClick={handleLogout}
        >
          Logout
        </NavLink>
      </div>
    </div>
  );
}
export default NavBar;
