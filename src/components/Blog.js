import React from "react";
import Togglable from "./Togglable";

const Blog = ({ blog }) => {

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
      <div>likes: {blog.likes}<button>like</button></div>
      <div>{blog.author}</div>
    </Togglable>
  </div>
  )
};

export default Blog;
