import React from 'react'

const Countries = ({countries, handleShow}) => {
    if(countries.length > 10) return <p>Too many matches, specify another filter</p>
    if(countries.length === 1) return (
        <div>
            <h1>{countries[0].name.common}</h1>
            <p>capital {countries[0].capital[0]}</p>
            <p>area {countries[0].area}</p>
            <h4>languages:</h4>
            <ul>
                {Object.keys(countries[0].languages).map(el => (
                    <li key={countries[0].languages[el]}>{countries[0].languages[el]}</li>
                ))}
            </ul>
            <img src={countries[0].flags.png} alt='country flag'/>
            <h2>Weather in {countries[0].capital[0]}</h2>
            <p>temperature {countries[0].temperature} Celcius</p>
            <img src={`https://openweathermap.org/img/wn/${countries[0].icon}@2x.png`}/>
            <p>wind {countries[0].windSpeed} m/s</p>
        </div>
    )
    return (
        <div>
        {
            countries.map(c =>
                <div key={c.name.common}>
                    <p>{c.name.common} <button onClick={() => handleShow(c.name.common)}>show</button></p>
                    {
                    c.showMore && 
                    <div>
                        <h2>{c.name.common}</h2>
                        <p>capital {c.capital[0]}</p>
                        <p>area {c.area}</p>
                        <h4>languages:</h4>
                        <ul>
                            {Object.keys(c.languages).map(el => (
                                <li>{c.languages[el]}</li>
                            ))}
                        </ul>
                        <img src={c.flags.png} alt='country flag'/>
                    </div>
                    }
                </div>
            )
        }
        </div>
    )
}

export default Countries