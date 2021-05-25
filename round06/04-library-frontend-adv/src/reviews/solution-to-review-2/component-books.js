
import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { ALL_BOOKS } from './gql'

const Books = ({ show, favoriteGenre }) => {
  // Stage 8
  const [genre, setGenre] = useState("all")

  // Stage 2
  const books = useQuery(ALL_BOOKS)

  const handleGenreSelected = (event) => {
    setGenre(event.target.dataset.genre)
  }

  // Stage 2: loading
  if (!show || books.loading) {
    return null
  }

  // Stage 8: need a listing of genres
  const genresCollected = []
  const filteredBooks = books.data.allBooks.filter(book => {
    // Stage 9
    if (favoriteGenre) {
      return book.genres.includes(favoriteGenre)
    }

    for (const bookGenre of book.genres) {
      if (!genresCollected.includes(bookGenre)) {
        genresCollected.push(bookGenre)
      }
    }
    if (genre === "all") {
      return true
    }
    return book.genres.includes(genre)
  })

  return (
    <div>
      
      {favoriteGenre ? (
        <>
          <h2>recommendations</h2>
          <p>books in your favorite genre <strong>{favoriteGenre}</strong></p>
        </>
      ) : (
        <>
          <h2>books</h2>
          <p>in genre <strong>{genre}</strong></p>
        </>
      )}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {/* Stage 2*/}
          {filteredBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>

      <GenreSelect genres={genresCollected} onSelect={handleGenreSelected}/>
    </div>
  )
}

const GenreSelect = ({ genres, onSelect }) => {
  return (
    <div>
      {genres.map(genre => <button key={genre} onClick={onSelect} data-genre={genre}>{genre}</button>)}
    </div>
  )
}

export default Books