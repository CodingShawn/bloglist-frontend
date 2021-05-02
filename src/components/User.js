/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function User() {
  const users = useSelector((state) => state.users);
  const id = useParams().id;
  const user = users.find((user) => user.id === id);

  return (
    <section>
      {user && (
        <>
          <h2>{user.username}</h2>
          <h3>Added blogs</h3>
          <ul>
            {user.blogs.map((blog) => (
              <li key={blog.id}>{blog.title}</li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

export default User;
