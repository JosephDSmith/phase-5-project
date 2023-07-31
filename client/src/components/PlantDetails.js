import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function PlantDetails() {
  const [plant, setPlant] = useState({
    name: "",
    image: "",
    genus_species: "",
    growing_zone: "",
  });
  const [error, setError] = useState(null);

  const params = useParams();

  useEffect(() => {
    fetch(`/api/plants/${params.id}`).then((res) => {
      if (res.ok) {
        res.json().then((p) => setPlant(p));
      } else {
        res.json().then((data) => setError(data.error));
      }
    });
  }, [params.id]);

  const { name, image, genus_species, growing_zone } = plant;
  if (error) return <h2>{error}</h2>;
  return (
    <>
      <div className="butterfly-details">
        <h3>Name:</h3>
        <p>{name}</p>
        <img src={image} alt="plant image" />
        <h3>Genus & Species:</h3>
        <p>{genus_species}</p>
        <h3>Growing Zone:</h3>
        <p>{growing_zone}</p>
      </div>
    </>
  );
}
export default PlantDetails;
