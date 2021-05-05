import React from "react";
import { Nav } from "react-bootstrap";

function Navbar() {
  return (
    <>
      <Nav variant="tabs">
        <Nav.Item>
          <Nav.Link eventKey="/" href="/">
            Blogs
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="/users" href="/users">
            Users
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
}

export default Navbar;
