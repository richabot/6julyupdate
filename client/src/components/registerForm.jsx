// import React, { Component } from "react";
// import Joi from "joi-browser";
// import Form from "./common/form";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { registerUser } from "../actions/authActions";
// class RegisterForm extends Form {

//   state = {
//     data: {
//       username: "",
//       firstName: "",
//       lastName: "",
//       password: "",
//       email: ""
//     },
//     errors: {}

//   };

//   schema = {
//     username: Joi.string()
//       .required()
//       .label("Username"),
//     firstName: Joi.string()
//       .required()
//       .min(2)
//       .label("FirstName"),
//     lastName: Joi.string()
//       .required()
//       .min(2)
//       .label("LastName"),
//     email: Joi.string()
//       .required()
//       .email()
//       .label("Email"),
//     password: Joi.string()
//       .required()
//       .min(5)
//       .label("Password")
//   };


//   doSubmit = async () => {
//     try {
      
//       await this.props.registerUser(this.state.data, this.props.history);
//       const errorMsg = this.props.errors;

//       if (errorMsg) {
//         const fieldName = errorMsg.split(" ")[0].replace(/"/g, "");;

//         // const fieldName = errorMsg.split(" ")[0] ;
//         let errors = {};
       
//         if (fieldName == "username") {
//           errors.username = errorMsg;
//         }
//         else if (fieldName == "firstName") {
//           errors.firstName = errorMsg;
//         }
//         else if (fieldName == "password") {
//           errors.password = errorMsg;
//         }
//         else if (fieldName == "lastName") {
//           errors.lastName = errorMsg;
//         }
//         else if (fieldName == "email") {
//           errors.email = errorMsg;
//         }
//         else {
//           errors.email = errorMsg;
//         }

//         // console.log(error,"error in registration")
//         this.setState({ errors });
//       }
//     } catch (ex) {
//       console.log(ex);
//     }
//   };

//   render() {
//     return (


//       <div>
//         <section class="login">
//           <div class="login_box">
//             <div class="left">
//               <div class="top_link"><a href="/"><img src="https://drive.google.com/u/0/uc?id=16U__U5dJdaTfNGobB_OpwAJ73vM50rPV&export=download" alt="" />Return home</a>
//               </div>
//               <div class="contact">
//                 <form onSubmit={this.handleSubmit}>
//                   <h3>SIGN UP</h3>
//                   {this.renderInput("username", "Username", "text")}
//                   {this.renderInput("firstName", "FirstName", "text")}
//                   {this.renderInput("lastName", "LastName", "text")}
//                   {this.renderInput("email", "Email", "text")}
//                   {this.renderInput("password", "Password", "password")}
//                   {this.renderButton("Register")}
//                 </form>
//               </div>
//             </div>
//             <div className="right">
//               <div className="borderright">
//                 <div className="title">
//                   <h2 className="righttittle">Register Page</h2>
//                 </div>
//                 <div className="paragraphs">
//                   <h5>Please verify your Email before login</h5>
//                 </div>
//               </div>
//             </div>
//           </div>



//         </section>
//       </div>

//     );
//   }
// }

// RegisterForm.propTypes = {
//   registerUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   errors: PropTypes.string.isRequired,
//   history: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   auth: state.auth,
//   errors: state.errors
// });

// export default connect(mapStateToProps, { registerUser })(
//   (RegisterForm)
// );

import React, { useState, useEffect } from "react";
import Joi from "joi-browser";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { clearErrors, registerUser } from "../actions/authActions";
// import Input from "./common/Input";
import "../styles/form.css";
// import Input from './common/Input';


