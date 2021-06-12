import 'semantic-ui-css/semantic.min.css'
import { Button, Container, Divider, Menu } from 'semantic-ui-react'
import React, { useState } from 'react'
import { AnecdoteForm, AnecdoteList, Notification, Filter } from './components'

export {default as store} from '../redux/store'


// ** enter commit sha of your repository in here **
export const commitSHA = '-commit-sha-in-here-';

export const App = () => {
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = () => {
    setModalOpen(true)
  }

  const closeModal = ()=> {
    setModalOpen(false)
  }

  return (
    <Container>
      <Divider hidden />

      <Menu borderless>
        <Menu.Item header>Anecdotes</Menu.Item>

        <Menu.Item>
          <Button basic color='green' onClick={() => openModal()}>New</Button>
        </Menu.Item>

        <Menu.Item position='right'>
          <Filter />
        </Menu.Item>
      </Menu>

      <AnecdoteForm
        modalOpen={modalOpen}
        closeModal={closeModal}
      />

      <Notification />
      <AnecdoteList />

      <Divider hidden />
    </Container>
  )
}
