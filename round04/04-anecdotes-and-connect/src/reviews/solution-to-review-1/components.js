
import React from 'react'
import { useSelector, useDispatch, connect } from 'react-redux'
import { voteAnecdote, createAnecdote } from './anecdoteReducer'
import { setNotification } from './notificationReducer'
import { setFilter } from './filterReducer'

const Notification = ({ message }) => {
  if (!message)
    return null;

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {message}
    </div>
  )
}
export const ConnectedNotification = connect((state) => ({ message: state.notification.message }))(Notification)

const AnecdoteForm = ({ createAnecdote, setNotification }) => {
  const addAnecdote = async (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    await createAnecdote(content)
    setNotification(`you created a new anecdote '${content}'`, 5)
  }
  
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
    </div>
  )
}
export const ConnectedAnecdoteForm = connect(null, { createAnecdote, setNotification })(AnecdoteForm)

export const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) =>
    anecdotes
      .filter((anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
      .sort((a, b) => b.votes - a.votes)
  )
  const dispatch = useDispatch()

  const vote = async (anecdote) => {
    await dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const Filter = ({ setFilter }) => {
  const handleChange = (event) => {
    setFilter(event.target.value)
  }
  const style = {
    margin: '10px 0'
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}
export const ConnectedFilter = connect(null, { setFilter })(Filter)
