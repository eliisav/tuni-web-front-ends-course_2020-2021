import { Input, Message, Button, Segment, Header, Image, Table } from "semantic-ui-react"

export const Filter = ({ value, handleChange }) =>
  <p>
    <Input icon="search" placeholder="Search countries..." value={value} onChange={handleChange}/>
  </p>
  


export const Countries = ({ countries, handleCountryClick }) => {

  if (countries.length > 10) {
    return (
      <Message>
        <p>
          Too many matches, specify another filter
        </p>
      </Message>
    )
  }

  if (countries.length === 1) {
    return (
      <CountryDetails country={countries[0]} />
    )
  }

  return (
    <Button.Group vertical>
      {countries.map(country =>
        <CountryName
          key={country.alpha2Code}
          country={country}
          handleClick={handleCountryClick}
        />
      )}
    </Button.Group>
  )
}

const CountryDetails = ({ country }) => {
return (
  <Segment>
    <Header as="h2">
      <Image src={country.flag} alt={`${country.name} flag`} />
      {country.name} 
    </Header>
    <Table celled>
      <Table.Row>
        <Table.Cell>Capital</Table.Cell>
        <Table.Cell>{country.capital}</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Population</Table.Cell>
        <Table.Cell>{country.population}</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Languages</Table.Cell>
        <Table.Cell>
            {country.languages.map(language =>
              <p key={language.iso639_1}>{language.name}</p>
            )}
        </Table.Cell>
      </Table.Row>
    </Table>
  </Segment>
)
}

const CountryName = ({ country, handleClick }) =>
  <div>
    <Button size="large" value={country.name} onClick={handleClick}>{country.name}</Button>
  </div>

