import { axiosInstance } from "../../custom-axios";
import {
  GET_POSTS,
  GET_POST,
  ADD_POST,
  SET_ERRORS,
  SET_POST_LOADING,
  DELETE_POST,
  LIKE_POST,
  UNLIKE_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
  EDIT_POST
} from "./actionTypes";
import { clearErrors } from "./profileActions";

const setErrors = err => {
  return {
    type: SET_ERRORS,
    payload: err.response.data
  };
};

const getFeedPosts = posts => {
  return {
    type: GET_POSTS,
    payload: posts
  };
};

const setLoading = () => {
  return {
    type: SET_POST_LOADING
  };
};

export const getPosts = () => async dispatch => {
  try {
    dispatch(setLoading());
    const res = await axiosInstance.get("/api/posts");
    console.log(res.data);
    dispatch(getFeedPosts(res.data.reverse()));
  } catch (err) {
    console.log(err);
  }
};

const getSinglePost = post => {
  return {
    type: GET_POST,
    payload: post
  };
};
export const getPost = postId => async dispatch => {
  try {
    dispatch(setLoading());
    const res = await axiosInstance.get(`/api/posts/${postId}`);
    dispatch(getSinglePost(res.data[0]));
  } catch (err) {
    console.log(err);
  }
};

const postAdded = post => {
  return {
    type: ADD_POST,
    payload: post
  };
};

export const addPost = postData => async dispatch => {
  try {
    const res = await axiosInstance.post("/api/posts", postData);
    dispatch(postAdded(res.data));
  } catch (err) {
    dispatch(setErrors(err));
  }
};

const postDeleted = postId => {
  return {
    type: DELETE_POST,
    payload: postId
  };
};
export const deletePost = postId => async dispatch => {
  try {
    await axiosInstance.delete(`/api/posts/${postId}`);
    dispatch(postDeleted(postId));
  } catch (err) {
    console.log(err);
  }
};

const postLiked = post => {
  return {
    type: LIKE_POST,
    payload: post
  };
};

export const likePost = postId => async dispatch => {
  try {
    const res = await axiosInstance.post(`/api/posts/${postId}/like`);
    dispatch(postLiked(res.data));
  } catch (err) {
    console.log(err);
  }
};

const postUnLiked = post => {
  return {
    type: UNLIKE_POST,
    payload: post
  };
};

export const unLikePost = (postId, userId) => async dispatch => {
  try {
    const res = await axiosInstance.post(`/api/posts/${postId}/unlike`);
    dispatch(postUnLiked(res.data));
  } catch (err) {
    console.log(err);
  }
};

const comment = post => {
  return {
    type: ADD_COMMENT,
    payload: post
  };
};
export const addComment = (commentData, postId) => async dispatch => {
  try {
    const res = await axiosInstance.post(
      `/api/posts/${postId}/comment`,
      commentData
    );
    dispatch(clearErrors());
    dispatch(comment(res.data));
  } catch (err) {
    dispatch(setErrors(err));
  }
};

const deleteCom = post => {
  return {
    type: DELETE_COMMENT,
    payload: post
  };
};

export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    const res = await axiosInstance.delete(
      `/api/posts/${postId}/comment/${commentId}`
    );
    dispatch(deleteCom(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const editPost = (text, postId) => async dispatch => {
  try {
    const updateData = {
      text: text
    };
    const res = await axiosInstance.patch(`/api/posts/${postId}`, updateData);
    dispatch({
      type: EDIT_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch(setErrors(err));
  }
};
