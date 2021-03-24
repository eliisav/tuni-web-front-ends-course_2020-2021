import React from 'react'

export const Filter = ({filter, handleChange}) => (
  <div>
    find countries <input value={filter} onChange={handleChange} />
  </div>
)

export const Countries = ({countries, handleClick}) => {
  if (countries.length === 1) {
    return <CountryInfo country={countries[0]} />

  } else if (countries.length > 1 && countries.length <= 10) {
    return (
      countries.map(country =>
        <CountryName
          key={country.alpha2Code}
          country={country}
          handleClick={handleClick}
        />
      )
    )

  } else {
    return <div>Too many matches, specify another filter</div>
  }
}

const CountryInfo = ({country}) => {
  const languages = country.languages.map(lang => 
    <li key={lang.iso639_1}>{lang.name}</li>
  )
  return (
    <div>
      <h1>{country.name}</h1>

      <div>capital {country.capital}</div>
      <div>population {country.population}</div>

      <h2>languages</h2>

      <ul>{languages}</ul>

      <div><img src={country.flag} width='200' height='120' /></div>
    </div>
  )
}

const CountryName = ({country, handleClick}) => (
  <div>
    {country.name} <Button handleClick={() => handleClick(country)} />
  </div>
)

const Button = ({handleClick}) => (
  <button onClick={handleClick} style={{margin: 3}} >
    show
  </button>
)
