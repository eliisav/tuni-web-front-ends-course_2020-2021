
import React, { useState } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './component-authors'
import Books from './component-books'
import NewBook from './component-new-book'
import LoginForm from './component-login-form'
import Recommend from './component-recommend'

// ** enter commit sha of your repository in here **
export const commitSHA = '';


export const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token
          ? <button onClick={() => setPage('add')}>add book</button>
          : null
        }
        {token
          ? <button onClick={() => setPage('recommend')}>recommend</button>
          : null
        }
        {token
          ? <button onClick={logout}>logout</button>
          : <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <Authors
        show={page === 'authors'}
        token={token}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommend
        show={page === 'recommend'}
      />

      <LoginForm
        show={page === 'login'}
        setPage={setPage}
        setToken={setToken}
      />

    </div>
  )
}
