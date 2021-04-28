import Blog from "./Blog";
import React from "react";

function BlogList(props) {
  function blogSort(blogA, blogB) {
    return blogB.likes - blogA.likes;
  }

  function isUserBlog(blog) {
    return props.user.username === blog.user.username;
  }

  return (
    <section className="blogs">
      {props.blogs.sort(blogSort).map((blog) => (
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
