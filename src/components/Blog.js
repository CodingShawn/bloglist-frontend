import React from "react";
import Togglable from "./Togglable";
import blogService from "../services/blogs";

const Blog = ({ blog, updateBlogs, isUserBlog }) => {
  function handleLike() {
    const blogObject = blog;
    blogObject.likes++;
    blogService.update(blogObject);
    updateBlogs();
  }

  function handleDeleteBlog() {
    if (window.confirm(`Do you want to delete ${blog.title}?`)) {
      blogService.deleteBlog(blog);
      updateBlogs();
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
      <div>
        {blog.title} {blog.author}
      </div>
      <Togglable buttonLabel="View">
        <div>{blog.url}</div>
        <div>
          likes: {blog.likes}
          <button onClick={handleLike}>like</button>
        </div>
        <div>{blog.author}</div>
      </Togglable>
      {isUserBlog && <button onClick={handleDeleteBlog}>Delete Blog</button>}
    </div>
  );
};

export default Blog;
