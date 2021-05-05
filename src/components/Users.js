import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";

function Users() {
  const users = useSelector((state) => state.users);

  return (
    <section>
      <Table striped bordered size="sm">
        <thead>
          <tr>
            <th>Users</th>
            <th>Number of posted blogs</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.username} </Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </section>
  );
}

export default Users;
