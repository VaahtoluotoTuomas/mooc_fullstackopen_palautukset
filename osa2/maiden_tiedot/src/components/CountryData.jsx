import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryData = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const api_key = import.meta.env.VITE_API_KEY

  useEffect(() => {
    const capital = country.capital[0]

    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
      .then(response => {
        setWeather(response.data)
      })
      .catch(error => {
        console.log('Virhe sään hakemisessa:', error)
      })
  }, [country, api_key])

  return (
  <div>
    <h1>{country.name.common}</h1>
    <p>Capital {country.capital}</p>
    <p>Area {country.area}</p>

    <h2>Languages</h2>
    <ul>
      {Object.values(country.languages).map(l =>
        <li key={l}>{l}</li>
      )}
    </ul>

    <img 
    src={country.flags.png}>
    </img>

    {weather && (
      <div>
        <h2>Weather in {country.capital}</h2>
        <p>Temperature {weather.main.temp} Celcius</p>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}>
        </img>
        <p>Wind {weather.wind.speed} m/s</p>
      </div>
    )}
  </div>
  )
}

export default CountryData