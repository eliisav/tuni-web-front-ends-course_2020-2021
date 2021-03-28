
import React, { useState } from 'react'

//kun filtteriä kutsutaan, sille on annettava arvo ja tapahtumankäsittelijä
const Countries = ({countries}) => {
  
    const [selectedCountry, setSelectedCountry] = useState('')
    
    const handleClick = (country) => {
        setSelectedCountry(country)    
       }   
    
    //console.log('selected country vaihdettu: ', selectedCountry) 
    //console.log('selectedCountry.length: ', selectedCountry.length) 
    
    if (selectedCountry.length!==0){
      return (
        <Country country={selectedCountry}></Country>
      )
    
    } 
    else { 
      if (countries.length === 0){
          return (
            <div></div>
          )  
          
        } 
        else if ( countries.length >= 10 ){
            return (
              <div>Too many matches, specify another filter</div>
            )
        
        } else if (countries.length > 1){      
            return(        
              countries.map((country) => 
              <div key={country.numericCode}>
                {country.name} 
                <CountrySelectorButton 
                  onClick={() => {
                  handleClick (country)             
                  }
                } />
                </div>)
            )    
          } else if (countries.length ===1) {
            return (
              <Country
                country={countries[0]}>
              </Country>
            
            )
          }     
          
    }
    
    }

const Filter = ({value, onChange}) => {
    return (
    <form>
        <div>
          Find countries <input
          value = {value}
          onChange = {onChange} />
        </div>
    </form>
    )

}
const CountrySelectorButton = ({onClick}) => {
       
    return(
    <div>
         <button
         onClick={onClick}
         >
         show
         </button>
     </div>
     )
 }

 const Country = ({country}) => {
    console.log('country-komponentti, annettu maa: ', country)

    return (
    <div>
        <h1>
           {country.name}            
        </h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>  
        
        <h3>Languages spoken: </h3>  
            <ul>
            {country.languages.map(lang =>
                <li 
                    key={lang.name}>
                        {lang.name}
                </li>                          
            )}
            </ul>   
        <h3> {`Flag of ${country.name}: `} </h3>  
            <img src= {country.flag} alt={`${country.name} flag`} width="25%" height="25%"></img>        
                
    </div>
    )
}
   

export {Filter, Countries}