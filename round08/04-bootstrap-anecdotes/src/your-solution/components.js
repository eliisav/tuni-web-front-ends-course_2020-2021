
import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { addAnecdote, voteAnecdote } from '../redux/reducer-anecdote'
import { setNotification, clearNotification } from '../redux/reducer-notification'
import { setFilter } from '../redux/reducer-filter'

import { Search } from 'react-bootstrap-icons'
import {
  Alert, Button, Card, Form,
  FormControl, InputGroup, Modal
} from 'react-bootstrap'


//
// Notification
//

export const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (!notification.length) {
    return null
  }

  const anecdoteStart = notification.indexOf('"')
  const action = notification.slice(0, anecdoteStart)
  const anecdote = notification.slice(anecdoteStart)

  return (
    <Alert variant='success'>
      <Alert.Heading>{action}</Alert.Heading>
      {anecdote}
    </Alert>
  )
}

//
// AnecdoteForm
//

export const AnecdoteForm = ({ modalOpen, closeModal }) => {
  const [ newAnecdote, setNewAnecdote ] = useState('')
  const dispatch = useDispatch()

  const notify = anecdote => {
    dispatch(setNotification(`You added "${anecdote}"`))
    setTimeout(() => dispatch(clearNotification()), 5000)
  }

  const handleChange = (event) => {
    setNewAnecdote(event.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addAnecdote(newAnecdote))
    notify(newAnecdote)
    setNewAnecdote('')
    closeModal()
  }

  return (
    <Modal show={modalOpen} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>New anecdote</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control as="textarea" rows={3} onChange={handleChange} />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  )

}

//
// AnecdoteList
//

export const AnecdoteList = () => {

  const filter = useSelector(state => state.filter).toLowerCase()

  const anecdotes = useSelector(state => state.anecdotes)
    .filter(anecdote => anecdote.content.toLowerCase().includes(filter))

  const dispatch = useDispatch()

  const notify = anecdote => {
    dispatch(setNotification(`You voted "${anecdote}"`))
    setTimeout(() => dispatch(clearNotification()), 5000)
  }

  const handleVoteClick = (id, anecdote) => () => {
    dispatch(voteAnecdote(id))
    notify(anecdote)
  }

  return anecdotes.map(anecdote =>
    <Card key={anecdote.id} className="mb-2">
      <Card.Header>{anecdote.content}</Card.Header>
      <Card.Body>
        {anecdote.votes} votes
        <Button
          onClick={handleVoteClick(anecdote.id, anecdote.content)}
          variant="outline-primary"
          className="mx-2"
          >
          Vote
        </Button>
      </Card.Body>
    </Card>
  )
}

//
// Filter
//

export const Filter = () => {

  const dispatch = useDispatch()

  const handleChange = (event) => {
    dispatch(setFilter(event.target.value))
  }

  return (
    <Form inline>
      <InputGroup>

        <InputGroup.Prepend>
          <InputGroup.Text><Search /></InputGroup.Text>
        </InputGroup.Prepend>
        
        <Form.Control
          type="text"
          onChange={handleChange}
          placeholder="Search"
          className="mr-sm-2"
        />

      </InputGroup>
    </Form>
  )
}
