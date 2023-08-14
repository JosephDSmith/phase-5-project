import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { GroceriesContext } from "../context/GroceriesContext";

function GroceryDetails({
  user,
  handleEdit,
  isNotNewGrocery,
  setIsNotNewGrocery,
  addItemToCart,
}) {
  const { deleteGrocery } = useContext(GroceriesContext);
  const [deleting, setIsDeleting] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  useEffect(() => {
    return () => {
      setIsAddedToCart(false);
    };
  }, []);

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
  const [starRating, setStarRating] = useState("");

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
    content: reviewInput,
    stars: starRating === "Select a rating" ? null : starRating, // Include the selected star rating
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
        setStarRating("Select a rating"); // Reset star rating to "Select a rating" after submission
      });
  };

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      !isNotNewGrocery && setIsNotNewGrocery(true);
    };
  }, []);

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
    <div className="grocerydetails">
      {deleting ? (
        <>
          <h1>Are you sure you want to delete this grocery item?</h1>
          <button onClick={() => handleDelete(grocery)}>Yes</button>
          <button onClick={() => setIsDeleting(false)}>No</button>
        </>
      ) : (
        <>
          <div className="grocery-details">
            <img src={image} alt="butterfly image" />
            <h3>
              Name: <span>{name}</span>
            </h3>
            <h3>
              Category: <span>{category}</span>
            </h3>
            <h3>
              Price: <span>${price}</span>
            </h3>
            <button
              onClick={() => {
                addItemToCart(grocery);
                setIsAddedToCart(true);
              }}
            >
              {isAddedToCart ? "Item Added to Cart!" : "Add To Cart"}
            </button>
          </div>
          <div className="review-container">
            <h3>
              Current user reviews:{" "}
              {reviews.map((review) => (
                <div key={`${params.id}-${review.content}`}>
                  <span>{`${review.content} `}</span>
                  {Array.from({ length: review.stars }).map((_, index) => (
                    <span key={index}>⭐️</span> // Replace with your star icon component or Unicode character
                  ))}
                  <span>
                    by {review.user.first_name} {review.user.last_name}
                  </span>
                </div>
              ))}
            </h3>
          </div>
          {user && user.is_admin === true && isNotNewGrocery && (
            <div className="buttons">
              <button
                className="edit-btn"
                onClick={() => {
                  handleEdit(grocery);
                }}
              >
                ADMIN: edit grocery item
              </button>
              <button
                className="delete-btn"
                onClick={() => setIsDeleting(true)}
              >
                ADMIN: delete grocery item
              </button>
            </div>
          )}
          {!showReviews && (
            <div className="Review-div">
              <button
                className="Review-btn"
                onClick={() => setShowReviews((prevState) => !prevState)}
              >
                Add a Customer Review to this grocery item!
              </button>
            </div>
          )}
          <div className="back-button">
            <button onClick={() => navigate("/groceries")}>
              Go back to groceries
            </button>
          </div>
          {showReviews && (
            <div className="Reviews-input">
              <input
                type="text"
                name="content"
                value={reviewInput}
                onChange={(e) => setReviewInput(e.target.value)}
              />
              <label htmlFor="rating">Select a star rating:</label>
              <select
                id="rating"
                name="rating"
                value={starRating}
                onChange={(e) => setStarRating(e.target.value)}
              >
                <option value="">Select a rating</option>
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </select>
              <button onClick={handleReviewSubmit}>Add your Review!</button>
              <div className="back-button">
                <button onClick={() => navigate("/groceries")}>
                  Go back to groceries
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
export default GroceryDetails;
