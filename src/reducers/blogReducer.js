/* eslint-disable indent */
import blogServices from "../services/blogs";

const initialState = [];

function reducer(state = initialState, action) {
  switch (action.type) {
    case "INIT":
      return action.data;
    case "CREATE":
      return [...state, action.data];
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

export function createBlog(newBlog) {
  return async function (dispatch) {
    let createdBlog = await blogServices.create(newBlog);
    dispatch({
      type: "CREATE",
      data: createdBlog,
    });
  };
}

export default reducer;
