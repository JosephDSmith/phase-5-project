import GroceryCard from "./GroceryCard";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GroceriesContext } from "../context/GroceriesContext";

function GroceryCollection({ user, addItemToCart, fetchUser }) {
  const { groceries } = useContext(GroceriesContext);
  const navigate = useNavigate();

  if (!user) {
    navigate("/authentication");
  } else {
    return (
      <div className="grocery-collection">
        <h1>Grocery Collection</h1>
        <div className="grocery-container">
          {groceries.map((grocery) => (
            <GroceryCard key={grocery.id} grocery={grocery} addItemToCart={ addItemToCart } user={user} fetchUser={fetchUser}/>
          ))}
        </div>
      </div>
    );
  }
}
export default GroceryCollection;
