import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Blog from "./Blog";
import React from "react";

test("renders blog and shows only title and author and not url and likes", () => {
  const blog = {
    title: "Jest",
    author: "Me",
    url: "Test.com",
    likes: 123,
  };

  const component = render(<Blog blog={blog} />);

  const blogHeader = component.container.querySelector(".blog-header");
  expect(blogHeader).not.toHaveStyle("display: none");

  const blogDetails = component.container.querySelector(".togglable-content");
  expect(blogDetails).toHaveStyle("display: none");

});


