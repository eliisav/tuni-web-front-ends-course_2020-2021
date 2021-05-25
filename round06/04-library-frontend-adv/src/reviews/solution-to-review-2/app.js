
import React, { useEffect, useState } from 'react'

import Authors from './component-authors'
import Books from './component-books'
import NewBook from './component-new-book'
import LoginForm, { LOCAL_STORAGE_TOKEN } from './component-login-form'
import { useQuery, useSubscription } from '@apollo/client'
import { BOOK_ADDED, ME } from "./gql"

// ** enter commit sha of your repository in here **
export const commitSHA = '60d7e38';


export const App = () => {
  const [page, setPage] = useState('authors')
  // I couldn't invalidate "me" so I put user variable, it seems that the data in me query remains after log out...
  const [user, setUser] = useState() 
  const me = useQuery(ME)
  
  // Stage 10
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: (response) => {
      const bookAdded = response.subscriptionData.data.bookAdded
      window.alert(`Book added subscription received: ${bookAdded.title} by ${bookAdded.author}`)
    } 
  })

  // Stage 6
  const handleLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN)
    setUser(null)
  }

  const handleLoggedIn = () => {
    me.refetch().then(() => setPage("authors"))
  }

  useEffect(() => {
    setUser(me.data)
  }, [me.data])

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {/* Stage 6 */}
        {
          user ? (
            <>
              <button onClick={() => setPage("add")}>add book</button>
              {/* Stage 9 */}
              <button onClick={() => setPage("recommend")}>recommend</button>
              <button onClick={handleLogout}>logout</button>
            </>
          ) : (<button onClick={() => setPage("login")}>login</button>)
        }
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      {/* Stage 9*/}
      {user && <Books
        show={page === "recommend"}
        favoriteGenre={user.me.favoriteGenre}
      />}

      <NewBook
        show={page === 'add'}
      />

      {/* Stage 6 */}
      <LoginForm
        show={page === "login"}
        onLoggedIn={handleLoggedIn}
      />

    </div>
  )
}
