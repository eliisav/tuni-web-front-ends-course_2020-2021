
import React, {useState, useEffect} from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, CURRENT_USER } from './gql'

const Recommend = ({ show }) => {
  const resultBooks = useQuery(ALL_BOOKS)
  const resultUser = useQuery(CURRENT_USER, {
    pollInterval: 500
  })

  const [filter, setFilter] = useState(null)

  useEffect(() => {
    if ( resultUser.data && resultUser.data.me) {
      console.log('current user', resultUser.data.me)
      setFilter(resultUser.data.me.favoriteGenre)
    } else {
      setFilter(null)
    }
  }, [resultUser.data])

  if (!show || !resultBooks.data || !resultUser.data) {
    return null
  }

  const books = resultBooks.data.allBooks

  const genreHeading = { display: filter ? '' : 'none' }

  const booksToShow =
    filter
      ? books.filter(book => book.genres.includes(filter))
      : books

  return (
    <div>
      <h2>books</h2>

      <div style={genreHeading}>
        books in your favorite genre <b>{filter}</b>
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
    </div>
  )
}

export default Recommend
