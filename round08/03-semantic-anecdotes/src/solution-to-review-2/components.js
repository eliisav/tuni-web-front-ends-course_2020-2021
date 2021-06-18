import { Input, Modal, Button, Icon, Card, Message, Form, TextArea } from 'semantic-ui-react'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { addAnecdote, voteAnecdote } from '../redux/reducer-anecdote'
import { setNotification, clearNotification } from '../redux/reducer-notification'
import { setFilter } from '../redux/reducer-filter'

//
// Notification
//

export const Notification = () => {
  const notification = useSelector(state => state.notification)
  const ntf  = notification.split(" ")
  const start = ntf.slice(0, 2).join(' ')
  const end = ntf.slice(2).join(' ')

  const style = {
    display: notification.length ? 'block' : 'none'
  }
  
  return (
    <div style={style}>
      {<Message>
          <Message.Header>{start}</Message.Header>
          "{end}"
        </Message>}
    </div>
  )
}

//
// AnecdoteForm
//

export const AnecdoteForm = () => {
  const [open, setOpen] = React.useState(false)
  const dispatch = useDispatch()
  let text = ''

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addAnecdote(text))
  }

  const handleText = (value) => {
    text = value
  }

  const handleButton = (e) => {
    dispatch(setNotification(`You added ${text}`))
    setTimeout(() => dispatch(clearNotification()), 5000)
    handleSubmit(e)
    setOpen(false)
  }

  const style = {
    marginTop: 5,
    marginBottom: 5,
  }

  return (
    <Modal
      open={open}
      trigger={<Button basic color='green'>New</Button>}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Modal.Header>New Anecdote</Modal.Header>
      <Modal.Content>
        <Form>
          <TextArea onChange={(e, {value}) => handleText(value)}/>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color='red' onClick={() => setOpen(false)}>
          <Icon name='remove' /> Cancel
        </Button>
        <Button color='green' onClick={handleButton}>
          <Icon name='checkmark' /> Create
        </Button>
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
    dispatch(setNotification(`You voted ${anecdote}`))
    setTimeout(() => dispatch(clearNotification()), 5000)
  }

  const handleVoteClick = (id, anecdote) => () => {
    dispatch(voteAnecdote(id))
    notify(anecdote)
  }

  return (
    anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <Card fluid>
          <Card.Content>
            {anecdote.content}
          </Card.Content>
          <Card.Content>
            <Card.Meta>{anecdote.votes} votes</Card.Meta>
          </Card.Content>
          <Card.Content>
            <Button basic color='green' onClick={handleVoteClick(anecdote.id, anecdote.content)}>Vote</Button>
          </Card.Content>
        </Card>
        <br />
      </div>
    )
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
  const style = {
    marginBottom: 10
  }

  return (
      <Input icon='search' placeholder='Filter...' onChange={handleChange} />
  )
}
