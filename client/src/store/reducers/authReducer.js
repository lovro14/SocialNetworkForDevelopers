import {
  SET_CURRENT_USER
} from "../actions/actionTypes";
import { isEmpty } from "../../utils";

const initialState = {
  isAuthenticated: false,
  user: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        user: action.payload,
        isAuthenticated: isEmpty(action.payload) ? false : true
      };

    default:
      return state;
  }
};

export default reducer;
