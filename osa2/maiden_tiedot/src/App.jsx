import { useState, useEffect } from 'react'
import fetchService from './services/fetchService'

import Filter from './components/Filter'
import Content from './components/Content'

const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [newCountry, setNewCountry] = useState('')

  const handleShowButton = (countryName) => {
    setNewCountry(countryName)
  }

  useEffect(() => {
    fetchService
      .getAll()
      .then(fetchedCountries => {
        setAllCountries(fetchedCountries)
      })
  }, [])

  const countriesToShow = allCountries.filter(c =>
    c.name.common.toLowerCase().includes(newCountry.toLowerCase())
  )

  const handleCountryChange = (event) => {
    console.log(event.target.value)
    setNewCountry(event.target.value)
  }

  return (
    <div>
      <form>
        <Filter newCountry={newCountry} handleCountryChange={handleCountryChange}/>      
      </form>
      <div>
        <Content countriesToShow={countriesToShow} handleShowButton={handleShowButton} />
      </div>
    </div>
  )
}

export default App
