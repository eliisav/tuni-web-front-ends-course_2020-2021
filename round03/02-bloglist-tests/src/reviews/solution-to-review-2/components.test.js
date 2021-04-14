import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";

import { Blog, CreateBlog } from "./components";

// *** ENTER COMMIT SHA OF YOUR REPO IN HERE ***
const commitSHA = "34959d2";

// *** DO NOT REMOVE OR CHANGE THIS LINE ***
describe(`\nCOMPONENT TESTS ${
  process.env.SOLUTION || "your-solution"
} [ ${commitSHA} ]\n`, () => {
  test("Renders blog", () => {
    const blog = {
      title: "Title here",
      author: "Author here",
      url: "http://blogpage.com",
      likes: 13,
      userId: 1,
    };

    const component = render(<Blog blog={blog} />);

    expect(component.container).toHaveTextContent("Title here Author here");

    expect(component.container).not.toHaveTextContent("13");

    expect(component.container).not.toHaveTextContent("http://blogpage.com");
  });

  test("Renders all blog info and clicks show button", () => {
    const blog = {
      title: "Title here",
      author: "Author here",
      url: "http://blogpage.com",
      likes: 13,
      userId: 1,
      user: {
        name: "Ned Flanders",
      },
    };

    const component = render(<Blog blog={blog} />);

    const button = component.getByText("view");
    fireEvent.click(button);

    expect(component.container).toHaveTextContent("Title here Author here");

    expect(component.container).toHaveTextContent("13");

    expect(component.container).toHaveTextContent("http://blogpage.com");
  });

  test("Clicks 2 times like and check that handler is called 2 times", () => {
    const blog = {
      title: "Title here",
      author: "Author here",
      url: "http://blogpage.com",
      likes: 13,
      userId: 1,
      user: {
        name: "Ned Flanders",
      },
    };

    const mockHandler = jest.fn();

    const component = render(
      <Blog blog={blog} likeButtonHandler={mockHandler} />
    );

    const viewButton = component.getByText("view");
    fireEvent.click(viewButton);

    const likeButton = component.getByText("like");
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });

  test("Test blog creation", () => {
    const handleNewBlogCreate = jest.fn();

    const component = render(
      <CreateBlog blogs={[]} handleNewBlogCreate={handleNewBlogCreate} />
    );

    const titleInput = component.container.querySelector("input[name='Title']");
    const authorInput = component.container.querySelector("input[name='Author']");
    const urlInput = component.container.querySelector("input[name='Url']");
    const form = component.container.querySelector("form");

    fireEvent.change(titleInput, {
      target: { value: 'Here is a title setted up by the test' }
    })
    fireEvent.change(authorInput, {
      target: { value: 'Ron Howardson' }
    })
    fireEvent.change(urlInput, {
      target: { value: 'http://blogpage.com' }
    })

    fireEvent.submit(form)
    expect(handleNewBlogCreate.mock.calls).toHaveLength(1)
    expect(handleNewBlogCreate.mock.calls[0][0].title).toBe('Here is a title setted up by the test')
    expect(handleNewBlogCreate.mock.calls[0][0].author).toBe('Ron Howardson')
    expect(handleNewBlogCreate.mock.calls[0][0].url).toBe('http://blogpage.com')
  });
});
