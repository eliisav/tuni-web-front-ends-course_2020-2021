
import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from './reducer-login'
import { NavLink, useHistory, useRouteMatch } from 'react-router-dom'
import { likeBlog, removeBlog, createComment } from './reducer-blog'
import { showNotification } from './reducer-notification'

// 
// Blog
// 
export const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle}>
      <Link
        to={`/blogs/${blog.id}`}
      >
        <div>
          {blog.title} {blog.author}
        </div>
      </Link>
    </div>
  )
}

//
// BlogView
//
export const BlogView = () => {

  const [comment, setComment] = useState('')

  const blogs = useSelector(state => state.blogs)

  const dispatch = useDispatch()
  const history = useHistory()

  const match = useRouteMatch('/blogs/:id')

  const blog = match ? blogs.find((blog) => blog.id == match.params.id) : null
  
  /**
   * likeBlog
   */
  const addLike = async () => {
    try {
      const { id, author, url, title } = blog
      const updatedBlog = {
        user: blog.user?.id || blog.user,
        likes: blog.likes + 1,
        title,
        author,
        url,
      }

      dispatch(likeBlog(id, updatedBlog))
    } catch (err) {
      console.error(err)
      dispatch(
        showNotification(
          {
            error: `No nooo! ${err}`,
          },
          5,
        ),
      )
    }
  }

  const deleteBlog = async (id, blog) => {
    try {
      if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {

        dispatch(removeBlog(id))
        history.push(`/blogs`)
        dispatch(
          showNotification(
            {
              notification: `Successfully removed ${blog.title} by ${blog.author}`,
            },
            5,
          ),
        )
      }
    } catch (err) {
      console.error(err)
      dispatch(showNotification({ error: `No nooo! ${err}` }, 5))
    }
  }

  const handleComment = (e) => {
    e.preventDefault()
    dispatch(createComment(blog.id, comment))
  }

  const handleChange = (e) => {
    setComment(e.target.value)
  }

  if (!blog) {
    return null
  }

  return (

    <div>
      <div >
        <a href={blog.url}>{blog.url}</a> <br />
        {/* likes  0 <button>like</button> <br /> */}
        {blog.likes} likes <button onClick={addLike}>like</button> <br />
        {blog.user ? `added by ${blog.user.name}` : ''} <br />

        <button
          onClick={() => deleteBlog(blog.id, blog)}
        >
          remove
        </button>
        <h3>comments</h3>
        <form onSubmit={handleComment}>
          <input type="text" value={comment} onChange={handleChange}></input>
          <button type="submit">add comment</button>
        </form>
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment}>{comment}</li>
          ))}
        </ul>
      </div>

    </div>
  )

}

// 
// Notification
// 

export const Notification = () => {
  const message = useSelector(state => state.notification)
  if (!message || (!message.notification && !message.error)) return null

  const style = {
    color: message && message.error ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={style}>{message?.notification ? message?.notification : message?.error}</div>
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

export const BlogForm = ({createBlog}) => {

  const [title, setNewTitle] = useState('')
  const [author, setNewAuthor] = useState('')
  const [url, setNewUrl] = useState('')

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
    
    const blog = {
      title,
      author,
      url,
      likes: 0,
      comments: []
    }
    createBlog(blog)
    console.log(blog)
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h3>new blog</h3>

      <form onSubmit={handleSubmit}>

        <div>
          title: <input
            value={title}
            onChange={handleTitleChange}
          />
        </div>

        <div>
          author: <input
            value={author}
            onChange={handleAuthorChange}
          />
        </div>

        <div>
          url: <input
            value={url}
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

export const Users = () => {
  const users = useSelector(state => state.users)

  return (
    
      <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>
              <b>Blogs created</b>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.username}>
                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                <td>{user.blogs.length}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
    
  )
}

export const User = () => {
  const users = useSelector(state => state.users)

  const match = useRouteMatch('/users/:id')
  const user = match ? users.find((user) => user.id == match.params.id) : null

  if (!user) {
    return null
  }
  return (
    <>
      <h2>{user.name}</h2>
      <h2 >Added blogs</h2>
      {user.blogs.length === 0 ? (
        <p>No blogs added yet.</p>
      ) : (
        <ul>
          {user.blogs?.map((blog) => (
            <li key={blog.id}>
              {blog.title}
            </li>
          ))}
        </ul>
      )}
    </>
  )

}

export const Navbar = () => {
  const user = useSelector(state => state.loginUser)

  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(logout())
    history.push('/')
  }

  if (user) {
    return (
      <nav style={{ backgroundColor: "grey", display: "flex", justifyContent: "space-between" }}>
        <ul style={{ display: "flex", alignItems: "center", listStyleType: "none" }}>
          <li style={{ marginRight: "15px" }}>
            <NavLink
              to={`/blogs`}
            >
              blogs
            </NavLink>
          </li>
          <li style={{ marginRight: "15px" }}>
            <NavLink
              to={`/users`}
            >
              users
            </NavLink>
          </li>
          <li style={{ marginRight: "15px" }}>
            <span>{user?.name} logged in</span>
          </li>
          <li style={{ marginRight: "15px" }}>
            <button
              onClick={handleLogout}
              type="button"
            >
              Logout
            </button>
          </li>
        </ul>

      </nav>
    )
  } else {
    return (
      <nav>
        <button
          onClick={handleLogout}
          type="button"
        >
          Login
        </button>
      </nav>
    )
  }
}