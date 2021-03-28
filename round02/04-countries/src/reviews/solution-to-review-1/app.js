import React, { useState, useEffect } from 'react'
import {Filter, Countries} from '../your-solution/components'
import axios from 'axios'
// ------------------------------------------------------------ //
// ENTER COMMIT SHA OF YOUR REPO IN HERE                        //
// ------------------------------------------------------------ //
export const commitSHA = 'd47bc8cc';
// ------------------------------------------------------------ //
export const App = () => {
  const [ countries, setCountries] = useState([]) 
  const [newFilter, setNewFilter] = useState('')

  useEffect (() => {
    //console.log('efekti')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
          //console.log('promise fulfilled')
          setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries', countries)

  const handleFilterChange = (event) => {
    //console.log('event.target.value:',event.target.value)
    setNewFilter(event.target.value)
    //console.log('setattiin uusi filtteri:',event.target.value)
 
  }
  
  const filterCountries = () => {
    const filteredCountries = countries.filter((country) => 
      country.name.toLowerCase().includes(newFilter.toLowerCase()))
      return (
        filteredCountries
      )
  }  
  const countriesToShow = filterCountries()

  //console.log('filtteri', newFilter)
  //console.log('näytettävät maat, montako kpl:', countriesToShow.length, 'tyyppi: ')
  
  return (
    <div>
      <h1>Country finder</h1>
        <Filter
        value = {newFilter}
        onChange = {handleFilterChange} >
        </Filter>   
        {newFilter.length === 0 
          ? <div></div> 
          : <Countries countries={countriesToShow} />        
            
        }   
    </div>
  )
}

export default App

