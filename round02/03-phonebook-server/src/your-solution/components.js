export const Filter = ({filter, handleChange}) => (
  <div>
    filter shown with <input value={filter} onChange={handleChange} />
  </div>
)

export const PersonForm = (props) => (
  <form onSubmit={props.handleSubmit}>
    <div>
      name: <input value={props.name} onChange={props.handleName} />
    </div>
    <div>
      number: <input value={props.number} onChange={props.handleNumber} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

export const Persons = ({contacts, handleDelete}) => (
  contacts.map(person =>
    <Person key={person.id} person={person} handleDelete={handleDelete} />
  )
)

const Person = ({person, handleDelete}) => (
  <div>
    {person.name} {person.number}
    <Button handleClick={() => handleDelete(person)} />
  </div>
)

const Button = ({handleClick}) => (
  <button onClick={handleClick} style={{margin: 3}} >
    delete
  </button>
)

export const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={message.type}>
      {message.text}
    </div>
  )
}
