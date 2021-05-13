
import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

// 
// Blog
// 

export const Blog = ({ blog, updateBlog, removeBlog, user }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const showWhenVisible = {
    display: visible ? 'block' : 'none'
  }
  const removeVisibility = { 
    display: user && blog.user.username === user.username ? '' : 'none' 
  }


  /**
   * toggleVisibility
   */
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  /**
   * likeBlog
   */
  const likeBlog = () => {
    blog.likes += 1
    updateBlog(blog)
  }


  return (

    <div style={blogStyle} >

      <div>
        {blog.title} - <em>{blog.author}</em>
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>

      </div>

      <div style={showWhenVisible}>
        <a href={blog.url}>{blog.url}</a> <br />
        {/* likes  0 <button>like</button> <br /> */}
        {blog.likes} likes <button onClick={likeBlog}>like</button> <br />
        {blog.user ? `added by ${blog.user.name}` : ''} <br />

        <button
          onClick={() => removeBlog(blog.id)}
          style={removeVisibility}
        >
          remove
        </button>

      </div>

    </div>
  )

}



// 
// Notification
// 

export const Notification = ({ msg, setMessage }) => {

  if (msg === null) {
    return null
  }

  setTimeout(() => {
    setMessage(null)
  }, msg && msg.error ? 5000 : 3000)

  const style = {
    color: msg && msg.error ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={style}>{msg.text}</div>
  )
}

//
// Togglable
//

export const Togglable = React.forwardRef((props, ref) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>

      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>

      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>

    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

//
// BlogForm
// 

export const BlogForm = ({ addBlog }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value)
  }
  const handleAuthorChange = (e) => {
    setNewAuthor(e.target.value)
  }
  const handleUrlChange = (e) => {
    setNewUrl(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    addBlog({ newTitle, newAuthor, newUrl })
  }

  return (
    <div>
      <h3>new blog</h3>

      <form onSubmit={handleSubmit}>

        <div>
          title: <input
            value={newTitle}
            onChange={handleTitleChange}
          />
        </div>

        <div>
          author: <input
            value={newAuthor}
            onChange={handleAuthorChange}
          />
        </div>

        <div>
          url: <input
            value={newUrl}
            onChange={handleUrlChange}
          />
        </div>

        <div>
          <button type="submit">create</button>
        </div>

      </form>

    </div>
  )
}

