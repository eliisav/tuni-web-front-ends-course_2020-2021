import React from 'react'


const Person = ({persons, deleteFunc}) => {
    return (
      <div>
        {persons.name} {persons.number} 
        <button onClick={deleteFunc} id={persons.id} type="submit" value={persons.name}>delete</button>
      </div>
    )
  }
  
  const Filter = ({value, func}) => {
    return (
      <div>
          filter shown with <input
          value={value}
          onChange={func}/>
        </div>
    )
  }
  
  const PersonForm = ({add, value, func, value2, func2}) => {
    return(
      <form onSubmit={add}>
          <div>
            name: <input 
                  value={value}
                  onChange={func}/>
          </div>
          <div>
            number: <input
                    value={value2}
                    onChange={func2}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
    )
  }
  
  const Persons = ({persons, deleteFunc}) => {
    return(
    <div>
      {persons.map(part => 
        <Person key={part.name} persons={part} deleteFunc={deleteFunc}/>          
      )}
    </div>
    )
  }

  export {Filter, PersonForm, Persons}