import * as userService from "../services/userService";
import login from "../services/authService";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { push } from 'connected-react-router';
import { CHANGE_PASSWORD_FAILURE, CHANGE_PASSWORD_SUCCESS, GET_ERRORS, SAVE_CROPPED_FILE, SAVE_EMAIL_PASSWORD, SET_CURRENT_USER, USER_LOADING } from "./types";

export const registerUser = (userData) => async dispatch => {

  try {
    console.log(registerUser, "inside action")
    await userService.register(userData);
    window.location="/login"
  } catch (err) {
    console.log(err,"action error")
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const saveCroppedFile = (file) => {
  return {
    type: SAVE_CROPPED_FILE,
    payload: file,
  };
};

// Login - store user token
export const loginUser = (userData) => async dispatch => {
  try {
    const response = await login(userData.email, userData.password);
    //return

    const { data: jwt, status } = await login(userData.email, userData.password);

    localStorage.setItem("token", jwt);

    // Set token to Auth header
    setAuthToken(jwt);
    // Decode for user data
    const decoded = jwt_decode(jwt);

    dispatch(saveEmailAndPassword(userData.email, userData.password))

    if (status === 206) {
      localStorage.loggedin = false;
      localStorage.setItem("email", userData.email)
      // history.push("/otp");
      window.location="/otp"

    } else if (status === 200) {

      localStorage.setItem("email", userData.email)
      localStorage.loggedin = true;
      // history.push("/")
      window.location = "/"
    } else {
      window.location ="/otp"
    }

  } catch (err) {
    console.log(err,"error in action")
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const clearErrors = () => {
  return {
    type: 'CLEAR_ERRORS'
  };
};

export const saveEmailAndPassword = (email, password) => (dispatch) => {

  dispatch({
    type: SAVE_EMAIL_PASSWORD,
    payload: {
      email, password

    }
  })
};



export const changePassword = async (email, currentPassword, newPassword) => {



  try {

    // Make the API request to change the password
    const response = await fetch('http://localhost:5000/api/users/changepassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, currentPassword, newPassword }),
    }).then(response => {

      if (response.ok) {
        console.log("password saved successfully")
      } else if (response.status == 401) {
        console.log("Invalid credentials")


      }

    })


  } catch (error) {
    console.log(error, "error hai")

  };
};


// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// User Logout
export const logoutUser = () => dispatch => {
  localStorage.removeItem("token");
  setAuthToken(false);
  // logout user and turn isAuthenticated to false
  dispatch(setCurrentUser({}));
  window.location = "/";
};
