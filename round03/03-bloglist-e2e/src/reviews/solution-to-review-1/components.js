import React, { useState } from 'react'
import blogService from './services'
import PropTypes from 'prop-types'

export const Blog = ({ blog, onLike, onDelete }) => {
  const [view, setView] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return view ? (
    <div style={blogStyle}>
      <div>
        {blog.title}
        <button
          onClick={() => setView(false)}
        >
          hide
        </button>
      </div>
      <div>{blog.url}</div>
      <div data-testid={`Blog_${blog.id}_likesTxt`}>
        likes {blog.likes === undefined ? 0 : blog.likes}
        <button
          data-testid={`Blog_${blog.id}_likeButton`}
          onClick={() => onLike()}
        >
          like
        </button>
      </div>
      <div>{blog.author}</div>
      <button data-testid={`Blog_${blog.id}_deleteButton`} onClick={() => onDelete()}>remove</button>
    </div>
  ) : (
    <div style={blogStyle}>
      {blog.title} {blog.author}{' '}
      <button data-testid={`Blog_${blog.id}_viewButton`} onClick={() => setView(true)}>view</button>
    </div>
  )
}

export const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  setUser,
  setMessage,
}) => {
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await blogService.login({
        username: username,
        password: password,
      })
      setUser(user.data)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setUser(null)
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  return (
    <form data-testid="Login_form" onSubmit={handleLogin}>
      <h2>Log in to application</h2>
      <div>
        username
        <input
          data-testid="Login_username"
          type="text"
          value={username}
          style={{ marginLeft: 10 }}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          data-testid="Login_password"
          type="password"
          value={password}
          style={{ marginTop: 10, marginLeft: 13, marginBottom: 10 }}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button data-testid="Login_submitButton" type="submit">
        login
      </button>
    </form>
  )
}

export const BlogForm = ({
  title,
  author,
  url,
  user,
  blogs,
  setTitle,
  setAuthor,
  setUrl,
  setMessage,
  setBlogs,
  setView,
}) => {
  const addNote = async (event) => {
    event.preventDefault()
    try {
      const blog = await blogService.postBlog(
        { title: title, author: author, url: url, likes: 0 },
        user.token
      )
      console.log(blog)
      setBlogs([...blogs, blog.data])
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage(`${blog.data.title} was added`)
    } catch (exception) {
      setMessage('Error occured in adding a blog')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  return (
    <form onSubmit={addNote}>
      <h2>create new blog</h2>
      <div>
        title:
        <input
          data-testid="BlogForm_title"
          type="text"
          value={title}
          style={{ marginLeft: 10, marginBottom: 10 }}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          data-testid="BlogForm_author"
          type="text"
          value={author}
          style={{ marginLeft: 10, marginBottom: 10 }}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          data-testid="BlogForm_url"
          type="text"
          value={url}
          style={{ marginLeft: 10, marginBottom: 10 }}
          name="Author"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button data-testid="BlogForm_submitButton" type="submit">
        create
      </button>
      <button data-testid="BlogForm_cancel" onClick={() => setView(false)}>cancel</button>
    </form>
  )
}

BlogForm.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  blogs: PropTypes.object.isRequired,
  setTitle: PropTypes.func.isRequired,
  setAuthor: PropTypes.func.isRequired,
  setUrl: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  setBlogs: PropTypes.func.isRequired,
  setView: PropTypes.func.isRequired,
}