const RegisterForm = ({ history }) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const errors = useSelector(state => state.errors.error);
console.log(errors,"errors from redux")
  const [data, setData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    email: ""
  });
  const [formErrors, setFormErrors] = useState({});

  const schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    firstName: Joi.string()
      .required()
      .min(2)
      .label("First Name"),
    lastName: Joi.string()
      .required()
      .min(2)
      .label("Last Name"),
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .required()
      .min(5)
      .regex(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[@]).*$/)
      .label("Password")
  };

  useEffect(() => {
    if (errors) {
      setFormErrors(errors);
    }
  }, [errors]);

  useEffect(() => {
    // Clear the error message when the component unmounts
    return () => {
      dispatch(clearErrors()); // Replace `clearErrors` with the appropriate action to clear the error message
    };
  }, [dispatch,errors]);
  useEffect(() => {
    dispatch(clearErrors());
    return () => {
      dispatch(clearErrors()); // Clear the error message when the component unmounts
    };
  }, [dispatch]);
  

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

  const handleSubmit = e => {
    e.preventDefault();

    const errors = validate();
    setFormErrors(errors || {});
    if (errors) return;

    doSubmit();
  };

  const doSubmit = async () => {
    try {
      await dispatch(registerUser(data));
      const errorMsg = errors;
      console.log(errorMsg,"error")
      if (errorMsg) {
        // const fieldName = errorMsg.split(" ")[0].replace(/"/g, "");
        // console.log(fieldName,"feildname")
        let errors = {};

        // if (fieldName === "username") {
        //   errors.username = errorMsg;
        // } else if (fieldName === "firstName") {
        //   errors.firstName = errorMsg;
        // } else if (fieldName === "password") {
        //   errors.password = errorMsg;
        // } else if (fieldName === "lastName") {
        //   errors.lastName = errorMsg;
        // } else if (fieldName === "email") {
        //   errors.email = errorMsg;
        // } else {
        //   errors.email = errorMsg;
        // }
        errors.email = errorMsg.error;
        setFormErrors(errors);
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    const { name, value } = input;
    const errors = { ...formErrors };
    const errorMessage = validateProperty(input);

    if (errorMessage) {
      errors[name] = errorMessage;
    } else {
      delete errors[name];
    }

    setData(prevData => ({ ...prevData, [name]: value }));
    setFormErrors(errors);
  };

  const renderButton = label => (
    <button disabled={validate()} className="btn btn-primary button-28">
      {label}
    </button>
  );

  useEffect(() => {
    if (errors && errors!=="Invalid email or password") {
      console.log("useeffect mein",errors)
      let formErrors = {};
      formErrors.email = errors;
      setFormErrors(formErrors);
    }
    return () => {
      dispatch(clearErrors()); // Replace `clearErrors` with the appropriate action to clear the error message
    };
   
  }, [errors]);

  const renderInput = (name, label, type = "text") => (
    <Input
      type={type}
      name={name}
      label={label}
      value={data[name]}
      onChange={handleChange}
      error={formErrors[name]}
    />
  );

  return (
    <div>
      <section className="login">
        <div className="login_box">
          <div className="left">
            <div className="top_link">
              <NavLink to="/">
                <img
                  src="https://drive.google.com/u/0/uc?id=16U__U5dJdaTfNGobB_OpwAJ73vM50rPV&export=download"
                  alt=""
                />
                Return home
              </NavLink>
            </div>
            <div className="contact">
              <form onSubmit={handleSubmit}>
                <h3>SIGN UP</h3>
                {renderInput("username", "Username")}
                {renderInput("firstName", "First Name")}
                {renderInput("lastName", "Last Name")}
                {renderInput("email", "Email")}
                {renderInput("password", "Password", "password")}
                {renderButton("Register")}
              </form>
            </div>
          </div>
          <div className="right">
            <div className="borderright">
              <div className="title">
                {errors && <p>{errors}</p>}
                <h2 className="righttittle">Register Page</h2>
              </div>
              <div className="paragraphs">
                <h5>Please verify your Email before login</h5>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

RegisterForm.propTypes = {
  // registerUser: PropTypes.func.isRequired,
  // history: PropTypes.object.isRequired
};

export default RegisterForm;

const Input = ({ name, label, error, ...rest }) => {
  console.log(name, error, "fprm name")
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} id={name} className="form-control" />
      {/* {error && <div className="alert alert-danger">{error}</div>} */}
      {typeof error === "string" &&(
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


