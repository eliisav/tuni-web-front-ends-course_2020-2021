import React, { useState, useImperativeHandle } from 'react'
import './app.css'
import PropTypes from 'prop-types'

export const Blog = ({ blog, handleLikes, handleDeletion, user }) => {
  const [showBlogDetails, setShowBlogDetails] = useState(false)

  const switchShowBlogDetails = () => {
    setShowBlogDetails((currentstate) => !currentstate)
  }

  const showWhenVisible = { display : showBlogDetails ? '': 'none' }

  const increaseLikes = (event) => {
    event.preventDefault()
    handleLikes({ blog })
  }

  const deleteBlog = (event) => {
    event.preventDefault()
    handleDeletion({ blog })
  }

  const addedByUser = blog.author === user.name

  return (
    <div
      className = {showBlogDetails ? 'blogStyle': ''}>
      <p>
        Title: {blog.title} Author: {blog.author}
        <button
          onClick={switchShowBlogDetails}>
          {showBlogDetails ? 'Hide' : 'Show' }
        </button>
      </p>
      <div
        style={showWhenVisible}>
        <p>
          URL: {blog.url}
        </p>
        <p>
          Likes:  {blog.likes} <button onClick={increaseLikes}>Like</button>
        </p>
        <p>
          {addedByUser ? <button onClick={deleteBlog}>Delete blog</button> : ''}
        </p>
      </div>
    </div>
  )
}

export const User = ({ user }) => (
  <div>
    <p> {user.name} logged-in </p>
  </div>
)

export const Notification = ({ notification, error }) => (
  <div
    className = {error ?  'error': 'success'}>
    {notification}
  </div>
)

export const LoginForm = ({
  handleLogin,
  username,
  handleUsetnameChange,
  password,
  handlePasswordChange
}) => {
  return (
    <form onSubmit={handleLogin}>
      <h2>Create new blog</h2>
      <div>
        username
        <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={handleUsetnameChange}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )

}
LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsetnameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}


export const BlogForm = ({ addBlog }) => {
  const [newTitle, setNewTitle] =useState('')
  const [newAuthor, setNewAuthor] =useState('')
  const [newUrl, setNewUrl] =useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addNewBlog = (event) => {
    event.preventDefault()
    addBlog({
      title:newTitle,
      author:newAuthor,
      url:newUrl,
      likes:0
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>Create a new Blog</h2>
      <form onSubmit={addNewBlog}>

     Title:
        <input
          id='title'
          type="text"
          value={newTitle}
          name="Username"
          onChange={handleTitleChange}>
        </input>
     Author:
        <input
        id='author'
          type="text"
          value={newAuthor}
          name="Author"
          onChange={handleAuthorChange}>
        </input>
     Url:
        <input
        id='url'
          type="text"
          value={newUrl}
          name="Url"
          onChange={handleUrlChange}>
        </input>

        <button id='addBlog' type="submit">Create</button>
      </form>
    </div>
  )

}
export const Togglable = React.forwardRef((props, ref)  => {
  Togglable.displayName = 'Togglable'

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
