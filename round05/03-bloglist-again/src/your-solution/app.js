import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  BrowserRouter as Router,
  Switch, Route
} from "react-router-dom"

import {
  Blog,
  Blogs,
  LoginForm,
  Menu,
  Notification,
  Togglable,
  BlogForm,
  Users,
  User
} from './components'

import { blogService } from './services'

import { setNotification } from './reducer-notification'
import { initializeBlogs, createBlog } from './reducer-blog'
import { initializeUsers } from './reducer-user'
import { initializeLogin } from './reducer-login'

export { default as store } from './store'

// *** ENTER COMMIT SHA OF YOUR REPO IN HERE ***
export const commitSHA = '-commit-sha-in-here-';


export const App = () => {
  const blogFormRef = React.createRef()

  const loggedInUser = useSelector(state => state.loginUser)
  const allUsers = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeLogin())
  }, [dispatch])


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

        <LoginForm  />
      </div>
    )
  }

  /*
   * Bloglist
   */
  return (
    <Router>
      <Menu user={loggedInUser}/>

      <h2>blog app</h2>

      <Notification />

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
