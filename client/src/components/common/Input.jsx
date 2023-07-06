import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  console.log(name, error, "fprm name")
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} id={name} className="form-control" />
      {/* {error && <div className="alert alert-danger">{error}</div>} */}
      {typeof error === "string" && (
        <div className="alert alert-danger">{error}</div>
      )}
      {typeof error === "object" && (
        <div className="alert alert-danger">
          {Object.values(error).map((errorMsg, index) => (
            <p key={index}>{errorMsg}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Input;
