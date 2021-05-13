import React, { useState, useEffect } from 'react'
import axios from 'axios'

// ** enter commit sha of your repository in here **
export const commitSHA = 'b357810';

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  //noudetaan tiedot ja asetetaan stateen tai vaihtoehtoisesti tulostetaan virhe
  useEffect(() => {
    const url = `https://restcountries.eu/rest/v2/name/${name}?fullText=true`
    axios.get(url).then(response => {
      setCountry({ data: response.data[0], found: true })
    }).catch(error => {
      console.error(error)
      setCountry({ found: false })
    })
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}

export const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

