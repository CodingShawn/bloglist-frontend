import { useState } from "react";
import blogService from "../services/blogs";
import Notification from "./Notification";

function AddBlog() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [notification, setNotification] = useState(null);
  const [isError, setIsError] = useState(false);

  async function handleCreateBlog(event) {
    event.preventDefault();
    const newBlog = {
      title,
      author,
      url,
    };
    blogService.create(newBlog);
    let notificationMessage = `A new blog \"${title}\" by ${author} was added`;
    createNotification(notificationMessage);
    setTitle("");
    setAuthor("");
    setUrl("");
  }

  function createNotification(notificationMessage) {
    setNotification(notificationMessage);
    setIsError(false);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  }
  return (
    <>
      <h2>Create New Blog</h2>
      <Notification text={notification} error={isError}/>
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
