import React, { useState } from 'react'
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { ALL_AUTHORS, EDIT_AUTHOR } from './gql'

const Authors = (props) => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')
    const result = useQuery(ALL_AUTHORS, {
        pollInterval: 2000
    })

    const [ editAuthor ] = useMutation(EDIT_AUTHOR)

    if (result.loading)  {
        return <div>loading...</div>
    }

    if (!props.show) {
        return null
    }
    const authors = result.data.allAuthors

    const submit = async (event) => {
        event.preventDefault()
        editAuthor({  variables: { name, born } })

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
            <label>
            name
            <select value={name} onChange={({ target }) => setName(target.value)}>
                {authors.map(a =>
                    <option value={a.name}>{a.name}</option>
                )}
            </select>
            </label>
            <div>
            born
            <input
                value={born}
                onChange={({ target }) => setBorn(parseInt(target.value))}
            />
            </div>
            <button type='submit'>update author</button>
        </form>
  
      </div>
    )
}

export default Authors