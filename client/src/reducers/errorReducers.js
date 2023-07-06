import { GET_ERRORS } from "../actions/types";

const initialState = {
  error:""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      console.log("errors in reducer",action.payload)
      return {
        error:action.payload
      };
        case 'CLEAR_ERRORS':
          console.log("cleaning ...")
      return {
       
        error: ""
      };
    default:
      return state;
  }
}
