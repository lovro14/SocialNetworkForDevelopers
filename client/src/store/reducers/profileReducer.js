import {
  SET_PROFILE_LOADING,
  GET_PROFILE,
  CLEAR_PROFILE,
  CANCEL_LOADING,
  GET_PROFILES,
  UPLOAD_PROFILE_PICTURE
} from "../actions/actionTypes";

const initialState = {
  profile: null,
  profiles: null,
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    case CLEAR_PROFILE:
      return initialState;
    case CANCEL_LOADING:
      return {
        ...state,
        loading: false
      };

    case UPLOAD_PROFILE_PICTURE:
      return {
        ...state,
        profile: {
          ...state.profile,
          userId: {
            ...state.profile.userId,
            profilePicture: action.payload
          }
        }
      };
    default:
      return state;
  }
};

export default reducer;
