/* eslint-disable indent */
import blogServices from "../services/blogs";

const initialState = [];

function reducer(state = initialState, action) {
  switch (action.type) {
    case "INIT":
      return action.data;
    case "CREATE-BLOG":
      return [...state, action.data];
    case "UPDATE-BLOG":
      return state.map((blog) => blog.id === action.data.id ? action.data : blog)
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
      type: "CREATE-BLOG",
      data: createdBlog,
    });
  };
}

export function updateBlog(blog) {
  return async function (dispatch) {
    let updatedBlog = await blogServices.update(blog);
    dispatch({
      type: "UPDATE-BLOG",
      data: updatedBlog,
    });
  };
}

export default reducer;
