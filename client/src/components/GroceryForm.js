import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useContext } from "react";
import { GroceriesContext } from "../context/GroceriesContext";

function GroceryForm({ setErrors, setIsNotNewGrocery }) {
  const { addGrocery } = useContext(GroceriesContext);
  const navigate = useNavigate();
  const formSchema = yup.object().shape({
    name: yup.string().required("Must enter a grocery name"),
    image: yup.string().required("Must enter a grocery image"),
    category: yup
      .string()
      .oneOf(["Produce", "Dairy", "Meat", "Bakery"])
      .required("Must select a grocery category"),
    price: yup.string().required("Must enter a grocery price"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      image: "",
      category: "",
      price: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("/api/groceries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      }).then((res) => {
        if (res.ok) {
          res.json().then((grocery) => {
            addGrocery(grocery);
            setIsNotNewGrocery(false);
            navigate(`/groceries/${grocery.id}`);
          });
        } else {
          res.json().then((errors) => setErrors(errors.error));
        }
      });
    },
  });
  return (
    <div className="grocery-form">
      <form onSubmit={formik.handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        {formik.touched.name && formik.errors.name && (
          <div className="error">{formik.errors.name}</div>
        )}

        <label>Image</label>
        <input
          type="text"
          name="image"
          value={formik.values.image}
          onChange={formik.handleChange}
        />
        {formik.touched.image && formik.errors.image && (
          <div className="error">{formik.errors.image}</div>
        )}

        <label>Category</label>
        <select
          name="category"
          value={formik.values.category}
          onChange={formik.handleChange}
        >
          <option value="" label="Select a category" />{" "}
          <option value="Produce">Produce</option>
          <option value="Bakery">Bakery</option>
          <option value="Dairy">Dairy</option>
          <option value="Meat">Meat</option>
        </select>
        {formik.touched.category && formik.errors.category && (
          <div className="error">{formik.errors.category}</div>
        )}

        <label>Price</label>
        <input
          type="text"
          name="price"
          value={formik.values.price}
          onChange={formik.handleChange}
        />
        {formik.touched.price && formik.errors.price && (
          <div className="error">{formik.errors.price}</div>
        )}

        <button>Submit</button>
      </form>
    </div>
  );
}

export default GroceryForm;
