import React from "react";
import { useDispatch } from "react-redux";
import { updateBlog, deleteBlog } from "../reducers/blogReducer";

const Blog = ({ blog, isUserBlog }) => {
  const dispatch = useDispatch();

  function handleLike() {
    const blogObject = blog;
    blogObject.likes++;
    dispatch(updateBlog(blogObject));
  }

  function handleDeleteBlog() {
    if (window.confirm(`Do you want to delete ${blog.title}?`)) {
      dispatch(deleteBlog(blog));
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 2,
    border: "1px black solid",
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <h2 className="blog-header">
        {blog.title} by {blog.author}
      </h2>
      <div>{blog.url}</div>
      <div>
        likes: {blog.likes}
        <button className="like-button" onClick={handleLike}>
          like
        </button>
      </div>
      <div>Added by {blog.author}</div>
      {isUserBlog && (
        <button className="delete-button" onClick={handleDeleteBlog}>
          Delete Blog
        </button>
      )}
    </div>
  );
};

export default Blog;
