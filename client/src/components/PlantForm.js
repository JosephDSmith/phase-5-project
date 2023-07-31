import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

function PlantForm({ addPlant }) {
  const navigate = useNavigate();
  const formSchema = yup.object().shape({
    name: yup.string().required("Must enter a plant name"),
    image: yup.string().required("Must enter a plant image"),
    genus_species: yup.string().required("Must enter genus and species"),
    growing_zone: yup.string().required("Must enter a growing zone"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      image: "",
      genus_species: "",
      growing_zone: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("/api/plants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      }).then((res) => {
        if (res.ok) {
          res.json().then((plant) => {
            addPlant(plant);
            navigate(`/plants/${plant.id}`);
          });
        }
      });
    },
  });
  return (
    <div className="plant-form">
      <form onSubmit={formik.handleSubmit}>
        <label>Name</label>
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

        <label>Geneus & Species</label>
        <input
          type="text"
          name="genus_species"
          value={formik.values.genus_species}
          onChange={formik.handleChange}
        />

        <label>Growing Zone</label>
        <input
          type="text"
          name="growing_zone"
          value={formik.values.growing_zone}
          onChange={formik.handleChange}
        />

        <button>Submit</button>
      </form>
    </div>
  );
}

export default PlantForm;
