import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

export const Blog = ({ blog, handleLikeClick, user, handleDelete }) => {
  const [showAll, setShowAll] = useState(false)

  const toggleAll = { display: showAll ? '' : 'none' }
  const buttonLabel = showAll ? 'hide' : 'view'

  const removeButton = () => {
    if (user.username === blog.user.username) {
      return (
        <Button
          handleClick={() => handleDelete(blog)}
          text="remove"
        />
      )
    } else {
      return null
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  //console.log(blog)

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <Button
          handleClick={() => setShowAll(!showAll)}
          text={buttonLabel}
        />
      </div>
      <div style={toggleAll} className="togglableContent">
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <Button
            handleClick={() => handleLikeClick(blog)}
            text="like"
          />
        </div>
        <div>{blog.user.name}</div>
        {removeButton()}
      </div>
    </div>
  )
}

export const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export const Button = ({ handleClick, text }) => (
  <button onClick={handleClick} style={{ margin: 3 }} >
    {text}
  </button>
)

export const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
      likes: 0
    })
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
            id='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id='url'
            type="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const msgStyle = {
    color: message.type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={msgStyle}>
      {message.text}
    </div>
  )
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

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}
