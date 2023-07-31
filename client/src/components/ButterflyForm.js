import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

function ButterflyForm({ addButterfly, fetchButterflies }) {
  const navigate = useNavigate();
  const formSchema = yup.object().shape({
    name: yup.string().required("Must enter a butterfly name"),
    image: yup.string().required("Must enter a butterfly image"),
    genus_species: yup.string().required("Must enter genus and species"),
    conservation_status: yup
      .string()
      .required("Must enter a conservation status"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      image: "",
      genus_species: "",
      conservation_status: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("/api/butterflies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      }).then((res) => {
        if (res.ok) {
          res.json().then((butterfly) => {
            addButterfly(butterfly);
            navigate(`/butterflies/${butterfly.id}`);
          });
        }
      });
    },
  });
  return (
    <div className="butterfly-form">
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

        <label>Conservation Status</label>
        <input
          type="text"
          name="conservation_status"
          value={formik.values.conservation_status}
          onChange={formik.handleChange}
        />

        <button>Submit</button>
      </form>
    </div>
  );
}

export default ButterflyForm;
