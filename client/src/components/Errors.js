import React from "react";

const Errors = ({ errors }) => {
  const displayErrors = (
    <p style={{ color: "red", fontWeight: "bold" }}>{errors}</p>
  );
  return <>{errors ? displayErrors : null}</>;
};

export default Errors;
