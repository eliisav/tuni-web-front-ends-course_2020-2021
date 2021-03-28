import { useState, useEffect } from 'react'
import axios from 'axios';

import { Filter, Countries } from './components';

// ------------------------------------------------------------ //
// ENTER COMMIT SHA OF YOUR REPO IN HERE                        //
// ------------------------------------------------------------ //
export const commitSHA = 'cf2de0b';
// ------------------------------------------------------------ //


export const App = () => {

  const [ countries, setCountries ] = useState([]);
  const [ filteredCountries, setFilteredCountries ] = useState(countries)
  const [ search, setSearch ] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        setCountries(res.data);
        setFilteredCountries(res.data)
      })

  }, [])

  const handleSearch = e => {
    e.preventDefault();

    const searchTerm = e.target.value;

    setSearch(searchTerm);

    const matches = countries.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setFilteredCountries(matches)
  }

  return (
    <div>

      <Filter
        value={search}
        onChange={handleSearch}
      />

      <Countries
        countries={filteredCountries}
      />

    </div>
  );
}

