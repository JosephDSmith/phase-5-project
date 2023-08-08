
import { Link } from "react-router-dom";

function GroceryCard( {grocery} ) {
  const { name, image, id, price } = grocery;
  

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
      </div>
    </div>
  );
}

export default GroceryCard;
