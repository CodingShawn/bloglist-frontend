import React, { useState, useEffect, useRef } from "react";
import AddBlog from "./components/AddBlog";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { useDispatch } from "react-redux";
import { createNotification } from "./reducers/notificationReducer";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      setUsername("");
      setPassword("");
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
    } catch (exception) {
      dispatch(createNotification("Wrong username or password", true));
    }
  }

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  async function handleLogout(event) {
    event.preventDefault();
    window.localStorage.removeItem("loggedInUser");
    setUser(null);
  }

  function updateBlogs(helperFunction, helperArgument) {
    (function updateBlogHelper() {
      helperFunction(blogs, setBlogs, helperArgument);
    })();
  }

  const addBlogRef = useRef();

  function blogSort(blogA, blogB) {
    return blogB.likes - blogA.likes;
  }

  function isUserBlog(blog) {
    return user.username === blog.user.username;
  }

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
        <AddBlog toggleRef={addBlogRef} updateBlogs={updateBlogs} />
      </Togglable>
      <section className="blogs">
        {blogs.sort(blogSort).map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlogs={updateBlogs}
            isUserBlog={isUserBlog(blog)}
          />
        ))}
      </section>
    </div>
  );
};

export default App;
