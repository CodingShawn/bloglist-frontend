import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";
import React from "react";

describe("<Blog.>", () => {
  let component, blogHeader, blogDetails;
  const blog = {
    title: "Jest",
    author: "Me",
    url: "Test.com",
    likes: 123,
  };

  beforeEach(() => {
    component = render(<Blog blog={blog} />);
    blogHeader = component.container.querySelector(".blog-header");
    blogDetails = component.container.querySelector(".togglable-content");
  });

  test("renders blog and shows only title and author and not url and likes", () => {
    expect(blogHeader).not.toHaveStyle("display: none");

    expect(blogDetails).toHaveStyle("display: none");
  });

  test("clicking view button shows blog details", () => {
    const viewButton = component.getByText("View");
    fireEvent.click(viewButton);

    expect(blogDetails).not.toHaveStyle("display: none");
  });
});
