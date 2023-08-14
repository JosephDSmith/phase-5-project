import React from "react";
import logo from "../assets/images/logo.png";
import { NavLink } from "react-router-dom";

function Bottom() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer>
      <NavLink to="/" onClick={scrollToTop}>
        <div className="logo-div">
          <img src={logo} alt="Logo" />
        </div>
      </NavLink>

      <div className="social-media">
        <h3>Reach us on:</h3>
        <ul>
          <li>Facebook</li>
          <li>Instagram</li>
          <li>Twitter</li>
        </ul>
      </div>
    </footer>
  );
}

export default Bottom;
