import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeAnecdotes } from './anecdoteReducer'
import { ConnectedNotification, ConnectedAnecdoteForm, AnecdoteList, ConnectedFilter } from './components'

export { default as store } from './store'

// ** enter commit sha of your repository in here **
export const commitSHA = '1cec469';

export const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <ConnectedNotification />
      <ConnectedFilter />
      <AnecdoteList />
      <ConnectedAnecdoteForm />
    </div>
  )
}
