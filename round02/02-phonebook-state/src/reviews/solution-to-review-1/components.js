export const Persons = ({ persons, deletePerson }) => {
  return (
    <div>
      {persons.map(({ name, number }) => 
        <p key={name}>{name} {number} <button onClick={() => deletePerson(name)} >delete</button></p>)}
    </div>
  )
}

export const Filter = ({ searchFilter, setFilter }) => {
  return (
    <div>
      filter shown with <input type={"text"} value={searchFilter} onChange={(event) => setFilter(event.target.value)} />
    </div>
  )
}

export const PersonForm = ({ 
  addPerson,
  newName,
  setNewName,
  newNumber,
  setNewNumber
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input type={"text"} name={"name"} value={newName} onChange={(event) => setNewName(event.target.value)} /><br/>
        number: <input type={"text"} name={"number"} value={newNumber} onChange={(event) => setNewNumber(event.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}