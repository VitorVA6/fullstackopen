import axios from 'axios'
import Filter from './components/Filter'
import { useEffect, useState } from 'react';
import Countries from './components/Countries';

function App() {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const api_key = process.env.REACT_APP_API_KEY

  const handleShow = (countryName) => {
    setCountries(countries.map(c => c.name.common === countryName ? {...c, showMore: !c.showMore} : c))
  }

  useEffect(() => {
    if(filter.length > 0){
      axios.get(`https://restcountries.com/v3.1/name/${filter}`)
      .then(response => {
        if(response.data.length > 10) setCountries(response.data)
        else if(response.data.length > 1 && response.data.length <=10) setCountries(response.data.map(c => ({...c, showMore: false})))
        else {
            const name = response.data[0].name.common
            const code = response.data[0].tld[0].slice(1)
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name},${code}&units=metric&APPID=${api_key}`)
            .then(resp => {
              setCountries([
              {...response.data[0], 
                temperature: resp.data.main.temp, 
                windSpeed: resp.data.wind.speed, 
                icon: resp.data.weather[0].icon}])
            })
            .catch(err => console.log(err))
        }
      }).catch(err => setCountries([]))
    }
  }, [filter])

  return (
    <div>
      <Filter value={filter} handleChange={(e) => setFilter(e.target.value)}/>
      <Countries countries={countries} handleShow= {handleShow}/>
    </div>
  );
}

export default App;
