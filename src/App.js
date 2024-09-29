import React, { useState } from 'react';
import './App.css';
import './key.js'
import 'bootstrap/dist/css/bootstrap.min.css';

function WeatherComponent() {
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const [typeSearch, setTypeSearch] = useState('');

    const handleSearch = (event) => {
        setSearch(event.target.value);
    }
    const handleTypeSearch = (event) => {
        setTypeSearch(event.target.value);
    }
    const fetchWeatherData = () => {
        const ApiUrl = `https://api.checkwx.com/${typeSearch}/${search}/decoded`;


        const requestOptions = {
            method: 'GET',
            headers: {
                'X-API-Key': '8197f82ac9614fb185d6fd22fd',
            },
        };

        fetch(ApiUrl, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setData(data.data || []);
            })
            .catch(error => {
                alert('Please enter a valid ICAO AIRPORT CODE!  :', error);
            });
    }
        return (
            <div className="App">
                <div className="card">
                    <div className="text-center mx-5">
                        <h1 className=''>Aviation Weather</h1>
                        <img class='col-4' id='airplane' src={`${process.env.PUBLIC_URL}/airplane.svg`}
                             alt="Clear Day"/>
                        {/*<img className='h-25' src={`${process.env.PUBLIC_URL}/weather-images/clear-day.svg`} alt="Clear Day"/>*/}
                        <ul>
                            {data.map((item, index) => (
                                <li key={index}>
                                    <strong className='textarea-warning'>{item.type}</strong>: {item.raw_text}
                                </li>
                            ))}
                        </ul>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search an airport"
                                value={search}
                                onChange={handleSearch}
                            />

                        </div>
                        <div className="input-group">
                            <select
                                className="form-select"
                                value={typeSearch}
                                onChange={handleTypeSearch}
                                aria-label="Default select example">
                                <option selected>Select a Debrief Type</option>
                                <option value="taf">TAF</option>
                                <option value="metar">METAR</option>

                            </select>

                        </div>
                        <button className='btn-lg mt-5' id='search-button' onClick={fetchWeatherData}>Search Code
                        </button>
                    </div>
                </div>

                <div class='about card'>
                    <div className='row mb-4'>
                        <h2>What is a TAF?</h2>
                        <p>Think of a METAR as a snapshot of the current weather at an airport. It's like looking
                            outside and saying, "Oh, it’s cloudy, and the wind is blowing from the east at 15 knots." It
                            tells you what's happening right now.
                            Pilots and ground personnel use this info to make decisions in real-time.
                            METARs are updated every hour, sometimes more frequently if the weather changes rapidly.</p>
                    </div>
                    <div className='row'>
                        <h2>What is METAR?</h2>
                        <p>TAF is like a weather forecast for the next 24-30 hours. It's not just about what the weather
                            is like at this moment, but what’s expected to happen.
                            This helps pilots plan flights by giving them an idea of what the weather will be like when
                            they take off or land, hours later.
                            TAFs are updated every 6 hours, but can be amended if the forecast changes
                            significantly.</p>
                    </div>
                </div>
                <div className={'card'}>
                    <h2>About the Dev</h2>
                    <p></p>
                </div>

            </div>
        )
            ;
}

export default WeatherComponent;


