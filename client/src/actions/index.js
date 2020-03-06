export const getPosts = (page, tag, query) => ({
  type: "GET_POSTS",
  page,
  tag,
  query
});
export const toggleSignInModal = () => ({
  type: "TOGGLE_SIGN_IN_MODAL"
});
export const toggleSignUpModal = () => ({
  type: "TOGGLE_SIGN_UP_MODAL"
});

export const addPost = data => ({
  type: "ADD_POST",
  payload: data
});
export const getDetailPost = id => ({
  type: "GET_DETAIL_POST",
  id: id
});

export const signIn = data => ({
  type: "SIGN_IN",
  payload: data
});
export const signUp = data => ({
  type: "SIGN_UP",
  payload: data
});

export const addComment = data => ({
  type: "ADD_COMMENT",
  payload: data
});

export const getProfile = () => ({
  type: "GET_PROFILE"
});
export const logout = () => ({
  type: "LOGOUT"
});
