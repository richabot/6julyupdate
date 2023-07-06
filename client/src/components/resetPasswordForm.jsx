import React, { useState } from "react";
import Joi from "joi-browser";
import { NavLink } from "react-router-dom";
import * as userService from "../services/userService";
import "../styles/button.css";

const PasswordResetForm = () => {
  const [data, setData] = useState({ email: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const schema = {
    email: Joi.string().required().email().label("Email"),
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, schema, options);
    if (!error) return null;

    const validationErrors = {};
    for (let item of error.details) {
      validationErrors[item.path[0]] = item.message;
    }
    return validationErrors;
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const subSchema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, subSchema);
    return error ? error.details[0].message : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors || {});
    if (validationErrors) return;

    try {
      setData({ email: "" });
      setSubmitted(true);
      const { email } = data;
      await userService.resetPassword(email);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        const errors = { ...validationErrors };
        errors.email = ex.response.data;
        setErrors(errors);
      }
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    const { name, value } = input;
    const validationErrors = { ...errors };
    const errorMessage = validateProperty(input);

    if (errorMessage) {
      validationErrors[name] = errorMessage;
    } else {
      delete validationErrors[name];
    }

    const newData = { ...data };
    newData[name] = value;

    setData(newData);
    setErrors(validationErrors);
  };

  const renderButton = (label) => (
    <button disabled={validate()} className="btn btn-primary button-28">
      {label}
    </button>
  );

  const renderInput = (name, label, type = "text") => (
    <Input
      type={type}
      name={name}
      label={label}
      value={data[name]}
      onChange={handleChange}
      error={errors[name]}
    />
  );

  return (
    <div>
      <h1>Reset Password</h1>
      {submitted ? (
        <div>
          <p>
            A reset password link has been sent to your email if it has been
            registered. This could take a few minutes.
          </p>
          <p>Click the link to reset your password.</p>
          <NavLink to="/login">Return to Login. </NavLink>
        </div>
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-6">
              <form onSubmit={handleSubmit}>
                {renderInput("email", "Email", "text")}
                {renderButton("Submit")}
              </form>
            </div>
            <div className="col-6" />
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordResetForm


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


