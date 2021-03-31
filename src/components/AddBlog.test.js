import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import React from "react";
import AddBlog from "./AddBlog";

describe("<AddBlog/>", () => {
  test("Test event handler recieves right form data when new blog created", () => {
    const addBlog = jest.fn();

    const component = render(<AddBlog addBlog={addBlog} />);

    const titleInput = component.container.querySelector("#title");
    const authorInput = component.container.querySelector("#author");
    const form = component.container.querySelector("form");

    fireEvent.change(titleInput, {
      target: { value: "Title form testing" },
    });
    fireEvent.change(authorInput, { target: { value: "AuthorTest" } });

    fireEvent.submit(form);

    expect(addBlog.mock.calls).toHaveLength(1);
    expect(addBlog.mock.calls[0][0].content).toBe("Title form testing");
    expect(addBlog.mock.calls[0][1].content).toBe("AuthorTest");
  });
});
