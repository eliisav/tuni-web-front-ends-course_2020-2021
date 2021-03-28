const Filter = props => {
  return (
    <div>
      find countries 
      <input
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  )
}

const Countries = ({countries}) => {
  if (countries.length > 10) {
    return(
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  } else if (countries.length === 1) {
    return(
      <Country country={countries[0]} />
    )
  } else {
    return (
      <div>
        {countries.map( (c, index) => (
          <div key={index}>
            {c.name}
          </div>))}
      </div>
    )
  }
}

const Country = ({country}) => {
  return(
    <div>
      <h2>{country.name}</h2>
      <div>
        <p>{`capital ${country.capital}`}</p>
        <p>{`population ${country.population}`}</p>
      </div>
      <h3>languages</h3>
      <ul>
        {country.languages.map((l, i) => <li key={i} >{l.name}</li>)}
      </ul>
      <img alt={`flag of ${country.name}`} src={country.flag} style={{maxWidth: '200px', border: '1px solid #000'}} ></img>
    </div>
  )
}

export {
  Filter,
  Countries
}
