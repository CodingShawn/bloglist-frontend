import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Users() {
  const users = useSelector((state) => state.users);

  return (
    <section>
      <h2>Users</h2>
      {users &&
        users.map((user) => (
          <div key={user.id}>
            <Link to={`/users/${user.id}`}>{user.username} </Link>
            {user.blogs.length}
          </div>
        ))}
    </section>
  );
}

export default Users;
