import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function GroceryCard({ grocery, addItemToCart }) {
  const { name, image, id, price } = grocery;
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  useEffect(() => {
    return () => {
      setIsAddedToCart(false);
    };
  }, []);

  return (
    <div className="grocery-card">
      <div className="grocery-wrapper">
        <div className="details">
          <h3>{name}</h3>
        </div>
        <Link to={`/groceries/${id}`}>
          <div className="image-container">
            <img className="grocery-img" src={image} alt="grocery image" />
          </div>
          <div className="grocery-price">
            <p>{price}</p>
          </div>
        </Link>
        <button
          onClick={() => {
            addItemToCart(grocery);
            setIsAddedToCart(true)
          }}
        >
          {isAddedToCart ? "Item Added to Cart!" : "Add To Cart"}
        </button>
      </div>
    </div>
  );
}

export default GroceryCard;
