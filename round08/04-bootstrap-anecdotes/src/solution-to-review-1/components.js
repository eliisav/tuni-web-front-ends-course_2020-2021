import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { addAnecdote, voteAnecdote } from "../redux/reducer-anecdote";
import {
	setNotification,
	clearNotification,
} from "../redux/reducer-notification";
import { setFilter } from "../redux/reducer-filter";

import {
	Nav,
	Navbar,
	InputGroup,
	FormControl,
	Button,
	Modal,
	Form,
	Alert,
	Card,
} from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

//
// Notification
//

export const Notification = () => {
	const notification = useSelector((state) => state.notification);

	if (notification === "") return null;

	const [you, did, ...that] = notification.split(" ");

	return (
		<Alert variant="success" className="my-3">
			<Alert.Heading>{`${you} ${did}`}</Alert.Heading>
			<p className="mb-0">{that.join(" ")}</p>
		</Alert>
	);
};

//
// AnecdoteForm
//

export const AnecdoteForm = () => {
	const dispatch = useDispatch();

	const [show, setShow] = useState(false);
	const [content, setContent] = useState("");

	const handleClose = () => {
		setShow(false);
		setContent("");
	};

	const handleShow = () => setShow(true);

	const handleCreate = () => {
		if (isEmpty) return;
		dispatch(addAnecdote(content));
		dispatch(setNotification(`You added "${content}"`));
		setTimeout(() => dispatch(clearNotification()), 5000);
		handleClose();
	};

	const isEmpty = content === "";

	return (
		<>
			<Button variant="outline-light" onClick={handleShow}>
				New
			</Button>

			<Modal
				show={show}
				onHide={handleClose}
				aria-labelledby="contained-modal-title-vcenter"
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						New anecdote
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group controlId="anecdote-text" className="mb-0">
						<Form.Control
							as="textarea"
							rows={3}
							value={content}
							onChange={({ target }) => setContent(target.value)}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Cancel
					</Button>
					<Button variant="primary" onClick={handleCreate} disabled={isEmpty}>
						Create
					</Button>
				</Modal.Footer>
			</Modal>
		</>
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
		dispatch(setNotification(`You voted "${anecdote}"`));
		setTimeout(() => dispatch(clearNotification()), 5000);
	};

	const handleVoteClick = (id, anecdote) => () => {
		dispatch(voteAnecdote(id));
		notify(anecdote);
	};

  if(!anecdotes.length)return(
    <Alert variant="danger" className="my-3">
			<Alert.Heading>No match found</Alert.Heading>
			<p className="mb-0">Sorry, there is no result for the searched term "{filter}".</p>
		</Alert>
    )

	return anecdotes.map((anecdote) => (
		<Card key={anecdote.id} className="my-2">
			<Card.Header>{anecdote.content}</Card.Header>
			<Card.Body>
				<Card.Text>
					{anecdote.votes} votes{" "}
					<Button
						variant="outline-primary"
						onClick={handleVoteClick(anecdote.id, anecdote.content)}
					>
						Vote
					</Button>
				</Card.Text>
			</Card.Body>
		</Card>
	));
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
			<InputGroup.Text
				id="search-input"
				style={{ borderRadius: ".25rem 0 0 .25rem" }}
			>
				<Search />
			</InputGroup.Text>
			<FormControl
				placeholder="Search..."
				aria-label="Search"
				aria-describedby="search-input"
				onChange={handleChange}
			/>
		</InputGroup>
	);
};

export const AnecdoteHeader = () => {
	return (
		<Navbar bg="primary" variant="dark">
			<Navbar.Brand>Anecdotes</Navbar.Brand>
			<Nav className="mr-auto">
				<AnecdoteForm />
			</Nav>
			<Nav>
				<Filter />
			</Nav>
		</Navbar>
	);
};
