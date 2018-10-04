import {
  GET_POSTS,
  ADD_POST,
  SET_POST_LOADING,
  DELETE_POST,
  LIKE_POST,
  UNLIKE_POST,
  GET_POST,
  ADD_COMMENT,
  DELETE_COMMENT
} from "../actions/actionTypes";

const initialState = {
  post: null,
  posts: null,
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };

    case SET_POST_LOADING:
      return {
        ...state,
        loading: true
      };

    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };

    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      };
    }

    case LIKE_POST:
      return {
        ...state,
        posts: state.posts.map(
          post => (post._id === action.payload._id ? action.payload : post)
        )
      };

    case UNLIKE_POST:
      return {
        ...state,
        posts: state.posts.map(
          post => (post._id === action.payload._id ? action.payload : post)
        )
      };

    case GET_POST:
      return {
        ...state,
        loading: false,
        post: action.payload
      };

    case ADD_COMMENT:
      return {
        ...state,
        post: action.payload
      };

    case DELETE_COMMENT:
      return {
        ...state,
        post: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
