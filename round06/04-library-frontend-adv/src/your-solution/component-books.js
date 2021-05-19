
import React, {useState} from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from './gql'

const Books = ({ show }) => {
  const result = useQuery(ALL_BOOKS)
  const [filter, setFilter] = useState(null)

  if (!show || !result.data) {
    return null
  }

  const books = result.data.allBooks

  const setGenre = (genre) => {
    console.log('selected', genre)
    setFilter(genre)
  }

  const genreButtons = () => {
    const availableGenres = books.reduce((genres, book) => {
      book.genres.forEach(genre => {
        if (!genres.includes(genre)) {
          genres.push(genre)
        }
      });
      return genres
    }, [])

    const buttons = availableGenres.map(genre =>
      <button key={genre} onClick={() => setGenre(genre)}>
        {genre}
      </button>
    )

    return buttons.concat(
      <button key='all genres' onClick={() => setFilter(null)}>
        all genres
      </button>
    )
  }

  const genreHeading = { display: filter ? '' : 'none' }

  const booksToShow =
    filter
      ? books.filter(book => book.genres.includes(filter))
      : books

  return (
    <div>
      <h2>books</h2>

      <div style={genreHeading}>
        in genre <b>{filter}</b>
      </div>

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
          {booksToShow.map(b =>
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genreButtons()}
    </div>
  )
}

export default Books
