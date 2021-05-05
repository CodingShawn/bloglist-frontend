import React from "react";
import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function BlogList() {
  const blogs = useSelector((state) => state.blogs);

  function blogSort(blogA, blogB) {
    return blogB.likes - blogA.likes;
  }

  return (
    <ListGroup className="blogs">
      {blogs.sort(blogSort).map((blog) => (
        <ListGroup.Item key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default BlogList;
