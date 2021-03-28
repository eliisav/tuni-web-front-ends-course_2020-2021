/** @format */

import React, { useEffect, useState } from 'react';
import { Filter, Form, Numbers, Notice } from './components';
import { create, getAll, remove, update } from './person-service';

// ------------------------------------------------------------ //
// ENTER COMMIT SHA OF YOUR REPO IN HERE                        //
// ------------------------------------------------------------ //
export const commitSHA = '99ed005';
// ------------------------------------------------------------ //

export const App = () => {
	const [notice, setNotice] = useState(null);
	const [persons, setPersons] = useState([]);
	const [filterWord, setFilterWord] = useState('');
	useEffect(() => {
		const getPersons = async () => {
			const allPersons = await getAll();
			setPersons(allPersons);
		};
		getPersons();
		return () => {
			// cleanup, not needed here
		};
		// Empty [] means useEffect only runs once (after initial component render.)
	}, []);

	const handleMessage = (message, type) => {
		setNotice({ message, type });
		setTimeout(() => {
			setNotice(null);
		}, 3000);
	};

	const handleSubmit = (newName, newPhone) => {
		let oldPerson = persons.find(({ name }) => {
			return name === newName;
		});

		//If the newName does not refer to an old person
		if (!oldPerson) {
			const person = {
				name: newName,
				number: newPhone,
			};
			const postPerson = async () => {
				const newPerson = await create(person);
				handleMessage('Add successfull', 'success');
				setPersons([...persons, newPerson]);
			};
			postPerson();
		} else {
			const oldPersonMessage = `${newName} is already added to phonebook, replace the old number with a new one?`;
			if (window.confirm(oldPersonMessage)) {
				const changedPerson = { ...oldPerson, number: newPhone };

				const updatePerson = async () => {
					try {
						const updatedPerson = await update(oldPerson.id, changedPerson);
						handleMessage('Update successfull', 'success');
						setPersons(
							persons.map((person) =>
								person.id !== oldPerson.id ? person : updatedPerson
							)
						);
					} catch (e) {
						handleMessage(
							`${newName} has already been deleted from the database. Update unsuccesfull`,
							'error'
						);
						const newPersons = persons.filter(({ name }) => {
							return name !== newName;
						});
						setPersons(newPersons);
					}
				};

				updatePerson();
			} else {
				handleMessage('Update cancelled.', 'error');
			}
		}
	};

	const handleFilter = (searchResults) => {
		setFilterWord(searchResults);
	};

	const handleDelete = (deleteName, id) => {
		const deletePerson = async () => {
			try {
				if (window.confirm(`Delete ${deleteName}?`)) {
					await remove(id);
					handleMessage('Delete successfull', 'success');
				}
			} catch (error) {
				handleMessage(
					`${deleteName} has already been deleted from the database.`,
					'error'
				);
			}

			const newPersons = persons.filter(({ name }) => {
				return name !== deleteName;
			});

			setPersons(newPersons);
		};

		deletePerson();
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Notice notice={notice} />
			<Filter persons={persons} filterHandler={handleFilter} />
			<h2>Add a new</h2>
			<Form persons={persons} submitHandler={handleSubmit} />
			<h2>Numbers</h2>
			<Numbers
				filterWord={filterWord}
				persons={persons}
				deleteHandler={handleDelete}
			/>
		</div>
	);
};
