import React, { useState } from 'react';
import './App.css';
import './search.js'
import 'bootstrap/dist/css/bootstrap.min.css';

function WeatherComponent() {
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);

    const handleSearch = (event) => {
        setSearch(event.target.value);
    }
    const fetchWeatherData = () => {
        const apiUrl = `https://api.checkwx.com/taf/${search}/decoded`;


        const requestOptions = {
            method: 'GET',
            headers: {
                'X-API-Key': 'WEATHER_API_KEY',
            },
        };

        fetch(apiUrl, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setData(data.data || []);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
        return (
            <div className="card">
                <div className="text-center mx-5">
                    <h1>TAF Weather</h1>
                    <ul>
                        {data.map((item, index) => (
                            <li key={index}>
                                <strong>{item.type}</strong>: {item.raw_text}
                            </li>
                        ))}
                    </ul>
                    <div className="input-group mb-3">
                        <button onClick={fetchWeatherData}>Search ICAO Code</button>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search an airport"
                            value={search}
                            onChange={handleSearch}
                        />
                    </div>
                </div>
            </div>
        );
}

export default WeatherComponent;


