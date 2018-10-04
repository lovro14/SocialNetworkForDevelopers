import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/"
});

export const setAuthReqHeader = token => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = token;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};
