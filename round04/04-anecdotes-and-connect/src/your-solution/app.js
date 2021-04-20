import React, {useEffect} from 'react'
import { ConnectedAnecdoteForm as AnecdoteForm, AnecdoteList } from './components'
import { ConnectedNotification as Notification } from './components'
import { ConnectedFilter as Filter } from './components'
import { initializeAnecdotes } from './anecdoteReducer'
import { useDispatch } from 'react-redux'

export {default as store} from './store'

// ** enter commit sha of your repository in here **
export const commitSHA = '1bd3fcb';

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
