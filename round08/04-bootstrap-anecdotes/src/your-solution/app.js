
import React, {useState} from 'react'
import { AnecdoteForm, AnecdoteList, Notification, Filter } from './components'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
export {default as store} from '../redux/store'


// ** enter commit sha of your repository in here **
export const commitSHA = '2ff84b7';

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

      <Navbar bg="primary" variant="dark" className="my-2">
        <Navbar.Brand>Anecdotes</Navbar.Brand>

        <Nav className="mr-auto">
          <Button variant="outline-light" onClick={openModal}>New</Button>
        </Nav>

        <Filter />

      </Navbar>

      <AnecdoteForm
        modalOpen={modalOpen}
        closeModal={closeModal}
      />

      <Notification /> 
      <AnecdoteList />

    </Container>
  )
}
