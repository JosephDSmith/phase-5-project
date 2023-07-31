import { useNavigate } from "react-router-dom";
import PlantCard from "./PlantCard";

function PlantContainer({plants, user}) {
  const navigate = useNavigate()
  
  if (!user){
    navigate('/authentication')
  } else{
    return (
      <div className="plant-collection">
          <h1>Plant Community Collection</h1>
          <div className="plant-container">
              {plants.map(plant => <PlantCard  key={plant.id} plant={plant}  />)}
          </div>
      </div>
     )
  }

}
  export default PlantContainer;