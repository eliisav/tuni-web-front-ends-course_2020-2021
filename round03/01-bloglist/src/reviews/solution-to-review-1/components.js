import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

export const Notification = React.forwardRef((props, ref) =>
{
  const [ notificationMessage, setNotificationMessage ] = useState(null)
  const [ notificationType, setNotificationType ] = useState('')

  const messageHandlers =
  {
    displayMessage: function(msg, type, duration=5000)
    {
      setNotificationMessage(msg)
      setNotificationType(type)
      if(this.timerHandler)
      {
        clearTimeout(this.timerHandler)
        delete this.timerHandler
      }

      this.timerHandler =
      setTimeout(() =>
      {
        setNotificationMessage(null)
        delete this.timerHandler
      }, duration)
    },

    displayError: function(msg, duration=5000)
    {
      this.displayMessage(msg, 'error', duration)
    },

    displayNotification: function(msg, duration=5000)
    {
      this.displayMessage(msg, 'notification', duration)
    }
  }

  useImperativeHandle(ref, () => { return { messageHandlers } })

  let ret = null
  if(notificationMessage !== null)
  {
    const infoboxStyle =
    {
      background: 'lightgrey',
      fontSize: '20px',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px',
      color: notificationType === 'error' ? 'red' : 'green'
    }
    ret = (<div style={infoboxStyle}>{notificationMessage}</div>)
  }
  return ret
})
Notification.displayName = 'Notification'

export const Blog = ({ blog, onLike, onRemove, shotTitleAndAuthor = true }) =>
{
  const { title='', author='', url='', likes=0 } = blog
  return(
    <div>
      {shotTitleAndAuthor && `${title} ${author}`}
      <p>{url}</p>
      <p>
        likes {likes} <button onClick={() => onLike(blog)}>like</button>
      </p>
      { blog.user && blog.user.id === blog.userId && <button onClick={() => onRemove(blog)}>remove</button>}
    </div>)
}

export const Blogs = ({ blogs, onLike, onRemove }) =>
{
  const blogStyle =
  {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <div>
      <h2>blogs</h2>
      {
        blogs.map(
          blog =>
          {
            const { title='', author='', id } = blog
            return(
              <div style={blogStyle} key={id}>
                {title} {author}
                <Togglable buttonLabel="view" closeLabel="hide">
                  <Blog key={id} blog={blog} onLike={onLike} onRemove={onRemove} shotTitleAndAuthor={false} />
                </Togglable>
              </div>
            )
          }
        )
      }
    </div>)
}

export const BlogForm = React.forwardRef((props, ref) =>
{
  class Blog
  {
    constructor(title, author, url)
    {
      this.title = title
      this.author = author
      this.url = url
    }

    checkValid()
    {
      if(!(this.title && this.author && this.url))
      {
        throw Error('Invalid blog, missing title, author or url!')
      }
    }

    toString()
    {
      return JSON.stringify(this)
    }
  }

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const resetBlogFormModel = () =>
  {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const createBlog = async (e) =>
  {
    e.preventDefault()
    await props.onSubmit(new Blog(title, author, url))
  }

  useImperativeHandle(ref, () => { return { resetBlogFormModel } })

  return(
    <div>
      <h2>Create new</h2>
      <form onSubmit={createBlog}>
        <div>
  title: <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
  author: <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
  url:   <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>)

})

export const Togglable = ({ buttonLabel, closeLabel='cancel', children }) =>
{
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () =>
  {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>{closeLabel}</button>
      </div>
    </div>
  )
}
Togglable.propTypes=
{
  buttonLabel: PropTypes.string.isRequired
}

export const UserForm = ({ userFormProps, blogFormProps }) =>
{
  const { user, onLogoutSubmit } = userFormProps
  const { onSubmit, ref } = blogFormProps

  return(
    <div>
      {`${user.name} logged in `} <button type="submit" onClick={onLogoutSubmit}>logout</button>
      <Togglable buttonLabel="Add blog">
        <BlogForm onSubmit={onSubmit} ref={ref} />
      </Togglable>
    </div>)
}

export const UserSection = ({ user, userFormProps, loginFormProps, blogFormProps }) =>
{
  return user ? UserForm({ userFormProps, blogFormProps }) : LoginForm(loginFormProps)
}

export const LoginForm = ({ onLoginSubmit, username, password, onUsernameChange, onPasswordChange }) =>
{
  return(
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={onLoginSubmit}>
        <div>
username <input
            type="text"
            value={username}
            name="Username"
            onChange={onUsernameChange}
          />
        </div>
        <div>
password <input
            type="password"
            value={password}
            name="Password"
            onChange={onPasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>)
}
LoginForm.propTypes=
{
  onLoginSubmit    : PropTypes.func.isRequired,
  onUsernameChange : PropTypes.func.isRequired,
  onPasswordChange : PropTypes.func.isRequired,
  username : PropTypes.string.isRequired,
  password : PropTypes.string.isRequired
}

export const MainWindow = (props) =>
{
  return(
    <div>
      <Notification ref={props.notoficationProps.ref}  />
      { UserSection(props) } <br/>
      { props.user && Blogs(props) }
    </div>
  )
}