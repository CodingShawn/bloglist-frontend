/* eslint-disable indent */
import userService from "../services/users";

const initialState = [];

function reducer(state = initialState, action) {
  switch (action.type) {
    case "INIT-USERS":
      return action.data;
    default:
      return state;
  }
}

export function initializeUsers() {
  return async function (dispatch) {
    let users = await userService.getUsers();
    dispatch({
      type: "INIT-USERS",
      data: users,
    });
  };
}

export default reducer;
