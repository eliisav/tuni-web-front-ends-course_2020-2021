import React, { useState, useEffect, useRef } from 'react'
import { Blog, LoginForm, Togglable, BlogForm, Notification, Button} from './components'
import blogService from './services'

// ------------------------------------------------------------ //
// ENTER COMMIT SHA OF YOUR REPO IN HERE                        //
// ------------------------------------------------------------ //
export const commitSHA = '-commit-sha-in-here-';
// ------------------------------------------------------------ //


export const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const notification = (type, text) => {
    setMessage({
      type: type,
      text: text
    })
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const newLogin = await blogService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(newLogin)
      )
      blogService.setToken(newLogin.token)
      setUser(newLogin)
      setUsername('')
      setPassword('')
      notification(
        'success',
        `user '${newLogin.username}' logged in`
      )
    } catch (exception) {
      notification(
        'error',
        `wrong username or password`
      )
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    notification(
      'success',
      `user '${user.username}' logged out`
    )
  }

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      notification(
        'success',
        `a new blog ${newBlog.title} by ${newBlog.author} added`
      )
    } catch (exeption) {
      notification(
        'error',
        `failed to create new blog`
      )
    }
  }

  const updateBlogLikes = (blogToUpdate) => {
    const updatedBlog = {...blogToUpdate, likes: blogToUpdate.likes + 1}
    blogService
      .update(updatedBlog.id, updatedBlog).then(returnedBlog => {
        setBlogs(blogs.map(blog => 
          blog.id !== returnedBlog.id ? blog : returnedBlog))
        notification(
          'success',
          `You liked ${returnedBlog.title}`
        )
      })
      .catch(error => {
        notification(
          'error',
          `Information of ${blogToUpdate.title} has already been removed from server`
        )
        setBlogs(blogs.filter(blog => blog.id !== blogToUpdate.id))
      })
  }

  const deleteBlog = (blogToDelete) => {
    if ( window.confirm(
      `Remove blog ${blogToDelete.title} by ${blogToDelete.author}`
    ) ) {
      blogService
        .remove(blogToDelete.id).then(response => {
          setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id))
          notification(
            'success',
            `Deleted ${blogToDelete.title}`
          )
        })
        .catch(error => {
          notification(
            'error',
            `Information of ${blogToDelete.title} had already been deleted from server`
          )
          setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id))
        })
    }
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>

        <Notification message={message} />

        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={message} />

      <p>
        {user.name} logged in 
        <Button handleClick={handleLogout} text="logout"/>
      </p>

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog}/>
      </Togglable>

      {sortedBlogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLikeClick={updateBlogLikes}
          handleDelete={deleteBlog}
          user={user}
        />
      )}
    </div>
  )
}
