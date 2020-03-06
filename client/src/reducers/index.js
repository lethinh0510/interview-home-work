const reducer = (
  state = {
    signInModal: false,
    signUpModal: false,
    posts: {
      hasPrevPage: false,
      docs: [],
      page: 1
    },
    post: {
      comments: [],
      title: "",
      owner: { name: "" },
      content: "",
      tags: []
    },
    user: { name: "" }
  },
  action
) => {
  switch (action.type) {
    case "POSTS_RECEIVED":
      return { ...state, posts: action.json, loading: false };
    case "GET_POSTS":
    case "ADD_POST":
    case "SIGN_IN":
    case "SIGN_UP":
    case "GET_DETAIL_POST":
    case "ADD_COMMENT":
      return { ...state, loading: true };
    case "ADD_POST_SUCCESS":
      return { ...state, loading: false };
    case "ADD_COMMENT_SUCCESS":
      return { ...state, loading: false };
    case "SIGN_UP_SUCCESS":
      return {
        ...state,
        loading: false,
        signUpModal: false,
        signInModal: true
      };
    case "SIGN_IN_SUCCESS":
      return {
        ...state,
        loading: false,
        signInModal: false,
        user: action.user.user
      };
    case "GET_PROFILE_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.user
      };
    case "TOGGLE_SIGN_IN_MODAL":
      return { ...state, signInModal: !state.signInModal };
    case "TOGGLE_SIGN_UP_MODAL":
      return { ...state, signUpModal: !state.signUpModal };
    case "GET_DETAIL_POST_SUCCESS":
      return { ...state, loading: false, post: action.post };
    case "GET_DETAIL_POST_ERROR":
    case "ADD_POST_ERROR":
      return { ...state, loading: false, error: action.error };
    case "LOGOUT_SUCCESS":
      return { ...state, user: null };
    case "SIGN_UP_ERROR":
    case "SIGN_IN_ERROR":
      return { ...state, error: action.error };
    default:
      return state;
  }
};
export default reducer;
