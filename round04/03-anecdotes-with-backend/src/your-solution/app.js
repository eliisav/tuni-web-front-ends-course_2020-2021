import React, {useEffect} from 'react'
import { AnecdoteForm, AnecdoteList, Notification, Filter } from './components'
import { initializeAnecdotes } from './anecdoteReducer'
import { useDispatch } from 'react-redux'

export {default as store} from './store'

// ** enter commit sha of your repository in here **
export const commitSHA = 'b983abc';

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
