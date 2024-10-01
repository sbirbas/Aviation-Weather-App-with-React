import React, { useState } from 'react';
import './App.css';
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
        <div className="container">
                <ul className="navbar px-5 bg-light-subtle fixed-top">
                    <a className="nav-link" href=".hero">Home</a>
                    <a className="nav-link" href="#weather-search">Weather</a>
                    <a className="nav-link" href="#about">About</a>
                    <a className="nav-link" href="#weather-info"> Weather Info</a>
                </ul>

            <div className="hero row p-5">
            <h1 className={'col-7'}>aviation weather</h1>
                <h2 className={'col-5'}>Navigate the skies with confidence. Get real-time METAR and TAF reports for your next flight. Plan ahead with trusted aviation weather data.</h2>
                </div>

            <div className="cardsrow">
                <div className={'scrollitem'} id={'weather-search'}>
                    <div className="text-center mx-5">
                        <h1 className=''>Search Aviation Weather</h1>
                        <p>Select an airport and briefing type</p>
                        <img className='col-4' id='airplane' src={`${process.env.PUBLIC_URL}/airplane.svg`}
                             alt="Clear Day"/>
                        {/*<img className='h-25' src={`${process.env.PUBLIC_URL}/weather-images/clear-day.svg`} alt="Clear Day"/>*/}
                        <ul>
                            {data.map((item, index) => (
                                <li key={index}>
                                    <strong className='textarea-warning'>{item.type}</strong>The {typeSearch} for {item.station.name} is:
                                    {item.raw_text}
                                </li>
                            ))}
                        </ul>
                        {data.map((item, index) => (
                            <div key={index}>
                                <h1>What does this mean?</h1>
                                <p>The temperature at {item.station.name} is {item.temperature.fahrenheit} degrees with {item.humidity.percent}% humidity, the visibility is {item.visibility.miles_float} miles. Flight rules are {item.flight_category}. The clouds are {item.clouds.text} with a ceiling of {item.clouds.feet} feet AGL, and the barometer at this airport reads {item.barometer.hg}Mg of mercury.</p>
                            </div>
                        ))}
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
                        <button className="btn-circle mt-5" id='search-button' onClick={fetchWeatherData}>Search Code
                        </button>
                    </div>
                </div>
                <div className={'scrollitem'} id={'about'}>
                    <h2 className={'px-5'}>What is a TAF?</h2>
                    <p>Think of a METAR as a snapshot of the current weather at an airport. It's like looking
                        outside and saying, "Oh, it’s cloudy, and the wind is blowing from the east at 15 knots." It
                        tells you what's happening right now.
                        Pilots and ground personnel use this info to make decisions in real-time.
                        METARs are updated every hour, sometimes more frequently if the weather changes rapidly.</p>
                </div>

                <div className={'scrollitem'}>
                    <h2 className={'px-5'}>What is METAR?</h2>
                    <p>TAF is like a weather forecast for the next 24-30 hours. It's not just about what the weather
                        is like at this moment, but what’s expected to happen.
                        This helps pilots plan flights by giving them an idea of what the weather will be like when
                        they take off or land, hours later.
                        TAFs are updated every 6 hours, but can be amended if the forecast changes
                        significantly.</p>
                </div>

                <div className={'scrollitem'} id={'weather-info'}>
                    <h2 className={'px-5'}>What do all these numbers and letters mean, and how do pilots gauge this into flight
                        planning?</h2>
                    <p>In aviation, those numbers and letters represent critical information that helps pilots make
                        decisions about their flight. They could be referring to anything from weather conditions,
                        airport identifiers, altitudes, navigation points, or airspeeds. For example, '090260G23' means
                        'winds are 9 knots from the direction of 260 degrees, with justs of 23 knots. While "SKC" means
                        'skies clear'. Understanding how to read and interpret these codes is key for flight planning,
                        as they provide essential details about the flight path, safety parameters, and efficiency.
                        Pilots use this data to assess things like fuel requirements, weather-related risks, and air
                        traffic considerations to ensure a smooth and safe flight.</p>
                </div>
            </div>
            <div className={'end'}>
                <h2>I hope you enjoy!</h2>
                <p></p>
            </div>
        </div>
    );
}

export default WeatherComponent;
