import React, { useEffect } from 'react';
import WeatherComponent from './weathersearch';
import './App.css';

const App = () => {
    useEffect(() => {
    }, []);

    return (
        <div className="App">
            <WeatherComponent />
        </div>
    );
};

export default App;

