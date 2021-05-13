
import React, { useState } from 'react'

import Authors from './component-authors'
import Books from './component-books'
import NewBook from './component-new-book'

// ** enter commit sha of your repository in here **
export const commitSHA = '-commit-sha-in-here-';


export const App = () => {
  const [page, setPage] = useState('authors')

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

    </div>
  )
}
