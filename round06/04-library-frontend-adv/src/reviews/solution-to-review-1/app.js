
import React, { useState } from 'react'

import Authors from './component-authors'
import Books from './component-books'
import NewBook from './component-new-book'
import RecommendedBooks from './component-recommended'
import LoginForm from './component-login-form'

import { useQuery, useMutation, useApolloClient, useSubscription } from "@apollo/client"
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK, EDIT_AUTHOR, LOGIN, GET_USER, BOOK_ADDED } from "./gql" 

// ** enter commit sha of your repository in here **
export const commitSHA = 'b04aa23';


export const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const books = useQuery(ALL_BOOKS)
  const authors = useQuery(ALL_AUTHORS)
  const user = useQuery(GET_USER)
  
  const handleError = (error) => {
    //window.alert(`${error} added`);
    console.log(error)
  }

  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  const [login] = useMutation(LOGIN, {
    onError: handleError,
    refetchQueries: [{ query: GET_USER }]
  })
  
  const includedIn = (set, object) =>
    set.map(p => p.title).includes(object.title)

  const updateCacheWith = (addedBook) => {
    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      dataInStore.allBooks.push(addedBook)
      client.writeQuery({
        query: ALL_BOOKS,
        data: dataInStore
      })
    }
  }
  
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log('SUB CALLED')
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })

  const [addBook] = useMutation(CREATE_BOOK, {
    onError: handleError,
    update: (store, response) => {
      let dataInStore = store.readQuery({ query: ALL_BOOKS })
      if (!includedIn(dataInStore.allBooks, response.data.addBook)) {
        //dataInStore.allBooks.push(response.data.addBook)
        dataInStore = dataInStore.allBooks.concat(response.data.addBook)
      }
      store.writeQuery({
        query: ALL_BOOKS,
        data: dataInStore
      })
    }
  })

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    onError: handleError,
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>

        <Authors
          show={page === 'authors'} result={authors} editAuthor={editAuthor} token={token}
        />

        <Books
          show={page === 'books'} result={books}
        />

        <LoginForm
          show={page === 'login'} login={login} setToken={(token) => setToken(token)}
        />

      </div>
    )
  }


  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('recommendedBooks')}>recommended</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => logout()}>logout</button>
      </div>

      <Authors
        show={page === 'authors'} result={authors} editAuthor={editAuthor}
      />

      <Books
        show={page === 'books'} result={books}
      />

      <RecommendedBooks
        show={page === 'recommendedBooks'} result={books} user={user.data.me}
      />

      <NewBook
        show={page === 'add'} addBook={addBook}
      />

    </div>
  )
}
