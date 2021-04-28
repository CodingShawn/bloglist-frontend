import Blog from "./Blog";
import React from "react";
import { useSelector } from "react-redux";

function BlogList(props) {
  const blogs = useSelector((state) => state.blogs);

  function blogSort(blogA, blogB) {
    return blogB.likes - blogA.likes;
  }

  function isUserBlog(blog) {
    return props.user.username === blog.user.username;
  }

  return (
    <section className="blogs">
      {blogs.sort(blogSort).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlogs={props.updateBlogs}
          isUserBlog={isUserBlog(blog)}
        />
      ))}
    </section>
  );
}

export default BlogList;
