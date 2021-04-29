import { useState } from "react";
import React from "react";
import { createNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";

function AddBlog({ toggleRef }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();

  async function handleCreateBlog(event) {
    event.preventDefault();
    const newBlog = {
      title,
      author,
      url,
    };
    dispatch(createBlog(newBlog));
    let notificationMessage = `A new blog "${title}" by ${author} was added`;
    dispatch(createNotification(notificationMessage, false));
    setTitle("");
    setAuthor("");
    setUrl("");
    toggleRef.current.toggleVisibility();
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
            id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          ></input>
        </div>
        <div>
          Author:{" "}
          <input
            type="text"
            name="author"
            id="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          ></input>
        </div>
        <div>
          URL:{" "}
          <input
            type="text"
            name="url"
            id="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          ></input>
        </div>
        <button className="create-blog-button" type="submit">
          Create blog
        </button>
      </form>
    </>
  );
}

export default AddBlog;
