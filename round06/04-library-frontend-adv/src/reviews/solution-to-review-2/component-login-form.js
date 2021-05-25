import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from './gql'

export const LOCAL_STORAGE_TOKEN = "library-user-token"

const LoginForm = ({ onLoggedIn, show }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [updateAuthor] = useMutation(LOGIN)

  const submit = async (event) => {
    event.preventDefault()

    try {
      const response = await updateAuthor({ variables: { username, password }})
      localStorage.setItem(LOCAL_STORAGE_TOKEN, response.data.login.value)
      onLoggedIn()

      setUsername('')
      setPassword('')
    } catch (e) {
      console.error("Login failed, use the crendentials {username: ned, password: secret}")
    }
  }

  if (!show) return null

  return (
    <div>

      <h2>login</h2>

      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm
