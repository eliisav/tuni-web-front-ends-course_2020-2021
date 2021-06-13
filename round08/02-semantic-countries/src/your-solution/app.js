
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Filter, Countries } from './components'
import 'semantic-ui-css/semantic.min.css';
import { Container, Divider, Grid, Segment } from 'semantic-ui-react';

// *** ENTER COMMIT SHA OF YOUR REPO IN HERE
export const commitSHA = '6792db4';

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

  return (
    <Container>

      <Divider hidden />

      <Segment placeholder>
        <Grid columns={2} textAlign='center'>
          <Grid.Row verticalAlign='middle'>

            <Grid.Column>
              <Filter value={filter} handleChange={handleFilterChange} />
            </Grid.Column>

            <Grid.Column>
              <Countries
                filterLength={filter.length}
                countries={countriesToShow}
                handleCountryClick={handleCountryClick}
              />
            </Grid.Column>

          </Grid.Row>
        </Grid>
      </Segment>

    </Container>
  )

}
