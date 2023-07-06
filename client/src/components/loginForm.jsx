// import React, { Component } from "react";
// import { NavLink } from "react-router-dom";
// import Joi from "joi-browser";
// import Form from "./common/form";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { loginUser } from "../actions/authActions";
// import "../styles/form.css"
// class LoginForm extends Form {
//   state = {
//     data: {
//       email: "",
//       password: ""
//     },
//     errors: {}
//   };

//   schema = {
//     email: Joi.string()
//       .required()
//       .email()
//       .label("Email"),
//     password: Joi.string()
//       .required()
//       .label("Password")
//   };

//   doSubmit = async () => {
//     // Call the server
//     try {
//       await this.props.loginUser(this.state.data, this.props.history);
//       const errorMsg = this.props.errors;
//       console.log(errorMsg);
//       if (errorMsg) {
//         let errors = {};
//         errors.password = errorMsg;
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
//                   <h3>SIGN IN</h3>
//                   {this.renderInput("email", "Email", "text")}
//                   {this.renderInput("password", "Password", "password")}
//                   {this.renderButton("Login")}
//                 </form>
//               </div>
//             </div>
//             <div className="right">
//               <div className="borderright">
//                 <div className="title">
//                   <h2 className="righttittle">Welcome Page</h2>
//                 </div>
//                 <div className="paragraphs">
//                   <h5>Please Sign In to continue</h5>
//                 </div>
//               </div>
//             </div>
//           </div>

//         </section>
//       </div>
//     );
//   }
// }

// LoginForm.propTypes = {
//   loginUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   errors: PropTypes.string.isRequired,
//   history: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   auth: state.auth,
//   errors: state.errors
// });

// export default connect(mapStateToProps, { loginUser })(
//   (LoginForm)
// );



// import React, { useState } from "react";
// import Joi from "joi-browser";
// import { NavLink } from "react-router-dom";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";
// import { loginUser } from "../actions/authActions";
// import Input from "./common/Input";
// import "../styles/form.css";

// const LoginForm = ({ loginUser, auth, errors, history }) => {
//   const [data, setData] = useState({
//     email: "",
//     password: ""
//   });
//   const [formErrors, setFormErrors] = useState({});

//   const schema = {
//     email: Joi.string()
//       .required()
//       .email()
//       .label("Email"),
//     password: Joi.string()
//       .required()
//       .label("Password")
//   };

//   const validate = () => {
//     const options = { abortEarly: false };
//     const { error } = Joi.validate(data, schema, options);
//     if (!error) return null;

//     const errors = {};
//     for (let item of error.details) errors[item.path[0]] = item.message;
//     return errors;
//   };

//   const validateProperty = ({ name, value }) => {
//     const obj = { [name]: value };
//     const propertySchema = { [name]: schema[name] };
//     const { error } = Joi.validate(obj, propertySchema);
//     return error ? error.details[0].message : null;
//   };

//   const handleSubmit = e => {
//     e.preventDefault();

//     const errors = validate();
//     console.log(errors,"richa")

//     setFormErrors(errors || {});
//     if (errors) return;

//     doSubmit();
//   };

//   const doSubmit = async () => {
//     try {
//       await loginUser(data, history);
//       const errorMsg = errors;
//       console.log(errorMsg,"errors");
//       if (errorMsg) {
//         let errors = {};
//         errors.password = errorMsg;
       
//         setFormErrors(errors);
//       }
//     } catch (ex) {
//       console.log(ex,"catch");
      
//     }
//   };

//   const handleChange = ({ currentTarget: input }) => {
//     const { name, value } = input;
//     const errors = { ...formErrors };
//     const errorMessage = validateProperty(input);

//     if (errorMessage) {
//       errors[name] = errorMessage;
//     } else {
//       delete errors[name];
//     }

//     setData(prevData => ({ ...prevData, [name]: value }));
//     setFormErrors(errors);
//   };

//   const renderButton = label => (
//     <button disabled={validate()} className="btn btn-primary button-28">
//       {label}
//     </button>
//   );

//   const renderInput = (name, label, type = "text") => (
    
//     <Input
//       type={type}
//       name={name}
//       label={label}
//       value={data[name]}
//       onChange={handleChange}
//       error={formErrors[name]}
//     />
//   );

//   return (
//     <div>
//       <section className="login">
//         <div className="login_box">
//           <div className="left">
//             <div className="top_link">
//               <a href="/">
//                 <img
//                   src="https://drive.google.com/u/0/uc?id=16U__U5dJdaTfNGobB_OpwAJ73vM50rPV&export=download"
//                   alt=""
//                 />
//                 Return home
//               </a>
//             </div>
//             <div className="contact">
//               <form onSubmit={handleSubmit}>
//                 <h3>SIGN IN</h3>
//                 {renderInput("email", "Email", "text")}
//                 {renderInput("password", "Password", "password")}
//                 {renderButton("Login")}
//               </form>
//             </div>
//           </div>
//           <div className="right">
//             <div className="borderright">
//               <div className="title">
//                 <h2 className="righttittle">Welcome Page</h2>
//               </div>
//               <div className="paragraphs">
//                 <h5>Please Sign In to continue</h5>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// LoginForm.propTypes = {
//   loginUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   errors: PropTypes.string.isRequired,
//   history: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   auth: state.auth,
//   errors: state.errors
// });

// export default connect(mapStateToProps, { loginUser })(LoginForm);


// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import Joi from "joi-browser";
// import { NavLink } from "react-router-dom";
// import PropTypes from "prop-types";
// import { loginUser } from "../actions/authActions";
// import Input from "./common/Input";
// import "../styles/form.css";

