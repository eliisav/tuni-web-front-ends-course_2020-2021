import React, { useState } from 'react'


const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  if (!props.show) {
    return null
  }

  if (props.result.loading) {
    return <div>loading...</div>
  }

  const authors = props.result.data.allAuthors
  
  const handleChange = (event) => {
    setName(event.target.value)
  }

  const submit = async (e) => {
    e.preventDefault()

    await props.editAuthor({ variables: { name, "born": parseInt(born)} })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>Authors</h2>
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
      {props.token !== null ? (
        <div><h2>Set Birthyear</h2>
          <form onSubmit={submit}>
            <div>
              select author:
          <select value={name} onChange={handleChange}>
                {authors.map(a =>
                  <option value={a.name}>{a.name}</option>
                )}
              </select>
            </div>
            born
          <input
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
            <br />
            <button type='submit'>update author</button>
          </form>
        </div>) : (null)
      }
    </div>
  )
}

export default Authors