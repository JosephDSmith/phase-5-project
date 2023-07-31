import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

function Authentication({ updateUser }) {
  const [signUp, setSignUp] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => setSignUp((signUp) => !signUp);
  const formSchema = yup.object().shape({
    username: yup.string().required("Please enter a username"),
    email: yup.string().email(),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
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
          res.json().then((error) => {
            setError(error.message);
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

      <h2 style={{ color: "red" }}> {formik.errors.username}</h2>
      {error && <h2 style={{ color: "red" }}> {error}</h2>}
      <h2>Please Log in or Sign up!</h2>
      
      <form onSubmit={formik.handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {signUp && (
          <>
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
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