// const LoginForm = ({ history }) => {
//   const dispatch = useDispatch();
//   const auth = useSelector(state => state.auth);
//   const errors = useSelector(state => state.errors);
//  console.log(errors,"error inric")
//   const [data, setData] = useState({
//     email: "",
//     password: ""
//   });
//   const [formErrors, setFormErrors] = useState({});

//   const schema = {
//     email: Joi.string()
//       .required()
//       .email()
//       .label("Email"),
//     password: Joi.string()
//       .required()
//       .label("Password")
//   };

//   const validate = () => {
//     const options = { abortEarly: false };
//     const { error } = Joi.validate(data, schema, options);
//     if (!error) return null;

//     const errors = {};
//     for (let item of error.details) errors[item.path[0]] = item.message;
//     return errors;
//   };

//   const validateProperty = ({ name, value }) => {
//     const obj = { [name]: value };
//     const propertySchema = { [name]: schema[name] };
//     const { error } = Joi.validate(obj, propertySchema);
//     return error ? error.details[0].message : null;
//   };

//   const handleSubmit = e => {
//     e.preventDefault();

//     const errors = validate();
//     setFormErrors(errors || {});
//     if (errors) return;

//     doSubmit();
//   };



//   const doSubmit = async () => {
//     try {
//       await dispatch(loginUser(data, history));
//       const errorMsg = errors;
//       if (errorMsg) {
//         let errors = {};
//         errors.password = errorMsg;
//         setFormErrors(errors);
//       }
//     } catch (ex) {
//       console.log(ex,"isndie catch");
//     }
//   };
  
// // ...rendering and other code

//   const handleChange = ({ currentTarget: input }) => {
//     const { name, value } = input;
//     const errors = { ...formErrors };
//     const errorMessage = validateProperty(input);

//     if (errorMessage) {
//       errors[name] = errorMessage;
//     } else {
//       delete errors[name];
//     }

//     setData(prevData => ({ ...prevData, [name]: value }));
//     setFormErrors(errors);
//   };

//   const renderButton = label => (
//     <button disabled={validate()} className="btn btn-primary button-28">
//       {label}
//     </button>
//   );

//   const renderInput = (name, label, type = "text") => (
//     <Input
//       type={type}
//       name={name}
//       label={label}
//       value={data[name]}
//       onChange={handleChange}
//       error={formErrors[name]}
//     />
//   );
//  const renderErrors = errors => {
//   console.log(errors,"inside render error")
//     if (errors) {
//       return errors
//     }
//     return null;
//   };
//   return (
//     <div>
//       <section className="login">
//         <div className="login_box">
//           <div className="left">
//             <div className="top_link">
//               <a href="/">
//                 <img
//                   src="https://drive.google.com/u/0/uc?id=16U__U5dJdaTfNGobB_OpwAJ73vM50rPV&export=download"
//                   alt=""
//                 />
//                 Return home
//               </a>
//             </div>
//             <div className="contact">
//               <form onSubmit={handleSubmit}>
//                 <h3>SIGN IN</h3>
//                 {renderInput("email", "Email", "text")}
//                 {renderInput("password", "Password", "password")}
//                 {renderButton("Login")}
//               </form>
//               {/* {renderErrors(errors)} */}
//             </div>
//           </div>
//           <div className="right">
//             <div className="borderright">
//               <div className="title">
//                 <h2 className="righttittle">Welcome Page</h2>
//               </div>
//               <div className="paragraphs">
                
//                 <h5>Please Sign In to continue</h5>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// LoginForm.propTypes = {
//   history: PropTypes.object.isRequired
// };

// export default LoginForm;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Joi from "joi-browser";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { clearErrors, loginUser } from "../actions/authActions";
// import Input from "./common/Input";
import "../styles/form.css";

const LoginForm = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const errors = useSelector(state => state.errors.error);
  console.log(errors, "error in redux");

  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const [formErrors, setFormErrors] = useState({});

  const schema = {
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .required()
      .label("Password")
  };

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
      await dispatch(loginUser(data));
    } catch (ex) {
      console.log(ex, "inside catch");
    }
  };
 
  useEffect(() => {
    dispatch(clearErrors());
    return () => {
      dispatch(clearErrors()); 
    };
  }, [dispatch]);
 
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

  useEffect(() => {
    if (errors) {
      console.log("useeffect mein",errors)
      let formErrors = {};
      formErrors.password = errors;
      setFormErrors(formErrors);
    }
    return () => {
      dispatch(clearErrors()); // Replace `clearErrors` with the appropriate action to clear the error message
    };
   
  }, [errors]);

  
  return (
    <div>
      <section className="login">
        <div className="login_box">
          <div className="left">
            <div className="top_link">
              <a href="/">
                <img
                  src="https://drive.google.com/u/0/uc?id=16U__U5dJdaTfNGobB_OpwAJ73vM50rPV&export=download"
                  alt=""
                />
                Return home
              </a>
            </div>
            <div className="contact">
              <form onSubmit={handleSubmit}>
                <h3>SIGN IN</h3>
                {renderInput("email", "Email", "text")}
                {renderInput("password", "Password", "password")}
                {renderButton("Login")}
              </form>
              {/* {renderErrors(errors)} */}
            </div>
          </div>
          <div className="right">
            <div className="borderright">
              <div className="title">
                <h2 className="righttittle">Welcome Page</h2>
              </div>
              <div className="paragraphs">
                <h5>Please Sign In to continue</h5>
              </div>
            </div>
            Forgot your password?
              <br />
              <NavLink to="users/reset_password">Reset here. </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
};



export default LoginForm;


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


