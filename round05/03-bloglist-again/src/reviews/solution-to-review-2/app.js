import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from './reducer-notification'
import { initializeUsers } from './reducer-user'
import { initializeBlogs, createBlog } from './reducer-blog'
import { Switch, Route} from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { login } from './reducer-login'

import {
  Blog,
  BlogView,
  Notification,
  Togglable,
  BlogForm,
  Users,
  User,
  Navbar
} from './components'

import {
  blogService
} from './services'


export { default as store } from './store'

// *** ENTER COMMIT SHA OF YOUR REPO IN HERE ***
export const commitSHA = '481d66c';


export const App = () => {
  const dispatch = useDispatch()

  const blogFormRef = React.createRef()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const user = useSelector(state => state.loginUser)
  const blogs = useSelector(state => state.blogs)
  
  useEffect(() => {
    dispatch(initializeBlogs())

  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    blogService.setToken(user?.token)
  }, [user])


  /**
   * handleLogin
   * @param {*} event 
   */
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(login(username, password))
      setUsername('')
      setPassword('')

      dispatch(showNotification({ notification: `${username} logged in` }, 5))

    } catch (exception) {

      setUsername('')
      setPassword('')

      dispatch(showNotification({ error: 'wrong username or password' }, 5))

    }
  }

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      if (!blogObject.title || !blogObject.author || !blogObject.url) {
        dispatch(showNotification({ error: 'Please fill in all the fields' }, 5))
        return
      }

      dispatch(createBlog(blogObject, user))

      dispatch(
        showNotification(
          {
            notification: `A new blog ${blogObject.title} by ${blogObject.author} added`,
          },
          5,
        ),
      )
    } catch (err) {
      dispatch(
        showNotification(
          {
            error: `Blog could not be added ${err}`,
          },
          5,
        ),
      )
    }
  }


  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>

        <Notification />

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
    <Router>
      <div>
        <Navbar />
        <h2>blogs</h2>

        <Notification />

        <Switch>
          <Route path="/users/:id">
            <User />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/blogs/:id">
            <BlogView />
          </Route>
          <Route path="/blogs">
            <div>
              <Togglable buttonLabel='new blog' ref={blogFormRef}>
                <BlogForm createBlog={addBlog}/>
              </Togglable>
              {blogsToShow.map(blog =>
                <Blog
                  key={blog.id} blog={blog}
                />
              )}
            </div>
          </Route>
          <Route path="/">
            <div>
              <Togglable buttonLabel='new blog' ref={blogFormRef}>
                <BlogForm createBlog={addBlog}/>
              </Togglable>
              {blogsToShow.map(blog =>
                <Blog
                  key={blog.id} blog={blog}
                />
              )}
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}


