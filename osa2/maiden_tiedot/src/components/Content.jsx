import CountryData from "./CountryData"

const Content = ({ countriesToShow, handleShowButton }) => {     
    if (countriesToShow.length > 10 ) {
        return <p>Too many matches, specify another filter</p>
    }
    else if (countriesToShow.length === 1)  {
        return <CountryData country={countriesToShow[0]} />
    }

    return (
        <div>
            {countriesToShow.map(c =>
                <div key={c.name.common}>
                    {c.name.common}
                    <button onClick={() => handleShowButton(c.name.common)}>Show</button>
                </div>
            )}
        </div>
    )
}

export default Content