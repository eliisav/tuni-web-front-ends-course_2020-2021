import React from 'react'
import { AnecdoteForm, AnecdoteList, Notification, Filter} from './components'

export {default as store} from './store'

// ** enter commit sha of your repository in here **
export const commitSHA = '374b5f4';

export const App = () => 
{
    return (
      <div>
        <Notification />
        <h2>Anecdotes</h2>
        <Filter />
        <AnecdoteList />
        <AnecdoteForm />
      </div>)
}
