

export const Filter = ({ value, handleChange }) =>
  <p>
    find countries <input value={value} onChange={handleChange} />
  </p>


export const Countries = ({ countries, handleCountryClick }) => {

  if (countries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }

  if (countries.length === 1) {
    return (
      <CountryDetails country={countries[0]} />
    )
  }

  return (
    <>
      {countries.map(country =>
        <CountryName
          key={country.alpha2Code}
          country={country}
          handleClick={handleCountryClick}
        />
      )}
    </>
  )

}

const CountryDetails = ({ country }) =>
  <>
    <h2>{country.name}</h2>

    <div>capital {country.capital}</div>
    <div>population {country.population}</div>

    <h3>languages</h3>

    <ul>
      {country.languages.map(language =>
        <li key={language.iso639_1}>{language.name}</li>
      )}
    </ul>

    <img src={country.flag} alt={`${country.name} flag`} width="100" />
  </>


const CountryName = ({ country, handleClick }) =>
  <div>
    {country.name}
    <button value={country.name} onClick={handleClick}>show</button>
  </div>

