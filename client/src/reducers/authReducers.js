import { SAVE_CROPPED_FILE, SAVE_EMAIL_PASSWORD, SET_CURRENT_USER, USER_LOADING } from "../actions/types";
import isEmpty from 'is-empty';
const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  email: '',
  password: '',
  croppedFile: null,
};

export default function (state = initialState, action) {
  switch (action.type) {

    case SET_CURRENT_USER:
      console.loh(action.payload, "inside auth reducer setcurrentuser")
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    case SAVE_EMAIL_PASSWORD:
      console.log("save in reducer", action.payload)
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password

      };
      case SAVE_CROPPED_FILE:
        return {
          ...state,
          croppedFile: action.payload,
        };
 
    default:
      return state;
  }
}
