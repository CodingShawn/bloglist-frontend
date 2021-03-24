import React from "react";
import Togglable from "./Togglable";
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlogs }) => {

  function handleLike() {
    const blogObject = blog;
    blogObject.likes++;
    blogService.update(blogObject);
    updateBlogs();
  }

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 2,
    border: '1px black solid',
    marginBottom: 5
  }

  return(
  <div style={blogStyle}>
    <div>
      {blog.title} {blog.author}
    </div>
    <Togglable buttonLabel="View">
      <div>{blog.url}</div>
      <div>likes: {blog.likes}<button onClick={handleLike}>like</button></div>
      <div>{blog.author}</div>
    </Togglable>
  </div>
  )
};

export default Blog;
