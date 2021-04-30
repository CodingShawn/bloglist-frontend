import React, { useState, useEffect, useRef } from "react";
import AddBlog from "./components/AddBlog";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { useDispatch, useSelector } from "react-redux";
import { createNotification } from "./reducers/notificationReducer";
import BlogList from "./components/BlogList";
import { initializeBlogs } from "./reducers/blogReducer";
import { login, logout, persistLogin } from "./reducers/loginReducer";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  async function handleLogin(event) {
    event.preventDefault();
    setUsername("");
    setPassword("");
    try {
      dispatch(login({ username, password }));
    } catch (exception) {
      dispatch(createNotification("Wrong username or password", true));
    }
  }

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      dispatch(persistLogin(user));
      blogService.setToken(user.token);
    }
  }, []);

  async function handleLogout(event) {
    event.preventDefault();
    window.localStorage.removeItem("loggedInUser");
    logout();
  }

  const addBlogRef = useRef();

  if (user === null) {
    return (
      <>
        <h1>Log in to application</h1>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            Username{" "}
            <input
              type="text"
              value={username}
              name="Username"
              id="username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            Password{" "}
            <input
              type="password"
              value={password}
              name="Password"
              id="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">
            Login
          </button>
        </form>
      </>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      {user.username} logged in{" "}
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <Notification />
      <Togglable buttonLabel="Add new blog" ref={addBlogRef}>
        <AddBlog toggleRef={addBlogRef} />
      </Togglable>
      <BlogList user={user} />
    </div>
  );
};

export default App;
