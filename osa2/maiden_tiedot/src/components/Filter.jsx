const Filter = ({ newCountry, handleCountryChange }) => {
    return (
        <div>find countries 
          <input 
          value={newCountry} 
          onChange={handleCountryChange} 
          />
        </div>
    )
}

export default Filter