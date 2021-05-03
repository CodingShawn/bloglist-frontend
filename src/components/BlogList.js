import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function BlogList() {
  const blogs = useSelector((state) => state.blogs);

  function blogSort(blogA, blogB) {
    return blogB.likes - blogA.likes;
  }

  return (
    <section className="blogs">
      {blogs.sort(blogSort).map((blog) => (
        <Link key={blog.id} to={`/blogs/${blog.id}`}>{blog.title}</Link>
      ))}
    </section>
  );
}

export default BlogList;
