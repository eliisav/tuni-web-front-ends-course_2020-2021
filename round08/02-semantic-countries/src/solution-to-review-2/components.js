import {
  Input,
  Segment,
  Button,
  Icon,
  Header
} from 'semantic-ui-react'

export const Filter = ({ value, handleChange }) =>
  <div>
    <Input icon='search' placeholder='Search Countries' value={value} onChange={handleChange} />
  </div>


export const Countries = ({ countries, handleCountryClick, filter }) => {

  if (!filter || filter.length === 0 || filter.length === '') {
    return (
      <Segment secondary>
        Enter search criteria
      </Segment>
    )
  }

  if (countries.length > 10) {
    return (
      <Segment secondary>Too many matches, specify another filter</Segment>
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
  <Segment>
    <Header as="h2"><img src={country.flag} alt={`${country.name} flag`} width="100" />{country.name}</Header>

    <Header as="h3"><Icon name="map pin" />Capital</Header>
    <Segment>{country.capital}</Segment>

    <Header as="h3"><Icon name="users" />Population</Header>
    <Segment>{country.population}</Segment>

    <Header as="h3"><Icon name="language" />Languages</Header>
    <Segment>
      {country.languages.map(language =>
        <span key={language.iso639_1}>{language.name}, </span>
      )}
    </Segment>


  </Segment>


const CountryName = ({ country, handleClick }) =>
  <div>
    <Button value={country.name} onClick={handleClick}>{country.name}</Button>
  </div>

