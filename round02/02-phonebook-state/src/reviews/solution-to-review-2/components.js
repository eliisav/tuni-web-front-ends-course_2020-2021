export const Filter = ({ setSearchTerm }) => (
  <div>
    filter shown with{" "}
    <input
      type="text"
      onChange={(event) => setSearchTerm(event.target.value)}
    />
  </div>
);

export const PersonForm = ({
  setPersons,
  persons,
  setNewName,
  setNewNumber,
  newName,
  newNumber,
}) => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      const duplicatedPerson = persons.find(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      );

      if (duplicatedPerson) {
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        ) &&
          setPersons(
            persons.map((person) => {
              if (duplicatedPerson.name === person.name) {
                setNewName("");
                setNewNumber("");
                return {...person, number: newNumber}
              } else {
                return person
              }
            })
          );
      } else {
        setPersons([...persons, { name: newName, number: newNumber }]);
        setNewName("");
        setNewNumber("");
      }
    }}
  >
    <div>
      <div>
        name:{" "}
        <input
          type="text"
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
        />
      </div>
      <div>
        number:{" "}
        <input
          value={newNumber}
          onChange={(event) => setNewNumber(event.target.value)}
        />
      </div>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export const Persons = ({ persons, searchTerm, setPersons }) => (
  <div>
    {persons
      .filter((person) =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
          <button
            style={{ marginLeft: 10 }}
            onClick={(event) => {
              event.preventDefault();
              setPersons(
                persons.filter((element) => element.name !== person.name)
              );
            }}
          >
            Delete
          </button>
        </div>
      ))}
  </div>
);
