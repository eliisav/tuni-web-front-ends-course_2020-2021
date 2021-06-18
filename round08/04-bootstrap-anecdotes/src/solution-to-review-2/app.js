import React, { useState } from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { AnecdoteForm, AnecdoteList, Notification, Filter } from './components';
export { default as store } from '../redux/store';

// ** enter commit sha of your repository in here **
export const commitSHA = '6c7a2a3';

export const App = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  return (
    <Container className="my-3">
      <Navbar bg="primary" variant="dark">
        <Nav.Item>
          <Navbar.Brand>Anecdotes</Navbar.Brand>
        </Nav.Item>
        <Nav.Item>
          <Button
            variant="primary"
            onClick={handleShow}
            style={{ borderColor: 'white' }}
          >
            New
          </Button>
        </Nav.Item>

        <Nav.Item className="ml-auto">
          <Filter />
        </Nav.Item>
      </Navbar>
      <Notification />
      <AnecdoteForm show={show} handleClose={handleClose} />
      <AnecdoteList />
    </Container>
  );
};
