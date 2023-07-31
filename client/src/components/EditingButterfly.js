import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

function EditingButterfly({updateButterfly, butterfly_edit}) {
  const [errors, setErrors] = useState(false);
  const navigate = useNavigate();
  const formSchema = yup.object().shape({
    name: yup.string().required("Must enter a name"),
    image: yup.string().required("Must enter an image"),
    genus_species: yup.string().required("Must enter a genus & species"),
    conservation_status: yup.string().required("Must enter a conservation status")
  });

  const formik = useFormik({
    initialValues: {
      name: butterfly_edit.name,
      image: butterfly_edit.image,
      genus_species: butterfly_edit.genus_species,
      conservation_status: butterfly_edit.conservation_status,
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch(`/api/butterflies/${butterfly_edit.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((res) => {
        if (res.ok) {
          res.json().then((butterfly) => {
            updateButterfly(butterfly);
            navigate(`/butterflies/${butterfly.id}`);
          });
        } else {
          res.json().then((errors) => setErrors(errors.message));
        }
      });
    },
  });

  return (
    <div className="edit-butterfly">
      {formik.errors &&
        Object.values(formik.errors).map((error) => <h2>{error}</h2>)}
      <form onSubmit={formik.handleSubmit}>
        <label>Name </label>
        <input
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />

        <label>Image</label>
        <input
          type="text"
          name="image"
          value={formik.values.image}
          onChange={formik.handleChange}
        />

        <label>Genus & Species</label>
        <input
          type="text"
          name="genus_species"
          value={formik.values.genus_species}
          onChange={formik.handleChange}
        />

        <label>Conservation Status</label>
        <input
          type="text"
          name="conservation_status"
          value={formik.values.conservation_status}
          onChange={formik.handleChange}
        />

        <button className="submit-btn">Submit</button>

      </form>
      <button className="cancel-btn" onClick={() => navigate(`/butterflies/${butterfly_edit.id}`)}>Cancel Edit</button>
    </div>
  );
}

export default EditingButterfly;
