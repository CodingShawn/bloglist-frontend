import React, { useState, useEffect, useRef } from "react";
import AddBlog from "./components/AddBlog";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { useDispatch, useSelector } from "react-redux";
import { createNotification } from "./reducers/notificationReducer";
import BlogList from "./components/BlogList";
import { initializeBlogs } from "./reducers/blogReducer";
import { login, persistLogin } from "./reducers/loginReducer";
import { Switch, Route } from "react-router-dom";
import Users from "./components/Users";
import User from "./components/User";
import { initializeUsers } from "./reducers/userReducer";
import { logout } from "./reducers/loginReducer";
import Blog from "./components/Blog";
import Navbar from "./components/Nav";
import { Row, Col, Button } from "react-bootstrap";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.login);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
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
    dispatch(logout());
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
    <div className="container">
      <Navbar />
      <Row className="align-items-center justify-content-between">
        <Col md={4}>
          {" "}
          <h1>Blogs App</h1>
        </Col>
        <Col md={{ span: 2, offset: 6 }}>
          <div style={{ fontWeight: 700, fontSize: "18px" }}>
            {user.username} logged in
          </div>
          <Button className="logout-button" onClick={handleLogout}>
            Logout
          </Button>
        </Col>
      </Row>

      <Notification />
      <Switch>
        <Route path="/users/:id">
          <User user={user} />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/blogs/:id">
          <Blog />
        </Route>
        <Route path="/">
          <Togglable buttonLabel="Add new blog" ref={addBlogRef}>
            <AddBlog toggleRef={addBlogRef} />
          </Togglable>
          <BlogList />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
