

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Filter, Countries } from './components'
import 'semantic-ui-css/semantic.min.css'
import { Container, Icon, Grid, Header } from 'semantic-ui-react'

// *** ENTER COMMIT SHA OF YOUR REPO IN HERE
export const commitSHA = 'e91b290';

export const App = () => {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = ({ target }) => {
    setFilter(target.value)
  }

  const handleCountryClick = ({ target }) => {
    setFilter(target.value)
  }

  const countriesToShow = filter.length
    ? countries.filter(country => country.name.match(new RegExp(filter, 'i')))
    : countries

  const containerStyle = {
    margin: 20,
    padding: 30,
    border: "solid",
    borderColor: "lightgrey",
    borderWidth: "thin",
    borderRadius: 5,
    backgroundColor: "aliceblue"
  }

  return (
    <Container style={containerStyle}>
      <Grid columns={2} textAlign="center" verticalAlign="middle">
        <Grid.Column>
          <Header as="h3" icon>
            <Icon name="search"></Icon>
            Find Country
          </Header>
          <Filter value={filter} handleChange={handleFilterChange} />
        </Grid.Column>
        <Grid.Column>
          <Countries
            countries={countriesToShow}
            handleCountryClick={handleCountryClick}
          />
        </Grid.Column>
      </Grid>
    </Container>
  )

}
