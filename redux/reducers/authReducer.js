import {
  SET_CURRENT_USER,
  SET_ERROR,
  LOGOUT_USER
} from "../actions/actionTypes";

const initialState = {
  user: null,
  error: null,
  isAuthenticated: false
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        user: payload,
        isAuthenticated: true
      };
    case SET_ERROR:
      return {
        ...state,
        error: payload
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
        isAuthenticated: false
      };
    default:
      return state;
  }
};

export default reducer;
