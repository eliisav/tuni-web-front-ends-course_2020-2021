import React, { useState, useEffect, useRef } from 'react'
import { MainWindow } from './components'
import blogService from './services'

// ------------------------------------------------------------ //
// ENTER COMMIT SHA OF YOUR REPO IN HERE                        //
// ------------------------------------------------------------ //
export const commitSHA = '2ba0c94'
// ------------------------------------------------------------ //


export const App = () =>
{
  const myAppName_User = 'loggedBloggingApp_User'
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogsFormRef = useRef()
  const notificationRef = useRef()

  const getNotificationHandlers = () =>
  {
    return notificationRef.current.messageHandlers
  }
  // Little helper for storing/retrieving user to/from local storage
  const locallyStoredUser =
  {
    save: function(o)
    {
      window.localStorage.setItem(myAppName_User, JSON.stringify(o))
    },
    retrieve: function()
    {
      const ret = window.localStorage.getItem(myAppName_User)
      return ret ? JSON.parse(ret) : null
    },
    remove: function()
    {
      window.localStorage.removeItem(myAppName_User)
    }
  }

  // Syncronizes user object data between state, service token and localstorage
  const syncUser = (usr) =>
  {
    if(usr)
    {
      setUser(usr)
      blogService.setToken(usr.token)
      locallyStoredUser.save(usr)
    }
    else
    {
      setUser(null)
      blogService.setToken(null)
      locallyStoredUser.remove()
    }
  }

  // Sorts blogs by likes, modifies passed array
  const sortBlogsByLikes = (blogs) =>
  {
    return blogs.sort(
      (a,b) =>
      {
        const likesA = a.likes || 0
        const likesB = b.likes || 0
        return likesB - likesA
      })
  }

  // Sorts and sets blogs state, making a copy of passed arary in process
  const sortAndSetBlogs = (blogs) =>
  {
    setBlogs(sortBlogsByLikes([...blogs]))
  }
  // Fetches blogs
  const fetchBlogs = async () =>
  {
    try
    {
      const blogs = await blogService.getAll()
      sortAndSetBlogs(blogs)
    }
    catch(error)
    {
      getNotificationHandlers().displayError('Could not fetch all blog list items')
    }
  }

  const handleLogin = async (event) =>
  {
    event.preventDefault()
    try
    {
      const usr = await blogService.login({ username, password })
      syncUser(usr)
      setUsername('')
      setPassword('')
      getNotificationHandlers().displayNotification(`Succesfully logged in as: ${usr.name}`)
    }
    catch(error)
    {
      getNotificationHandlers().displayError(`Could not login user ${username}`)
    }
  }

  const handleLogout = () =>
  {
    const loggedoutUserName = user ? user.name : ''
    syncUser(null)
    getNotificationHandlers().displayNotification(`Logged out user ${loggedoutUserName}`)
  }

  const handleCreateBlog = async (blog) =>
  {
    try
    {
      blog.checkValid()
      await blogService.postBlog(blog)
      await fetchBlogs()
      blogsFormRef.current.resetBlogFormModel()

      getNotificationHandlers().displayNotification(`a new blog ${blog.title} by ${blog.author} added`)
    }
    catch(error)
    {
      getNotificationHandlers().displayError(`Could not create blog entry for ${blog}`)
    }
  }

  const handleRemoveBlog = async (blog) =>
  {
    const blgz = blogs
    const blogInfo = `${blog.title} by ${blog.author}`
    if(window.confirm(`Remove blog ${blogInfo}?`))
    {
      let err = null
      try
      {
        await blogService.deleteBlog(blog)
      }
      catch(error)
      {
        err = error
      }
      finally
      {
        if(err)
        {
          getNotificationHandlers().displayError(`Could not delete blog ${blogInfo}!`)
        }
        else
        {
          getNotificationHandlers().displayNotification(`Deleted blog ${blogInfo}.`)
          const newBlogs = blgz.filter(
            (v) =>
            {
              return v.id !== blog.id
            })
          sortAndSetBlogs(newBlogs)
        }
      }
    }
  }

  const handleLikeBlog = async (blog) =>
  {
    // Some wierd react bullshit happens here:
    // If we try to call getNotificationHandlers() in catch (like we did above)
    // it returns null... It probably has something to do with
    // React being so bad with async functions and their contexts of exectutions
    // Neverheless, the "fix" is quite simple: scope everything we might need before
    // to function scope!

    let blgz = blogs
    let err = null
    try
    {
      await blogService.likeBlog(blog)
    }
    catch(error)
    {
      err = error
    }
    finally
    {
      if(err)
      {
        getNotificationHandlers().displayError(`Could not register like for blog ${blog.title}, try again later`)
      }
      else
      {
        sortAndSetBlogs(blgz) // Will handle copying of array internally
      }
    }
  }

  useEffect(() =>
  {
    fetchBlogs()
  }, [])

  useEffect(() =>
  {
    const user = locallyStoredUser.retrieve()
    if(user)
    {
      syncUser(user)
    }
  }, [])


  const loginFormProps =
  {
    username: username,
    password: password,
    onLoginSubmit: handleLogin,
    onUsernameChange: ({ target }) => setUsername(target.value),
    onPasswordChange: ({ target }) => setPassword(target.value)
  }

  const userFormProps =
  {
    user: user,
    onLogoutSubmit: handleLogout,
  }

  const blogFormProps =
  {
    onSubmit: handleCreateBlog,
    ref: blogsFormRef
  }

  const notificationProps =
  {
    ref: notificationRef
  }

  return (
    <div>
      <MainWindow
        user={user}
        blogs={blogs}
        onLike={handleLikeBlog}
        onRemove={handleRemoveBlog}

        notoficationProps={notificationProps}
        userFormProps={userFormProps}
        loginFormProps={loginFormProps}
        blogFormProps={blogFormProps}
      />
    </div>
  )
}
