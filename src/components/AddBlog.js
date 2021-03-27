import { useState } from "react";
import blogService from "../services/blogs";
import React from "react";

function AddBlog({ createNotification, toggleRef, updateBlogs }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  async function handleCreateBlog(event) {
    event.preventDefault();
    const newBlog = {
      title,
      author,
      url,
    };
    let returnedNewBlog = await blogService.create(newBlog);
    let notificationMessage = `A new blog "${title}" by ${author} was added`;
    createNotification(notificationMessage, false);
    setTitle("");
    setAuthor("");
    setUrl("");
    toggleRef.current.toggleVisibility();
    updateBlogs(addNewBlogHelper, returnedNewBlog);
  }

  function addNewBlogHelper(blogs, setBlogs, newBlog) {
    let newBlogs = blogs.concat(newBlog);
    setBlogs(newBlogs);
  }

  return (
    <>
      <h2>Create New Blog</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          Title:{" "}
          <input
            type="text"
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          ></input>
        </div>
        <div>
          Author:{" "}
          <input
            type="text"
            name="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          ></input>
        </div>
        <div>
          URL:{" "}
          <input
            type="text"
            name="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          ></input>
        </div>
        <button type="submit">Create blog</button>
      </form>
    </>
  );
}

export default AddBlog;
