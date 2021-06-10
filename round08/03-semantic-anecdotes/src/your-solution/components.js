
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { addAnecdote, voteAnecdote } from '../redux/reducer-anecdote'
import { setNotification, clearNotification } from '../redux/reducer-notification'
import { setFilter } from '../redux/reducer-filter'

import {
  Button, Card, Input,
  Message, Modal, TextArea
} from 'semantic-ui-react';

//
// Notification
//

export const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    display: notification.length ? 'block' : 'none'
  }

  if (!notification.length) {
    return null
  }

  const anecdoteStart = notification.indexOf('"')
  const action = notification.slice(0, anecdoteStart)
  const anecdote = notification.slice(anecdoteStart)

  return (
    <Message>
      <Message.Header>{action}</Message.Header>
      <Message.Content>{anecdote}</Message.Content>
    </Message>
  )
}

//
// AnecdoteForm
//

export const AnecdoteForm = ({ modalOpen, closeModal }) => {
  const dispatch = useDispatch()

  const notify = anecdote => {
    dispatch(setNotification(`You added "${anecdote}"`))
    setTimeout(() => dispatch(clearNotification()), 5000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addAnecdote(e.target.content.value))
    notify(e.target.content.value)
    e.target.content.value = ''
    closeModal()
  }

  return (
    <Modal
      as='form'
      open={modalOpen}
      onClose={closeModal}
      onSubmit={handleSubmit}
      centered={false}
      size='large'
    >
      <Modal.Header>New anecdote</Modal.Header>

      <Modal.Content>
        <TextArea style={{width:'100%'}} name='content'/>
      </Modal.Content>

      <Modal.Actions>
        <Button
          basic
          type='button'
          color='black'
          onClick={closeModal}
          content='Cancel'
          icon='remove'
        />
        <Button
          basic
          type='submit'
          color='green'
          content='Create'
          icon='checkmark'
        />
      </Modal.Actions>

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
    <Card key={anecdote.id} fluid>
      <Card.Content content={anecdote.content} />
      <Card.Content extra>
        {anecdote.votes} votes
      </Card.Content>
      <Card.Content>
        <Button
          basic
          color='green'
          onClick={handleVoteClick(anecdote.id, anecdote.content)}
          content='Vote'
        />
      </Card.Content>
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
    <Input
      icon={{ name: 'search'}}
      placeholder='Search...'
      onChange={handleChange}
    />
  )
}
