import React from 'react'
import { ConnectedAnecdoteForm, ConnectedNotifications, ConnectedFilter, AnecdoteForm, AnecdoteList, Notification, Filter } from './components'
export {default as store} from './store'

// ** enter commit sha of your repository in here **
export const commitSHA = '7b495fd';

export const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <ConnectedNotifications />
      <ConnectedFilter />
      <AnecdoteList />
      <ConnectedAnecdoteForm />
    </div>
  )
}
