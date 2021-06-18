import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  FormControl,
  InputGroup,
  Alert,
  Card,
  Button,
  Modal,
  Form,
} from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';

import { addAnecdote, voteAnecdote } from '../redux/reducer-anecdote';
import {
  setNotification,
  clearNotification,
} from '../redux/reducer-notification';
import { setFilter } from '../redux/reducer-filter';

//
// Notification
//

export const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const style = {
    display: notification.length ? 'block' : 'none',
  };

  const content = () => {
    if (notification.includes('you voted'))
      return (
        <>
          <Alert.Heading>You voted</Alert.Heading>
          <p>{notification.slice(9)}</p>
        </>
      );
    if (notification.includes('you added'))
      return (
        <>
          <Alert.Heading>You added</Alert.Heading>
          <p>{notification.slice(9)}</p>
        </>
      );
    return notification;
  };
  return (
    <Alert style={style} variant="success" className="my-2">
      {/* render here notification... */}
      {content()}
    </Alert>
  );
};

//
// AnecdoteForm
//

export const AnecdoteForm = ({ show, handleClose }) => {
  const dispatch = useDispatch();

  const notify = (anecdote) => {
    dispatch(setNotification(`you added "${anecdote}"`));
    setTimeout(() => dispatch(clearNotification()), 5000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!e.target.content.value || e.target.content.value === '') {
      return;
    }
    dispatch(addAnecdote(e.target.content.value));
    notify(e.target.content.value);
    e.target.content.value = '';
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>New anecdote</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="addForm" onSubmit={(e) => handleSubmit(e)}>
          <Form.Control
            as="textarea"
            rows={3}
            name="content"
            placeholder="Enter a new anecdote..."
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" form="addForm">
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

//
// AnecdoteList
//

export const AnecdoteList = () => {
  const filter = useSelector((state) => state.filter).toLowerCase();

  const anecdotes = useSelector((state) => state.anecdotes).filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter)
  );

  const dispatch = useDispatch();

  const notify = (anecdote) => {
    dispatch(setNotification(`you voted "${anecdote}"`));
    setTimeout(() => dispatch(clearNotification()), 5000);
  };

  const handleVoteClick = (id, anecdote) => () => {
    dispatch(voteAnecdote(id));
    notify(anecdote);
  };

  return (
    <div style={{ marginTop: 5 }}>
      {anecdotes.map((anecdote) => (
        <Card key={anecdote.id} className="my-1">
          <Card.Header>{anecdote.content}</Card.Header>
          <Card.Body>
            {anecdote.votes} votes
            <Button
              variant="outline-primary"
              className="ml-2"
              onClick={handleVoteClick(anecdote.id, anecdote.content)}
            >
              Vote
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

//
// Filter
//

export const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <InputGroup>
      <InputGroup.Prepend>
        <InputGroup.Text>
          <Search />
        </InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl placeholder="Search..." onChange={handleChange} />
    </InputGroup>
  );
};
