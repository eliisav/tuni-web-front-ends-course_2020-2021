import React, { useState, useImperativeHandle } from 'react'
import blogService from './services'
import PropTypes from 'prop-types'

export const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  Togglable.displayName = props.buttonLabel

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
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

function removeMsgAfterThreeSec(setNotificationMsg) {
  setTimeout(() => {
    setNotificationMsg({ message: null, success: null })
  }, 5000)
}

export const Notification = (props) => {
  const notificationMsg = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
  }

  if (props.notificationMsg.message === null) {
    return null
  }

  if (props.notificationMsg.success === true) {
    notificationMsg.color = 'green'
  }

  removeMsgAfterThreeSec(props.setNotificationMsg)

  return <div style={notificationMsg}>{props.notificationMsg.message}</div>
}

export const CreateBlog = ({
  blogs,
  setBlogs,
  setNotificationMsg,
  toggleVisibility,
  handleNewBlogCreate
}) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
    likes: 0,
  })

  const handleNewBlog = async (event) => {
    event.preventDefault()
    handleNewBlogCreate(newBlog)
  }

  return (
    <div>
      <h1>new blog</h1>
      <form onSubmit={handleNewBlog}>
        <div>
          title
          <input
            type="text"
            name="Title"
            value={newBlog.title}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, title: target.value })
            }
          />
        </div>
        <div>
          author
          <input
            type="text"
            name="Author"
            value={newBlog.author}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, author: target.value })
            }
          />
        </div>
        <div>
          url
          <input
            type="text"
            name="Url"
            value={newBlog.url}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, url: target.value })
            }
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export const LoggedInUser = ({ name, setUser, setNotificationMsg }) => {
  const logOut = () => {
    window.localStorage.removeItem('loggedInUser')
    blogService.setToken(null)
    setUser(null)
    setNotificationMsg({ message: 'Loggin out succeeded!', success: true })
  }

  const loggedInUserStyles = {
    paddingBottom: 15,
  }

  return (
    <div style={loggedInUserStyles}>
      <p>
        <strong>
          {name} logged in <button onClick={logOut}>logout</button>
        </strong>
      </p>
    </div>
  )
}

export const Blog = ({ blog, getAll, loggedInUsername, likeButtonHandler }) => {
  const [showBlogInfo, setShowBlogInfo] = useState(false)

  const blogStyle = {
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 5,
  }

  const linkButton = {
    background: 'none',
    border: 'none',
    fontWeight: 'bold',
    fontSize: '1rem',
  }

  async function deleteBlogPost() {
    const result = window.confirm(
      `Remove blog ${blog.title} by ${blog.author} ?`
    )
    if (result) {
      await blogService.deleteBlogPost(blog)
      getAll()
    }
  }

  if (showBlogInfo === true) {
    return (
      <div className='blogPost' style={blogStyle} key={blog.id}>
        <button style={linkButton} onClick={() => setShowBlogInfo(false)}>
          {blog.title} {blog.author}
        </button>
        <button onClick={() => setShowBlogInfo(false)}>hide</button>
        <p>{blog.url}</p>
        <p key={blog.likes} style={{ display: 'inline-block' }}>
          likes {blog.likes}
        </p>
        <button onClick={likeButtonHandler}>like</button>
        <p>{blog.user.name}</p>
        {blog.user.username === loggedInUsername && (
          <button onClick={deleteBlogPost}>remove</button>
        )}
      </div>
    )
  }

  return (
    <div className='blogPost' key={blog.id} style={blogStyle}>
      <button style={linkButton} onClick={() => setShowBlogInfo(true)}>
        {blog.title} {blog.author}
      </button>
      <button onClick={() => setShowBlogInfo(true)}>view</button>
    </div>
  )
}

export const LoginForm = ({
  username,
  password,
  setUsername,
  setPassword,
  setUser,
  setNotificationMsg,
}) => {
  LoginForm.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
    setNotificationMsg: PropTypes.func.isRequired,
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await blogService.login({ username, password })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
      setNotificationMsg({ message: 'Loggin in succeeded!', success: true })
    } catch (exception) {
      setNotificationMsg({
        message: 'Wrong username or password!',
        success: false,
      })
    }
  }

  return (
    <>
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
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  )
}
