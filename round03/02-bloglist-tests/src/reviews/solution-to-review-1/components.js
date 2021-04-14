import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

export const Blog = ({ blog, updateLikes, deleteBlog, currentUser }) => {
  const [blogVisible, setBlogVisible] = useState(false)
  const [currentLikes, setCurrentLikes] = useState(blog.likes)
  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }
  const showDeleteButton = { display: currentUser.toString() === blog.user.username.toString() ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const updateBlog = () => {
    const blogObject = {
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: currentLikes + 1,
      user: blog.user
    }

    setCurrentLikes(currentLikes + 1)
    updateLikes(blog.id, blogObject)
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} className='visibleAtStart'>
        {blog.title} {blog.author} <button onClick={() => setBlogVisible(true)}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author} <button onClick={() => setBlogVisible(false)}>hide</button> <br/>
        {blog.url} <br/>
        likes {currentLikes} <button onClick={updateBlog} className='likeButton'>like</button><br/>
        {blog.user.name} <br/>
        <button style={showDeleteButton} onClick={removeBlog}>delete</button>
      </div>
    </div>
  )
}

export const Notification = ({ message, errorMsg }) => {
  // Inline CSS styles for errors and notifications.
  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message === null && errorMsg === null) {
    return null
  }
  // If there is an error message.
  else if (errorMsg !== null) {
    return (
      <div style={errorStyle}>
        {errorMsg}
      </div>
    )
  }
  // If there is notification.
  else {
    return (
      <div style={notificationStyle}>
        {message}
      </div>
    )
  }
}

export const LoginForm = ({ handleLogin, username, password, setUsername, setPassword }) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

// Prop types from LoginForm.
LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

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

Togglable.displayName = 'Togglable'

export const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      author: author,
      title: title,
      url: url,
      likes: 0,
    }

    createBlog(blogObject)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
            id="title"
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
            id="author"
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
            id="url"
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}