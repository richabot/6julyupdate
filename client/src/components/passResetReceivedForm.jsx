import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Joi from "joi-browser";
import * as userService from "../services/userService";
import PropTypes from "prop-types";

const PasswordResetReceivedForm = () => {
  const { userId, token } = useParams();

  const [data, setData] = useState({
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const schema = {
    password: Joi.string()
      .required()
      .min(5)
      .regex(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[@]).*$/)
      .label("Password"),
    confirmPassword: Joi.string()
      .required()
      .min(5)
      .regex(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[@]).*$/)
      .label("Password")
  };

  // useEffect(() => {
  //   const { userId, token } = match.params;
  //   // You can access the userId and token here and perform any necessary actions
  // }, [match.params]);

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const propertySchema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, propertySchema);
    return error ? error.details[0].message : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();
    setErrors(errors || {});
    if (errors) return;

    doSubmit();
  };

  const doSubmit = async () => {

    const { password, confirmPassword } = data;

    if (password !== confirmPassword) {
      const errors = { ...errors };
      errors.password = "Passwords do not match";
      setErrors(errors);
    } else {
      try {
        const response = await userService.resetUpdatePassword(
          userId,
          token,
          password
        );
        setData({ password: "", confirmPassword: "" });
        setSubmitted(true);
        console.log(response);
      } catch (ex) {
        if (
          (ex.response && ex.response.status === 400) ||
          ex.response.status === 404
        ) {
          const errors = { ...errors };
          errors.password = ex.response.data;
          setErrors(errors);
        }
      }
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    const { name, value } = input;
    const updatedErrors = { ...errors };
    const errorMessage = validateProperty(input);

    if (errorMessage) {
      updatedErrors[name] = errorMessage;
    } else {
      delete updatedErrors[name];
    }

    const updatedData = { ...data };
    updatedData[name] = value;

    setErrors(updatedErrors);
    setData(updatedData);
  };

  const renderButton = (label) => {
    return (
      <button disabled={validate()} className="btn btn-primary button-28">
        {label}
      </button>
    );
  };

  const renderInput = (name, label, type = "text") => {
    console.log("rendeirng input", errors, errors[name])
    return (
      <Input
        type={type}
        name={name}
        label={label}
        value={data[name]}
        onChange={handleChange}
        error={errors[name]}
      />
    );
  };

  return (
    <div>
      <h1>Update Password</h1>

      {submitted ? (
        <div>
          <p>Password has been reset!</p>
          <NavLink to="/login">Return to Login.</NavLink>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {renderInput("password", "Password", "password")}
          {renderInput("confirmPassword", "Confirm Password", "password")}
          {renderButton("Submit")}
        </form>
      )}
    </div>
  );
};

export default PasswordResetReceivedForm;

const Input = ({ name, label, error, ...rest }) => {
  console.log(name, error, "form name");
  if (!error) {
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input {...rest} name={name} id={name} className="form-control" />
      </div>
    );
  }

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      {console.log(typeof error)}
      <input {...rest} name={name} id={name} className="form-control" />
      <div className="alert alert-danger">
        {typeof error === "string" ? (

          <p>{error}</p>
        ) : (
          Object.values(error).map((errorMsg, index) => (
            <p key={index}>{errorMsg}</p>
          ))
        )}
      </div>
    </div>
  );
};


