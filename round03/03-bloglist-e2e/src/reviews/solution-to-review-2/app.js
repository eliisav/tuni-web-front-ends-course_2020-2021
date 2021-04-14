import React, { useState, useEffect, useRef } from 'react'
import { Blog, User, Notification, LoginForm, BlogForm, Togglable } from './components'
import blogService from './services'

// ------------------------------------------------------------ //
// ENTER COMMIT SHA OF YOUR REPO IN HERE                        //
// ------------------------------------------------------------ //
export const commitSHA = '8a0524fe'
// ------------------------------------------------------------ //

export const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [ error, setError ] =useState(false)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    console.log('loggedUserJSON: ', loggedUserJSON)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      console.log('loggedIn user: ', user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await blogService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      console.log('käyttäjä:',user)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification('Wrong username or password')
      setError(true)
      setTimeout(() => {
        setNotification(null)
        setError(false)
      }, 5000)
    }
    console.log('user should be set to:', user)  }

  const handleLogout = async () => {
    window.localStorage.clear()
    setUser(null)
  }
  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNotification(`Added a new blog ${blogObject.title} by ${blogObject.author}`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
      .catch(error => {
        console.log('error: ', error)
        setNotification('not able to add new blog')
        setError(true)
        setTimeout(() => {
          setNotification(null)
          setError(false)
        }, 5000)
      })
  }
  const updateLikes = (blogObject) => {
    //console.log('Blogobject to be updated: ', blogObject.blog.id)
    const likedBlog = blogs.find(b => b.id === blogObject.blog.id)
    //console.log('likedBlog: ', likedBlog)
    //console.log('likedBlog.likes: ', likedBlog.likes)
    const updatedBlog = {
      ...likedBlog,
      likes: likedBlog.likes +1
    }
    blogService.update(updatedBlog.id, updatedBlog)
      .then (returnedBlog => {
        setBlogs(blogs.map(b => b.id !== likedBlog.id ? b : returnedBlog))
      })
  }
  const deleteBlog = (blog) => {

    if (window.confirm(`Remove blog ${blog.blog.title} by ${blog.blog.author}?`)){
      blogService.remove(blog.blog.id)
        .then(setBlogs(blogs.filter(b => b.id !== blog.blog.id)))
    }
  }



  const sortBlogs = (blogs) => {
    blogs.sort((a, b) => {return b.likes - a.likes})
  }

  return (
    <div>
      {notification === null ?
        <p></p>:
        <Notification
          notification={notification}
          error={error}>
        </Notification>
      }
      {user === null ?
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          handleUsetnameChange={({ target }) => setUsername(target.value)}
          password={password}
          handlePasswordChange={({ target }) => setPassword(target.value)}>
        </LoginForm>:
        <div>
          <User
            user={user}>
          </User>
          <button
            onClick={handleLogout}>
        logout
          </button>
          <Togglable
            buttonLabel="add new blog"
            ref={blogFormRef}>
            <BlogForm
              addBlog={addBlog}>
            </BlogForm>
          </Togglable>
          <h2>Blogs:</h2>
          {sortBlogs(blogs)}
          {blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              handleLikes={updateLikes}
              handleDeletion={deleteBlog}
              user={user} />
          )}
        </div>
      }
    </div>
  )
}
