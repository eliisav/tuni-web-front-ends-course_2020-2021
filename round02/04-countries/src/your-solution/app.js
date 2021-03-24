import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Filter, Countries} from './components'


// ------------------------------------------------------------ //
// ENTER COMMIT SHA OF YOUR REPO IN HERE                        //
// ------------------------------------------------------------ //
export const commitSHA = 'af5bf32';
// ------------------------------------------------------------ //


export const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')
 
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleChange = (setChange) => (event) => {
    setChange(event.target.value)
  }

  const handleClick = (countryName) =>  {
    setFilter(countryName)
  }

  const countriesToShow = countries.filter(
    country => country.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Countries</h2>

      <Filter filter={filter} handleChange={handleChange(setFilter)} />

      <Countries countries={countriesToShow} handleClick={handleClick} />
    </div>
  )
}
