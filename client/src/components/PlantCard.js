import { Link } from "react-router-dom";

function PlantCard({plant}) {
  const { name, image, id, user } = plant;

  return (
    <div className="plant-card">
      <div className="plant-wrapper">
        <div className="details">
          <h3>{name}</h3>
          <div>
            <p>by</p>
            <h4>{user.username}</h4>
          </div>
        </div>
        <Link to={`/plants/${id}`}>
          <div className="image-container">
            <img className="plant-img" src={image} alt="plant image" />
          </div>
        </Link>
      </div>
    </div>
  );
}
  export default PlantCard;