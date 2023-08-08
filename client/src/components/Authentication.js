import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

function Authentication({ updateUser, setErrors }) {
  const [signUp, setSignUp] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => setSignUp((signUp) => !signUp);
  const formSchema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    first_name: yup.string().required("First name required"),
    last_name: yup.string().required("Last name required"),
    address: yup.string().required("Address required"),
    phone_number: yup.string().required("Phone number required"),
    password: yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      address: "",
      phone_number: "",
    },
    validationSchema: formSchema,
    onSubmit: (values, { resetForm }) => {
      fetch(signUp ? "/api/signup" : "/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      }).then((res) => {
        if (res.ok) {
          res.json().then((user) => {
            updateUser(user);

            navigate("/");
          });
        } else {
          res.json().then((errors) => {
            setErrors(errors.error.message);
            resetForm({
              values: formik.initialValues,
              validationSchema: formik.validationSchema,
            });
          });
        }
      });
    },
  });

  return (
    <div className="authentication">
      <h2>Please Log in or Sign up!</h2>

      <form onSubmit={formik.handleSubmit}>
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="error">{formik.errors.email}</div>
        )}
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="error">{formik.errors.password}</div>
        )}
        {signUp && (
          <>
            <label>First Name</label>
            <input
              type="text"
              name="first_name"
              value={formik.values.first_name}
              onChange={formik.handleChange}
            />
            {formik.touched.first_name && formik.errors.first_name && (
              <div className="error">{formik.errors.first_name}</div>
            )}
            <label>Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formik.values.last_name}
              onChange={formik.handleChange}
            />
            {formik.touched.last_name && formik.errors.last_name && (
              <div className="error">{formik.errors.last_name}</div>
            )}
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
            />
            {formik.touched.address && formik.errors.address && (
              <div className="error">{formik.errors.address}</div>
            )}
            <label>Phone Number</label>
            <input
              type="text"
              name="phone_number"
              value={formik.values.phone_number}
              onChange={formik.handleChange}
            />
            {formik.touched.phone_number && formik.errors.phone_number && (
              <div className="error">{formik.errors.phone_number}</div>
            )}
          </>
        )}
        <button type="submit">{signUp ? "Sign Up!" : "Log In!"}</button>
      </form>
      <div className="sign-up">
        <h2>{signUp ? "Already a member?" : "Not a member?"}</h2>
        <button type="button" onClick={handleClick}>
          {signUp ? "Log In!" : "Register now!"}
        </button>
      </div>
    </div>
  );
}
export default Authentication;
