import React, { useState } from 'react'
import persons from '../initial-persons'
import {Filter, PersonForm, Persons} from './components'


// ------------------------------------------------------------ //
// ENTER COMMIT SHA OF YOUR REPO IN HERE                        //
// ------------------------------------------------------------ //
export const commitSHA = '2ddc5fd';
// ------------------------------------------------------------ //


export const App = () => {
  const [ contacts, setContacts ] = useState(persons)
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  const addContact = (event) => {
    event.preventDefault()

    // Step 2
    // if (contacts.some(person => person.name === newName)) {
    //   window.alert(`${newName} is already added to phonebook`)
    // ...
    
    // Step 7
    const personFound = contacts.find(person => person.name === newName)

    if (personFound === undefined) {
      const newContact = {
        name: newName,
        number: newNumber
      }

      setContacts(contacts.concat(newContact))

    } else {
      const updatedContact = {...personFound, number: newNumber}
      setContacts(contacts.map(person => 
        person.name !== newName ? person : updatedContact
      ))
    }

    setNewName('')
    setNewNumber('')
  }

  const handleChange = (setChange) => (event) => {
    // console.log(event.target.value)
    setChange(event.target.value)
  }

  const deleteContact = (name) => {
    setContacts(contacts.filter(person => person.name !== name))
  }

  const contactsToShow = contacts.filter(
    contact => contact.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleChange={handleChange(setFilter)} />

      <h3>Add a new</h3>

      <PersonForm
        handleSubmit={addContact}
        name={newName}
        handleName={handleChange(setNewName)}
        number={newNumber}
        handleNumber={handleChange(setNewNumber)}
      />

      <h3>Numbers</h3>

      <Persons contacts={contactsToShow} handleDelete={deleteContact} />
    </div>
  )
}
