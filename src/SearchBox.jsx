import { useEffect, useState } from 'react';
import './App.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from './Alert.jsx'
const API_KEY = import.meta.env.VITE_API_KEY;

export default function SearchBox({ getInfo }) {
    const [city, setCity] = useState('')
    const [error, setError] = useState(false)
    
    let API_URL = "https://api.openweathermap.org/data/2.5/weather"

    async function getWeatherInfo(city) {
        try {

            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            let jsonResponse = await response.json()
            const result = {
                name: jsonResponse.name,
                temp: jsonResponse.main.temp,
                feels_like: jsonResponse.main.feels_like,
                humidity: jsonResponse.main.humidity,
                description: jsonResponse.weather[0].description,
                wind: jsonResponse.wind.speed,
                icon: jsonResponse.weather[0].icon,
                country: jsonResponse.sys.country,
                timezone: jsonResponse.timezone,
                dt: jsonResponse.dt
            }
            return result;
        } catch (e) {
            throw (e)
        }
    }
    async function handleSubmit(e) {
        try {
            e.preventDefault();
            setCity('');
            getInfo(await getWeatherInfo(city))
        } catch (e) {
            setError(true)
        }
    }
    function handleChange(e) {
        setCity(e.target.value)
    }

    useEffect(() =>{
        async function InitialData(){
            let data = await getWeatherInfo('kathmandu')
            getInfo(data)
        }
        InitialData()
    },[])

    return (
        <>
            {error && (<Alert isError={true} onClose={() => setError(false)} />)}
            <form onSubmit={handleSubmit}>
                <div className="search">
                    <TextField id="searchBar" label="City Name" variant="outlined" required value={city} onChange={handleChange} />
                    <Button variant="contained" color='success' type='submit'>Search</Button>
                </div>
            </form>
        </>
    )
}