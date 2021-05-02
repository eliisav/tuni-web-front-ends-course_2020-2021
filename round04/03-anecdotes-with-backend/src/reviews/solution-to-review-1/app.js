import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeAnecdotes } from './anecdoteReducer'
import { Notification, AnecdoteForm, AnecdoteList, Filter } from './components'

export { default as store } from './store'

// ** enter commit sha of your repository in here **
export const commitSHA = 'b05cb41';

export const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}
