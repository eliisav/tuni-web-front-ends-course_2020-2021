

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Filter, Countries } from './components'

// *** ENTER COMMIT SHA OF YOUR REPO IN HERE
export const commitSHA = '-commit-sha-in-here-';

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

      <Filter value={filter} handleChange={handleFilterChange} />
      <Countries
        countries={countriesToShow}
        handleCountryClick={handleCountryClick}
      />

    </div>
  )

}
