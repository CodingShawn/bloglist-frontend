/* eslint-disable indent */
import blogServices from "../services/blogs";

const initialState = [];

function reducer(state = initialState, action) {
  switch (action.type) {
    case "INIT":
      return action.data;
    default:
      return state;
  }
}

export function initializeBlogs() {
  return async function (dispatch) {
    let blogs = await blogServices.getAll();
    dispatch({
      type: "INIT",
      data: blogs,
    });
  };
}

export default reducer;
