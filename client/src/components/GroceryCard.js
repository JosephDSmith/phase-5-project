import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function GroceryCard({ grocery, addItemToCart, user, fetchUser }) {
  const { name, image, id, price } = grocery;
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  useEffect(() => {
    return () => {
      setIsAddedToCart(false);
    };
  }, []);

  console.log(user);

  return (
    <div className="grocery-card">
      <div className="grocery-wrapper">
        <div className="image-container">
          <Link to={`/groceries/${id}`}>
            <img className="grocery-img" src={image} alt="grocery image" />
          </Link>
        </div>
        <h3>{name}</h3>
        <p>{price}</p>

        <button
          onClick={() => {
            addItemToCart(grocery);
            setIsAddedToCart(true);
          }}
        >
          {isAddedToCart ? "Item Added to Cart!" : "Add To Cart"}
        </button>
      </div>
    </div>
  );
}

export default GroceryCard;
