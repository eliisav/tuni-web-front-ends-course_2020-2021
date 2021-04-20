import React from 'react'
import { useSelector, useDispatch, connect } from 'react-redux'
import { createAnecdote, voteAnecdote } from './anecdoteReducer'
import { showMessage} from './notificationReducer'
import { setFilter } from './filterReducer'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={props.notification === '' ? null : style}>
      {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

export const ConnectedNotification = connect(mapStateToProps)(Notification)

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(anecdote)
    props.showMessage(`you created '${anecdote}'`, 5)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createAnecdote,
  showMessage,
}

export const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({filter, anecdotes}) => {
    return anecdotes.filter(
      a => a.content.toLowerCase().includes(filter.toLowerCase())
  )})
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(showMessage(`you voted '${anecdote.content}'`, 5))
  }

  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
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

const Filter = (props) => {
  const handleChange = (event) => {
    props.setFilter(event.target.value)
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

export const ConnectedFilter = connect(null, { setFilter })(Filter)
