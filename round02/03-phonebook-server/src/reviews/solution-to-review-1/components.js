/** @format */

import { useState } from 'react';

export const Notice = ({ notice }) => {
	const error = {
		color: 'red',
		background: 'lightgrey',
		fontSize: 20,
		borderStyle: 'solid',
		borderRadius: 5,
		padding: 10,
		marginBottom: 10,
	};
	const success = {
		color: 'green',
		background: 'lightgrey',
		fontSize: 20,
		borderStyle: 'solid',
		borderRadius: 5,
		padding: 10,
		marginBottom: 10,
	};

	if (!notice) {
		return null;
	}

	return (
		<div style={notice.type === 'success' ? success : error}>
			{notice.message}
		</div>
	);
};

const Person = ({ id, name, number, deleteHandler }) => {
	return (
		<li>
			{name} {number}
			<button onClick={(e) => deleteHandler(name, id)}>Delete</button>
		</li>
	);
};

export const Numbers = ({ persons, filterWord, deleteHandler }) => {
	const renderNumbers = () => {
		// console.log(persons);
		return persons.map(({ name, number, id }) => {
			// If the filterWord doesn't match with that persons name, return nothing.
			if (!name.toLowerCase().includes(filterWord)) return '';
			return (
				<Person
					key={id}
					id={id}
					name={name}
					number={number}
					deleteHandler={deleteHandler}
				/>
			);
		});
	};

	return <ul>{renderNumbers()}</ul>;
};

export const Form = ({ persons, personsHandler, submitHandler }) => {
	const [newName, setNewName] = useState('');
	const [newPhone, setNewPhone] = useState('');

	const handleNameChange = (e) => {
		setNewName(e.target.value);
	};

	const handlePhoneChange = (e) => {
		setNewPhone(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		submitHandler(newName, newPhone);
		setNewName('');
		setNewPhone('');
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				name: <input value={newName} onChange={handleNameChange} />
			</div>
			<div>
				Phone: <input value={newPhone} onChange={handlePhoneChange} />
			</div>
			<div>
				<button type='submit'>add</button>
			</div>
		</form>
	);
};

export const Filter = ({ persons, filterHandler }) => {
	const [searchWord, setSearchWord] = useState('');

	const handleChange = (e) => {
		e.preventDefault();
		setSearchWord(e.target.value);
		filterHandler(e.target.value);
	};

	return (
		<form onSubmit={handleChange}>
			filter shown with <input value={searchWord} onChange={handleChange} />
		</form>
	);
};
