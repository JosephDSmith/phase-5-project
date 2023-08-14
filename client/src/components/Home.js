import { useEffect, useContext } from "react";
import cartImg from "../assets/images/cart.jpg";
import logo from "../assets/images/logo.png";
import produce from "../assets/images/Produce.jpg";
import meat from "../assets/images/Meat.jpg";
import deli from "../assets/images/deli.jpg";
import { NavLink } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { GroceriesContext } from "../context/GroceriesContext";
import GroceryCard from "./GroceryCard";

function Home({ first_name, fetchUser, user, addItemToCart }) {
  useEffect(() => {
    fetchUser();
  }, []);

  const { groceries } = useContext(GroceriesContext);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 8,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet1: {
      breakpoint: { max: 1024, min: 960 },
      items: 4,
    },
    tablet2: {
      breakpoint: { max: 960, min: 660 },
      items: 3,
    },
    tablet3: {
      breakpoint: { max: 660, min: 460 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 460, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="home">
      <h1>
        {first_name && `Welcome to the farmer's market! ${first_name}!`}
        {!first_name && "Welcome to the farmer's market!"}
      </h1>
      <section className="hero-section">
        <div className="overlay-container">
          <img src={logo} alt="Logo" className="logo-home" />
          <div className="background"></div>
          <img src={cartImg} alt="Cart Image" className="cart-image" />
          <h1>
            Local Farmers market where everyone is welcome to buy and sell!
          </h1>
        </div>
      </section>
      <section className="sections">
        <div className="meat-section ">
          <NavLink to="/groceries">
            <img src={meat} />
            <div className="info">
              <i className="fa-solid fa-solids fa-burger"></i>
              <h3>Meat</h3>
              <h6>Premim Meats, Freshly Cut</h6>
            </div>
          </NavLink>
        </div>
        <div className="produce-section">
          <NavLink to="/groceries">
            <img src={produce} />
            <div className="info">
              <i className="fa-solid fa-solids fa-apple-whole"></i>
              <h3>Produce</h3>
              <h6>Garden Fresh Variety</h6>
            </div>
          </NavLink>
        </div>
        <div className="deli-section">
          <NavLink to="/groceries">
            <img src={deli} />
            <div className="info">
              <i className="fa-solid fa-solids fa-spoon"></i>
              <h3>Deli</h3>
              <h6>Quality Deli Foods & Specials</h6>
            </div>
          </NavLink>
        </div>
      </section>
      <section className="carousel">
        <h3>Our Produce</h3>
        <Carousel responsive={responsive} infinite={true}>
                {groceries.map((grocery) => (
                  <GroceryCard
                    key={grocery.id}
                    grocery={grocery}
                    addItemToCart={addItemToCart}
                    fetchUser={fetchUser}
                    user={user}
                  />
                ))}
        </Carousel>
      </section>
    </div>
  );
}
export default Home;
