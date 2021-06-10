import {
  Button, Divider, Form, Header, Icon,
  Image, Input, Label, Message, Segment
} from 'semantic-ui-react';


export const Filter = ({ value, handleChange }) =>
  <>
    <Header icon>
      <Icon name='search' />
      Find Country
    </Header>

    <Divider hidden />

    <Input
      icon={{ name: 'search', circular: true }}
      placeholder='Search countries...'
      value={value} onChange={handleChange}
    />
  </>


export const Countries = ({ filterLength, countries, handleCountryClick }) => {
  if (!filterLength) {
    return <Message>Enter search criteria</Message>
  }

  if (!countries.length) {
    return <Message>No country was found</Message>
  }

  if (countries.length > 10) {
    return (
    <Message>
      <Message.Header>
        <Label>
          <Icon name='flag' /> {countries.length} countries
        </Label>
      </Message.Header>
      <Message.Content>
        Too many matches, specify another filter
      </Message.Content>
    </Message>
    )
  }

  if (countries.length === 1) {
    return (
      <CountryDetails country={countries[0]} />
    )
  }

  return (
    <Button.Group basic vertical>
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
  const languages = country.languages.map(language => language.name)
  return (
    <Segment>
      <Header as='h2'>
        <Image src={country.flag} size='medium' alt={`${country.name} flag`} />
        {country.name}
      </Header>

      <Form>
        <Form.Input label='Capital' defaultValue={country.capital} readOnly />
        <Form.Input
          label='Population'
          defaultValue={country.population}
          readOnly
        />

        <Form.Input
          label='Languages'
          defaultValue={languages.join(", ")}
          readOnly
        />

      </Form>
    </Segment>
  )
}


const CountryName = ({ country, handleClick }) =>
  <Button value={country.name} onClick={handleClick}>{country.name}</Button>
