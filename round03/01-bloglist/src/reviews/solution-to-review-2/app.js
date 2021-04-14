import React, { useState, useEffect, useRef } from 'react'

import './styles.css'

import { Blog, BlogForm, Notification, Togglable, LoginForm } from './components'
import blogService from './services/blogServices'
import loginService from './services/loginServices'

// ------------------------------------------------------------ //
// ENTER COMMIT SHA OF YOUR REPO IN HERE                        //
// ------------------------------------------------------------ //
export const commitSHA = '81618ad'
// ------------------------------------------------------------ //


export const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ user, setUser ] = useState(null)
  const [ notification, setNotification ] = useState(null)

  const blogFormRef = useRef()

  const compare = (a,b) => {
    if (parseInt(a.likes) > parseInt(b.likes)) return -1
    if (parseInt(a.likes) < parseInt(b.likes)) return 1
    return 0
  }

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort(compare)
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const createNewPost = newPost => {
    blogFormRef.current.toggleVisibility()
    if (user) {
      blogService.create(newPost)
        .then(blog => {
          setNotification({ message: `a new blog ${newPost.title} by ${newPost.author} added`, type: 'success' })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          blogs.sort(compare)
          setBlogs([...blogs, blog])
        })
    }
  }

  const handleLike = blog => {
    let likes = parseInt(blog.likes) + 1
    likes = likes.toString()

    const newObject = { ...blog, likes: likes }
    blogService.update(blog.id, newObject)
      .then(blog => {
        const newBlogs = blogs.map(b => b.id !== blog.id ? b : blog)
        newBlogs.sort(compare)
        setBlogs(newBlogs)
      })
  }

  const handleDelete = blog => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService.deletePost(blog.id)
        .then(() => {
          const newBlogs = blogs.filter(b => b.id !== blog.id)
          newBlogs.sort(compare)
          setBlogs(newBlogs)
        })
    }
  }

  const handleLogin = async credentials => {
    const [ username, password ] = credentials
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      setUser(user)
    } catch (error) {
      setNotification({ message: 'wrong username or password', type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = e => {
    e.preventDefault()
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <Notification message={notification} />
        <LoginForm handleLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={notification} />

      <p>
        {user.name} is logged in <button onClick={handleLogout} >logout</button>
      </p>
      <h2>create new</h2>
      <Togglable buttonLabel="new note" ref={blogFormRef} >
        <BlogForm
          createPost={createNewPost}
        />
      </Togglable>
      <div>
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            handleDelete={handleDelete}
            user={user}
          />
        )}
      </div>
    </div>
  )
}
