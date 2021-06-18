import { Menu, Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import React from 'react'
import { AnecdoteForm, AnecdoteList, Notification, Filter } from './components'
export {default as store} from '../redux/store'

// ** enter commit sha of your repository in here **
export const commitSHA = '389ec9e';

export const App = () => {
  return (
    <Container>
      <br />
      <Menu borderless>
        <Menu.Item name='Anecdotes' />
        <Menu.Item>
          <AnecdoteForm />
        </Menu.Item>
        <Menu.Menu position='right'>
          <Filter />
        </Menu.Menu>
      </Menu>
      <Notification />
      <AnecdoteList />
    </Container>
  )
}
