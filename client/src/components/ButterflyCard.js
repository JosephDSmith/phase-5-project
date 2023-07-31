
import { Link } from "react-router-dom";

function ButterflyCard( {butterfly} ) {
  const { name, image, id, user } = butterfly;
  

  return (
    <div className="butterfly-card">
      <div className="butterfly-wrapper">
        <div className="details">
          <h3>{name}</h3>
          <div>
            <p>by</p>
            <h4>{user.username}</h4>
          </div>
        </div>
        <Link to={`/butterflies/${id}`}>
          <div className="image-container">
            <img className="butterfly-img" src={image} alt="butterfly image" />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default ButterflyCard;
