import React, { useState, useEffect } from 'react'
import { Blog, LoginForm, BlogForm } from './components'
import blogService from './services'

// ------------------------------------------------------------ //
// ENTER COMMIT SHA OF YOUR REPO IN HERE                        //
// ------------------------------------------------------------ //
export const commitSHA = '9a30a09'
// ------------------------------------------------------------ //

export const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [view, setView] = useState(false)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  const sortedBlogs = [...blogs].sort(function (a, b) {
    return b.likes - a.likes
  })

  return (
    <div>
      {user === null ? (
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          setUser={setUser}
          setMessage={setMessage}
        />
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {user.username} logged-in{' '}
            <button onClick={() => setUser(null)}>logout</button>
          </p>
          {view ? (
            <BlogForm
              title={title}
              author={author}
              url={url}
              user={user}
              blogs={blogs}
              setTitle={setTitle}
              setAuthor={setAuthor}
              setUrl={setUrl}
              setMessage={setMessage}
              setBlogs={setBlogs}
              setView={setView}
            />
          ) : (
            <div data-testid='App_blogs'>
              <button data-testid='App_showBlogFormBtn' onClick={() => setView(true)}>new note</button>
              {sortedBlogs.map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  user={user}
                  onLike={() => {
                    blogService.likeBlog(
                      { ...blog, likes: blog.likes + 1 },
                      blog.id
                    )
                    setBlogs(
                      blogs.map((item) => {
                        if (item.id === blog.id) {
                          return { ...item, likes: item.likes + 1 }
                        } else {
                          return item
                        }
                      })
                    )
                  }}
                  onDelete={() => {
                    blogService.deleteBlog(blog.id, user.token)
                    setBlogs(blogs.filter((item) => item.id !== blog.id))
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}
      <div>{message}</div>
    </div>
  )
}
