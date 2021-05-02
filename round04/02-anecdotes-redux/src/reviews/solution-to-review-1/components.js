
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteLike, addAnecdote } from './anecdoteReducer'
import { showNotification, cleanNotification } from './notificationReducer'
import { updateFilter } from './filterReducer'


export const Notification = () => 
{
  const notification = useSelector(({ notification }) => notification.text )
  
  const style = 
  {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  
  return (
    <div>
      {
        notification ? (<div style={style}>
          {notification}
        </div>) : (<div></div>)
      }
    </div>
  )
}
// Helper to avoid setting timeouts etc every call
Notification.showFor = (dispatcher, message, seconds = 5) =>
{
  dispatcher(showNotification(message))
  
  if(Notification.timeoutHandler)
  {
    clearTimeout(Notification.timeoutHandler)
  }

  Notification.timeoutHandler =
  setTimeout(() =>
  {
    dispatcher(cleanNotification())
  }, seconds * 1000)
}

export const AnecdoteForm = () =>
{
  const dispatch = useDispatch()
  const add = (e) => 
  {
    e.preventDefault()
    const text = e.target.newAnecdote.value
    dispatch(addAnecdote(text))
    Notification.showFor(dispatch, `you have created '${text}'`)
  }

  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={add}>
        <div><input name='newAnecdote'/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export const AnecdoteList = () =>
{
  const anecdotes = useSelector(({anecdotes, filter}) => 
  {
    const { text = '' } = filter
    let ordered = [...anecdotes].sort((a, b) => b.votes - a.votes)
    if(text && text.length)
    {
      ordered = ordered
      .filter((elem) => 
      {
        return String(elem.content).toLowerCase().includes(String(text).toLowerCase())
      })
    }
    
    return ordered
  })
  const dispatch = useDispatch()
  const vote = (id) => 
  { 
    dispatch(voteLike(id))
    const content = anecdotes.find((e)=>{return e.id === id}).content
    Notification.showFor(dispatch, `you voted '${content}'`)
  }

  return(
    <div>
      {anecdotes.map(anecdote =>
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
      </div>)

}


export const Filter = () =>
{
  const dispatch = useDispatch()
  const handleChange = (event) => 
  {
    // input-field value is in variable event.target.value
    dispatch(updateFilter(event.target.value))
  }
  const style = { marginBottom: 10 }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}