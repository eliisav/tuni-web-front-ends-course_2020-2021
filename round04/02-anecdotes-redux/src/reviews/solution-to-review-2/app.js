import React from 'react'
import { Notification, AnecdoteList, AnecdoteForm, Filter } from './components'
export { store } from './store'

// ** enter commit sha of your repository in here **
export const commitSHA = '47769d5';

export const App = () => {
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
