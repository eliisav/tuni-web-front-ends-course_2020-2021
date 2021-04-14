import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleDelete,  user }) => {
  const [ visible, setVisible ] = useState(false)

  let deleteVisible = true

  if (user.username !== blog.user.username) {
    deleteVisible = false
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showWhenVisible = {
    display: visible ? 'flex' : 'none',
    flexDirection: 'column'
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const increaseLikes = () => {
    handleLike(blog)
  }

  const deletePost = () => {
    handleDelete(blog)
  }

  return (
    <div style={blogStyle} >
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility} >{visible ? 'hide' : 'view'}</button>
      </div>
      <div style={showWhenVisible} >
        <div>
          {blog.url}
        </div>
        <div>
          likes {blog.likes}
          <button onClick={increaseLikes} >like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
        <div style={{ display: deleteVisible ? '' : 'none' }} >
          <button onClick={deletePost} >delete</button>
        </div>
      </div>
    </div>
  )
}

const BlogForm = ({ createPost }) => {
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setUrl ] = useState('')

  const submit = e => {
    e.preventDefault()
    createPost({
      title,
      author,
      url,
      likes: 0
    })
  }

  const handleTitleChange = e => {
    e.preventDefault()
    setTitle(e.target.value)
  }

  const handleAuthorChange = e => {
    e.preventDefault()
    setAuthor(e.target.value)
  }

  const handleUrlChange = e => {
    e.preventDefault()
    setUrl(e.target.value)
  }

  return (
    <form onSubmit={submit} >
      <div>
        title:
        <input
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        author:
        <input
          value={author}
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        url:
        <input
          value={url}
          onChange={handleUrlChange}
        />
      </div>
      <button type="submit" >create</button>
    </form>
  )
}

const LoginForm = ({ handleLogin }) => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const login = e => {
    e.preventDefault()
    handleLogin([username, password])
  }

  return (
    <form onSubmit={login}>
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
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  } else {
    return (
      <div className={message.type} >
        {message.message}
      </div>
    )
  }
}

const Togglable = React.forwardRef((props, ref) => {
  const [ visible, setVisible ] = useState(false)

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
      <div style={hideWhenVisible} >
        <button onClick={toggleVisibility} >{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} >
        {props.children}
        <button onClick={toggleVisibility} >cancel</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Toggleable'

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

BlogForm.propTypes = {
  createPost: PropTypes.func.isRequired
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

Notification.propTypes = {
  message: PropTypes.object
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export {
  Blog,
  BlogForm,
  LoginForm,
  Notification,
  Togglable
}
