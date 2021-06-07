
import React from 'react'
import { AnecdoteForm, AnecdoteList, Notification, Filter } from './components'
export {default as store} from '../redux/store'

// ** enter commit sha of your repository in here **
export const commitSHA = '-commit-sha-in-here-';

export const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteForm />
      <Filter />
      <AnecdoteList />
    </div>
  )
}
