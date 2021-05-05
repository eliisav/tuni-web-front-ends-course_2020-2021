
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams, useHistory
} from "react-router-dom"

import {
  Blog,
  Blogs,
  Notification,
  Togglable,
  BlogForm,
  Users,
  User
} from './components'

import {
  blogService,
  loginService
} from './services'

import { setNotification } from './reducer-notification'

import { 
  initializeBlogs, 
  createBlog, 
  likeBlog, 
  deleteBlog 
} from './reducer-blog'

import { setUser, removeUser } from './reducer-login'
import { initializeUsers } from './reducer-user'

export { default as store } from './store'

// *** ENTER COMMIT SHA OF YOUR REPO IN HERE ***
export const commitSHA = '-commit-sha-in-here-';


export const App = () => {
  const blogFormRef = React.createRef()

  const loggedInUser = useSelector(state => state.loginUser)
  const allUsers = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }, [])


  /**
   * handleLogin
   * @param {*} event 
   */
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      dispatch(setUser(user))
      setUsername('')
      setPassword('')

      dispatch(setNotification({ text: `${user.username} logged in` }))

    } catch (exception) {

      setUsername('')
      setPassword('')
      dispatch(setNotification({ error: true, text: 'wrong username or password' }))
    }
  }


  /**
   * handleLogout
   */
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(removeUser())
  }


  /**
   * addBlog
   * @param {*} param0 
   */
  const addBlog = ({ newTitle, newAuthor, newUrl }) => {
    blogFormRef.current.toggleVisibility()

    const newBlog = {
      title: newTitle, 
      author: newAuthor, 
      url: newUrl,
      likes: 0,
      comments: []
    }

    dispatch(createBlog(newBlog))
    dispatch(setNotification({ text: `blog "${newTitle}" added` }))
    //dispatch(setNotification({ text: error.response.data.error, error: true }))
  }





  /*
   * Login form
   */

  if (loggedInUser === null) {
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

  /*
   * Bloglist
   */
  return (
    <Router>
      <h2>blogs</h2>

      <Notification />

      <p>
        {loggedInUser.name} logged in &nbsp;
      <button type="button" onClick={handleLogout}>logout</button>
      </p>

      <Switch>
        <Route path="/users/:id">
          <User users={allUsers} />
        </Route>

        <Route path="/users">
          <Users users={allUsers} />
        </Route>

        <Route path="/blogs/:id">
          <Blog blogs={blogs} user={loggedInUser} />
        </Route>
        
        <Route path="/">
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm addBlog={addBlog} />
          </Togglable>

          <br />
          
          <Blogs blogs={blogs}/>
          
        </Route>
      </Switch>

    </Router>
  )
}
