import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { GroceriesContext } from "../context/GroceriesContext";

function EditingGrocery({ grocery_edit, setErrors }) {
  const { updateGrocery } = useContext(GroceriesContext);
  const navigate = useNavigate();
  const formSchema = yup.object().shape({
    name: yup.string().required("Must enter a name"),
    image: yup.string().required("Must enter an image"),
    category: yup.string().required("Must select a category"),
    price: yup.string().required("Must enter a price"),
  });

  const formik = useFormik({
    initialValues: {
      name: grocery_edit.name,
      image: grocery_edit.image,
      category: grocery_edit.category,
      price: grocery_edit.price,
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch(`/api/butterflies/${grocery_edit.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((res) => {
        if (res.ok) {
          res.json().then((grocery) => {
            updateGrocery(grocery);
            navigate(`/grocery/${grocery.id}`);
          });
        } else {
          res.json().then((errors) => setErrors(errors.error));
        }
      });
    },
  });

  return (
    <div className="edit-grocery">
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

        <button className="submit-btn">Submit</button>
      </form>
      <button
        className="cancel-btn"
        onClick={() => navigate(`/groceries/${grocery_edit.id}`)}
      >
        Cancel Edit
      </button>
    </div>
  );
}

export default EditingGrocery;
