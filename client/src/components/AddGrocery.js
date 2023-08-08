import { useEffect, useState } from "react";
import GroceryForm from "./GroceryForm";
import { useLocation } from "react-router-dom";


function AddGrocery() {
  const [addingGrocery, setAddingGrocery] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setAddingGrocery(false);
  }, [location]);

  return (
    <div className="add-a-grocery">
      <GroceryForm />
      <div>
        <button onClick={() => setAddingGrocery(true)}>
          Add a Grocery
        </button>
      </div>
    </div>
  );
}
export default AddGrocery;
