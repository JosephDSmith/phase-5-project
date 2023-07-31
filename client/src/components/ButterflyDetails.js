import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


function ButterflyDetails({ user, handleEdit, deleteButterfly, fetchButterflies }) {
  const [deleting, setIsDeleting] = useState(false);
  const [butterfly, setButterfly] = useState({
    name: "",
    image: "",
    genus_species: "",
    conservation_status: "",
  });
  const [error, setError] = useState(null);
  const [tags, setTags] = useState([]);
  const [showTag, setShowTag] = useState(false);
  const [tagInput, setTagInput] = useState("");

  console.log()

  // useEffect(() => {
  //   fetchTags();
  //   fetchButterflies();
  // }, [params]);


  const addNewTag = (t) => {
    setTags([...tags, t]);
    setShowTag(false);
    fetchTags();
  };

  const fetchTags = () => {
    fetch(`/api/butterflies/${params.id}/tag`)
      .then((res) => res.json())
      .then((data) => setTags(data));
  };

  const newTag = {
    name: tagInput,
  };

  const handleTagSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/butterflies/${params.id}/tag`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTag),
    })
      .then((r) => r.json())
      .then((tagToAdd) => {
        addNewTag(tagToAdd);
        setTagInput("");
      });
  };

  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`/api/butterflies/${params.id}`).then((res) => {
      if (res.ok) {
        res.json().then((b) => setButterfly(b));
      } else {
        res.json().then((data) => setError(data.error));
      }
    });
    fetchTags();
    fetchButterflies();
  }, [params.id]);

  const handleDelete = (butterfly) => {
    fetch(`/api/butterflies/${butterfly.id}`, {
      method: "DELETE",
    }).then(() => {
      deleteButterfly(butterfly);
      navigate("/butterflies");
    });
  };

  const { name, image, genus_species, conservation_status } = butterfly;

  if (error) return <h2>{error}</h2>;
  return (
    <>
      {deleting ? (
        <>
          <h1>Are you sure you want to delete this butterfly?</h1>
          <button onClick={() => handleDelete(butterfly)}>Yes</button>
          <button onClick={() => setIsDeleting(false)}>No</button>
        </>
      ) : (
        <>
          <div className="butterfly-details">
            <h3>
              Name: <span>{name}</span>
            </h3>
            <img src={image} alt="butterfly image" />
            <h3>
              Genus & Species: <span>{genus_species}</span>
            </h3>
            <h3>
              Conservation Status: <span>{conservation_status}</span>
            </h3>
          </div>
          <div className="tags-container">
            <h3>
              Tags already added to this butterfly:{" "}
              {tags.map((tag) => (
                <span key={`${params.id}-${tag.name}`}>{`${tag.name} `}</span>
              ))}
            </h3>
          </div>
          {user && user.id === butterfly.user_id && (
            <div className="buttons">
              <button
                className="edit-btn"
                onClick={() => {
                  handleEdit(butterfly);
                }}
              >
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => setIsDeleting(true)}
              >
                Delete
              </button>
            </div>
          )}
          {!showTag && (
            <div className="tag-div">
              <button
                className="tag-btn"
                onClick={() => setShowTag((prevState) => !prevState)}
              >
                Add a tag to this butterfly!
              </button>
            </div>
          )}
          {showTag && (
            <div className="tags-input">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
              />
              <button onClick={handleTagSubmit}>Add your tag!</button>
            </div>
          )}
        </>
      )}
    </>
  );
}
export default ButterflyDetails;
