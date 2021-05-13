import React, { useState, useEffect } from 'react'
import {
  Blog,
  Notification,
  Togglable,
  BlogForm
} from './components'
import {
  blogService,
  loginService
} from './services'

export { default as store } from './store'

// *** ENTER COMMIT SHA OF YOUR REPO IN HERE ***
export const commitSHA = 'ceb4888';

//Main app for the applicaiton. Uses redux to store current state of the application
//and uses reducers to manipulate current data.
export const App = () => {
  const blogFormRef = React.createRef()
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')

      setNotification({ text: `${user.name} logged in` })

    } catch (exception) {

      setUsername('')
      setPassword('')

      setNotification({ error: true, text: 'wrong username or password' })
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const addBlog = ({ newTitle, newAuthor, newUrl }) => {

    blogFormRef.current.toggleVisibility()

    blogService
      .create({ title: newTitle, author: newAuthor, url: newUrl })
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNotification({ text: `blog "${returnedBlog.title}" added` })
      })
      .catch(error => {
        console.log('error', error)
        setNotification({ text: error.response.data.error, error: true })
      })
  }

  const updateBlog = (blog) =>
    blogService
      .update(blog.id, blog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id === returnedBlog.id ? returnedBlog : blog).sort((a, b) => (b.likes - a.likes)))
      })
      .catch(error => {
        setNotification({ text: error.response.data.error, error: true })
      })

  const removeBlog = (id) => {

    const blogToDelete = blogs.find(blog => blog.id === id)

    if (!window.confirm(`Remove blog "${blogToDelete.title}" by ${blogToDelete.author}`)) {
      return
    }

    blogService
      .remove(id)
      .then(() => {
        setBlogs(blogs.filter(blog => blog.id !== id))
        setNotification({ text: `blog "${blogToDelete.title}" deleted` })
      })
      .catch(error => {
        setNotification({ text: error.response.data.error, error: true })
      })
  }

  //changing the front page look according users login status
  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification
          msg={notification}
          setMessage={setNotification}
        />
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

  const blogsToShow = blogs.sort((a, b) => (b.likes - a.likes))

  return (
    <div>
      <h2>blogs</h2>
      <Notification
        msg={notification}
        setMessage={setNotification}
      />
      <p>
        {user.name} logged in &nbsp;
      <button type="button" onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>
      <br />
      {blogsToShow.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          removeBlog={removeBlog}
          user={user}
        />
      )}
    </div>
  )
}

