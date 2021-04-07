
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

import { Blog, BlogForm } from './components'

// *** ENTER COMMIT SHA OF YOUR REPO IN HERE ***
const commitSHA = 'commit-sha-in-here'

// *** DO NOT REMOVE OR CHANGE THIS LINE ***
describe(`\nCOMPONENT TESTS ${process.env.SOLUTION || 'your-solution'} [ ${commitSHA} ]\n`, () => {


  describe('Blog', () => {
    const user = {
      name: 'Ned Flanders',
      username: 'ned'
    }

    const blog = {
      title: 'Easter Story',
      author: 'Ned',
      url: 'http://host/1',
      likes: 1,
      user: {name: 'Ned Flanders', username: 'ned'}
    }

    const mockHandler = jest.fn()

    let component

    beforeEach(() => {
      component = render(
        <Blog blog={blog} user={user} handleLikeClick={mockHandler}/>
      )
    })

    test('renders title and author', () => {
      const element = component.getByText('Easter Story Ned')
      expect(element).toBeDefined()
    })

    test('the url and likes are not displayed by default', () => {
      const div = component.container.querySelector('.togglableContent')
  
      expect(div).toHaveStyle('display: none')
    })

    test('after clicking the button, url and likes are displayed', () => {
      const button = component.getByText('view')
      fireEvent.click(button)
  
      const div = component.container.querySelector('.togglableContent')
      expect(div).not.toHaveStyle('display: none')
    })

    test('clicking "like" twice calls event handler twice', () => {
      const button = component.getByText('like')
      fireEvent.click(button)
      fireEvent.click(button)
    
      expect(mockHandler.mock.calls).toHaveLength(2)
    })

  })


  describe('BlogForm', () => {

    test('the form calls the event handler with the correct details', () => {
      const createBlog = jest.fn()
    
      const component = render(
        <BlogForm createBlog={createBlog} />
      )
    
      const form = component.container.querySelector('form')
      const title = component.container.querySelector('#title')
      const author = component.container.querySelector('#author')
      const url = component.container.querySelector('#url')
        
      fireEvent.change(title, { 
        target: { value: 'Easter Story'}
      })
      fireEvent.change(author, { 
        target: { value: 'Ned'}
      })
      fireEvent.change(url, { 
        target: { value: 'http://host/1'}
      })

      fireEvent.submit(form)
    
      expect(createBlog.mock.calls).toHaveLength(1)
      expect(createBlog.mock.calls[0][0].title).toBe('Easter Story')
      expect(createBlog.mock.calls[0][0].author).toBe('Ned')
      expect(createBlog.mock.calls[0][0].url).toBe('http://host/1')

    })

  })

})
