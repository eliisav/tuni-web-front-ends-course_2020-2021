export const Filter = ({filter, handler}) => {
  return (
    <div>
      filter shown with:
      <input 
        value={filter}
        onChange={handler}
      />
    </div>
  )
}

export const PersonForm = (props) => {
  return (
    <form onSubmit={props.submitHandler}>
        <div>
          name: 
          <input 
           value={props.name}
           onChange={props.nameHandler}
           />
        </div>
        <div>
          number: 
          <input 
           value={props.number}
           onChange={props.numberHandler}
           />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

export const Persons = ({contacts}) => {
  return contacts.map(
    person => <Person key={person.name} name={person.name} phone={person.number}/>
  )
}

const Person = ({name, phone}) => {
  return (
    <p>{name} {phone}</p>
  )
}
