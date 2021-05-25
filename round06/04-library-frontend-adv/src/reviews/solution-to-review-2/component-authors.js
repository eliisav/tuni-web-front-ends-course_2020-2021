import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ALL_AUTHORS, UPDATE_AUTHOR } from './gql'

const Authors = (props) => {
  // Stage 1
  const authors = useQuery(ALL_AUTHORS)

  // Stage 1: loading
  if (!props.show || authors.loading) {
    return null
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
          {/* Stage 1 */}
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <BirthYearUpdate authors={authors} />
    </div>
  )
}

// Stage 4
const BirthYearUpdate = ({ authors }) => {
  const [name, setName] = useState("")
  const [born, setBorn] = useState("")
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, { 
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const handleSubmit = (event) => {
    event.preventDefault()

    updateAuthor({ variables: { name, setBornTo: parseInt(born) }})

    setName("")
    setBorn("")
  }
  
  useEffect(() => {
    if (name === "" && authors.data.allAuthors && authors.data.allAuthors.length > 0) {
      setName(authors.data.allAuthors[0].name)
    }
  }, [authors.data])

  return (
    <form onSubmit={handleSubmit}>
      <h3>Set birthyear</h3>
      {/* Stage 5 */}
      <label>
        name
        <select value={name} onChange={(event) => setName(event.target.value)}>
          {
            authors.data.allAuthors.map(author => (
                <option key={author.name} value={author.name}>{author.name}</option>
              )
            )
          }
        </select>
      </label>
      <br />
      <label>
        born
        <input type="number" value={born} onChange={(event) => setBorn(event.target.value)}/>
      </label>
      <br />
      <button>update author</button>
    </form>
  )
}

export default Authors