import React, { useState } from 'react'

export const Blog = ({blog}) => (
  <div>
    {blog.title} {blog.author}
  </div>  
)

export const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
  }) => {
  return (
    <form onSubmit={handleSubmit}>
    <div>
      username
        <input
        type="text"
        value={username}
        name="Username"
        onChange={handleUsernameChange}
      />
    </div>
    <div>
      password
        <input
        type="password"
        value={password}
        name="Password"
        onChange={handlePasswordChange}
      />
    </div>
    <button type="submit">login</button>
    </form>
  )
}

export const Button = ({handleClick}) => (
  <button onClick={handleClick} style={{margin: 3}} >
    logout
  </button>
)