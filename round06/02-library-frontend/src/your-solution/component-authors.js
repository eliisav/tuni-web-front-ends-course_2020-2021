import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_AUTHOR } from './gql'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  const [ updateAuthor ] = useMutation(UPDATE_AUTHOR)

  useEffect(() => {
    if ( result.data && result.data.allAuthors.length > 0) {
      setName(result.data.allAuthors[0].name)
    }
  }, [result.data])

  if (!props.show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  const submit = async (event) => {
    event.preventDefault()

    if (year !== '') {
      const born = parseInt(year)
      updateAuthor({  variables: { name, born } })
    }

    setName('')
    setYear('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map(a =>
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            )}
          </select>
        </div>
        <div>
          born
          <input
            type='number'
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors