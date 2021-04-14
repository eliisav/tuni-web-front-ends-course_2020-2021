
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

import { Blog, BlogForm } from './components'

// *** ENTER COMMIT SHA OF YOUR REPO IN HERE ***
const commitSHA = 'c000941d'

// *** DO NOT REMOVE OR CHANGE THIS LINE ***
describe(`\nCOMPONENT TESTS ${process.env.SOLUTION || 'your-solution'} [ ${commitSHA} ]\n`, () => {

  describe('Blog', () => {
    const blog = {
      title: "eka",
      author: "Ned",
      url: "http://host/1",
      likes: 1,
      userId: 1,
      id: 1,
      user: {id: 1, name: "Ned Flanders", username: "Ned"},
    }
    let component

    beforeEach(() => {
      component = render(
        <Blog blog={blog} updateLikes={() => console.log("test")} deleteBlog={() => console.log("test2")} currentUser="ned" />
      )
    })

    test('renders title and author correctly', () => {
      const div = component.container.querySelector('.visibleAtStart')
      expect(div).toHaveTextContent(
        `${blog.title} ${blog.author}`
      )
    })

    test('title and author are visible at the start', () => {
      const div = component.container.querySelector('.visibleAtStart')
      expect(div).not.toHaveStyle('display: none')
    })
    
    test('at start likes are hidden', () => {
      const div = component.getByText(`likes ${blog.likes}`, { exact: false })
      expect(div).toHaveStyle('display: none')
    })

    test('at start url is hidden', () => {
      const div = component.getByText(blog.url, { exact: false })
      expect(div).toHaveStyle('display: none')
    })

    test('clicking the button view makes likes visible', () => {
      const button = component.getByText('view')
      fireEvent.click(button)

      const div = component.getByText(`likes ${blog.likes}`, { exact: false })
      expect(div).not.toHaveStyle('display: none')
    })

    test('clicking the button "view" makes url visible', () => {
      const button = component.getByText('view')
      fireEvent.click(button)

      const div = component.getByText(blog.url, { exact: false })
      expect(div).not.toHaveStyle('display: none')
    })

    test('clicking the button "like" twice calls event handler twice', async () => {
      const mockHandler = jest.fn()
    
      const component2 = render(
        <Blog blog={blog} updateLikes={mockHandler} deleteBlog={() => console.log("test2")} currentUser="ned" />
      )
    
      const button = component2.container.querySelector('.likeButton')
      fireEvent.click(button)
      fireEvent.click(button)
    
      expect(mockHandler.mock.calls).toHaveLength(2)
    })

  })


  describe('BlogForm', () => {

    test('BlogForm calls the event handler it received as props with the right details when a new blog is created', () => {
      const createBlog = jest.fn()

      const component = render(
        <BlogForm createBlog={createBlog} />
      )

      const title = component.container.querySelector('#title')
      const author = component.container.querySelector('#author')
      const url = component.container.querySelector('#url')

      const form = component.container.querySelector('form')

      fireEvent.change(title, { 
        target: { value: 'Fourth' } 
      })
      fireEvent.change(author, { 
        target: { value: 'Marge' } 
      })
      fireEvent.change(url, { 
        target: { value: 'www.test' } 
      })
      fireEvent.submit(form)

      expect(createBlog.mock.calls).toHaveLength(1)
      expect(createBlog.mock.calls[0][0]["author"]).toBe("Marge")
      expect(createBlog.mock.calls[0][0]["title"]).toBe("Fourth")
      expect(createBlog.mock.calls[0][0]["url"]).toBe("www.test")
      expect(createBlog.mock.calls[0][0]["likes"]).toBe(0)
    })

  })

})