import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { AnecdoteForm, AnecdoteList, Notification } from "./components"
import { initializeNotes } from "./anecdoteReducer"

export { default as store } from "./store"

// ** enter commit sha of your repository in here **
export const commitSHA = '68d32ed';

export const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const init = async () => {
      dispatch(initializeNotes())
    }
    init()
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}
