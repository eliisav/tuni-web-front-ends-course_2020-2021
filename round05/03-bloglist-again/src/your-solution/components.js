import React, { useState, useImperativeHandle } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { Link, useHistory, useParams } from "react-router-dom"

import { setNotification } from './reducer-notification'
import { likeBlog, deleteBlog } from './reducer-blog'
import { logUserIn, logUserOut } from './reducer-login'


// 
// Blogs
//

export const Blogs = ({blogs}) => {
  if (!blogs) {
    return null
  }

  const blogsToShow = blogs.sort((a, b) => (b.likes - a.likes))

  const listStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      {blogsToShow.map(blog =>
        <div key={blog.id} style={listStyle}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title}
          </Link>
          -
          <em>
            {blog.author}
          </em>
        </div>
      )}
    </div>
  )
}

export const Blog = ({ blogs, user }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const id = useParams().id

  const blog = blogs.find(b => b.id === Number(id))

  if (!blog) {
    return null
  }

  const removeVisibility = { 
    display: user && blog.user.username === user.username ? '' : 'none' 
  }

  /**
   * likeBlog
   */
  const like = () => {
    blog.likes += 1
    dispatch(likeBlog(blog))
  }

  /**
   * removeBlog
   */
  const removeBlog = () => {
    if (!window.confirm(`Remove blog "${blog.title}" by ${blog.author}`)) {
      return
    }
    
    dispatch(deleteBlog(blog.id))
    dispatch(setNotification({ text: `blog "${blog.title}" deleted` }))

    history.push('/')
  }

  return (
    <div>
      <h2>{blog.title}</h2>

      <a href={blog.url}>{blog.url}</a> <br />
      {blog.likes} likes <button onClick={like}>like</button> <br />
      {blog.user ? `added by ${blog.user.name}` : ''} <br />

      <button
        onClick={() => removeBlog(blog.id)}
        style={removeVisibility}
      >
        remove
      </button>

      <h3>comments</h3>
      <ul>
        {blog.comments.map(comment =>
            <li key={comment}>{comment}</li>
          )}
      </ul>

    </div>
  )
}


// 
// Login
//

export const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  //const history = useHistory()

  /**
   * handleLogin
   * @param {*} event
   */
  const handleLogin = (event) => {
    event.preventDefault()

    dispatch(logUserIn({username, password}))

    setUsername('')
    setPassword('')

    //history.push('/')
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>username &nbsp;
        <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>password &nbsp;
        <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div>
          <button type="submit">login</button>
        </div>
      </form>

    </div>
  )
}


// 
// Menu
// 

export const Menu = ({user}) => {
  const dispatch = useDispatch()

  const menuStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    background: 'lightgrey',
    marginTop: 5,
    marginBottom: 5
  }
  const padding = {
    paddingRight: 8
  }

  /**
   * handleLogout
   */
  const handleLogout = () => {
    dispatch(logUserOut())
  }

  return (
    <div style={menuStyle}>
      <Link style={padding} to="/">blogs</Link>
      <Link style={padding} to="/users">users</Link>
      {user.name} logged in &nbsp;
      <button type="button" onClick={handleLogout}>
        logout
      </button>
    </div>
  )
}


// 
// Notification
// 

export const Notification = () => {
  const msg = useSelector(state => state.notification)

  if (msg === null) {
    return null
  }

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


//
// Users
// 

export const User = ({users}) => {
  const id = useParams().id

  if (!users) {
    return null
  }

  const user = users.find(u => u.id === Number(id))

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export const Users = ({users}) => {
  if (!users) {
    return null
  }

  const usersToShow = users.sort((a, b) => (
    b.blogs.length - a.blogs.length
  ))

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th><th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {usersToShow.map(user =>
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>
                {user.blogs.length}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
