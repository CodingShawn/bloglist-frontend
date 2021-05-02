/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import userService from "../services/users";

function Users() {
  const [users, setUsers] = useState(null);

  async function extractUserInfo() {
    let users = await userService.getUsers();
    console.log(users);
    setUsers(users);
  }

  useEffect(() => {
    extractUserInfo()
  }, []);

  return (
    <section>
      <h2>Users</h2>
      {users && users.map(user => <div key={user.id}>{user.username} {user.blogs.length}</div>)}
    </section>
  );
}

export default Users;
