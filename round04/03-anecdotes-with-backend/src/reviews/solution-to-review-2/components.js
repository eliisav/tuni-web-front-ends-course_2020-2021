
import React, { Fragment, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { addAnecdote, updateAnecdote } from './anecdoteReducer'
import { setFilter } from './filterReducer'
import { setNotification } from './notificationReducer'

export const Notification = () => {
  const notification = useSelector(state => state.notification)
  const { message } = notification

  if(!message)
    return null

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

export const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNewAnecdote = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    if(!anecdote)
      return

    dispatch(addAnecdote({
      content: anecdote,
      votes: 0
    }))
    dispatch(setNotification(`You added an anecdote ${anecdote}`, 10))
  }

  return (
    <Fragment>
      <h2>create new</h2>
      <form onSubmit={addNewAnecdote}>
        <div>
          <input type="text" name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </Fragment>
  )
}

export const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  const vote = (id) => {
    const anecdote = anecdotes.find(a => a.id === id)
    dispatch(updateAnecdote({
      ...anecdote,
      votes: anecdote.votes + 1
    }))
    dispatch(setNotification(`You voted '${anecdotes.find(a => a.id === id).content}'`, 3))
  }

  const displayedAnecdotes = useMemo(
    () => (filter)
      ? anecdotes.filter(anecdote => anecdote.content
        .toLowerCase()
        .includes(filter.toLowerCase()))
      : anecdotes,
    [anecdotes, filter]
  )
  
  return (
    <Fragment>
      <Filter />
      {displayedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    dispatch(setFilter(event.target.value))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}
