import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";
import React from "react";

describe("<Blog.>", () => {
  let component, blogHeader, blogDetails, mockHandler;
  const blog = {
    title: "Jest",
    author: "Me",
    url: "Test.com",
    likes: 123,
  };

  beforeEach(() => {
    mockHandler = jest.fn();
    component = render(<Blog blog={blog} updateBlogs={mockHandler} />);
    blogHeader = component.container.querySelector(".blog-header");
    blogDetails = component.container.querySelector(".togglable-content");
  });

  test("Renders blog and shows only title and author and not url and likes", () => {
    expect(blogHeader).not.toHaveStyle("display: none");

    expect(blogDetails).toHaveStyle("display: none");
  });

  test("Clicking view button shows blog details", () => {
    const viewButton = component.getByText("View");
    fireEvent.click(viewButton);

    expect(blogDetails).not.toHaveStyle("display: none");
  });

  test("Ensure when like button is clicked twice, event handler passed to component as props is called twice", () => {
    const viewButton = component.getByText("View");
    fireEvent.click(viewButton);

    const likeButton = component.getByText("like");
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
