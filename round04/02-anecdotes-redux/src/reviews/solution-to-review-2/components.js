import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getId, voteAction } from './anecdoteReducer'
import { filterAction } from './filterReducer'
import { notificationAction, clearNotificationAction } from './notificationReducer'

export const Notification = () => {
  const message = useSelector(state => state.notification)

  if (!message) {
    return null
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }
  return (
    <div style={style}>
      {message}
    </div>
  )
}

export const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    if (state.filter) {
      return state.anecdotes.filter(
        anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      )
    }

    return state.anecdotes
  })

  const vote = (id, content) => {
    dispatch(voteAction(id))
    dispatch(notificationAction(`you voted '${content}'`))
    setTimeout(() => {
      dispatch(clearNotificationAction())
    }, 5000);
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
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch({
      type: 'NEW_ANECDOTE',
      data: {
        content,
        id: getId()
      }
    })
    dispatch(notificationAction(`new anecdote created: '${content}'`))
    setTimeout(() => {
      dispatch(clearNotificationAction())
    }, 5000);
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export const Filter = () => {
  const dispatch = useDispatch()

  const filterChange = (event) => {
    dispatch(filterAction(event.target.value))
  }

  const style = {
    marginBottom: 10
  }


  return (
    <div style={style}>
      filter <input onChange={filterChange} />
    </div>
  )
}
