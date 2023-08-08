import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { GroceriesContext } from "../context/GroceriesContext";

function GroceryDetails({ user, handleEdit }) {
  const { deleteGrocery } = useContext(GroceriesContext);
  const [deleting, setIsDeleting] = useState(false);
  const [grocery, setGrocery] = useState({
    name: "",
    image: "",
    category: "",
    price: "",
  });
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showReviews, setShowReviews] = useState(false);
  const [reviewInput, setReviewInput] = useState("");

  const addNewReview = (r) => {
    setReviews([...reviews, r]);
    setShowReviews(false);
    fetchReviews();
  };

  const fetchReviews = () => {
    fetch(`/api/groceries/${params.id}/reviews`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  };

  const newReview = {
    name: reviewInput,
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/groceries/${params.id}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReview),
    })
      .then((r) => r.json())
      .then((reviewToAdd) => {
        addNewReview(reviewToAdd);
        setReviewInput("");
      });
  };

  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`/api/groceries/${params.id}`).then((res) => {
      if (res.ok) {
        res.json().then((g) => setGrocery(g));
      } else {
        res.json().then((data) => setError(data.error));
      }
    });
    fetchReviews();
  }, [params.id]);

  const handleDelete = (grocery) => {
    fetch(`/api/groceries/${grocery.id}`, {
      method: "DELETE",
    }).then(() => {
      deleteGrocery(grocery);
      navigate("/groceries");
    });
  };

  const { name, image, category, price } = grocery;

  if (error) return <h2>{error}</h2>;
  return (
    <>
      {deleting ? (
        <>
          <h1>Are you sure you want to delete this grocery item?</h1>
          <button onClick={() => handleDelete(grocery)}>Yes</button>
          <button onClick={() => setIsDeleting(false)}>No</button>
        </>
      ) : (
        <>
          <div className="grocery-details">
            <h3>
              Name: <span>{name}</span>
            </h3>
            <img src={image} alt="butterfly image" />
            <h3>
              Category: <span>{category}</span>
            </h3>
            <h3>
              Price: <span>${price}</span>
            </h3>
          </div>
          <div className="review-container">
            <h3>
              Current user reviews:{" "}
              {reviews.map((review) => (
                <span key={`${params.id}-${review.content}`}>{`${review.content} `}</span>
              ))}
            </h3>
          </div>
          {user && user.is_admin === true && (
            <div className="buttons">
              <button
                className="edit-btn"
                onClick={() => {
                  handleEdit(grocery);
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
          {!showReviews && (
            <div className="Review-div">
              <button
                className="Review-btn"
                onClick={() => setShowReviews((prevState) => !prevState)}
              >
                Add a Review to this grocery item!
              </button>
            </div>
          )}
          {showReviews && (
            <div className="Reviews-input">
              <input
                type="text"
                value={reviewInput}
                onChange={(e) => setReviewInput(e.target.value)}
              />
              <button onClick={handleReviewSubmit}>Add your Review!</button>
            </div>
          )}
        </>
      )}
    </>
  );
}
export default GroceryDetails;
