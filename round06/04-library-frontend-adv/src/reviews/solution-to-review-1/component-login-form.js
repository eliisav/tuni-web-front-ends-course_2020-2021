
import React, { useState } from 'react'
// import { LOGIN } from './gql'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  if (!props.show) {
    return null
}

  const submit = async (event) => {
    event.preventDefault()
    console.log(username)
    console.log(password)
    const result = await props.login({
      variables: { username, password }
    })
    console.log(result)
    if (result) {
      const token = result.data.login.value
      props.setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }

  return (
    <div>
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
