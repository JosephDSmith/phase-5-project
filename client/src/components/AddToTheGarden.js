import { useEffect, useState } from "react";
import ButterflyForm from "./ButterflyForm";
import PlantForm from "./PlantForm";
import { useLocation } from "react-router-dom";

function AddToTheGarden({ addButterfly, addPlant }) {
  const [addingButterfly, setAddingButterfly] = useState(false);
  const [addingPlant, setAddingPlant] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setAddingButterfly(false);
    setAddingPlant(false);
  }, [location]);

  return (
    <div className="add-to-garden">
      {addingButterfly ? (
        <ButterflyForm addButterfly={addButterfly} />
      ) : addingPlant ? (
        <PlantForm addPlant={addPlant} />
      ) : (
        <div>
          <button onClick={() => setAddingButterfly(true)}>
            Add a Butterfly
          </button>
          <span>or</span>
          <button onClick={() => setAddingPlant(true)}>Add a Plant</button>
        </div>
      )}
    </div>
  );
}
export default AddToTheGarden;
