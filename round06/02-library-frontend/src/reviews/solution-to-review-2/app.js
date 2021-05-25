
import React, { useState } from 'react'

import Authors from './component-authors'
import Books from './component-books'
import NewBook from './component-new-book'

import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, ADD_BOOK, UPDATE_AUTHOR } from './gql'
// ** enter commit sha of your repository in here **
export const commitSHA = 'e52feaf9';


export const App = () => {
  const [page, setPage] = useState('authors')

  const authorsResult = useQuery(ALL_AUTHORS)
  const booksResult = useQuery(ALL_BOOKS)
  const [addBook] = useMutation(ADD_BOOK)
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'} authorsResult={authorsResult} updateAuthor={updateAuthor}
      />

      <Books
        show={page === 'books'} booksResult={booksResult}
      />

      <NewBook
        show={page === 'add'} addBook={addBook}
      />

    </div>
  )
}
