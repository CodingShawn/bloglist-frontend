/* eslint-disable indent */
import loginService from "../services/login";
import blogService from "../services/blogs";

const initialState = null;

function reducer(state = initialState, action) {
  switch (action.type) {
    case "PERSIST":
      return action.data;
    case "LOGIN":
      return action.data;
    case "LOGOUT":
      return null;
    default:
      return state;
  }
}

export function persistLogin(user) {
  return async function (dispatch) {
    dispatch({
      type: "PERSIST",
      data: user,
    });
  };
}

export function login(credentials) {
  return async function (dispatch) {
    let user = await loginService.login(credentials);
    blogService.setToken(user.token);
    window.localStorage.setItem("loggedInUser", JSON.stringify(user));
    dispatch({
      type: "LOGIN",
      data: user,
    });
  };
}

export function logout() {
  return async function (dispatch) {
    dispatch({
      type: "LOGOUT",
    });
  };
}

export default reducer;
