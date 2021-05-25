import React, { useState } from 'react'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  if (!props.show) {
    return null
  }

  if (props.authorsResult.loading){
    return (
      <div>Loading...</div>
      )
  }
  const authors = props.authorsResult.data.allAuthors

  const submit = async (event) => {
    event.preventDefault()
    props.updateAuthor({ variables: { name: name, setBornTo: parseInt(born) } })

    setName('')
    setBorn('')
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
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <select value={name} onChange={({ target }) => setName(target.value)}>
          {authors.map(author => <option key={author.name} value={author.name}>{author.name}</option>)}
        </select>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>

    </div>
  )
}

export default Authors