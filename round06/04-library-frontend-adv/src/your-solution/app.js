
import React, { useState } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'
import Authors from './component-authors'
import Books from './component-books'
import NewBook from './component-new-book'
import LoginForm from './component-login-form'
import Recommend from './component-recommend'
import { ALL_BOOKS, BOOK_ADDED } from './gql'

// ** enter commit sha of your repository in here **
export const commitSHA = '183f3d4';


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

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const bookData = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(bookData.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : bookData.allBooks.concat(addedBook) }
      })
    }

    // Authors should be updated too...
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const newBook = subscriptionData.data.bookAdded
      window.alert(`New book ${newBook.title} added!`)
      updateCacheWith(newBook)
    }
  })

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
