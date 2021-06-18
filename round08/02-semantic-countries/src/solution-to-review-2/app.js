
import 'semantic-ui-css/semantic.min.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Filter, Countries } from './components'
import { Container, Grid, Header, Icon, Segment } from 'semantic-ui-react'

// *** ENTER COMMIT SHA OF YOUR REPO IN HERE
export const commitSHA = '1ca2c5f';

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
    <div>
      <Container text>
        <Segment>
          <Grid columns={2} textAlign='center'>
            <Grid.Row verticalAlign='middle'>
              <Grid.Column>
                <Header icon>
                  <Icon name='search' />
                  Find Country
                </Header>
                <Filter value={filter} handleChange={handleFilterChange} />
              </Grid.Column>
              <Grid.Column>
                <Countries
                  countries={countriesToShow}
                  handleCountryClick={handleCountryClick}
                  filter={filter}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    </div>
  )

}
