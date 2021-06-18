
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { addAnecdote, voteAnecdote } from '../redux/reducer-anecdote'
import { setNotification, clearNotification } from '../redux/reducer-notification'
import { setFilter } from '../redux/reducer-filter'

import { Button, Card, Header, Input, Menu, Message, Modal, TextArea } from 'semantic-ui-react'

//
// Notification
//

export const Notification = () => {
  const notification = useSelector(state => state.notification)
  // const style = {
  //   border: 'solid',
  //   padding: 10,
  //   borderWidth: 1,
  //   marginBottom: 10,
  //   display: notification.length ? 'block' : 'none'
  // }

  // console.log(notification)
  return (
    <Message style={{ display: notification.length ? 'block' : 'none' }}>
      <Message.Header>{notification.substring(0, 9)}</Message.Header>
      <Message.Content>{notification.slice(10)}</Message.Content>
    </Message>
  )

  // return (
  //   <div style={style}>
  //     {/* render here notification... */}
  //     {notification}
  //   </div>
  // )
}

//
// AnecdoteForm
//

// export const AnecdoteForm = () => {

//   const dispatch = useDispatch()

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     dispatch(addAnecdote(e.target.content.value))
//     e.target.content.value = ''
//   }

//   // const style = {
//   //   marginTop: 5,
//   //   marginBottom: 5,
//   // }

//   return (
//     <Form>
//       <Form.TextArea name='content' />
//     </Form>
//   )

//   return (
//     <div style={style}>
//       <form onSubmit={handleSubmit}>
//         <input name='content' />
//         <button>create</button>
//       </form>
//     </div>
//   )

// }

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

  return (
    <Card.Group>
      {anecdotes.map(anecdote =>
        <Card fluid key={anecdote.id}>
          <Card.Content description={anecdote.content} />
          <Card.Content meta={`${anecdote.votes} votes`} />
          <Card.Content>
            <Button basic color='green' onClick={handleVoteClick(anecdote.id, anecdote.content)}>
              Vote
            </Button>
          </Card.Content>
        </Card>
      )}
    </Card.Group>
  )

  // return (
  //   <div style={{ marginTop: 5 }}>
  //     {anecdotes.map(anecdote =>
  //       <div key={anecdote.id}>
  //         <div>
  //           {anecdote.content}
  //         </div>
  //         <div>
  //           has {anecdote.votes}
  //           <button onClick={handleVoteClick(anecdote.id, anecdote.content)}>vote</button>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // )
}

//
// Filter
//

export const Filter = () => {

  const dispatch = useDispatch()

  const handleChange = (event) => {
    dispatch(setFilter(event.target.value))
  }
  // const style = {
  //   marginBottom: 10
  // }

  return (
    <Input onChange={handleChange} placeholder='Search...' icon='search' />
  )

  // return (
  //   <div style={style}>
  //     filter <input onChange={handleChange} />
  //   </div>
  // )
}

export const FilterCreateMenu = () => {
  return (
    <Menu borderless>
      <Menu.Item><Header>Anecdotes</Header></Menu.Item>
      <Menu.Item><ModalNewAnecdote /></Menu.Item>
      <Menu.Item position='right'><Filter /></Menu.Item>
    </Menu>
  )
}

const ModalNewAnecdote = () => {
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)
  const [textarea, setText] = useState('')

  const notify = anecdote => {
    dispatch(setNotification(`You added "${anecdote}"`))
    setTimeout(() => dispatch(clearNotification()), 5000)
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button basic color='green'>New</Button >}
    >
      <Modal.Header>New anecdote</Modal.Header>
      <Modal.Content>
        <TextArea
          style={{ width: '100%' }}
          onChange={e => setText(e.target.value)}
          value={textarea} />
      </Modal.Content>
      <Modal.Actions>
        <Button
          onClick={() => { setText(''); setOpen(false) }}
          icon='cancel'
          content='Cancel'
          color='red'
          basic
        />
        
        <Button
          onClick={() => { dispatch(addAnecdote(textarea)); notify(textarea); setText(''); setOpen(false) }}
          content='Create'
          basic
          color='green'
          icon='checkmark'
        />
      </Modal.Actions>
    </Modal >
  )
}
