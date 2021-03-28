import {useState, useEffect} from 'react'
import {Filter, PersonForm, Persons} from './components'
import personservice from './person-service'

// ------------------------------------------------------------ //
// ENTER COMMIT SHA OF YOUR REPO IN HERE                        //
// ------------------------------------------------------------ //
export const commitSHA = '3a2ada7';
// ------------------------------------------------------------ //

export const App = () => {
  const [ persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('')

  const [ newNumber, setNewNumber ] = useState('')

  const [ filterName, setNewFilter] = useState('')

  useEffect(() => {
    personservice
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  },[])

  const addPerson = (event) => {
    event.preventDefault()
    
    const filtered = persons.filter(person => person.name === newName)

    if (filtered.length > 0){
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        const replaced = { ...person, number: newNumber }

        personservice
        .replace(person.id, replaced)
        .then(response => {
          setPersons(persons.map(p => p.id !== person.id ? p : response.data))
          setNewName('')
          setNewNumber('')
        })

        return
      } else {return}
      
    }

    const nameObject = {
      name: newName,
      number: newNumber
    }

    personservice
    .create(nameObject)
    .then(response => {
      setPersons(persons.concat(response.data))
      setNewName('')
      setNewNumber('')
    })
  }

  const personsToShow = filterName === ""
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const deleteFunc = (event) => {
    if (window.confirm(`Delete ${event.target.value}?`)) {
      personservice
      .delPerson(event.target.id)
      .then(() => {
      const filtered = persons.filter(person => person.name !== event.target.value)
      setPersons(filtered)
      })
    }    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value = {filterName}
              func = {handleFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm add = {addPerson}
                  value = {newName}
                  func = {handleNameChange}
                  value2 = {newNumber}
                  func2 = {handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons = {personsToShow} deleteFunc = {deleteFunc}/>
    </div>
  );
}

