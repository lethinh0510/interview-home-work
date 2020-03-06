import { put, takeLatest, all, call } from "redux-saga/effects";
import AuthService from "../services/AuthService";
import PostService from "../services/PostService";
import CommentService from "../services/CommentService";
function* fetchPosts(action) {
  const { page, tag, query } = action;
  try {
    const res = yield call(PostService.getAll, page, tag, query);
    yield put({ type: "POSTS_RECEIVED", json: res });
  } catch (error) {}
}
function* actionWatcher() {
  yield takeLatest("GET_POSTS", fetchPosts);
}
function* addPost(action) {
  try {
    const res = yield call(PostService.create, action.payload);
    yield put({ type: "ADD_POST_SUCCESS", json: res });
  } catch (error) {
    if (error.data.error.code === 11000) {
      yield put({ type: "ADD_POST_ERROR", error: "Title is uniqued" });
    }
  }
}
function* actionAddPost() {
  yield takeLatest("ADD_POST", addPost);
}

function* signIn(action) {
  try {
    const res = yield call(AuthService.login, action.payload);
    yield put({ type: "SIGN_IN_SUCCESS", user: res });
  } catch (error) {
    yield put({ type: "SIGN_IN_ERROR", error: error.data.message });
  }
}
function* actionSignIn() {
  yield takeLatest("SIGN_IN", signIn);
}

function* signUp(action) {
  try {
    const res = yield call(AuthService.register, action.payload);
    yield put({ type: "SIGN_UP_SUCCESS", user: res });
  } catch (error) {
    console.log('aaaaaaa', error);
    
    yield put({ type: "SIGN_UP_ERROR", error: error.data.message });
  }
}
function* actionSignUp() {
  yield takeLatest("SIGN_UP", signUp);
}

function* getDetailPost(action) {
  try {
    const res = yield call(PostService.detail, action.id);
    yield put({ type: "GET_DETAIL_POST_SUCCESS", post: res });
  } catch (error) {
    yield put({ type: "GET_DETAIL_POST_ERROR", error: error });
  }
}
function* actionGetDetailPost() {
  yield takeLatest("GET_DETAIL_POST", getDetailPost);
}

function* addComment(action) {
  try {
    const res = yield call(CommentService.create, action.payload);
    yield call(getDetailPost, { id: action.payload.post_id });
    yield put({ type: "ADD_COMMENT_SUCCESS", post: res });
  } catch (error) {}
}
function* actionAddComment() {
  yield takeLatest("ADD_COMMENT", addComment);
}

function* getProfile() {
  try {
    const res = yield call(AuthService.profile);
    yield put({ type: "GET_PROFILE_SUCCESS", user: res });
  } catch (error) {}
}
function* actionGetProfile() {
  yield takeLatest("GET_PROFILE", getProfile);
}

function* logout() {
  try {
    yield call(AuthService.logout);
    yield put({ type: "LOGOUT_SUCCESS" });
  } catch (error) {}
}
function* actionLogout() {
  yield takeLatest("LOGOUT", logout);
}
export default function* rootSaga() {
  yield all([
    actionWatcher(),
    actionAddPost(),
    actionSignIn(),
    actionSignUp(),
    actionGetDetailPost(),
    actionAddComment(),
    actionGetProfile(),
    actionLogout()
  ]);
}
