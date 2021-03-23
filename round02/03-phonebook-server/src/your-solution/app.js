import React, { useState, useEffect } from 'react'
import personService from './person-service'
import {Filter, PersonForm, Persons} from './components'


// ------------------------------------------------------------ //
// ENTER COMMIT SHA OF YOUR REPO IN HERE                        //
// ------------------------------------------------------------ //
export const commitSHA = 'commit-sha-in-here';
// ------------------------------------------------------------ //


export const App = () => {
  const [ contacts, setContacts ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(persons => {
        setContacts(persons)
      })
  }, [])

  const addContact = (event) => {
    event.preventDefault()

    const personFound = contacts.find(person => person.name === newName)

    if (personFound === undefined) {
      const newContact = {
        name: newName,
        number: newNumber
      }
      
      personService
        .create(newContact)
        .then(returnedPerson => {
          setContacts(contacts.concat(returnedPerson))
        })

    } else if (window.confirm(
      `${newName} is already added to phonebook, replace the old number with a new one?`
    )){
      const updatedContact = {...personFound, number: newNumber}

      personService
        .update(personFound.id, updatedContact)
        .then(returnedPerson => {
          setContacts(contacts.map(person => 
            person.name !== newName ? person : returnedPerson))
        })
    }

    // Clear the input fields
    // no matter what happened
    setNewName('')
    setNewNumber('')
  }

  const handleChange = (setChange) => (event) => {
    setChange(event.target.value)
  }

  const deleteContact = (contact) => {
    if ( !window.confirm(`Delete ${contact.name}?`) ) {
      return
    }

    personService
      .deleteEntry(contact.id)
      .then(() => {
        setContacts(contacts.filter(person => person.id !== contact.id))
      })
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
