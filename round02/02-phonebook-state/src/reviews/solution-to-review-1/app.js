import React, { useState } from 'react'
import initialPersons from "../initial-persons"
import { Persons, PersonForm, Filter } from "./components"

// ------------------------------------------------------------ //
// ENTER COMMIT SHA OF YOUR REPO IN HERE                        //
// ------------------------------------------------------------ //
export const commitSHA = '841c50b';
// ------------------------------------------------------------ //


export const App = () => {
  const [persons, setPersons] = useState(initialPersons)
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchFilter, setSearchFilter ] = useState('');

  const addPerson = event => {
    event.preventDefault();

    const name = event.target.name.value;
    const number = event.target.number.value;

    const existingPerson = persons.find(p => p.name === name) !== undefined
    setPersons([
      ...(!existingPerson 
        ? persons 
        : persons.filter(p => p.name !== name)),
      {
        name,
        number
      }
    ])
  }

  const deletePerson = name => {
    setPersons(persons.filter(p => p.name !== name))
  }

  const personList = !searchFilter 
    ? persons
    : persons.filter(p => p.name.toLowerCase().includes(searchFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchFilter={searchFilter} setFilter={setSearchFilter} />
      <h3>add a new</h3>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={personList} deletePerson={deletePerson} />
    </div>
  )
}

export default App
