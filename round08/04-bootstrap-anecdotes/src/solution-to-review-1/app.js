
import React from 'react'
import { AnecdoteList, Notification, AnecdoteHeader } from './components'
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export {default as store} from '../redux/store'

// ** enter commit sha of your repository in here **
export const commitSHA = '2b9eadb';

export const App = () => {
  return (
    <Container className="py-3">
      <AnecdoteHeader />
      <Notification />
      <AnecdoteList />
    </Container>
  )
}
