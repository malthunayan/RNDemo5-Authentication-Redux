import { SET_CURRENT_USER, SET_ERROR, LOGOUT_USER } from "./actionTypes";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { AsyncStorage } from "react-native";

export const loginUser = (userData, navigation) => {
  return async dispatch => {
    try {
      const response = await axios.post(
        "http://178.128.114.232/api/login/",
        userData
      );
      const user = response.data;
      const decodedUser = jwt_decode(user.token);
      setAuthToken(user.token);
      dispatch(setCurrentUser(decodedUser));
      //   navigation.replace("Profile");
    } catch (error) {
      console.error(error);
      dispatch(setError(error));
    }
  };
};

export const registerUser = (userData, navigation) => {
  return async dispatch => {
    try {
      await axios.post("http://178.128.114.232/api/register/", userData);
      dispatch(loginUser(userData, navigation));
    } catch (error) {
      console.error(error);
      dispatch(setError(error));
    }
  };
};

export const checkForExpiredToken = navigation => {
  return async dispatch => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      const currentTime = Date.now() / 1000;
      const user = jwt_decode(token);
      console.log((user.exp - currentTime) / 60);
      if (user.exp >= currentTime) {
        setAuthToken(token);
        dispatch(setCurrentUser(user));
      } else {
        dispatch(logout());
      }
    }
  };
};

const setAuthToken = async token => {
  if (token) {
    await AsyncStorage.setItem("token", token);
    axios.defaults.headers.common.Authorization = `jwt ${token}`;
  } else {
    await AsyncStorage.removeItem("token");
    delete axios.defaults.headers.common.Authorization;
  }
};

const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  payload: user
});

const setError = error => ({
  type: SET_ERROR,
  payload: error
});

export const logoutUser = () => {
  setAuthToken();
  return setCurrentUser();
};
