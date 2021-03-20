import React, { useState } from 'react'
import persons from '../initial-persons'
import {Filter, PersonForm, Persons} from './components'

// ------------------------------------------------------------ //
// ENTER COMMIT SHA OF YOUR REPO IN HERE                        //
// ------------------------------------------------------------ //
export const commitSHA = 'commit-sha-in-here';
// ------------------------------------------------------------ //



export const App = () => {
  const [ contacts, setContacts ] = useState(persons)
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filter, setFilter] = useState('')

  const addContact = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    if (contacts.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)

    } else {
      const contactObject = {
        name: newName,
        number: newNumber
      }

      setContacts(contacts.concat(contactObject))
    }
    
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const contactsToShow = contacts.filter(
    contact => contact.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handler={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm
        submitHandler={addContact}
        name={newName}
        nameHandler={handleNameChange}
        number={newNumber}
        numberHandler={handleNumberChange}
      />

      <h3>Numbers</h3>

        <Persons contacts={contactsToShow} />
    </div>
  )
}

