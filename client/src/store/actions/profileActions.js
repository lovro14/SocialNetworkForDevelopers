import {
  GET_PROFILE,
  SET_PROFILE_LOADING,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_CURRENT_USER,
  CLEAR_PROFILE,
  CANCEL_LOADING,
  GET_PROFILES,
  UPLOAD_PROFILE_PICTURE
} from "./actionTypes";
import { axiosInstance } from "../../custom-axios";

const setErrors = err => {
  return {
    type: SET_ERRORS,
    payload: err.response.data
  };
};

const clearUser = () => {
  return {
    type: SET_CURRENT_USER,
    payload: {}
  };
};

const clearProfile = () => {
  return {
    type: CLEAR_PROFILE,
    payload: {}
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

const getProfileData = profileData => {
  return {
    type: GET_PROFILE,
    payload: profileData
  };
};

const setLoading = () => {
  return {
    type: SET_PROFILE_LOADING
  };
};

const cancelLoading = () => {
  return {
    type: CANCEL_LOADING
  };
};
export const createProfile = (profileData, history) => async dispatch => {
  try {
    dispatch(clearErrors());
    await axiosInstance.post("/api/business-profile", profileData);
    history.push("/dashboard");
  } catch (err) {
    dispatch(setErrors(err));
  }
};

export const getCurrentProfile = () => async dispatch => {
  try {
    dispatch(setLoading());
    const res = await axiosInstance.get("/api/business-profile");
    dispatch(getProfileData(res.data));
    dispatch(cancelLoading());
  } catch (err) {
    dispatch(cancelLoading());
    console.log(err);
  }
};

export const addExperience = (experience, history) => async dispatch => {
  try {
    const res = await axiosInstance.post(
      "/api/business-profile/experience",
      experience
    );
    dispatch(getProfileData(res.data));
    history.push("/dashboard");
  } catch (err) {
    dispatch(setErrors(err));
  }
};

export const addEducation = (education, history) => async dispatch => {
  try {
    const res = await axiosInstance.post(
      "/api/business-profile/education",
      education
    );
    dispatch(getProfileData(res.data));
    history.push("/dashboard");
  } catch (err) {
    dispatch(setErrors(err));
  }
};

export const addProject = (project, history) => async dispatch => {
  try {
    const res = await axiosInstance.post(
      "/api/business-profile/project",
      project
    );
    dispatch(getProfileData(res.data));
    history.push("/dashboard");
  } catch (err) {
    dispatch(setErrors(err));
  }
};

export const deleteExperience = expId => async dispatch => {
  try {
    const res = await axiosInstance.delete(
      `/api/business-profile/experience/${expId}`
    );
    dispatch(getProfileData(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const deleteEducation = educationId => async dispatch => {
  try {
    const res = await axiosInstance.delete(
      `/api/business-profile/education/${educationId}`
    );
    dispatch(getProfileData(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const deleteProject = projectId => async dispatch => {
  try {
    const res = await axiosInstance.delete(
      `/api/business-profile/project/${projectId}`
    );
    dispatch(getProfileData(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const deleteAccount = () => async dispatch => {
  try {
    await axiosInstance.delete("/api/users");
    dispatch(clearUser());
    dispatch(clearProfile());
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  } catch (err) {
    console.log(err);
  }
};

const getProfiles = profiles => {
  return {
    type: GET_PROFILES,
    payload: profiles
  };
};

export const getBusinessProfiles = () => async dispatch => {
  try {
    dispatch(setLoading());
    const res = await axiosInstance.get("/api/business-profile/all");
    dispatch(getProfiles(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const getProfileByIdentityName = identityName => async dispatch => {
  try {
    dispatch(setLoading());
    const res = await axiosInstance.get(
      `/api/business-profile/${identityName}`
    );
    dispatch(getProfileData(res.data[0]));
  } catch (err) {
    console.log(err);
  }
};

const uploadPP = profilePicture => {
  return {
    type: UPLOAD_PROFILE_PICTURE,
    payload: profilePicture
  };
};

export const uploadProfilePicture = selectedFile => async dispatch => {
  const formData = new FormData();
  formData.append("file", selectedFile);
  try {
    //dispatch(setLoading());
    const res = await axiosInstance.post(
      "/api/users/profile-picture",
      formData
    );
    // localStorage.removeItem("accessToken");
    // localStorage.setItem("accessToken", res.data.accessToken);
    // setAuthReqHeader(res.data.accessToken);
    dispatch(uploadPP(res.data.profilePicture));
    //dispatch(cancelLoading());
  } catch (err) {
    console.log(err);
  }
};
