import { axiosInstance, setAuthReqHeader } from "../../custom-axios";
import { SET_ERRORS, SET_CURRENT_USER } from "./actionTypes";
import jwt_decode from "jwt-decode";

const setErrors = err => {
  return {
    type: SET_ERRORS,
    payload: err.response.data
  };
};

export const setCurrentUser = authData => {
  return {
    type: SET_CURRENT_USER,
    payload: authData
  };
};

const getNewTokens = userId => async dispatch => {
  try {
    const newTokenData = {
      userId: userId,
      refreshToken: localStorage.getItem("refreshToken")
    };
    const res = await axiosInstance.post("/api/users/new-token", newTokenData);
    const { accessToken, refreshToken } = res.data;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    const authData = jwt_decode(accessToken);
    dispatch(setCurrentUser(authData));
  } catch (err) {
    console.log(err);
  }
};

export const scheduleRenewingTokens = (userId, expiration) => dispatch => {
  const networkLatency = 1000; // 1 second
  const tokenDuration = expiration * 1000 - Date.now() - networkLatency;
  setTimeout(() => {
    dispatch(getNewTokens(userId));
  }, tokenDuration);
};

export const signUser = (userData, path) => async dispatch => {
  try {
    const res = await axiosInstance.post(path, userData);
    const { accessToken, refreshToken } = res.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    const authData = jwt_decode(accessToken);
    setAuthReqHeader(accessToken);
    dispatch(setCurrentUser(authData));
    dispatch(scheduleRenewingTokens(authData._id, authData.exp));
  } catch (err) {
    dispatch(setErrors(err));
  }
};

export const logoutUser = history => async dispatch => {
  const logoutData = {
    refreshToken: localStorage.getItem("refreshToken")
  };
  axiosInstance
    .post("/api/users/logout", logoutData)
    .then(res => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(setCurrentUser({}));
      setAuthReqHeader();
      history.push("/");
    })
    .catch(err => console.log(err));
};
