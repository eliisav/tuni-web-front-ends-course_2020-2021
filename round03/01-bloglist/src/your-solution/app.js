import React, { useState, useEffect } from 'react'
import { Blog, LoginForm, Button } from './components'
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

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const newLogin = await blogService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(newLogin)
      ) 
      setUser(newLogin)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('eerrrroooor')
      //setErrorMessage('wrong credentials')
      //setTimeout(() => {
      //  setErrorMessage(null)
      //}, 5000)
    }
  }

  const handleClick = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
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
      <p>{user.name} logged in <Button handleClick={handleClick} /></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}
