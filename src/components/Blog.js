/* eslint-disable no-unused-vars */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateBlog, deleteBlog, commentBlog } from "../reducers/blogReducer";

const Blog = () => {
  const id = useParams().id;
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  );
  const user = useSelector((state) => state.login);
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

  function handleAddComment(event) {
    event.preventDefault();
    let comment = event.target.comment.value;
    dispatch(commentBlog(blog, { comments: comment }));
  }

  function isUserBlog() {
    if (user) {
      return user.username === blog.user.username;
    } else return false;
  }

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 2,
    border: "1px black solid",
    marginBottom: 5,
  };

  if (!blog) {
    return null;
  }

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
      <div>
        <div>Added by {blog.author}</div>
        <h3>Comments</h3>
        <form onSubmit={handleAddComment}>
          <input type="text" name="comment"></input>
          <button type="submit">Add comment</button>
        </form>
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>
      {isUserBlog() && (
        <button className="delete-button" onClick={handleDeleteBlog}>
          Delete Blog
        </button>
      )}
    </div>
  );
};

export default Blog;
